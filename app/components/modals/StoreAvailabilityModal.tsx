import React, { useState } from 'react';
import { X, MapPin, Phone, CheckCircle, Navigation, Clock, Store } from 'lucide-react';
import { PINCODE_DATABASE } from '@/app/data/productData';

interface StoreAvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: (storeName: string) => void;
}

export const StoreAvailabilityModal: React.FC<StoreAvailabilityModalProps> = ({
  isOpen,
  onClose,
  onBookAppointment
}) => {
  const [selectedCity, setSelectedCity] = useState('Mumbai');

  if (!isOpen) return null;

  const stores = [
    {
      city: 'Mumbai',
      name: 'Tanishq Flagship Boutique - Bandra West',
      address: 'Plot 34, Turner Road, Bandra West, Mumbai, Maharashtra 400050',
      distance: '2.4 km away',
      phone: '+91 22 6691 4000',
      timings: '10:30 AM - 8:30 PM (Open Today)',
      inStock: true,
      stockCount: '2 pieces in stock'
    },
    {
      city: 'Mumbai',
      name: 'Tanishq Boutique - Fort / Kala Ghoda',
      address: 'Near Flora Fountain, MG Road, Fort, Mumbai 400001',
      distance: '8.1 km away',
      phone: '+91 22 2204 5500',
      timings: '10:30 AM - 8:00 PM (Open Today)',
      inStock: true,
      stockCount: '1 piece in stock'
    },
    {
      city: 'Delhi NCR',
      name: 'Tanishq Boutique - Connaught Place',
      address: 'F-Block, Inner Circle, Connaught Place, New Delhi 110001',
      distance: '1.5 km away',
      phone: '+91 11 4352 8800',
      timings: '10:30 AM - 8:30 PM (Open Today)',
      inStock: true,
      stockCount: '3 pieces in stock'
    },
    {
      city: 'Delhi NCR',
      name: 'Tanishq Boutique - South Extension Part 1',
      address: 'Main Ring Road, South Extension I, New Delhi 110049',
      distance: '6.2 km away',
      phone: '+91 11 2462 1100',
      timings: '10:30 AM - 8:30 PM (Open Today)',
      inStock: true,
      stockCount: '2 pieces in stock'
    },
    {
      city: 'Bengaluru',
      name: 'Tanishq - 100ft Road, Indiranagar',
      address: 'Near HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
      distance: '2.1 km away',
      phone: '+91 80 4125 8899',
      timings: '10:30 AM - 8:30 PM (Open Today)',
      inStock: true,
      stockCount: '3 pieces in stock'
    },
    {
      city: 'Chennai',
      name: 'Tanishq - Usman Road, T. Nagar',
      address: 'North Usman Road, T. Nagar, Chennai, Tamil Nadu 600017',
      distance: '3.8 km away',
      phone: '+91 44 2814 3300',
      timings: '10:00 AM - 8:30 PM (Open Today)',
      inStock: true,
      stockCount: '2 pieces in stock'
    }
  ];

  const filteredStores = stores.filter(s => selectedCity === 'All' || s.city === selectedCity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF8F4] border border-[#E5DEC9] rounded-lg max-w-xl w-full p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#78716C] hover:text-[#1C1917] p-1.5 rounded-full hover:bg-[#F1ECE4] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 pr-6 border-b border-[#E5DEC9] pb-4">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-[#9E7D47]" />
            <span className="text-[10px] tracking-[0.25em] font-semibold text-[#9E7D47] uppercase">
              Boutique Stock & In-Store Trial
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#1C1917] tracking-tight">
            Check Nearby Store Availability
          </h3>
          <p className="text-xs text-[#57534E]">
            Locate stores with ready stock for <strong>Glorious 22 Karat Yellow Gold Floral Ring (511920FCMAA00)</strong>.
          </p>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
          {['Mumbai', 'Delhi NCR', 'Bengaluru', 'Chennai', 'All'].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-full border transition-all whitespace-nowrap cursor-pointer ${selectedCity === city
                  ? 'bg-[#1C1917] text-[#FAF8F4] border-[#1C1917] font-semibold shadow-xs'
                  : 'bg-[#FFFFFF] text-[#57534E] border-[#E5DEC9] hover:border-[#1C1917]'
                }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Store List */}
        <div className="space-y-3">
          {filteredStores.map((store, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E5DEC9] rounded-md p-4 space-y-3 shadow-xs hover:border-[#9E7D47] transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#1C1917]">
                    {store.name}
                  </h4>
                  <p className="text-xs text-[#57534E] mt-0.5 leading-relaxed">
                    {store.address}
                  </p>
                </div>
                <span className="text-[10px] bg-[#ECFDF5] text-[#047857] px-2.5 py-0.5 rounded font-semibold border border-[#A7F3D0] whitespace-nowrap flex-shrink-0 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-[#047857]" />
                  {store.stockCount}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-[#78716C] gap-2 pt-2 border-t border-[#E5DEC9]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[#57534E]">
                    <Clock className="w-3.5 h-3.5 text-[#9E7D47]" />
                    {store.timings}
                  </span>
                  <a
                    href={`tel:${store.phone}`}
                    className="flex items-center gap-1 text-[#1C1917] hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#9E7D47]" />
                    {store.phone}
                  </a>
                </div>

                <button
                  onClick={() => {
                    onBookAppointment(store.name);
                    onClose();
                  }}
                  className="bg-[#F1ECE4] hover:bg-[#EAE3D4] text-[#1C1917] text-[11px] font-semibold px-3 py-1.5 rounded border border-[#E5DEC9] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Navigation className="w-3 h-3 text-[#9E7D47]" />
                  Book Store Trial Visit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
