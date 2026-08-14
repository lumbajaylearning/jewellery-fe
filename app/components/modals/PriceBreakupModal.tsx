import React from 'react';
import { X, ShieldCheck, Scale, Sparkles, TrendingUp, Check, Info } from 'lucide-react';
import { BASE_PRICE_BREAKDOWN, LIVE_GOLD_RATES } from '@/app/data/productData';
import { GoldPurity } from '@/app/types/product';

interface PriceBreakupModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPurity: GoldPurity;
}

export const PriceBreakupModal: React.FC<PriceBreakupModalProps> = ({
  isOpen,
  onClose,
  selectedPurity
}) => {
  if (!isOpen) return null;

  const currentRate = LIVE_GOLD_RATES[selectedPurity] || 7850;
  const netWeight = 1.890;
  const goldVal = Math.round(netWeight * currentRate);
  const makingCharges = Math.round(goldVal * 0.28);
  const makingDiscount = Math.round(makingCharges * 0.15);
  const effectiveMaking = makingCharges - makingDiscount;
  const subtotal = goldVal + effectiveMaking;
  const gst = Math.round(subtotal * 0.03);
  const finalPrice = subtotal + gst;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F4] border border-[#E5DEC9] rounded-lg max-w-lg w-full p-6 sm:p-7 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#78716C] hover:text-[#1C1917] p-1.5 rounded-full hover:bg-[#F1ECE4] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 pr-6 border-b border-[#E5DEC9] pb-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-[#9E7D47] uppercase bg-[#F7F3EB] px-2.5 py-0.5 rounded border border-[#E5DEC9]">
              Tanishq Honest Valuation
            </span>
            <span className="text-xs text-[#047857] font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Zero Hidden Markups
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#1C1917] tracking-tight">
            Transparent Price Breakup
          </h3>
          <p className="text-xs text-[#57534E]">
            Exact itemized pricing for <strong>Glorious 22 Karat Yellow Gold Floral Ring</strong> ({selectedPurity} Gold).
          </p>
        </div>

        {/* Live Gold Rate Ticker */}
        <div className="bg-[#F1ECE4] p-3 rounded border border-[#E5DEC9] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#57534E]">
            <TrendingUp className="w-4 h-4 text-[#9E7D47]" />
            <span>Today's {selectedPurity} Gold Rate:</span>
          </div>
          <div className="font-mono font-semibold text-[#1C1917]">
            ₹{currentRate.toLocaleString('en-IN')} / gram
          </div>
        </div>

        {/* Itemized Table */}
        <div className="bg-[#FFFFFF] rounded border border-[#E5DEC9] divide-y divide-[#E5DEC9] text-xs">
          {/* Gold Component */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#9E7D47]" />
                Gold Component ({selectedPurity} / 916 Hallmark)
              </span>
              <p className="text-[11px] text-[#78716C]">
                {netWeight}g Net Weight @ ₹{currentRate.toLocaleString('en-IN')} / gram
              </p>
            </div>
            <span className="font-semibold font-mono text-[#1C1917]">
              ₹{goldVal.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Making Charges */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#9E7D47]" />
                  Master Making Charges
                </span>
                <span className="text-[10px] bg-[#ECFDF5] text-[#047857] px-1.5 py-0.5 rounded font-semibold border border-[#A7F3D0]">
                  15% OFF
                </span>
              </div>
              <p className="text-[11px] text-[#78716C]">
                Floral filigree cutwork, layered petals and court shank finishing
              </p>
            </div>
            <div className="text-right">
              <span className="font-semibold font-mono text-[#1C1917]">
                ₹{effectiveMaking.toLocaleString('en-IN')}
              </span>
              <span className="block text-[10px] text-[#78716C] line-through">
                ₹{makingCharges.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* GST */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="font-semibold text-[#1C1917]">
                Statutory GST (3%)
              </span>
              <p className="text-[11px] text-[#78716C]">
                Government precious metal statutory levy
              </p>
            </div>
            <span className="font-semibold font-mono text-[#1C1917]">
              ₹{gst.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Total Price */}
          <div className="p-4 bg-[#F1ECE4] flex items-center justify-between rounded-b">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold">
                Final Net Payable (All Inclusive)
              </span>
              <div className="text-xl font-serif font-bold text-[#1C1917]">
                ₹{finalPrice.toLocaleString('en-IN')}
              </div>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#047857] font-semibold bg-[#ECFDF5] px-2.5 py-1 rounded border border-[#A7F3D0]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Certified</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] text-xs font-semibold py-3 rounded transition-colors cursor-pointer"
        >
          Close Price Breakdown
        </button>
      </div>
    </div>
  );
};
