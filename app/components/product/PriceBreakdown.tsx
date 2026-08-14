import React from 'react';
import { ShieldCheck, Info, Scale, Sparkles, TrendingUp, Check, Percent } from 'lucide-react';
import { BASE_PRICE_BREAKDOWN, LIVE_GOLD_RATES } from '@/app/data/productData';
import { GoldPurity } from '@/app/types/product';

interface PriceBreakdownProps {
  selectedPurity?: GoldPurity;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ selectedPurity = '22K' }) => {
  const rate = LIVE_GOLD_RATES[selectedPurity] || 7850;
  const netWeight = 1.890;
  const goldVal = Math.round(netWeight * rate);
  const makingCharges = Math.round(goldVal * 0.28);
  const makingDiscount = Math.round(makingCharges * 0.15);
  const effectiveMaking = makingCharges - makingDiscount;
  const subtotal = goldVal + effectiveMaking;
  const gst = Math.round(subtotal * 0.03);
  const finalPrice = subtotal + gst;

  // percentages
  const goldPercent = Math.round((goldVal / finalPrice) * 100);
  const makingPercent = Math.round((effectiveMaking / finalPrice) * 100);
  const gstPercent = 100 - goldPercent - makingPercent;

  return (
    <section aria-labelledby="pricing-breakdown-heading" className="w-full bg-[#F1ECE4] border border-[#E5DEC9] rounded-md p-5 sm:p-7 space-y-5 my-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DEC9] pb-4">
        <div>
          <span className="text-[10px] tracking-[0.2em] font-semibold text-[#9E7D47] uppercase">
            Tanishq Hallmark Valuation
          </span>
          <h2 id="pricing-breakdown-heading" className="text-xl sm:text-2xl font-serif text-[#1C1917] tracking-tight mt-0.5">
            Transparent Price Breakup
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-[#FAF8F4] px-3 py-1.5 rounded text-xs text-[#57534E] border border-[#E5DEC9]">
          <TrendingUp className="w-3.5 h-3.5 text-[#9E7D47]" />
          <span>Live {selectedPurity} Gold Rate: <strong className="text-[#1C1917] font-mono">₹{rate.toLocaleString('en-IN')} / g</strong></span>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed font-normal">
        Tanishq guarantees complete transparency. You pay exclusively for the verified weight of <strong>1.890 grams</strong> at today's official bullion rate, paired with fair craftsmanship charges and statutory taxes.
      </p>

      {/* Visual Component Ratio Bar */}
      <div className="space-y-2">
        <div className="h-3.5 w-full bg-[#E5DEC9] rounded-full overflow-hidden flex">
          <div style={{ width: `${goldPercent}%` }} className="bg-[#D4AF37] h-full" title={`Gold Value: ${goldPercent}%`} />
          <div style={{ width: `${makingPercent}%` }} className="bg-[#9E7D47] h-full" title={`Making Charges: ${makingPercent}%`} />
          <div style={{ width: `${gstPercent}%` }} className="bg-[#78716C] h-full" title={`GST 3%: ${gstPercent}%`} />
        </div>

        <div className="flex flex-wrap items-center justify-between text-[11px] text-[#78716C] px-1 gap-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" /> Gold Component ({goldPercent}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D47]" /> Master Craftsmanship ({makingPercent}%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#78716C]" /> Statutory GST 3% ({gstPercent}%)
          </span>
        </div>
      </div>

      {/* Detailed Itemized Table */}
      <div className="bg-[#FAF8F4] rounded border border-[#E5DEC9] divide-y divide-[#E5DEC9] text-xs sm:text-sm">
        {/* Gold Component */}
        <div className="p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-[#9E7D47]" />
              Gold Value ({selectedPurity} / 916 Hallmark)
            </span>
            <p className="text-[11px] text-[#78716C]">
              {netWeight}g Net Weight @ ₹{rate.toLocaleString('en-IN')} / gram
            </p>
          </div>
          <span className="font-semibold font-mono text-[#1C1917]">₹{goldVal.toLocaleString('en-IN')}</span>
        </div>

        {/* Making Charges */}
        <div className="p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#9E7D47]" />
                Artisan Making & Filigree Charges
              </span>
              <span className="text-[10px] bg-[#ECFDF5] text-[#047857] px-1.5 py-0.5 rounded font-semibold border border-[#A7F3D0]">
                15% OFF
              </span>
            </div>
            <p className="text-[11px] text-[#78716C]">
              Handcrafted layered petals, granulation core, and comfort-fit court shank
            </p>
          </div>
          <div className="text-right">
            <span className="font-semibold font-mono text-[#1C1917]">₹{effectiveMaking.toLocaleString('en-IN')}</span>
            <span className="block text-[10.5px] text-[#78716C] line-through">₹{makingCharges.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* GST */}
        <div className="p-3.5 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-semibold text-[#1C1917]">
              Statutory GST (3%)
            </span>
            <p className="text-[11px] text-[#78716C]">
              Government statutory tax on precious gold jewellery
            </p>
          </div>
          <span className="font-semibold font-mono text-[#1C1917]">₹{gst.toLocaleString('en-IN')}</span>
        </div>

        {/* Total Price */}
        <div className="p-4 bg-[#F1ECE4] flex items-center justify-between rounded-b">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold">
              Final Inclusive Price (All Taxes Included)
            </span>
            <div className="text-lg sm:text-2xl font-serif font-bold text-[#1C1917]">
              Total: ₹{finalPrice.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#047857] font-semibold bg-[#ECFDF5] px-3 py-1.5 rounded border border-[#A7F3D0]">
            <ShieldCheck className="w-4 h-4 text-[#047857]" />
            <span>100% Certified Transparent Pricing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
