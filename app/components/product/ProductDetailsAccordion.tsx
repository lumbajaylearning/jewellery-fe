import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Sparkles, Award, Truck, HeartHandshake, FileCheck, RefreshCw, Scale, Ruler } from 'lucide-react';
import { PRODUCT_SPECIFICATIONS } from '@/app/data/productData';

interface ProductDetailsAccordionProps {
  onOpenCertificateModal: () => void;
  onOpenExchangeModal?: () => void;
}

export const ProductDetailsAccordion: React.FC<ProductDetailsAccordionProps> = ({
  onOpenCertificateModal,
  onOpenExchangeModal
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    productDetails: true,
    metalDetails: true,
    dimensions: true,
    shippingReturns: false,
    exchangePolicy: false,
    tanishqPromises: false
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="w-full space-y-3">
      {/* 1. Product Specifications Accordion */}
      <div className="border border-[#E5DEC9] rounded bg-[#FAF8F4] overflow-hidden shadow-xs">
        <button
          onClick={() => toggleSection('productDetails')}
          className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#F1ECE4] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-[#9E7D47]" />
            <span className="text-sm font-semibold text-[#1C1917] tracking-tight">Product Details & Design</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-[#78716C] transition-transform duration-200 ${openSections.productDetails ? 'rotate-180' : ''}`} />
        </button>

        {openSections.productDetails && (
          <div className="px-5 pb-5 pt-1 border-t border-[#E5DEC9] animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Brand</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.brand}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Product Code / SKU</span>
                <span className="font-mono text-[#1C1917] font-semibold">{PRODUCT_SPECIFICATIONS.productCode}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Collection</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.collection}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Product Type</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.productType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Gender</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.gender}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Occasion</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.occasion}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Motif / Style</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.styleDesign}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Stone Setting</span>
                <span className="text-[#1C1917] font-medium">100% Solid Pure Gold (Plain)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Metal & Purity Details Accordion */}
      <div className="border border-[#E5DEC9] rounded bg-[#FAF8F4] overflow-hidden shadow-xs">
        <button
          onClick={() => toggleSection('metalDetails')}
          className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#F1ECE4] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Scale className="w-4 h-4 text-[#9E7D47]" />
            <span className="text-sm font-semibold text-[#1C1917] tracking-tight">Metal & Purity Specifications</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-[#78716C] transition-transform duration-200 ${openSections.metalDetails ? 'rotate-180' : ''}`} />
        </button>

        {openSections.metalDetails && (
          <div className="px-5 pb-5 pt-1 border-t border-[#E5DEC9] animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Precious Metal</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.metal}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Metal Purity</span>
                <span className="text-[#1C1917] font-semibold">{PRODUCT_SPECIFICATIONS.metalPurity}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Metal Color</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.metalColor}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Gross Weight (Approx.)</span>
                <span className="text-[#1C1917] font-semibold">{PRODUCT_SPECIFICATIONS.grossWeight}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Net Gold Weight</span>
                <span className="text-[#1C1917] font-semibold">{PRODUCT_SPECIFICATIONS.netGoldWeight}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">BIS Hallmarking</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.hallmarkBureau}</span>
              </div>
            </div>

            <div className="mt-3 p-3 bg-[#F1ECE4] rounded border border-[#E5DEC9] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#9E7D47] flex-shrink-0" />
                <span className="text-xs text-[#57534E]">
                  Registered BIS 6-Digit HUID: <strong className="font-mono text-[#1C1917]">{PRODUCT_SPECIFICATIONS.huidNumber}</strong>
                </span>
              </div>
              <button
                onClick={onOpenCertificateModal}
                className="text-xs text-[#9E7D47] hover:underline font-semibold cursor-pointer whitespace-nowrap self-start sm:self-auto"
              >
                Verify Hallmark Certificate →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Dimensions & Ring Fit Accordion */}
      <div className="border border-[#E5DEC9] rounded bg-[#FAF8F4] overflow-hidden shadow-xs">
        <button
          onClick={() => toggleSection('dimensions')}
          className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#F1ECE4] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Ruler className="w-4 h-4 text-[#9E7D47]" />
            <span className="text-sm font-semibold text-[#1C1917] tracking-tight">Dimensions & Ring Profile</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-[#78716C] transition-transform duration-200 ${openSections.dimensions ? 'rotate-180' : ''}`} />
        </button>

        {openSections.dimensions && (
          <div className="px-5 pb-5 pt-1 border-t border-[#E5DEC9] text-xs text-[#57534E] space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Floral Motif Width</span>
                <span className="text-[#1C1917] font-semibold">{PRODUCT_SPECIFICATIONS.width}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Band Thickness</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.bandThickness}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Sizing Range</span>
                <span className="text-[#1C1917] font-medium">{PRODUCT_SPECIFICATIONS.sizingRange}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#EAE3D4]">
                <span className="text-[#78716C]">Resizing Policy</span>
                <span className="text-[#1C1917] font-medium">Complimentary within 30 days</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Tanishq 6 Trust Promises */}
      <div className="border border-[#E5DEC9] rounded bg-[#FAF8F4] overflow-hidden shadow-xs">
        <button
          onClick={() => toggleSection('tanishqPromises')}
          className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#F1ECE4] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#9E7D47]" />
            <span className="text-sm font-semibold text-[#1C1917] tracking-tight">Tanishq Assurance: 6 Pillars of Trust</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-[#78716C] transition-transform duration-200 ${openSections.tanishqPromises ? 'rotate-180' : ''}`} />
        </button>

        {openSections.tanishqPromises && (
          <div className="px-5 pb-5 pt-2 border-t border-[#E5DEC9] text-xs text-[#57534E] space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-[#FFFFFF] rounded border border-[#E5DEC9] space-y-1">
                <span className="font-semibold text-[#1C1917] block">1. 100% Purity Tested</span>
                <p className="text-[11px] text-[#78716C]">Every piece is tested on accurate Karatmeters and carries government BIS Hallmarking.</p>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded border border-[#E5DEC9] space-y-1">
                <span className="font-semibold text-[#1C1917] block">2. Complete Transparency</span>
                <p className="text-[11px] text-[#78716C]">You pay only for the exact gold weight and stones itemized at live market rates.</p>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded border border-[#E5DEC9] space-y-1">
                <span className="font-semibold text-[#1C1917] block">3. 100% Exchange Value</span>
                <p className="text-[11px] text-[#78716C]">Upgrade anytime with 100% gold exchange value on prevailing day rates.</p>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded border border-[#E5DEC9] space-y-1">
                <span className="font-semibold text-[#1C1917] block">4. Free Insured Shipping</span>
                <p className="text-[11px] text-[#78716C]">100% transit insurance until OTP verification at your doorstep.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Shipping & Returns */}
      <div className="border border-[#E5DEC9] rounded bg-[#FAF8F4] overflow-hidden shadow-xs">
        <button
          onClick={() => toggleSection('shippingReturns')}
          className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#F1ECE4] transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[#9E7D47]" />
            <span className="text-sm font-semibold text-[#1C1917] tracking-tight">Shipping, Transit Insurance & 15-Day Returns</span>
          </div>
          <ChevronDown className={`w-4 h-4 text-[#78716C] transition-transform duration-200 ${openSections.shippingReturns ? 'rotate-180' : ''}`} />
        </button>

        {openSections.shippingReturns && (
          <div className="px-5 pb-5 pt-2 border-t border-[#E5DEC9] text-xs text-[#57534E] space-y-2.5 animate-in fade-in duration-150">
            <p className="leading-relaxed">
              <strong className="text-[#1C1917]">Insured Transit:</strong> Every shipment is 100% insured against loss or damage until handed over and confirmed via secure OTP at your doorstep.
            </p>
            <p className="leading-relaxed">
              <strong className="text-[#1C1917]">15-Day Return Guarantee:</strong> If the ring is not what you envisioned, return it within 15 days for a 100% full refund with complimentary pickup from your home.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
