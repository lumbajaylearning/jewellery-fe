import React, { useState } from 'react';
import { Star, Heart, Check, Sparkles, Ruler, ShieldCheck, Truck, RefreshCw, ShoppingBag, Info, Zap, Store, Copy, CheckCheck } from 'lucide-react';
import { MetalType, GoldPurity, MetalOption, PurityOption } from '@/app/types/product';
import { METALS, PURITY_OPTIONS, RING_SIZES, LIVE_GOLD_RATES, PRODUCT_SPECIFICATIONS } from '@/app/data/productData';

interface ProductInfoProps {
    selectedMetal: MetalType;
    onSelectMetal: (metal: MetalType) => void;
    selectedPurity: GoldPurity;
    onSelectPurity: (purity: GoldPurity) => void;
    selectedSize: number;
    onSelectSize: (size: number) => void;
    onOpenSizeGuide: () => void;
    onOpenHomeTrial: () => void;
    onOpenPriceBreakdown: () => void;
    onOpenCertificateModal: () => void;
    onOpenExchangeModal: () => void;
    onOpenStoreModal: () => void;
    onAddToCart: () => void;
    onBuyNow: () => void;
    isWishlisted: boolean;
    onToggleWishlist: () => void;
    onScrollToReviews: () => void;
    product: any; // Add the product prop here
    selectedVariant: any;
    selectedOptions: Record<string, string>;
    onOptionChange: (optionTitle: string, value: string) => void;
    cartLoading?: boolean;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
    selectedMetal,
    onSelectMetal,
    selectedPurity,
    onSelectPurity,
    selectedSize,
    onSelectSize,
    onOpenSizeGuide,
    onOpenHomeTrial,
    onOpenPriceBreakdown,
    onOpenCertificateModal,
    onOpenExchangeModal,
    onOpenStoreModal,
    onAddToCart,
    onBuyNow,
    isWishlisted,
    onToggleWishlist,
    onScrollToReviews,
    product,
    selectedVariant,
    selectedOptions,
    onOptionChange,
    cartLoading = false,
}) => {
    const [copiedSku, setCopiedSku] = useState(false);
    const [copiedBankOffer, setCopiedBankOffer] = useState(false);

    const karatOptions: any[] = product?.options?.find(({ title }: any) => title === 'Karatage')?.values || [];
    const metalOptions: any[] = product?.options?.find(({ title }: any) => title === 'Metal Tone')?.values || [];
    const ringSize: any[] = product?.options?.find(({ title }: any) => title === 'Ring Size')?.values || [];
    const activeMetalObj = metalOptions.find((metal) => metal.id === selectedMetal) || metalOptions[0];
    const activePurityObj = karatOptions.find((purity) => purity.id === selectedPurity) || karatOptions[0];

    // Dynamic price math
    const rate = LIVE_GOLD_RATES[selectedPurity] || 7850;
    const netWeight = 1.890;
    const goldVal = Math.round(netWeight * rate);
    const makingCharges = Math.round(goldVal * 0.28);
    const makingDiscount = Math.round(makingCharges * 0.15);
    const effectiveMaking = makingCharges - makingDiscount;
    const subtotal = goldVal + effectiveMaking;
    const gst = Math.round(subtotal * 0.03);
    const calculatedPrice = selectedVariant?.calculated_price;
    const finalPrice = calculatedPrice?.calculated_amount ?? (subtotal + gst);
    const originalMRP = calculatedPrice?.original_amount ?? finalPrice;
    const savings = originalMRP - finalPrice;
    const currencyCode = calculatedPrice?.currency_code ?? 'inr';
    const selectedSku = selectedVariant?.sku || PRODUCT_SPECIFICATIONS.productCode;
    const inStock = selectedVariant && (
        selectedVariant.manage_inventory === false ||
        selectedVariant.inventory_quantity == null ||
        selectedVariant.inventory_quantity > 0
    );
    const formatMoney = (amount: number) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currencyCode.toUpperCase(),
        maximumFractionDigits: 0,
    }).format(amount);

    const handleCopySku = () => {
        navigator.clipboard?.writeText(selectedSku);
        setCopiedSku(true);
        setTimeout(() => setCopiedSku(false), 2000);
    };

    const handleCopyBankCode = () => {
        navigator.clipboard?.writeText('AURA10');
        setCopiedBankOffer(true);
        setTimeout(() => setCopiedBankOffer(false), 2000);
    };

    return (
        <div className="w-full flex flex-col space-y-6">
            {/* 1. Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center space-x-1.5 text-xs text-[#78716C] overflow-x-auto no-scrollbar">
                <a href="#" className="hover:text-[#1C1917] transition-colors whitespace-nowrap">Home</a>
                <span>/</span>
                <a href="#" className="hover:text-[#1C1917] transition-colors whitespace-nowrap">Jewellery</a>
                <span>/</span>
                <a href="#" className="hover:text-[#1C1917] transition-colors whitespace-nowrap">Rings</a>
                <span>/</span>
                <a href="#" className="hover:text-[#1C1917] transition-colors whitespace-nowrap">Gold Rings</a>
                <span>/</span>
                <span className="text-[#1C1917] font-medium truncate">{product.title}</span>
            </nav>

            {/* 2. Header & Title & Subtitle */}
            <div className="space-y-2.5 border-b border-[#E5DEC9] pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        {product?.collection?.title &&
                            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#9E7D47] bg-[#F7F3EB] px-2.5 py-0.5 rounded border border-[#E5DEC9]">
                                {product.collection.title}
                            </span>
                        }
                        <span className="text-[10.5px] font-semibold text-[#047857] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                            22KT BIS 916 Hallmark
                        </span>
                    </div>

                    <button
                        onClick={handleCopySku}
                        className="text-xs text-[#78716C] hover:text-[#1C1917] font-mono flex items-center gap-1 cursor-pointer"
                        title="Click to copy Product Code"
                    >
                        <span>SKU: {selectedSku}</span>
                        {copiedSku ? (
                            <CheckCheck className="w-3.5 h-3.5 text-[#047857]" />
                        ) : (
                            <Copy className="w-3.5 h-3.5 text-[#78716C]" />
                        )}
                    </button>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1C1917] tracking-tight leading-snug">
                    {product.title}
                </h1>

                <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-normal">
                    {product.description}
                </p>

                {/* Rating Summary & Certifications */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                        onClick={onScrollToReviews}
                        className="flex items-center gap-1.5 text-xs text-[#1C1917] hover:underline cursor-pointer group"
                    >
                        <div className="flex text-[#C5A880]">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                        </div>
                        <span className="font-semibold text-xs ml-0.5 text-[#1C1917]">4.9</span>
                        <span className="text-[#78716C] group-hover:text-[#1C1917]">(186 Ratings & 42 Reviews)</span>
                    </button>

                    <span className="text-[#E5DEC9]">•</span>

                    <button
                        onClick={onOpenCertificateModal}
                        className="text-xs text-[#57534E] hover:text-[#9E7D47] transition-colors flex items-center gap-1 cursor-pointer font-medium"
                    >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9E7D47]" />
                        <span>BIS Hallmark HUID Verified</span>
                    </button>
                </div>
            </div>

            {/* 3. Pricing & Special Offer Banner */}
            <div className="space-y-3 bg-[#F1ECE4] p-4 sm:p-5 rounded-md border border-[#E5DEC9] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                    <div className="space-y-1">
                        <div className="flex items-baseline gap-2.5 flex-wrap">
                            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
                                {formatMoney(finalPrice)}
                            </span>
                            {originalMRP > finalPrice && <>
                                <span className="text-sm text-[#78716C] line-through font-light">{formatMoney(originalMRP)}</span>
                                <span className="text-xs text-[#047857] font-semibold bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">Save {formatMoney(savings)}</span>
                            </>}
                        </div>
                        <p className="text-[11px] text-[#78716C]">
                            Price supplied by Medusa for the selected variant
                        </p>
                    </div>

                    <button
                        onClick={onOpenPriceBreakdown}
                        className="text-xs text-[#9E7D47] hover:underline flex items-center gap-1 font-semibold cursor-pointer self-start sm:self-auto"
                    >
                        <Info className="w-3.5 h-3.5" />
                        <span>Price Breakup</span>
                    </button>
                </div>

                {/* Bank & Promotional Offer Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#FAF8F4] p-3 rounded border border-[#E5DEC9] text-xs gap-2">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                        <span className="text-[#44403C] font-medium">
                            Flat 10% Instant Discount on HDFC & ICICI Cards with code <strong className="font-mono text-[#1C1917] tracking-wider">AURA10</strong>
                        </span>
                    </div>
                    <button
                        onClick={handleCopyBankCode}
                        className="text-[11px] font-semibold text-[#1C1917] bg-[#F1ECE4] px-2.5 py-1 rounded border border-[#E5DEC9] hover:bg-[#EAE3D4] transition-colors cursor-pointer self-start sm:self-auto"
                    >
                        {copiedBankOffer ? 'Applied!' : 'Apply Code'}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {product.options?.map((option: any) => (
                    <div key={option.id} className="space-y-2.5">
                        <label className="text-xs font-semibold text-[#1C1917] tracking-wider uppercase">
                            {option.title}: <span className="font-normal text-[#57534E]">{selectedOptions[option.title]}</span>
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                            {option.values?.map((optionValue: any) => {
                                const selected = selectedOptions[option.title] === optionValue.value;
                                return (
                                    <button
                                        key={optionValue.id}
                                        type="button"
                                        onClick={() => onOptionChange(option.title, optionValue.value)}
                                        className={`min-w-20 rounded border px-3 py-2.5 text-xs font-medium transition-all ${selected
                                            ? 'border-[#9E7D47] bg-[#F7F3EB] ring-1 ring-[#9E7D47] text-[#1C1917]'
                                            : 'border-[#E5DEC9] bg-white text-[#57534E] hover:border-[#9E7D47]'}`}
                                    >
                                        {optionValue.value}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {!selectedVariant && <p className="text-xs text-rose-700">This option combination is unavailable.</p>}
                {selectedVariant && !inStock && <p className="text-xs text-rose-700">This variant is currently out of stock.</p>}
            </div>

            {/* 4. Gold Karatage / Purity Customization (Tanishq Hallmark Selector) */}
            <div className="hidden space-y-2.5">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#1C1917] tracking-wider uppercase">
                        Gold Karatage: <span className="font-normal text-[#57534E]">{activePurityObj?.name}</span>
                    </label>
                    <span className="text-[11px] text-[#9E7D47] bg-[#F7F3EB] border border-[#E5DEC9] px-2 py-0.5 rounded font-medium">
                        {activePurityObj?.bisCode}
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                    {PURITY_OPTIONS.map((purity) => {
                        const isSelected = selectedPurity === purity.id;
                        return (
                            <button
                                key={purity.id}
                                onClick={() => onSelectPurity(purity.id)}
                                className={`p-3 rounded text-left transition-all duration-150 cursor-pointer border flex flex-col justify-between min-h-[72px] ${isSelected
                                    ? 'border-[#9E7D47] bg-[#FAF8F4] ring-1 ring-[#9E7D47] shadow-xs'
                                    : 'border-[#E5DEC9] bg-[#FFFFFF] hover:bg-[#FAF8F4] hover:border-[#9E7D47]'
                                    }`}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span className="text-xs font-semibold text-[#1C1917]">
                                        {purity.karatage} ({purity.id === '22K' ? '916' : purity.id === '18K' ? '750' : '585'})
                                    </span>
                                    {isSelected && <Check className="w-3.5 h-3.5 text-[#9E7D47]" />}
                                </div>
                                <span className="text-[10px] text-[#78716C] mt-1">
                                    ₹{purity.ratePerGram.toLocaleString('en-IN')}/g
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 5. Metal Color Selection */}
            <div className="hidden space-y-2.5">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#1C1917] tracking-wider uppercase">
                        Metal Tone: <span className="font-normal text-[#57534E] capitalize">{activeMetalObj?.name}</span>
                    </label>
                    <span className="text-[11px] text-[#78716C]">
                        {activeMetalObj?.badge}
                    </span>
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                    {metalOptions.map((metal) => {
                        const isSelected = selectedMetal === metal.id;
                        return (
                            <button
                                key={metal.id}
                                onClick={() => onSelectMetal(metal.id)}
                                className={`p-3 rounded text-left transition-all duration-150 cursor-pointer border flex items-center justify-between ${isSelected
                                    ? 'border-[#9E7D47] bg-[#FAF8F4] ring-1 ring-[#9E7D47] shadow-xs'
                                    : 'border-[#E5DEC9] bg-[#FFFFFF] hover:bg-[#FAF8F4] hover:border-[#9E7D47]'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className="w-4 h-4 rounded-full border border-black/10 shadow-xs flex-shrink-0"
                                        style={{ backgroundColor: metal?.colorHex }}
                                    />
                                    <span className="text-xs font-semibold text-[#1C1917]">
                                        {metal?.value}
                                    </span>
                                </div>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#9E7D47]" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 6. Quick Weight & Dimensions Specification Pill */}
            <div className="grid grid-cols-3 gap-2 bg-[#F7F3EB] p-3 rounded border border-[#E5DEC9] text-center text-xs">
                <div>
                    <span className="text-[10px] text-[#78716C] block uppercase tracking-wider">Gross Weight</span>
                    <span className="font-semibold text-[#1C1917] mt-0.5 block">{PRODUCT_SPECIFICATIONS.grossWeight}</span>
                </div>
                <div className="border-x border-[#E5DEC9]">
                    <span className="text-[10px] text-[#78716C] block uppercase tracking-wider">Motif Width</span>
                    <span className="font-semibold text-[#1C1917] mt-0.5 block">{PRODUCT_SPECIFICATIONS.width}</span>
                </div>
                <div>
                    <span className="text-[10px] text-[#78716C] block uppercase tracking-wider">Purity</span>
                    <span className="font-semibold text-[#1C1917] mt-0.5 block">{selectedPurity} (916)</span>
                </div>
            </div>

            {/* 7. Ring Size Selection */}
            <div className="hidden space-y-2.5">
                <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#1C1917] tracking-wider uppercase">
                        Ring Size (Indian): <span className="font-normal text-[#57534E]">Size {selectedSize}</span>
                    </label>
                    <button
                        onClick={onOpenSizeGuide}
                        className="text-xs text-[#9E7D47] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                        <Ruler className="w-3.5 h-3.5" />
                        <span>Size Guide</span>
                    </button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 gap-2">
                    {ringSize?.map(({ value }) => {
                        const isSelected = selectedSize === value;
                        return (
                            <button
                                key={value}
                                onClick={() => onSelectSize(value)}
                                className={`py-2 text-center text-xs font-medium rounded transition-all cursor-pointer border ${isSelected
                                    ? 'bg-[#1C1917] text-[#FAF8F4] border-[#1C1917] font-semibold shadow-xs'
                                    : 'bg-[#FFFFFF] text-[#44403C] border-[#E5DEC9] hover:border-[#1C1917] hover:bg-[#FAF8F4]'
                                    }`}
                                title={`Ring Size ${value}`}
                            >
                                {value}
                            </button>
                        );
                    })}
                </div>

                <div className="flex items-center justify-between text-[11px] text-[#78716C] pt-0.5">
                    <span>Comfort-fit court shank (Complimentary resizing available)</span>
                    <button onClick={onOpenSizeGuide} className="text-[#9E7D47] hover:underline cursor-pointer font-medium">
                        Find your exact size
                    </button>
                </div>
            </div>

            {/* 8. Primary Action CTAs: Add to Cart & Buy Now */}
            <div className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Add to Bag CTA */}


                    <button
                        onClick={onAddToCart}
                        disabled={cartLoading || !inStock}
                        className="bg-[#1C1917] hover:bg-[#292524] disabled:cursor-not-allowed disabled:opacity-50 text-[#FAF8F4] font-semibold py-3.5 px-5 rounded transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide group"
                    >
                        <ShoppingBag className="w-4 h-4 text-[#C5A880] transition-transform group-hover:scale-110" />
                        <span>{cartLoading ? 'Adding…' : 'Add to Bag'}</span>
                    </button>
                    {/* Buy Now CTA */}
                    <button
                        onClick={onBuyNow}
                        disabled={cartLoading || !inStock}
                        className="bg-[#9E7D47] hover:bg-[#8A6C3B] disabled:cursor-not-allowed disabled:opacity-50 text-[#FAF8F4] font-semibold py-3.5 px-5 rounded transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 text-xs sm:text-sm tracking-wide"
                    >
                        <Zap className="w-4 h-4 text-[#FAF8F4]" />
                        <span>Buy Now</span>
                    </button>
                </div>

                {/* Secondary Wishlist & Store Availability actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={onToggleWishlist}
                        className={`py-2.5 px-4 rounded border transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-xs font-medium ${isWishlisted
                            ? 'bg-[#F7F3EB] border-[#9E7D47] text-[#9E7D47]'
                            : 'bg-[#FFFFFF] border-[#E5DEC9] text-[#44403C] hover:border-[#1C1917] hover:bg-[#FAF8F4]'
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#9E7D47]' : ''}`} />
                        <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                    </button>

                    <button
                        onClick={onOpenStoreModal}
                        className="py-2.5 px-4 rounded border border-[#E5DEC9] bg-[#FFFFFF] hover:bg-[#FAF8F4] hover:border-[#1C1917] text-[#44403C] transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-medium"
                    >
                        <Store className="w-4 h-4 text-[#9E7D47]" />
                        <span>Check Store Availability</span>
                    </button>
                </div>

                {/* 9. Tanishq Signature Old Gold Exchange Box */}
                <div className="bg-[#FAF8F4] border border-[#E5DEC9] rounded-md p-3.5 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#F1ECE4] flex items-center justify-center flex-shrink-0 text-[#9E7D47]">
                            <RefreshCw className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                            <span className="text-xs font-semibold text-[#1C1917] block">
                                Have Old Gold to Exchange?
                            </span>
                            <p className="text-[11px] text-[#78716C]">
                                Get 100% exchange value on your old gold at today's rate.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onOpenExchangeModal}
                        className="text-xs font-semibold text-[#9E7D47] hover:underline cursor-pointer flex-shrink-0"
                    >
                        Calculate Value →
                    </button>
                </div>

                {/* Micro Guarantee Strip */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E5DEC9] text-center">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#57534E]">
                        <Truck className="w-3.5 h-3.5 text-[#9E7D47]" />
                        <span>Free Insured Delivery</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#57534E]">
                        <RefreshCw className="w-3.5 h-3.5 text-[#9E7D47]" />
                        <span>15-Day Easy Return</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#57534E]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9E7D47]" />
                        <span>Lifetime Maintenance</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
