import React from 'react';
import { X, Heart, ShoppingBag, Trash2, Sparkles } from 'lucide-react';
import { MetalType } from '@/app/types/product';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isMainProductWishlisted: boolean;
  onToggleMainWishlist: () => void;
  onAddToCart: () => void;
  onOpenHomeTrial: () => void;
  metal: MetalType;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  isMainProductWishlisted,
  onToggleMainWishlist,
  onAddToCart,
  onOpenHomeTrial,
  metal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DEC9] text-[#1C1917] animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DEC9] bg-[#F1ECE4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#9E7D47] fill-current" />
            <h3 className="font-serif text-lg text-[#1C1917] tracking-tight">
              My Saved Wishlist ({isMainProductWishlisted ? 1 : 0})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#E5DEC9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {!isMainProductWishlisted ? (
            <div className="py-12 text-center space-y-3">
              <Heart className="w-12 h-12 text-[#D8CEBE] mx-auto stroke-1" />
              <p className="font-serif text-lg text-[#1C1917]">Your wishlist is empty</p>
              <p className="text-xs text-[#78716C] max-w-xs mx-auto">
                Save the Solitaire Diamond Ring to monitor price changes and share with loved ones.
              </p>
              <button
                onClick={() => {
                  onToggleMainWishlist();
                }}
                className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917] border border-[#D8CEBE] hover:border-[#1C1917] px-4 py-2 rounded hover:bg-[#F1ECE4] transition-colors cursor-pointer"
              >
                + Add Current Solitaire Ring
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-[#F1ECE4] rounded border border-[#E5DEC9] flex gap-3.5">
                <div className="w-20 h-24 bg-[#FAF8F4] rounded overflow-hidden flex-shrink-0 border border-[#E5DEC9]">
                  <img
                    src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80"
                    alt="Solitaire Diamond Ring"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif text-sm font-semibold text-[#1C1917] truncate">
                        Solitaire Diamond Ring
                      </h4>
                      <button
                        onClick={onToggleMainWishlist}
                        className="text-[#78716C] hover:text-[#DC2626] p-0.5"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-xs text-[#78716C] block capitalize">
                      18K {metal.replace('-', ' ')} • 0.25ct Solitaire
                    </span>
                    <span className="text-sm font-serif font-semibold text-[#1C1917] block">
                      ₹49,999
                    </span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => {
                        onAddToCart();
                        onClose();
                      }}
                      className="flex-1 bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] py-1.5 px-3 rounded text-[11px] font-semibold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenHomeTrial();
                      }}
                      className="px-2.5 py-1.5 border border-[#D8CEBE] hover:border-[#1C1917] bg-[#FAF8F4] text-[#1C1917] rounded text-[11px] font-semibold cursor-pointer transition-colors"
                    >
                      Try at Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F1ECE4] border-t border-[#E5DEC9] text-center text-xs text-[#78716C]">
          <span>Wishlist items are automatically synced to your device</span>
        </div>
      </div>
    </div>
  );
};
