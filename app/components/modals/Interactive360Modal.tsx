import React, { useState, useRef } from 'react';
import { X, RotateCcw, Sparkles, Sun, Moon, Maximize2, ShieldCheck } from 'lucide-react';
import { MetalType } from '@/app/types/product';
import { PRODUCT_IMAGES_BY_METAL } from '@/app/data/productData';

interface Interactive360ModalProps {
  isOpen: boolean;
  onClose: () => void;
  metal: MetalType;
}

export const Interactive360Modal: React.FC<Interactive360ModalProps> = ({
  isOpen,
  onClose,
  metal
}) => {
  const [angle, setAngle] = useState(0);
  const [lightMode, setLightMode] = useState<'studio' | 'sunset' | 'daylight'>('studio');
  const [zoomLevel, setZoomLevel] = useState(1);
  const isDragging = useRef(false);
  const startX = useRef(0);

  if (!isOpen) return null;

  const images = PRODUCT_IMAGES_BY_METAL[metal] || PRODUCT_IMAGES_BY_METAL['yellow-gold'];

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    setAngle(prev => (prev + delta * 0.75) % 360);
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F4] text-[#1C1917] rounded-lg border border-[#E5DEC9] shadow-2xl overflow-hidden flex flex-col my-6 max-h-[90vh]">
        {/* Top Controls */}
        <div className="flex items-center justify-between p-4 border-b border-[#E5DEC9] bg-[#F1ECE4]">
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-[#9E7D47]" />
            <div>
              <h3 className="font-serif text-lg text-[#1C1917] tracking-wide">
                Interactive 360° Studio Turntable
              </h3>
              <p className="text-[11px] text-[#78716C]">
                Rotate the ring smoothly to inspect diamond collet elevation, 6-prong symmetry, and court shank.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#78716C] hover:text-[#1C1917] rounded-full hover:bg-[#E5DEC9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 360 Canvas Stage */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`relative flex-1 min-h-[380px] sm:min-h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden ${lightMode === 'studio'
              ? 'bg-gradient-to-b from-[#F5F0E8] via-[#ECE5D8] to-[#E3D9C7]'
              : lightMode === 'sunset'
                ? 'bg-gradient-to-b from-[#FDF4E7] via-[#F6E3CD] to-[#EAD1B4]'
                : 'bg-gradient-to-b from-[#FAF8F4] via-[#F0ECE6] to-[#E5E0D8]'
            }`}
        >
          {/* Light Reflections */}
          <div
            className="absolute inset-0 bg-radial from-white/40 via-transparent to-transparent pointer-events-none"
            style={{ transform: `scale(${zoomLevel}) rotate(${angle * 0.5}deg)` }}
          />

          {/* Rotating Ring Image */}
          <div
            className="relative w-full max-w-[420px] aspect-square flex items-center justify-center transition-transform duration-75"
            style={{
              transform: `scale(${zoomLevel}) rotate(${angle}deg)`
            }}
          >
            <img
              src={images[0].url}
              alt="360 Turntable Interactive"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]"
              referrerPolicy="no-referrer"
            />

            {/* Prisms & Sparkle highlights */}
            <div
              className="absolute top-1/3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/60 blur-xs pointer-events-none"
              style={{ opacity: Math.abs(Math.sin((angle * Math.PI) / 180)) }}
            />
          </div>

          {/* Floating Instructions */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
            <div className="bg-[#FAF8F4]/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#E5DEC9] text-xs text-[#1C1917] flex items-center gap-2 shadow-sm">
              <RotateCcw className="w-3.5 h-3.5 text-[#9E7D47]" />
              <span>Drag left/right to rotate • Angle: {Math.round(angle % 360)}°</span>
            </div>
          </div>
        </div>

        {/* Bottom Toolbars */}
        <div className="p-4 bg-[#F1ECE4] border-t border-[#E5DEC9] flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Lighting environments */}
          <div className="flex items-center gap-2">
            <span className="text-[#78716C]">Studio Lighting:</span>
            <button
              onClick={() => setLightMode('studio')}
              className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${lightMode === 'studio' ? 'bg-[#1C1917] text-[#FAF8F4]' : 'bg-[#FAF8F4] text-[#78716C] hover:text-[#1C1917] border border-[#E5DEC9]'
                }`}
            >
              Neutral Studio
            </button>
            <button
              onClick={() => setLightMode('sunset')}
              className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${lightMode === 'sunset' ? 'bg-[#1C1917] text-[#FAF8F4]' : 'bg-[#FAF8F4] text-[#78716C] hover:text-[#1C1917] border border-[#E5DEC9]'
                }`}
            >
              Sunset Warm
            </button>
            <button
              onClick={() => setLightMode('daylight')}
              className={`px-3 py-1.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${lightMode === 'daylight' ? 'bg-[#1C1917] text-[#FAF8F4]' : 'bg-[#FAF8F4] text-[#78716C] hover:text-[#1C1917] border border-[#E5DEC9]'
                }`}
            >
              Pure Daylight
            </button>
          </div>

          {/* Zoom Level Slider */}
          <div className="flex items-center gap-3">
            <span className="text-[#78716C]">Zoom:</span>
            <input
              type="range"
              min={1}
              max={1.6}
              step={0.05}
              value={zoomLevel}
              onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
              className="accent-[#1C1917] cursor-pointer w-24 sm:w-32"
            />
            <span className="text-[#1C1917] font-mono text-[11px]">{(zoomLevel * 100).toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
