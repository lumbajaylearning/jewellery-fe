"use client";
import { CartDrawer } from "@/app/components/modals/CartDrawer";
import { CertificateModal } from "@/app/components/modals/CertificateModal";
import { HomeTrialModal } from "@/app/components/modals/HomeTrialModal";
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
import { LIVE_GOLD_RATES, PRODUCT_SPECIFICATIONS } from "@/app/data/productData";
import { CartItem, GoldPurity } from "@/app/types/product";
import { useParams } from "next/dist/client/components/navigation";
import { useState } from "react";

async function fetchProduct(id: string) {
    // Replace with your API call or database query
    return {
        id,
        name: "Solitaire Diamond Ring",
        price: "₹49,999",
    };
}

export default function ProductPage({ params }: { params: { id: string } }) {
    // Product Configurator States
    const [selectedMetal, setSelectedMetal] = useState<MetalType>('yellow-gold');
    const [selectedPurity, setSelectedPurity] = useState<GoldPurity>('22K');
    const [selectedSize, setSelectedSize] = useState<number>(8);
    const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Cart & Drawers State
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 'cart-1',
            title: 'Glorious 22 Karat Yellow Gold Floral Ring',
            metal: 'yellow-gold',
            metalName: '22K Yellow Gold (916)',
            purity: '22K',
            size: 8,
            price: 19850,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80',
            sku: '511920FCMAA00'
        }
    ]);

    // Modal Visibilities
    const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
    const [homeTrialOpen, setHomeTrialOpen] = useState(false);
    const [trialInitialPiece, setTrialInitialPiece] = useState<string | undefined>(undefined);
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

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleAddToCart = () => {
        const metalNameMap: Record<MetalType, string> = {
            'yellow-gold': `${selectedPurity} Yellow Gold`,
            'rose-gold': `${selectedPurity} Rose Gold`,
            'white-gold': `${selectedPurity} White Gold`
        };

        const newItem: CartItem = {
            id: `cart-${Date.now()}`,
            title: PRODUCT_SPECIFICATIONS.productName,
            metal: selectedMetal,
            metalName: metalNameMap[selectedMetal],
            purity: selectedPurity,
            size: selectedSize,
            price: currentProductPrice,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80',
            sku: PRODUCT_SPECIFICATIONS.productCode
        };

        setCartItems(prev => [newItem, ...prev]);
        showToast(`Added ${PRODUCT_SPECIFICATIONS.productName} (${metalNameMap[selectedMetal]}, Size ${selectedSize}) to Bag`);
        setCartDrawerOpen(true);
    };

    const handleBuyNow = () => {
        handleAddToCart();
    };

    const handleRemoveCartItem = (id: string) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const handleUpdateQty = (id: string, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const handleToggleWishlist = () => {
        setIsWishlisted(prev => !prev);
        showToast(!isWishlisted ? 'Added Floral Ring to Wishlist' : 'Removed from Wishlist');
    };

    const scrollToReviews = () => {
        const el = document.getElementById('customer-reviews');
        el?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="w-full min-h-screen bg-background flex flex-col font-sans">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Product Gallery */}
                    <div className="lg:col-span-7 lg:sticky lg:top-6 self-start w-full">
                        <ProductGallery
                            selectedMetal={selectedMetal}
                            isWishlisted={isWishlisted}
                            onToggleWishlist={() => setIsWishlisted(!isWishlisted)}
                            onOpen360Modal={() => { }}
                            onOpenCertificateModal={() => { }}
                            onOpenVirtualTryOn={() => { }}
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
                            onOpenHomeTrial={() => setHomeTrialOpen(true)}
                            onOpenPriceBreakdown={() => setPriceBreakupModalOpen(true)}
                            onOpenCertificateModal={() => setCertificateModalOpen(true)}
                            onOpenExchangeModal={() => setExchangeModalOpen(true)}
                            onOpenStoreModal={() => setStoreModalOpen(true)}
                            onAddToCart={handleAddToCart}
                            onBuyNow={handleBuyNow}
                            isWishlisted={isWishlisted}
                            onToggleWishlist={handleToggleWishlist}
                            onScrollToReviews={scrollToReviews}
                        />

                        {/* Delivery & Pincode Checker */}
                        <div className="pt-2">
                            <DeliveryChecker onOpenStoreModal={() => setStoreModalOpen(true)} />
                        </div>

                        {/* Try at Home Feature in Right Rail for Desktop */}
                        <div className="hidden lg:block pt-2">
                            <TryAtHomeSection onOpenHomeTrial={() => setHomeTrialOpen(true)} />
                        </div>
                    </div>
                </div>

                {/* Try at Home Feature in Main Stream for Mobile */}
                <div className="lg:hidden mt-8">
                    <TryAtHomeSection onOpenHomeTrial={() => setHomeTrialOpen(true)} />
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
                onOpenHomeTrial={() => setHomeTrialOpen(true)}
                selectedMetal={selectedMetal}
                selectedPurity={selectedPurity}
                selectedSize={selectedSize}
            />
            {/* Modals & Drawers */}
            <SizeGuideModal
                isOpen={sizeGuideOpen}
                onClose={() => setSizeGuideOpen(false)}
                selectedSize={selectedSize}
                onSelectSize={setSelectedSize}
            />

            <HomeTrialModal
                isOpen={homeTrialOpen}
                onClose={() => setHomeTrialOpen(false)}
                initialPiece={trialInitialPiece}
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
                onOpenHomeTrial={() => setHomeTrialOpen(true)}
            />

            <WishlistDrawer
                isOpen={wishlistDrawerOpen}
                onClose={() => setWishlistDrawerOpen(false)}
                isMainProductWishlisted={isWishlisted}
                onToggleMainWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                onOpenHomeTrial={() => setHomeTrialOpen(true)}
                metal={selectedMetal}
            />

            <OldGoldExchangeModal
                isOpen={exchangeModalOpen}
                onClose={() => setExchangeModalOpen(false)}
                targetProductPrice={currentProductPrice}
            />

            <PriceBreakupModal
                isOpen={priceBreakupModalOpen}
                onClose={() => setPriceBreakupModalOpen(false)}
                selectedPurity={selectedPurity}
            />

            <StoreAvailabilityModal
                isOpen={storeModalOpen}
                onClose={() => setStoreModalOpen(false)}
                onBookAppointment={(storeName) => {
                    setTrialInitialPiece(`${PRODUCT_SPECIFICATIONS.productName} at ${storeName}`);
                    setHomeTrialOpen(true);
                }}
            />
        </div>
    );
}