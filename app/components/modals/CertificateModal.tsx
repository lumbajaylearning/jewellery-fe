import React from 'react';
import { X, Award, ShieldCheck, CheckCircle2, QrCode, FileText, Sparkles, Download, Check } from 'lucide-react';
import { PRODUCT_SPECIFICATIONS } from '@/app/data/productData';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F4] rounded-md border border-[#E5DEC9] shadow-2xl overflow-hidden my-8 text-[#1C1917]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5DEC9] bg-[#F1ECE4]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#047857]" />
            <div>
              <h3 className="font-serif text-xl text-[#1C1917] tracking-tight">
                BIS 916 Hallmark & Purity Dossier
              </h3>
              <p className="text-xs text-[#78716C]">
                Registered HUID: {PRODUCT_SPECIFICATIONS.huidNumber} • Bureau of Indian Standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#E5DEC9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Card Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Official Dossier Card */}
          <div className="border border-[#E5DEC9] bg-[#F1ECE4] p-6 rounded-md shadow-xs space-y-5 relative">
            {/* Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none text-center">
              <span className="font-serif text-8xl uppercase tracking-widest text-[#1C1917]">TANISHQ</span>
            </div>

            {/* Certificate Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5DEC9] pb-4">
              <div>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-[#9E7D47] uppercase">
                  Government of India • Ministry of Consumer Affairs
                </span>
                <h4 className="text-lg font-serif font-bold text-[#1C1917]">
                  BIS Hallmark Authenticity Certificate
                </h4>
                <span className="text-xs font-mono text-[#78716C]">
                  Article: {PRODUCT_SPECIFICATIONS.productName} ({PRODUCT_SPECIFICATIONS.productCode})
                </span>
              </div>

              {/* QR Code Verification Simulation */}
              <div className="flex items-center gap-3 bg-[#FAF8F4] p-2.5 rounded border border-[#E5DEC9]">
                <div className="w-12 h-12 bg-white border border-[#D8CEBE] p-1 flex items-center justify-center rounded">
                  <QrCode className="w-full h-full text-[#1C1917]" />
                </div>
                <div className="text-[10px] text-[#57534E]">
                  <span className="font-semibold block text-[#1C1917]">BIS Care App</span>
                  <span className="text-[#78716C]">Scan to Verify HUID</span>
                </div>
              </div>
            </div>

            {/* Purity & Metal Matrix */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block">
                Assaying & Hallmarking Parameters:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 bg-[#FAF8F4] rounded border border-[#E5DEC9]">
                  <span className="text-[10px] text-[#78716C] block uppercase">Purity Grade</span>
                  <strong className="text-sm font-serif text-[#1C1917]">22 Karat (916)</strong>
                </div>
                <div className="p-3 bg-[#FAF8F4] rounded border border-[#E5DEC9]">
                  <span className="text-[10px] text-[#78716C] block uppercase">Gold Weight</span>
                  <strong className="text-sm font-serif text-[#1C1917]">1.890 Grams</strong>
                </div>
                <div className="p-3 bg-[#FAF8F4] rounded border border-[#E5DEC9]">
                  <span className="text-[10px] text-[#78716C] block uppercase">Karatmeter Test</span>
                  <strong className="text-sm font-serif text-[#047857]">91.68% Pure Gold</strong>
                </div>
                <div className="p-3 bg-[#FAF8F4] rounded border border-[#E5DEC9]">
                  <span className="text-[10px] text-[#78716C] block uppercase">Laser Hallmark</span>
                  <strong className="text-sm font-serif text-[#1C1917]">6-Digit HUID</strong>
                </div>
              </div>
            </div>

            {/* Additional Characteristics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#57534E] pt-1">
              <div className="flex justify-between py-1 border-b border-[#EAE3D4]">
                <span>Hallmark Logo</span>
                <span className="text-[#1C1917] font-medium">BIS Standard Triangle Mark</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE3D4]">
                <span>Assaying Centre</span>
                <span className="text-[#1C1917] font-medium">Govt. Recognized Testing Bureau</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE3D4]">
                <span>Unique HUID Number</span>
                <span className="font-mono text-[#1C1917] font-bold">{PRODUCT_SPECIFICATIONS.huidNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#EAE3D4]">
                <span>Old Gold Exchange</span>
                <span className="text-[#047857] font-medium">100% Value Guarantee</span>
              </div>
            </div>
          </div>

          {/* Download and Share CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-[#78716C]">
              *This certificate is registered digitally on the national BIS portal.
            </span>
            <button
              onClick={() => alert('Certificate dossier PDF downloaded successfully.')}
              className="bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] text-xs font-semibold py-2.5 px-4 rounded transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-[#C5A880]" />
              <span>Download Digital Certificate (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
