import React from 'react';
import { Sparkles, Clock, ShieldCheck, UserCheck, PackageCheck, ChevronRight } from 'lucide-react';

interface TryAtHomeSectionProps {
  onOpenHomeTrial: () => void;
}

export const TryAtHomeSection: React.FC<TryAtHomeSectionProps> = ({ onOpenHomeTrial }) => {
  return (
    <section aria-labelledby="home-trial-heading" className="w-full bg-[#161411] rounded-md border border-[#2E2820] p-5 sm:p-7 relative overflow-hidden my-4 shadow-sm">
      {/* Background Decorative Accent */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-[#C5A880]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Copy */}
        <div className="space-y-3 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="bg-[#24201A] text-[#E5C99F] text-[10.5px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded border border-[#3E382F] flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3 h-3 text-[#C5A880]" />
              Home Trial
            </span>
            <span className="text-xs text-[#8C8375] font-normal">
              Availability confirmed during booking
            </span>
          </div>

          <div>
            <h2 id="home-trial-heading" className="text-2xl sm:text-3xl font-serif text-[#F5F2EB] tracking-tight">
              Try it at Home
            </h2>
            <p className="text-sm font-medium text-[#C5A880] mt-0.5">
              See how it looks before you buy.
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#B8B0A2] leading-relaxed font-light">
            Shortlist up to four jewellery pieces and continue to booking. The final slot, service area and appointment details will be confirmed by the home-trial service.
          </p>

          {/* 4 Feature Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            <div className="flex items-center gap-2 text-xs text-[#D8D1C5]">
              <Clock className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
              <span><strong className="text-[#F5F2EB]">Choose a slot</strong> during booking</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#D8D1C5]">
              <UserCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
              <span><strong className="text-[#F5F2EB]">Up to four</strong> shortlisted pieces</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#D8D1C5]">
              <ShieldCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
              <span><strong className="text-[#F5F2EB]">No obligation</strong> to purchase</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#D8D1C5]">
              <PackageCheck className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
              <span><strong className="text-[#F5F2EB]">Service details</strong> confirmed before booking</span>
            </div>
          </div>
        </div>

        {/* Right CTA Box */}
        <div className="flex flex-col sm:items-end justify-center sm:min-w-[200px] flex-shrink-0 pt-2 sm:pt-0">
          <button
            onClick={onOpenHomeTrial}
            className="w-full sm:w-auto bg-[#C5A880] hover:bg-[#D4AF37] text-[#0E0D0B] font-semibold py-3 px-6 rounded transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 text-xs tracking-wider uppercase group"
          >
            <span>Book a Home Trial</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#0E0D0B]" />
          </button>
          <span className="text-[11px] text-[#8C8375] mt-2 text-center sm:text-right">
            Subject to service-area availability
          </span>
        </div>
      </div>
    </section>
  );
};
