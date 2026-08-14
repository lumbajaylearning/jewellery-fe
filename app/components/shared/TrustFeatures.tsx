import React from 'react';
import { Award, ShieldCheck, PackageCheck, RotateCcw, Headphones } from 'lucide-react';

interface TrustFeaturesProps {
  onOpenCertificateModal: () => void;
}

export const TrustFeatures: React.FC<TrustFeaturesProps> = ({ onOpenCertificateModal }) => {
  const trustItems = [
    {
      icon: Award,
      title: 'Certified Diamonds',
      subtitle: 'IGI & GIA Laboratory Certified',
      actionLabel: 'View Certificate',
      onClick: onOpenCertificateModal
    },
    {
      icon: ShieldCheck,
      title: 'BIS Hallmarked Gold',
      subtitle: '100% 750 (18K) HUID Compliant',
      actionLabel: 'Hallmark Info',
      onClick: onOpenCertificateModal
    },
    {
      icon: PackageCheck,
      title: 'Secure Packaging',
      subtitle: 'Tamper-Evident Velvet Keepsake',
      actionLabel: 'Learn More'
    },
    {
      icon: RotateCcw,
      title: '15-Day Easy Returns',
      subtitle: '100% Money-Back Guarantee',
      actionLabel: 'Policy'
    },
    {
      icon: Headphones,
      title: 'Lifetime Support',
      subtitle: 'Complimentary Cleaning & Resizing',
      actionLabel: 'Warranty'
    }
  ];

  return (
    <section aria-labelledby="trust-features-heading" className="w-full border-y border-[#E5DEC9] bg-[#F1ECE4] py-8 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="trust-features-heading" className="sr-only">AURA Trust & Craftsmanship Guarantees</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 rounded-md transition-all hover:bg-[#FAF8F4] group cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-[#FAF8F4] border border-[#E5DEC9] flex items-center justify-center mb-3 group-hover:border-[#9E7D47] transition-colors shadow-xs">
                  <Icon className="w-5 h-5 text-[#57534E] group-hover:text-[#9E7D47] transition-colors stroke-[1.5]" />
                </div>
                <h3 className="text-xs font-semibold text-[#1C1917] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[11px] text-[#78716C] mt-1 font-normal leading-snug">
                  {item.subtitle}
                </p>
                {item.onClick && (
                  <button
                    onClick={item.onClick}
                    className="text-[10.5px] text-[#9E7D47] hover:underline font-semibold mt-1.5 cursor-pointer"
                  >
                    {item.actionLabel} →
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
