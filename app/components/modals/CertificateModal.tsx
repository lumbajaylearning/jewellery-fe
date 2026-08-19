import { Award, ExternalLink, ShieldCheck, X } from "lucide-react";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  selectedVariant?: any;
}

export function CertificateModal({ isOpen, onClose, product, selectedVariant }: CertificateModalProps) {
  if (!isOpen) return null;
  const metadata = product?.metadata ?? {};
  const certificateUrl = typeof metadata.certificate_url === "string" && /^https?:\/\//i.test(metadata.certificate_url)
    ? metadata.certificate_url
    : undefined;
  const rows = [
    ["Certificate number", metadata.certificate_number],
    ["Hallmark", metadata.hallmark || metadata.bis_hallmark],
    ["HUID", metadata.huid || metadata.huid_number],
    ["Purity", metadata.purity],
    ["Material", product?.material || metadata.material],
    ["Product SKU", selectedVariant?.sku],
  ].filter(([, value]) => value !== undefined && value !== null && value !== "");

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs" role="dialog" aria-modal="true" aria-labelledby="certificate-title">
      <div className="w-full max-w-lg rounded-md border border-[#E5DEC9] bg-[#FAF8F4] p-6 shadow-2xl sm:p-7">
        <div className="flex items-start justify-between gap-4 border-b border-[#E5DEC9] pb-4">
          <div className="flex items-start gap-3"><ShieldCheck className="mt-1 h-5 w-5 flex-none text-[#047857]" /><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9E7D47]">Configured product data</p><h2 id="certificate-title" className="mt-1 font-serif text-2xl text-[#1C1917]">Certification details</h2><p className="mt-1 text-xs text-[#57534E]">{product?.title}</p></div></div>
          <button onClick={onClose} aria-label="Close certificate details" className="rounded-full border border-[#E5DEC9] p-2 text-[#57534E] hover:bg-[#F1ECE4]"><X className="h-4 w-4" /></button>
        </div>
        {rows.length ? <dl className="mt-5 divide-y divide-[#E5DEC9] rounded border border-[#E5DEC9] bg-white">{rows.map(([label, value]) => <div key={String(label)} className="flex justify-between gap-4 p-3.5 text-xs"><dt className="text-[#78716C]">{label}</dt><dd className="text-right font-semibold text-[#1C1917]">{String(value)}</dd></div>)}</dl> : <div className="mt-5 flex items-start gap-3 rounded border border-[#E5DEC9] bg-[#F1ECE4] p-4"><Award className="mt-0.5 h-4 w-4 flex-none text-[#9E7D47]" /><p className="text-xs leading-5 text-[#57534E]">Certification information has not been configured for this product in Medusa.</p></div>}
        {certificateUrl && <a href={certificateUrl} target="_blank" rel="noreferrer" className="mt-5 flex w-full items-center justify-center gap-2 rounded bg-[#1C1917] px-5 py-3 text-xs font-semibold text-[#FAF8F4]"><ExternalLink className="h-4 w-4 text-[#C5A880]" />Open certificate</a>}
      </div>
    </div>
  );
}
