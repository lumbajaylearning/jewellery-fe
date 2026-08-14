import React from 'react';
import { X, Sparkles, Star, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { RelatedProduct } from '@/app/types/product';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: RelatedProduct | null;
  onAddToCart: (product: RelatedProduct) => void;
  onOpenHomeTrialWithPiece: (name: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  product,
  onAddToCart,
  onOpenHomeTrialWithPiece
}) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F4] rounded-md border border-[#E5DEC9] shadow-2xl overflow-hidden my-8 text-[#1C1917]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 bg-[#FAF8F4]/80 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#E5DEC9] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="aspect-square bg-[#F1ECE4] relative border-b sm:border-b-0 sm:border-r border-[#E5DEC9]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.tag && (
              <span className="absolute top-4 left-4 bg-[#FAF8F4]/90 text-[#1C1917] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-[#E5DEC9]">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] text-[#9E7D47] font-semibold uppercase tracking-widest">
                {product.category}
              </span>

              <h3 className="font-serif text-2xl text-[#1C1917]">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 text-xs">
                <div className="flex text-[#9E7D47]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-semibold text-[#1C1917]">{product.rating}</span>
                <span className="text-[#78716C]">({product.reviewsCount} reviews)</span>
              </div>

              <p className="text-xs text-[#78716C] leading-relaxed">
                {product.subtitle}. Handcrafted with certified natural stones and BIS hallmarked precious metal.
              </p>

              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl font-serif font-semibold text-[#1C1917]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#A8A29E] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#EAE3D4]">
              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-[#FAF8F4]" />
                <span>Add to Shopping Bag</span>
              </button>

              {product.tryAtHomeEligible && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenHomeTrialWithPiece(product.name);
                  }}
                  className="w-full bg-[#FAF8F4] hover:bg-[#F1ECE4] text-[#1C1917] border border-[#D8CEBE] hover:border-[#1C1917] py-2.5 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#9E7D47]" />
                  <span>Book for In-Home Trial</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
