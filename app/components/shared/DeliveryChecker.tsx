import React, { useState } from 'react';
import { MapPin, Check, Truck, ShieldCheck, Clock, AlertCircle, Store, Navigation } from 'lucide-react';
import { PINCODE_DATABASE } from '@/app/data/productData';
import { PincodeInfo } from '@/app/types/product';

interface DeliveryCheckerProps {
  onOpenStoreModal?: () => void;
}

export const DeliveryChecker: React.FC<DeliveryCheckerProps> = ({ onOpenStoreModal }) => {
  const [pincode, setPincode] = useState('110001');
  const [result, setResult] = useState<PincodeInfo | null>(PINCODE_DATABASE['110001']);
  const [searched, setSearched] = useState(true);
  const [error, setError] = useState('');

  const handleCheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPin = pincode.trim();
    if (!cleanPin || cleanPin.length !== 6 || isNaN(Number(cleanPin))) {
      setError('Please enter a valid 6-digit Indian PIN code');
      setResult(null);
      return;
    }

    setError('');
    setSearched(true);

    if (PINCODE_DATABASE[cleanPin]) {
      setResult(PINCODE_DATABASE[cleanPin]);
    } else {
      // Dynamic fallback for any valid 6-digit pincode
      setResult({
        pincode: cleanPin,
        city: 'Verified Delivery Zone',
        state: 'India',
        isServiceable: true,
        deliveryDays: '2-4 business days',
        estimatedArrival: 'Friday, Aug 21',
        trialAvailable: true,
        codAvailable: true
      });
    }
  };

  const handleQuickPin = (pin: string) => {
    setPincode(pin);
    setError('');
    setSearched(true);
    setResult(PINCODE_DATABASE[pin] || null);
  };

  return (
    <div className="w-full bg-[#F1ECE4] border border-[#E5DEC9] rounded-md p-4 sm:p-5 space-y-3.5 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#9E7D47]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
            Delivery & Store Availability
          </span>
        </div>
        <span className="text-[11px] text-[#78716C]">
          Dispatches in 24-48 Hours
        </span>
      </div>

      <p className="text-xs text-[#57534E]">
        Enter your delivery PIN code to check expected arrival date and nearby boutique stock:
      </p>

      {/* Pincode Input Form */}
      <form onSubmit={handleCheck} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => {
              setPincode(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter 6-digit PIN Code (e.g. 110001)"
            className="w-full bg-[#FAF8F4] border border-[#D8CEBE] text-[#1C1917] placeholder-[#8C8375] text-xs sm:text-sm py-2.5 px-3 rounded focus:outline-none focus:border-[#1C1917]"
          />
        </div>
        <button
          type="submit"
          className="bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] text-xs font-semibold px-4 py-2.5 rounded transition-colors cursor-pointer flex-shrink-0 shadow-xs"
        >
          Check PIN
        </button>
      </form>

      {/* Quick City Suggestions */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
        <span className="text-[#78716C] flex-shrink-0">Quick Cities:</span>
        <button type="button" onClick={() => handleQuickPin('400001')} className="text-[#44403C] hover:text-[#1C1917] underline decoration-dotted cursor-pointer">Mumbai (400001)</button>
        <span className="text-[#D8CEBE]">•</span>
        <button type="button" onClick={() => handleQuickPin('110001')} className="text-[#44403C] hover:text-[#1C1917] underline decoration-dotted cursor-pointer">Delhi (110001)</button>
        <span className="text-[#D8CEBE]">•</span>
        <button type="button" onClick={() => handleQuickPin('560001')} className="text-[#44403C] hover:text-[#1C1917] underline decoration-dotted cursor-pointer">Bengaluru (560001)</button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-xs text-[#DC2626] bg-[#FEF2F2] p-2 rounded border border-[#FECACA]">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Card */}
      {searched && result && (
        <div className="bg-[#FAF8F4] rounded p-3.5 border border-[#E5DEC9] space-y-2.5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#1C1917] flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-[#059669]" />
              Delivery Available in {result.city}, {result.state} ({result.pincode})
            </span>
            <span className="text-[10px] bg-[#ECFDF5] text-[#047857] px-2 py-0.5 rounded font-semibold border border-[#A7F3D0]">
              Ready to Ship
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-[#57534E]">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#9E7D47]" />
              <span><strong className="text-[#1C1917]">Free Insured</strong> Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#9E7D47]" />
              <span>Expected in <strong className="text-[#1C1917]">{result.deliveryDays}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9E7D47]" />
              <span>Doorstep <strong className="text-[#1C1917]">OTP Handover</strong></span>
            </div>
          </div>

          {result.nearbyStores && result.nearbyStores.length > 0 && (
            <div className="pt-2 border-t border-[#E5DEC9] flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#44403C]">
                <Store className="w-3.5 h-3.5 text-[#9E7D47]" />
                <span>In Stock at <strong>{result.nearbyStores[0].name}</strong> ({result.nearbyStores[0].distance})</span>
              </div>
              {onOpenStoreModal && (
                <button
                  onClick={onOpenStoreModal}
                  className="text-[#9E7D47] hover:underline text-[11px] font-semibold cursor-pointer"
                >
                  View All Stores →
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
