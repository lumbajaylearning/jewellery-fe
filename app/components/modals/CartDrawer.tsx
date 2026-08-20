import React from 'react';
import Link from 'next/link';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CartItem } from '@/app/types/product';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onOpenHomeTrial: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQty,
  onOpenHomeTrial
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FAF8F4] h-full shadow-2xl flex flex-col justify-between border-l border-[#E5DEC9] text-[#1C1917] animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="p-5 border-b border-[#E5DEC9] bg-[#F1ECE4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9E7D47]" />
            <h3 className="font-serif text-lg text-[#1C1917] tracking-tight">
              Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#E5DEC9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#D8CEBE] mx-auto stroke-1" />
              <p className="font-serif text-lg text-[#1C1917]">Your bag is empty</p>
              <p className="text-xs text-[#78716C] max-w-xs mx-auto">
                Explore the collection or shortlist an eligible piece for a home trial.
              </p>
              <button
                onClick={onClose}
                className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#1C1917] border border-[#D8CEBE] hover:border-[#1C1917] px-4 py-2 rounded hover:bg-[#F1ECE4] transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-3 divide-y divide-[#EAE3D4]">
              {items.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex gap-3.5">
                  <div className="w-20 h-24 bg-[#F1ECE4] rounded overflow-hidden flex-shrink-0 border border-[#E5DEC9]">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-0.5">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-semibold text-[#1C1917] truncate">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#78716C] hover:text-[#DC2626] p-0.5 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#78716C]">
                        {item.metalName}{item.size > 0 ? ` • Size ${item.size}` : ''}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#D8CEBE] rounded bg-[#F1ECE4]">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="px-2 py-0.5 text-xs text-[#57534E] hover:text-[#1C1917]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-semibold text-[#1C1917]">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="px-2 py-0.5 text-xs text-[#57534E] hover:text-[#1C1917]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-serif font-semibold text-[#1C1917]">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Try at home nudge in cart */}
          {items.length > 0 && (
            <div className="bg-[#F1ECE4] p-3 rounded border border-[#E5DEC9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#9E7D47]" />
                <span className="text-[#57534E]">Prefer trying before paying?</span>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenHomeTrial();
                }}
                className="text-[#9E7D47] font-semibold hover:underline cursor-pointer"
              >
                Book Trial →
              </button>
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E5DEC9] bg-[#F1ECE4] space-y-3">
            <div className="space-y-1.5 text-xs text-[#57534E]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-[#1C1917] font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Shipping</span>
                <span className="text-right text-[#1C1917]">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="font-mono text-[#1C1917] font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#1C1917] pt-1.5 border-t border-[#E5DEC9]">
                <span>Estimated subtotal</span>
                <span className="font-serif text-base text-[#1C1917]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <Link
              href="/cart"
              onClick={onClose}
              className="w-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] py-3.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Review Shopping Bag</span>
              <ArrowRight className="w-4 h-4 text-[#FAF8F4]" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[10.5px] text-[#78716C]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" />
              <span>Cart and checkout totals are managed by Medusa</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
