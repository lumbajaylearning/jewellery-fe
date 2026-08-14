import React, { useState } from 'react';
import { X, Sparkles, Check, Clock, UserCheck, ShieldCheck, Calendar, MapPin, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { RELATED_PRODUCTS } from '@/app/data/productData';

interface HomeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPiece?: string;
}

export const HomeTrialModal: React.FC<HomeTrialModalProps> = ({
  isOpen,
  onClose,
  initialPiece
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedPieces, setSelectedPieces] = useState<string[]>([
    'Solitaire Diamond Ring (18K Gold)',
    initialPiece && initialPiece !== 'Solitaire Diamond Ring (18K Gold)' ? initialPiece : 'Diamond Halo Ring'
  ]);
  const [selectedDate, setSelectedDate] = useState('2026-08-18');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM - 1:00 PM (Morning)');
  const [formData, setFormData] = useState({
    name: 'Priyanka Sharma',
    phone: '+91 98765 43210',
    email: 'priyanka.sharma@example.com',
    pincode: '400050',
    city: 'Bandra West, Mumbai',
    addressLine: 'Apt 402, Sea Green Apartments, Perry Cross Road',
    stylistNotes: 'Looking to compare yellow gold vs rose gold diamond solitaires for an anniversary gift.'
  });
  const [bookingRef, setBookingRef] = useState('AURA-TRIAL-8942');

  if (!isOpen) return null;

  const trialPiecesAvailable = [
    { name: 'Solitaire Diamond Ring (18K Gold)', price: 49999, img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80' },
    { name: 'Diamond Halo Ring', price: 62499, img: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=400&q=80' },
    { name: 'Minimal Gold Band', price: 21999, img: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80' },
    { name: 'Princess Cut Solitaire', price: 58999, img: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80' }
  ];

  const togglePieceSelection = (name: string) => {
    if (selectedPieces.includes(name)) {
      if (selectedPieces.length === 1) return; // Keep at least 1
      setSelectedPieces(prev => prev.filter(p => p !== name));
    } else {
      if (selectedPieces.length >= 4) return; // Maximum 4 pieces
      setSelectedPieces(prev => [...prev, name]);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = `AURA-TRIAL-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(randomRef);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F4] rounded-md border border-[#E5DEC9] shadow-2xl overflow-hidden my-8 text-[#1C1917]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E5DEC9] bg-[#F1ECE4]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#9E7D47]" />
            <div>
              <h3 className="font-serif text-xl text-[#1C1917] tracking-tight">
                Complimentary In-Home Jewellery Trial
              </h3>
              <p className="text-xs text-[#78716C]">
                Step {step} of 3 • 100% Free • Private Consultation at Your Residence
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

        {/* Step Indicator Progress Bar */}
        {step < 4 && (
          <div className="flex border-b border-[#E5DEC9] bg-[#FAF8F4] text-xs">
            <div className={`flex-1 py-2.5 px-4 text-center border-b-2 font-medium ${step >= 1 ? 'border-[#9E7D47] text-[#9E7D47]' : 'border-transparent text-[#A8A29E]'}`}>
              1. Select Pieces ({selectedPieces.length}/4)
            </div>
            <div className={`flex-1 py-2.5 px-4 text-center border-b-2 font-medium ${step >= 2 ? 'border-[#9E7D47] text-[#9E7D47]' : 'border-transparent text-[#A8A29E]'}`}>
              2. Date & Time Slot
            </div>
            <div className={`flex-1 py-2.5 px-4 text-center border-b-2 font-medium ${step >= 3 ? 'border-[#9E7D47] text-[#9E7D47]' : 'border-transparent text-[#A8A29E]'}`}>
              3. Address & Confirmation
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: Select Pieces */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider">
                  Select 1 to 4 jewellery pieces to try:
                </span>
                <span className="text-xs text-[#9E7D47] font-medium">
                  {selectedPieces.length} of 4 selected
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {trialPiecesAvailable.map((piece, idx) => {
                  const isSelected = selectedPieces.includes(piece.name);
                  return (
                    <div
                      key={idx}
                      onClick={() => togglePieceSelection(piece.name)}
                      className={`p-3 rounded border flex items-center gap-3 transition-all cursor-pointer ${isSelected
                          ? 'border-[#9E7D47] bg-[#F7F3EB] ring-1 ring-[#9E7D47]'
                          : 'border-[#E5DEC9] bg-[#F1ECE4] hover:bg-[#EAE3D4]'
                        }`}
                    >
                      <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0 bg-[#FAF8F4] border border-[#E5DEC9]">
                        <img src={piece.img} alt={piece.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-serif font-semibold text-[#1C1917] truncate">
                          {piece.name}
                        </h4>
                        <span className="text-xs text-[#78716C] block">
                          ₹{piece.price.toLocaleString('en-IN')}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#9E7D47] font-bold' : 'text-[#78716C]'}`}>
                          {isSelected ? '✓ In Trial Box' : '+ Add to Box'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-[#F1ECE4] p-3.5 rounded border border-[#E5DEC9] space-y-1.5 text-xs text-[#57534E]">
                <div className="flex items-center gap-2 font-semibold text-[#1C1917]">
                  <ShieldCheck className="w-4 h-4 text-[#047857]" />
                  <span>How the Home Trial works:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#78716C]">
                  Our certified gemologist arrives with your curated pieces in a tamper-proof locked kit, along with professional diamond loupes and ring sizing rings. Try them privately for 30–40 minutes with absolutely no pressure.
                </p>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 mt-4 shadow-xs"
              >
                <span>Continue to Date & Slot Selection</span>
                <ArrowRight className="w-4 h-4 text-[#FAF8F4]" />
              </button>
            </div>
          )}

          {/* STEP 2: Date & Slot */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block">
                  Select Trial Date:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['2026-08-18 (Tue)', '2026-08-19 (Wed)', '2026-08-20 (Thu)'].map((d, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`p-3 rounded border text-xs font-medium text-center transition-all cursor-pointer ${selectedDate === d
                          ? 'border-[#9E7D47] bg-[#F7F3EB] ring-1 ring-[#9E7D47] text-[#1C1917] font-semibold'
                          : 'border-[#E5DEC9] bg-[#F1ECE4] hover:bg-[#EAE3D4] text-[#57534E]'
                        }`}
                    >
                      <Calendar className="w-3.5 h-3.5 mx-auto mb-1 text-[#9E7D47]" />
                      <span>{d}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#1C1917] uppercase tracking-wider block">
                  Select 40-Minute Private Time Slot:
                </label>
                <div className="space-y-2">
                  {[
                    '11:00 AM - 1:00 PM (Morning Slot)',
                    '2:00 PM - 4:00 PM (Afternoon Slot)',
                    '5:00 PM - 7:00 PM (Evening Sunset Slot)'
                  ].map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSlot(slot)}
                      className={`w-full p-3 rounded border text-xs font-medium text-left flex items-center justify-between transition-all cursor-pointer ${selectedSlot === slot
                          ? 'border-[#9E7D47] bg-[#F7F3EB] ring-1 ring-[#9E7D47] text-[#1C1917] font-semibold'
                          : 'border-[#E5DEC9] bg-[#F1ECE4] hover:bg-[#EAE3D4] text-[#57534E]'
                        }`}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#9E7D47]" />
                        <span>{slot}</span>
                      </div>
                      {selectedSlot === slot && <Check className="w-4 h-4 text-[#9E7D47]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-3 border border-[#D8CEBE] hover:border-[#1C1917] rounded text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] py-3 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Address Details</span>
                  <ArrowRight className="w-4 h-4 text-[#FAF8F4]" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Address Form */}
          {step === 3 && (
            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[#1C1917] font-semibold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#FAF8F4] border border-[#D8CEBE] p-2.5 rounded text-[#1C1917] focus:outline-none focus:border-[#9E7D47]"
                  />
                </div>
                <div>
                  <label className="text-[#1C1917] font-semibold block mb-1">Mobile Number (For OTP Verification)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF8F4] border border-[#D8CEBE] p-2.5 rounded text-[#1C1917] focus:outline-none focus:border-[#9E7D47]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-[#1C1917] font-semibold block mb-1">PIN Code</label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full bg-[#FAF8F4] border border-[#D8CEBE] p-2.5 rounded text-[#1C1917] focus:outline-none focus:border-[#9E7D47]"
                  />
                </div>
                <div>
                  <label className="text-[#1C1917] font-semibold block mb-1">City / Locality</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-[#FAF8F4] border border-[#D8CEBE] p-2.5 rounded text-[#1C1917] focus:outline-none focus:border-[#9E7D47]"
                  />
                </div>
              </div>

              <div className="text-xs">
                <label className="text-[#1C1917] font-semibold block mb-1">Complete Residential Address</label>
                <textarea
                  rows={2}
                  required
                  value={formData.addressLine}
                  onChange={(e) => setFormData({ ...formData, addressLine: e.target.value })}
                  className="w-full bg-[#FAF8F4] border border-[#D8CEBE] p-2.5 rounded text-[#1C1917] focus:outline-none focus:border-[#9E7D47]"
                />
              </div>

              <div className="text-xs">
                <label className="text-[#1C1917] font-semibold block mb-1">Notes for Jewellery Stylist (Optional)</label>
                <input
                  type="text"
                  value={formData.stylistNotes}
                  onChange={(e) => setFormData({ ...formData, stylistNotes: e.target.value })}
                  className="w-full bg-[#FAF8F4] border border-[#D8CEBE] p-2.5 rounded text-[#1C1917] focus:outline-none focus:border-[#9E7D47]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3 border border-[#D8CEBE] hover:border-[#1C1917] rounded text-xs text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] py-3.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 text-[#FAF8F4]" />
                  <span>Confirm Free Home Trial Booking</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Confirmation */}
          {step === 4 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center mx-auto text-[#047857]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-[#047857] uppercase tracking-widest">
                  Home Trial Confirmed
                </span>
                <h3 className="font-serif text-2xl text-[#1C1917]">
                  Booking Reference: {bookingRef}
                </h3>
                <p className="text-xs text-[#78716C] max-w-md mx-auto">
                  A confirmation SMS & calendar invite has been sent to <strong>{formData.phone}</strong>. Our senior jewellery stylist will contact you prior to arrival.
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#F1ECE4] p-4 rounded-md border border-[#E5DEC9] text-xs text-left max-w-md mx-auto space-y-2">
                <div className="flex justify-between border-b border-[#EAE3D4] pb-1.5">
                  <span className="text-[#78716C]">Selected Pieces:</span>
                  <span className="font-semibold text-[#1C1917]">{selectedPieces.length} items</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE3D4] pb-1.5">
                  <span className="text-[#78716C]">Appointment Date:</span>
                  <span className="font-semibold text-[#1C1917]">{selectedDate}</span>
                </div>
                <div className="flex justify-between border-b border-[#EAE3D4] pb-1.5">
                  <span className="text-[#78716C]">Time Slot:</span>
                  <span className="font-semibold text-[#1C1917]">{selectedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">Location:</span>
                  <span className="font-semibold text-[#1C1917] truncate">{formData.city}</span>
                </div>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="bg-[#1C1917] hover:bg-[#292524] text-[#FAF8F4] px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Return to Product Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
