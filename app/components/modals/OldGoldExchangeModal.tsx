import React, { useState } from 'react';
import { X, RefreshCw, Sparkles, ShieldCheck, ArrowRight, Scale, Check } from 'lucide-react';
import { LIVE_GOLD_RATES } from '@/app/data/productData';

interface OldGoldExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProductPrice: number;
}

export const OldGoldExchangeModal: React.FC<OldGoldExchangeModalProps> = ({
  isOpen,
  onClose,
  targetProductPrice
}) => {
  const [karat, setKarat] = useState<'22K' | '18K' | '24K' | '14K'>('22K');
  const [weightGrams, setWeightGrams] = useState<string>('2.5');
  const [appliedExchange, setAppliedExchange] = useState(false);

  if (!isOpen) return null;

  const numWeight = parseFloat(weightGrams) || 0;
  const rate = LIVE_GOLD_RATES[karat] || 7850;
  const grossEstimatedValue = Math.round(numWeight * rate);
  const netPayable = Math.max(0, targetProductPrice - grossEstimatedValue);

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
              Tanishq Signature Policy
            </span>
            <span className="text-xs text-[#047857] font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> 100% Exchange Value
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#1C1917] tracking-tight">
            Exchange Your Old Gold
          </h3>
          <p className="text-xs text-[#57534E] leading-relaxed">
            Upgrade your old jewellery to this <strong>Glorious 22 Karat Yellow Gold Floral Ring</strong> with zero deduction on gold purity at today's official rate.
          </p>
        </div>

        {/* Live Gold Rate Banner */}
        <div className="bg-[#F1ECE4] p-3 rounded border border-[#E5DEC9] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#57534E]">
            <Scale className="w-4 h-4 text-[#9E7D47]" />
            <span>Today's 22K Gold Rate:</span>
          </div>
          <div className="font-mono font-semibold text-[#1C1917]">
            ₹{LIVE_GOLD_RATES['22K'].toLocaleString('en-IN')} / gram
          </div>
        </div>

        {/* Input Form */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
              1. Select Your Old Gold Karatage / Purity
            </label>
            <div className="grid grid-cols-4 gap-2">
              {(['24K', '22K', '18K', '14K'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKarat(k)}
                  className={`py-2 px-3 rounded text-xs font-medium border text-center transition-all cursor-pointer ${karat === k
                      ? 'bg-[#1C1917] text-[#FAF8F4] border-[#1C1917] font-semibold shadow-xs'
                      : 'bg-[#FFFFFF] text-[#44403C] border-[#E5DEC9] hover:border-[#1C1917]'
                    }`}
                >
                  {k} ({k === '22K' ? '916' : k === '18K' ? '750' : k === '24K' ? '999' : '585'})
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
              2. Enter Approximate Gold Weight (Grams)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.05"
                min="0.1"
                max="500"
                value={weightGrams}
                onChange={(e) => setWeightGrams(e.target.value)}
                placeholder="e.g. 2.5"
                className="w-full bg-[#FFFFFF] border border-[#D8CEBE] text-[#1C1917] text-sm py-2.5 px-3 rounded focus:outline-none focus:border-[#1C1917]"
              />
              <span className="absolute right-3.5 top-3 text-xs text-[#78716C] font-medium">
                grams
              </span>
            </div>
          </div>
        </div>

        {/* Calculation Result */}
        <div className="bg-[#FAF8F4] border border-[#E5DEC9] rounded p-4 space-y-2.5">
          <div className="flex justify-between text-xs text-[#57534E]">
            <span>Estimated Old Gold Value ({weightGrams || '0'}g @ ₹{rate}/g):</span>
            <span className="font-semibold text-[#047857] font-mono text-sm">
              - ₹{grossEstimatedValue.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between text-xs text-[#57534E]">
            <span>Floral Ring Price:</span>
            <span className="font-medium text-[#1C1917] font-mono">
              ₹{targetProductPrice.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="pt-2 border-t border-[#E5DEC9] flex items-baseline justify-between">
            <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wide">
              Effective Amount Payable:
            </span>
            <span className="text-xl font-serif font-bold text-[#1C1917]">
              ₹{netPayable.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              setAppliedExchange(true);
              setTimeout(() => {
                onClose();
              }, 1200);
            }}
            className="w-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] text-xs font-semibold py-3 px-4 rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            {appliedExchange ? (
              <>
                <Check className="w-4 h-4 text-[#047857]" />
                <span>Exchange Estimated & Applied to Order!</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 text-[#9E7D47]" />
                <span>Apply Old Gold Value on Checkout</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-[#78716C] text-center">
            *Final valuation is verified accurately using a state-of-the-art Karatmeter during doorstep delivery or at any Tanishq store.
          </p>
        </div>
      </div>
    </div>
  );
};
