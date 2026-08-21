"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CartDrawer } from "@/app/components/modals/CartDrawer";
import { CertificateModal } from "@/app/components/modals/CertificateModal";
import { PriceBreakupModal } from "@/app/components/modals/PriceBreakupModal";
import { MobileStickyBar } from "@/app/components/product/MobileStickyBar";
import { PriceBreakdown } from "@/app/components/product/PriceBreakdown";
import { ProductDetailsAccordion } from "@/app/components/product/ProductDetailsAccordion";
import { ProductGallery } from "@/app/components/product/ProductGallery";
import { ProductInfo } from "@/app/components/product/ProductInfo";
import { DeliveryChecker } from "@/app/components/shared/DeliveryChecker";
import { TrustFeatures } from "@/app/components/shared/TrustFeatures";
import { TryAtHomeSection } from "@/app/components/shared/TryAtHomeSection";
import { CartItem } from "@/app/types/product";
import { addToCart, getOrCreateCart, removeCartLineItem, updateCartLineItem } from "@/app/lib/medusa/cart";
import { addHomeTrialItem } from "@/app/lib/home-trial";
import { mapMedusaProduct } from "@/app/lib/medusa/products";
import { isWishlisted as productIsWishlisted, toggleWishlist } from "@/app/lib/wishlist";

interface ProductDetailsClientProps {
    product: any;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
    const router = useRouter();
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const [cartLoading, setCartLoading] = useState(false);

    // Cart & Drawers State
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const mapCartItems = (cart: any): CartItem[] => (cart?.items ?? []).map((item: any) => ({
        id: item.id,
        title: item.product_title ?? item.title,
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
    const [certificateModalOpen, setCertificateModalOpen] = useState(false);
    const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
    const [priceBreakupModalOpen, setPriceBreakupModalOpen] = useState(false);

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
        ?? 0;
    const selectedVariantInStock = selectedVariant && (
        selectedVariant.manage_inventory === false ||
        selectedVariant.inventory_quantity == null ||
        selectedVariant.inventory_quantity > 0
    );
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleAddToCart = async (openDrawer = true) => {
        if (!selectedVariant?.id || !selectedVariantInStock || cartLoading) return false;
        setCartLoading(true);
        try {
            const cart = await addToCart(selectedVariant.id);
            setCartItems(mapCartItems(cart));
            showToast(`Added ${product.title} (${selectedVariant.title}) to Bag`);
            if (openDrawer) setCartDrawerOpen(true);
            return true;
        } catch (error) {
            showToast(error instanceof Error ? error.message : 'Unable to add this item to the bag');
            return false;
        } finally {
            setCartLoading(false);
        }
    };

    const handleBuyNow = async () => {
        const added = await handleAddToCart(false);
        if (added) router.push("/checkout");
    };

    const handleHomeTrial = async () => {
        if (!selectedVariant?.id) {
            showToast("Select an available option before booking a home trial");
            return;
        }
        if (!selectedVariantInStock) {
            showToast("This option is currently unavailable for a Home Trial");
            return;
        }
        try {
            await addHomeTrialItem({
                product_id: product.id,
                variant_id: selectedVariant.id,
                title: product.title,
                variant_title: selectedVariant.title,
                thumbnail: product.thumbnail ?? product.images?.[0]?.url,
                price,
                currency_code: selectedVariant.calculated_price?.currency_code ?? "inr",
            });
            router.push("/book");
        } catch (error) {
            showToast(error instanceof Error ? error.message : "Unable to add this piece to your Home Trial");
        }
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

    return (
        <div className="w-full min-h-screen bg-background flex flex-col font-sans">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full flex-1">
                {/* <pre>{JSON.stringify(product, null, 2)}</pre> */}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Product Gallery */}
                    <div className="lg:col-span-7 lg:sticky lg:top-6 self-start w-full">
                        <ProductGallery
                            isWishlisted={isWishlisted}
                            onToggleWishlist={handleToggleWishlist}
                            images={product?.images || []}
                            productTitle={product.title}
                        />
                    </div>
                    {/* Right Column: Product Details */}
                    <div className="lg:col-span-5 w-full space-y-6">
                        <ProductInfo
                            onOpenPriceBreakdown={() => setPriceBreakupModalOpen(true)}
                            onOpenCertificateModal={() => setCertificateModalOpen(true)}
                            onAddToCart={() => void handleAddToCart()}
                            onBuyNow={handleBuyNow}
                            isWishlisted={isWishlisted}
                            onToggleWishlist={handleToggleWishlist}
                            product={product}
                            selectedVariant={selectedVariant}
                            selectedOptions={selectedOptions}
                            onOptionChange={handleOptionChange}
                            cartLoading={cartLoading}
                        />

                        {/* Delivery & Pincode Checker */}
                        <div className="pt-2">
                            <DeliveryChecker />
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
                    <TrustFeatures product={product} onOpenCertificateModal={() => setCertificateModalOpen(true)} />
                </div>

                {/* Detailed Product Specifications Accordion & Transparent Pricing */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8 items-start">
                    <div className="lg:col-span-7">
                        <ProductDetailsAccordion
                            product={product}
                            selectedVariant={selectedVariant}
                        />
                    </div>

                    <div id="price-breakdown-section" className="lg:col-span-5">
                        <PriceBreakdown product={product} selectedVariant={selectedVariant} />
                    </div>
                </div>

            </main>
            <MobileStickyBar
                isWishlisted={isWishlisted}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={() => void handleAddToCart()}
                onOpenHomeTrial={handleHomeTrial}
                price={price}
                disabled={cartLoading || !selectedVariantInStock}
            />
            {toastMessage && (
                <div role="status" className="fixed bottom-24 left-1/2 z-[70] -translate-x-1/2 rounded border border-[#E5DEC9] bg-[#1C1917] px-4 py-3 text-xs font-medium text-[#FAF8F4] shadow-xl lg:bottom-8">
                    {toastMessage}
                </div>
            )}
            {/* Modals & Drawers */}
            <CertificateModal
                isOpen={certificateModalOpen}
                onClose={() => setCertificateModalOpen(false)}
                product={product}
                selectedVariant={selectedVariant}
            />

            <CartDrawer
                isOpen={cartDrawerOpen}
                onClose={() => setCartDrawerOpen(false)}
                items={cartItems}
                onRemoveItem={handleRemoveCartItem}
                onUpdateQty={handleUpdateQty}
                onOpenHomeTrial={handleHomeTrial}
            />

            <PriceBreakupModal
                isOpen={priceBreakupModalOpen}
                onClose={() => setPriceBreakupModalOpen(false)}
                product={product}
                selectedVariant={selectedVariant}
            />

        </div>
    );
}
