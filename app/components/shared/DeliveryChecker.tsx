import Link from "next/link";
import { MapPin, ShieldCheck, Truck } from "lucide-react";

export function DeliveryChecker() {
  return (
    <section className="w-full space-y-4 rounded-md border border-[#E5DEC9] bg-[#F1ECE4] p-4 shadow-xs sm:p-5" aria-labelledby="delivery-heading">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#E5DEC9] bg-[#FAF8F4]">
          <MapPin className="h-4 w-4 text-[#9E7D47]" />
        </div>
        <div>
          <h2 id="delivery-heading" className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">Delivery availability</h2>
          <p className="mt-1 text-xs leading-5 text-[#57534E]">Shipping methods, serviceability and charges are calculated by Medusa after you enter your delivery address at checkout.</p>
        </div>
      </div>
      <div className="grid gap-2 text-[11px] text-[#57534E] sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded border border-[#E5DEC9] bg-[#FAF8F4] p-2.5"><Truck className="h-3.5 w-3.5 text-[#9E7D47]" />Available shipping options appear at checkout</div>
        <div className="flex items-center gap-2 rounded border border-[#E5DEC9] bg-[#FAF8F4] p-2.5"><ShieldCheck className="h-3.5 w-3.5 text-[#9E7D47]" />Final order total is confirmed before purchase</div>
      </div>
      <Link href="/checkout" className="inline-flex text-xs font-semibold text-[#9E7D47] hover:underline">Review delivery at checkout →</Link>
    </section>
  );
}
