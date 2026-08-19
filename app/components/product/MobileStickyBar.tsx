import React from 'react';
import { Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { MetalType, GoldPurity } from '@/app/types/product';

interface MobileStickyBarProps {
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onOpenHomeTrial: () => void;
  selectedMetal: MetalType;
  selectedPurity?: GoldPurity;
  selectedSize: number;
  price?: number;
  disabled?: boolean;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenHomeTrial,
  selectedMetal,
  selectedPurity = '22K',
  selectedSize,
  price,
  disabled = false,
}) => {
  const finalPrice = price ?? 0;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF8F4]/95 backdrop-blur-md border-t border-[#E5DEC9] p-3 shadow-2xl lg:hidden">
      <div className="max-w-md mx-auto flex items-center gap-2">
        {/* Wishlist Icon Button */}
        <button
          onClick={onToggleWishlist}
          className={`p-3 rounded border transition-colors cursor-pointer flex-shrink-0 ${isWishlisted
              ? 'bg-[#1C1917] border-[#1C1917] text-[#FAF8F4]'
              : 'bg-[#FFFFFF] border-[#E5DEC9] text-[#57534E]'
            }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#FAF8F4]' : ''}`} />
        </button>

        {/* Try At Home Mini Button */}
        <button
          onClick={onOpenHomeTrial}
          className="px-3 py-3 rounded border border-[#E5DEC9] bg-[#FFFFFF] hover:bg-[#F1ECE4] text-[#1C1917] text-[11px] font-semibold flex items-center gap-1 cursor-pointer flex-shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#9E7D47]" />
          <span>Home Trial</span>
        </button>

        {/* Primary Add to Bag Button */}
        <button
          onClick={onAddToCart}
          disabled={disabled}
          className="flex-1 bg-[#1C1917] active:bg-[#292524] disabled:cursor-not-allowed disabled:opacity-50 text-[#FAF8F4] py-3 px-4 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-between shadow-xs cursor-pointer"
        >
          <span className="flex items-center gap-1.5 font-bold">
            <ShoppingBag className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Add to Bag</span>
          </span>
          <span className="font-serif font-bold text-xs text-[#FAF8F4]">
            {finalPrice ? `₹${finalPrice.toLocaleString('en-IN')}` : 'Unavailable'}
          </span>
        </button>
      </div>
    </div>
  );
};
