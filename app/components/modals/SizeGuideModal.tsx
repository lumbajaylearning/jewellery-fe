import React, { useState } from 'react';
import { X, Ruler, HelpCircle, Check, Printer, Sparkles } from 'lucide-react';
import { SIZE_CHART } from '@/app/data/productData';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSize: number;
  onSelectSize: (size: number) => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  selectedSize,
  onSelectSize
}) => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'chart' | 'paper'>('interactive');
  const [diameterInput, setDiameterInput] = useState<number>(15.7);

  if (!isOpen) return null;

  // Find closest size from diameter
  const currentChartItem = SIZE_CHART.find(s => Math.abs(s.innerDiameterMm - diameterInput) < 0.25) || SIZE_CHART[3];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F4] rounded-md border border-[#E5DEC9] shadow-2xl overflow-hidden my-8 text-[#1C1917]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5DEC9] bg-[#F1ECE4]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#9E7D47]" />
            <div>
              <h3 className="font-serif text-xl text-[#1C1917] tracking-tight">
                Ring Size Finder & Conversion Guide
              </h3>
              <p className="text-xs text-[#78716C]">
                Standard Indian (BIS) Sizing with International Cross-Reference
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

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5DEC9] bg-[#FAF8F4] px-5 pt-3 gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 'interactive'
                ? 'border-[#9E7D47] text-[#9E7D47] font-semibold'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
          >
            Interactive Calibrator
          </button>
          <button
            onClick={() => setActiveTab('chart')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 'chart'
                ? 'border-[#9E7D47] text-[#9E7D47] font-semibold'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
          >
            International Conversion Table
          </button>
          <button
            onClick={() => setActiveTab('paper')}
            className={`pb-3 border-b-2 transition-colors cursor-pointer ${activeTab === 'paper'
                ? 'border-[#9E7D47] text-[#9E7D47] font-semibold'
                : 'border-transparent text-[#78716C] hover:text-[#1C1917]'
              }`}
          >
            Measure with Paper / String
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === 'interactive' && (
            <div className="space-y-6">
              <div className="bg-[#F1ECE4] p-4 rounded border border-[#E5DEC9] text-xs text-[#57534E] flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-[#9E7D47] flex-shrink-0" />
                <span>
                  Place an existing comfortable ring against your screen or adjust the slider below until the circle matches the <strong>inner edge</strong> of your ring.
                </span>
              </div>

              {/* Visual Ring Circle Visualizer */}
              <div className="flex flex-col items-center justify-center py-6 bg-[#F1ECE4] rounded-md border border-[#E5DEC9]">
                <div
                  className="rounded-full border-2 border-[#9E7D47] bg-[#FAF8F4] flex items-center justify-center transition-all duration-150 relative shadow-inner"
                  style={{
                    width: `${diameterInput * 7.5}px`,
                    height: `${diameterInput * 7.5}px`
                  }}
                >
                  <div className="text-center">
                    <span className="text-lg font-serif font-semibold text-[#1C1917] block">
                      Size {currentChartItem.indian}
                    </span>
                    <span className="text-[10px] text-[#9E7D47] block font-mono font-medium">
                      {diameterInput.toFixed(1)} mm
                    </span>
                  </div>
                </div>

                {/* Slider */}
                <div className="w-full max-w-sm px-4 mt-6 space-y-2">
                  <div className="flex justify-between text-xs text-[#78716C]">
                    <span>14.5 mm (Size 6)</span>
                    <span className="font-semibold text-[#1C1917]">Inner Diameter: {diameterInput.toFixed(1)} mm</span>
                    <span>17.3 mm (Size 13)</span>
                  </div>
                  <input
                    type="range"
                    min={14.5}
                    max={17.3}
                    step={0.1}
                    value={diameterInput}
                    onChange={(e) => setDiameterInput(parseFloat(e.target.value))}
                    className="w-full accent-[#1C1917] cursor-pointer"
                  />
                </div>
              </div>

              {/* Matched Specs Card */}
              <div className="grid grid-cols-4 gap-2 bg-[#F1ECE4] p-3 rounded border border-[#E5DEC9] text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#78716C] block">Indian Size</span>
                  <strong className="text-sm text-[#1C1917] font-serif">{currentChartItem.indian}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] block">US Size</span>
                  <strong className="text-sm text-[#1C1917] font-serif">{currentChartItem.us}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] block">UK Size</span>
                  <strong className="text-sm text-[#1C1917] font-serif">{currentChartItem.uk}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#78716C] block">Circumference</span>
                  <strong className="text-sm text-[#1C1917] font-serif">{currentChartItem.circumferenceMm} mm</strong>
                </div>
              </div>

              {/* Confirm Selection CTA */}
              <button
                onClick={() => {
                  onSelectSize(currentChartItem.indian);
                  onClose();
                }}
                className="w-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <Check className="w-4 h-4 text-[#FAF8F4]" />
                <span>Select Indian Size {currentChartItem.indian} for Solitaire Ring</span>
              </button>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded border border-[#E5DEC9]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F1ECE4] text-[#1C1917] font-semibold border-b border-[#E5DEC9]">
                    <tr>
                      <th className="p-3">Indian Size</th>
                      <th className="p-3">Inner Diameter</th>
                      <th className="p-3">Circumference</th>
                      <th className="p-3">US Size</th>
                      <th className="p-3">UK / Australian</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAE3D4] bg-[#FAF8F4]">
                    {SIZE_CHART.map((s) => (
                      <tr
                        key={s.indian}
                        className={selectedSize === s.indian ? 'bg-[#F1ECE4] font-semibold' : 'hover:bg-[#F7F3EB]'}
                      >
                        <td className="p-3 font-serif text-sm text-[#1C1917]">Size {s.indian}</td>
                        <td className="p-3 text-[#57534E]">{s.innerDiameterMm} mm</td>
                        <td className="p-3 text-[#57534E]">{s.circumferenceMm} mm</td>
                        <td className="p-3 text-[#57534E]">{s.us}</td>
                        <td className="p-3 text-[#57534E]">{s.uk}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              onSelectSize(s.indian);
                              onClose();
                            }}
                            className={`px-3 py-1 rounded text-[11px] cursor-pointer ${selectedSize === s.indian
                                ? 'bg-[#1C1917] text-[#FAF8F4] font-semibold'
                                : 'bg-[#FAF8F4] border border-[#D8CEBE] text-[#1C1917] hover:border-[#1C1917]'
                              }`}
                          >
                            {selectedSize === s.indian ? 'Selected' : 'Select'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'paper' && (
            <div className="space-y-4 text-xs text-[#57534E] leading-relaxed">
              <div className="p-4 bg-[#F1ECE4] rounded border border-[#E5DEC9] space-y-2">
                <h4 className="font-semibold text-[#1C1917] text-sm">3-Step String / Paper Method:</h4>
                <ol className="list-decimal pl-5 space-y-1.5 text-[#57534E]">
                  <li>Cut a thin strip of non-stretchy paper or thread about 10cm long.</li>
                  <li>Wrap it snugly around the base of your finger. Ensure it slips comfortably over the knuckle.</li>
                  <li>Mark the spot where the paper overlaps with a fine pen and measure the flat length in millimetres (Circumference).</li>
                </ol>
              </div>

              <div className="p-3 bg-[#FAF8F4] border border-[#E5DEC9] rounded flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#1C1917]">Complimentary Ring Resizing Guarantee</span>
                  <p className="text-[11px] text-[#78716C]">If the size isn't 100% perfect, we offer 1 free resizing within 6 months.</p>
                </div>
                <Sparkles className="w-4 h-4 text-[#9E7D47]" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F1ECE4] border-t border-[#E5DEC9] flex items-center justify-between text-xs text-[#78716C]">
          <span className="flex items-center gap-1">
            <Printer className="w-3.5 h-3.5 text-[#9E7D47]" />
            1:1 Scale Calibrated for Desktop & Mobile
          </span>
          <button
            onClick={onClose}
            className="text-[#1C1917] font-semibold hover:underline cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
