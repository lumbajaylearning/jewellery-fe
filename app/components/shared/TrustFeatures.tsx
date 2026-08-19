import React from "react";
import { Award, PackageCheck, ShieldCheck, Truck, WalletCards } from "lucide-react";

interface TrustFeaturesProps {
  onOpenCertificateModal: () => void;
  product?: any;
}

export const TrustFeatures: React.FC<TrustFeaturesProps> = ({ onOpenCertificateModal, product }) => {
  const metadata = product?.metadata ?? {};
  const certification = metadata.hallmark || metadata.bis_hallmark || metadata.certificate_number || metadata.certificate_url;
  const trustItems = [
    certification ? {
      icon: Award,
      title: "Product certification",
      subtitle: String(metadata.hallmark || metadata.bis_hallmark || "Certificate details configured"),
      actionLabel: "View details",
      onClick: onOpenCertificateModal,
    } : null,
    { icon: PackageCheck, title: "Secure packaging", subtitle: "Packed to protect your jewellery in transit" },
    { icon: Truck, title: "Insured delivery", subtitle: "Shipment protection through delivery" },
    { icon: WalletCards, title: "Cash on delivery", subtitle: "Available when eligible at checkout" },
    { icon: ShieldCheck, title: "Secure checkout", subtitle: "Order totals are calculated by Medusa" },
  ].filter(Boolean) as Array<{ icon: typeof Award; title: string; subtitle: string; actionLabel?: string; onClick?: () => void }>;

  return (
    <section aria-labelledby="trust-features-heading" className="my-8 w-full border-y border-[#E5DEC9] bg-[#F1ECE4] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="trust-features-heading" className="sr-only">Shopping and delivery information</h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="group flex flex-col items-center rounded-md p-3 text-center transition-all hover:bg-[#FAF8F4]">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#E5DEC9] bg-[#FAF8F4] shadow-xs transition-colors group-hover:border-[#9E7D47]">
                  <Icon className="h-5 w-5 stroke-[1.5] text-[#57534E] transition-colors group-hover:text-[#9E7D47]" />
                </div>
                <h3 className="text-xs font-semibold tracking-tight text-[#1C1917]">{item.title}</h3>
                <p className="mt-1 text-[11px] font-normal leading-snug text-[#78716C]">{item.subtitle}</p>
                {item.onClick && <button onClick={item.onClick} className="mt-1.5 cursor-pointer text-[10.5px] font-semibold text-[#9E7D47] hover:underline">{item.actionLabel} →</button>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
