"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CartDrawer } from "@/app/components/modals/CartDrawer";
import { CertificateModal } from "@/app/components/modals/CertificateModal";
import { Interactive360Modal } from "@/app/components/modals/Interactive360Modal";
import { OldGoldExchangeModal } from "@/app/components/modals/OldGoldExchangeModal";
import { PriceBreakupModal } from "@/app/components/modals/PriceBreakupModal";
import { SizeGuideModal } from "@/app/components/modals/SizeGuideModal";
import { StoreAvailabilityModal } from "@/app/components/modals/StoreAvailabilityModal";
import { WishlistDrawer } from "@/app/components/modals/WishlistDrawer";
import { MobileStickyBar } from "@/app/components/product/MobileStickyBar";
import { PriceBreakdown } from "@/app/components/product/PriceBreakdown";
import { ProductDetailsAccordion } from "@/app/components/product/ProductDetailsAccordion";
import { MetalType, ProductGallery } from "@/app/components/product/ProductGallery";
import { ProductInfo } from "@/app/components/product/ProductInfo";
import { CustomerReviews } from "@/app/components/shared/CustomerReviews";
import { DeliveryChecker } from "@/app/components/shared/DeliveryChecker";
import { TrustFeatures } from "@/app/components/shared/TrustFeatures";
import { TryAtHomeSection } from "@/app/components/shared/TryAtHomeSection";
import { LIVE_GOLD_RATES } from "@/app/data/productData";
import { CartItem, GoldPurity } from "@/app/types/product";
import { addToCart, getOrCreateCart, removeCartLineItem, updateCartLineItem } from "@/app/lib/medusa/cart";
import { addHomeTrialItem } from "@/app/lib/home-trial";
import { mapMedusaProduct } from "@/app/lib/medusa/products";
import { isWishlisted as productIsWishlisted, toggleWishlist } from "@/app/lib/wishlist";

interface ProductDetailsClientProps {
    product: any;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const router = useRouter();
    // Product Configurator States
    const [selectedMetal, setSelectedMetal] = useState<MetalType>('yellow-gold');
    const [selectedPurity, setSelectedPurity] = useState<GoldPurity>('22K');
    const [selectedSize, setSelectedSize] = useState<number>(8);
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [cartLoading, setCartLoading] = useState(false);

    // Cart & Drawers State
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const mapCartItems = (cart: any): CartItem[] => (cart?.items ?? []).map((item: any) => ({
        id: item.id,
        title: item.product_title ?? item.title,
        metal: 'yellow-gold',
        metalName: item.variant_title ?? 'Selected variant',
        size: Number(item.metadata?.size ?? 0),
        price: item.unit_price ?? 0,
        quantity: item.quantity,
        image: item.thumbnail ?? product.thumbnail ?? product.images?.[0]?.url ?? '',
        sku: item.variant_sku ?? '',
    }));

    useEffect(() => {
        let active = true;
        setIsWishlisted(productIsWishlisted(product.id));
        getOrCreateCart()
            .then((cart) => active && setCartItems(mapCartItems(cart)))
            .catch(() => undefined);
        return () => { active = false; };
    }, [product.id]);

    // Modal Visibilities
    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const [interactive360Open, setInteractive360Open] = useState(false);
    const [certificateModalOpen, setCertificateModalOpen] = useState(false);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false);
    const [exchangeModalOpen, setExchangeModalOpen] = useState(false);
    const [priceBreakupModalOpen, setPriceBreakupModalOpen] = useState(false);
    const [storeModalOpen, setStoreModalOpen] = useState(false);

    // Dynamic price calculation
    const currentRate = LIVE_GOLD_RATES[selectedPurity] || 7850;
    const netWeight = 1.890;
    const goldVal = Math.round(netWeight * currentRate);
    const makingCharges = Math.round(goldVal * 0.28);
    const makingDiscount = Math.round(makingCharges * 0.15);
    const subtotal = goldVal + (makingCharges - makingDiscount);
    const currentProductPrice = subtotal + Math.round(subtotal * 0.03);

    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {}
        product.options?.forEach((option: any) => {
            initial[option.title] = option.values?.[0]?.value
        })
        return initial
    })

    const selectedVariant = useMemo(() => {
        return product.variants?.find((variant: any) => {
            return variant.options?.every((opt: any) => {
                const optionTitle = product.options?.find((o: any) => o.id === opt.option_id)?.title
                return selectedOptions[optionTitle] === opt.value
            })
        })
    }, [product, selectedOptions])

    const handleOptionChange = (optionTitle: string, value: string) => {
        setSelectedOptions((prev) => ({ ...prev, [optionTitle]: value }))
    }

    const price = selectedVariant?.calculated_price?.calculated_amount
        ?? product.variants?.[0]?.calculated_price?.calculated_amount
        ?? currentProductPrice;
    const selectedVariantInStock = selectedVariant && (
        selectedVariant.manage_inventory === false ||
        selectedVariant.inventory_quantity == null ||
        selectedVariant.inventory_quantity > 0
    );
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleAddToCart = async () => {
        if (!selectedVariant?.id || !selectedVariantInStock || cartLoading) return;
        setCartLoading(true);
        try {
            const cart = await addToCart(selectedVariant.id);
            setCartItems(mapCartItems(cart));
            showToast(`Added ${product.title} (${selectedVariant.title}) to Bag`);
            setCartDrawerOpen(true);
        } catch (error) {
            showToast(error instanceof Error ? error.message : 'Unable to add this item to the bag');
        } finally {
            setCartLoading(false);
        }
    };

    const handleBuyNow = () => {
        handleAddToCart();
    };

    const handleHomeTrial = () => {
        if (!selectedVariant?.id) {
            showToast("Select an available option before booking a home trial");
            return;
        }
        addHomeTrialItem({
            product_id: product.id,
            variant_id: selectedVariant.id,
            title: product.title,
            variant_title: selectedVariant.title,
            thumbnail: product.thumbnail ?? product.images?.[0]?.url,
            price,
            currency_code: selectedVariant.calculated_price?.currency_code ?? "inr",
        });
        router.push("/book");
    };

    const handleRemoveCartItem = async (id: string) => {
        try {
            const cart = await removeCartLineItem(id);
            setCartItems(mapCartItems(cart));
        } catch {
            showToast('Unable to remove this item');
        }
    };

    const handleUpdateQty = async (id: string, delta: number) => {
        const item = cartItems.find((lineItem) => lineItem.id === id);
        if (!item) return;
        const quantity = item.quantity + delta;
        if (quantity < 1) return handleRemoveCartItem(id);
        try {
            const cart = await updateCartLineItem(id, quantity);
            setCartItems(mapCartItems(cart));
        } catch {
            showToast('Unable to update the quantity');
        }
    };

    const handleToggleWishlist = () => {
        const result = toggleWishlist(mapMedusaProduct(product));
        setIsWishlisted(result.added);
        showToast(result.added ? `Added ${product.title} to Wishlist` : `Removed ${product.title} from Wishlist`);
    };

    const scrollToReviews = () => {
        const el = document.getElementById('customer-reviews');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="w-full min-h-screen bg-background flex flex-col font-sans">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full flex-1">
                {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Product Gallery */}
                    <div className="lg:col-span-7 lg:sticky lg:top-6 self-start w-full">
                        <ProductGallery
                            selectedMetal={selectedMetal}
                            isWishlisted={isWishlisted}
                            onToggleWishlist={handleToggleWishlist}
                            onOpen360Modal={() => { }}
                            onOpenCertificateModal={() => { }}
                            onOpenVirtualTryOn={() => { }}
                            images={product?.images || []}
                            productTitle={product.title}
                        />
                    </div>
                    {/* Right Column: Product Details */}
                    <div className="lg:col-span-5 w-full space-y-6">
                        <ProductInfo
                            selectedMetal={selectedMetal}
                            onSelectMetal={setSelectedMetal}
                            selectedPurity={selectedPurity}
                            onSelectPurity={setSelectedPurity}
                            selectedSize={selectedSize}
                            onSelectSize={setSelectedSize}
                            onOpenSizeGuide={() => setSizeGuideOpen(true)}
                            onOpenHomeTrial={handleHomeTrial}
                            onOpenPriceBreakdown={() => setPriceBreakupModalOpen(true)}
                            onOpenCertificateModal={() => setCertificateModalOpen(true)}
                            onOpenExchangeModal={() => setExchangeModalOpen(true)}
                            onOpenStoreModal={() => setStoreModalOpen(true)}
                            onAddToCart={handleAddToCart}
                            onBuyNow={handleBuyNow}
                            isWishlisted={isWishlisted}
                            onToggleWishlist={handleToggleWishlist}
                            onScrollToReviews={scrollToReviews}
                            product={product}
                            selectedVariant={selectedVariant}
                            selectedOptions={selectedOptions}
                            onOptionChange={handleOptionChange}
                            cartLoading={cartLoading}
                        />

                        {/* Delivery & Pincode Checker */}
                        <div className="pt-2">
                            <DeliveryChecker onOpenStoreModal={() => setStoreModalOpen(true)} />
                        </div>

                        {/* Try at Home Feature in Right Rail for Desktop */}
                        <div className="hidden lg:block pt-2">
                            <TryAtHomeSection onOpenHomeTrial={handleHomeTrial} />
                        </div>
                    </div>
                </div>

                {/* Try at Home Feature in Main Stream for Mobile */}
                <div className="lg:hidden mt-8">
                    <TryAtHomeSection onOpenHomeTrial={handleHomeTrial} />
                </div>

                {/* Trust Indicators Bar */}
                <div className="mt-8">
                    <TrustFeatures onOpenCertificateModal={() => setCertificateModalOpen(true)} />
                </div>

                {/* Detailed Product Specifications Accordion & Transparent Pricing */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
                    <div className="lg:col-span-7">
                        <ProductDetailsAccordion
                            onOpenCertificateModal={() => setCertificateModalOpen(true)}
                            onOpenExchangeModal={() => setExchangeModalOpen(true)}
                        />
                    </div>

                    <div id="price-breakdown-section" className="lg:col-span-5">
                        <PriceBreakdown selectedPurity={selectedPurity} />
                    </div>
                </div>

            </main>
            {/* Customer Stories Section */}
            <CustomerReviews />
            <MobileStickyBar
                isWishlisted={isWishlisted}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onOpenHomeTrial={handleHomeTrial}
                selectedMetal={selectedMetal}
                selectedPurity={selectedPurity}
                selectedSize={selectedSize}
                price={price}
                disabled={cartLoading || !selectedVariantInStock}
            />
            {toastMessage && (
                <div role="status" className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded border border-[#E5DEC9] bg-[#1C1917] px-4 py-3 text-xs font-medium text-[#FAF8F4] shadow-xl lg:bottom-8">
                    {toastMessage}
                </div>
            )}
            {/* Modals & Drawers */}
            <SizeGuideModal
                isOpen={sizeGuideOpen}
                onClose={() => setSizeGuideOpen(false)}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
            />

            <Interactive360Modal
                isOpen={interactive360Open}
                onClose={() => setInteractive360Open(false)}
                metal={selectedMetal}
            />

            <CertificateModal
                isOpen={certificateModalOpen}
                onClose={() => setCertificateModalOpen(false)}
            />

            <CartDrawer
                isOpen={cartDrawerOpen}
                onClose={() => setCartDrawerOpen(false)}
                items={cartItems}
                onRemoveItem={handleRemoveCartItem}
                onUpdateQty={handleUpdateQty}
                onOpenHomeTrial={handleHomeTrial}
            />

            <WishlistDrawer
                isOpen={wishlistDrawerOpen}
                onClose={() => setWishlistDrawerOpen(false)}
                isMainProductWishlisted={isWishlisted}
                onToggleMainWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onOpenHomeTrial={handleHomeTrial}
                metal={selectedMetal}
            />

            <OldGoldExchangeModal
                isOpen={exchangeModalOpen}
                onClose={() => setExchangeModalOpen(false)}
                targetProductPrice={price}
            />

            <PriceBreakupModal
                isOpen={priceBreakupModalOpen}
                onClose={() => setPriceBreakupModalOpen(false)}
                selectedPurity={selectedPurity}
            />

            <StoreAvailabilityModal
                isOpen={storeModalOpen}
                onClose={() => setStoreModalOpen(false)}
                onBookAppointment={handleHomeTrial}
            />
        </div>
    );
}
