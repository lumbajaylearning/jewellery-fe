"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { ChevronLeft, MapPin, PackageCheck, WalletCards } from "lucide-react";
import { retrieveCustomerOrder } from "@/app/lib/medusa/customer";

function formatMoney(amount: number, currencyCode = "inr") {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: currencyCode.toUpperCase(), maximumFractionDigits: 0 }).format(amount);
}

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        retrieveCustomerOrder(id).then(setOrder).catch(() => setError("This order could not be retrieved. Sign in with the customer who placed it.")).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading order…</p></main>;
    if (error || !order) return <main className="mx-auto min-h-[55vh] max-w-3xl px-5 py-16 text-center"><h1 className="font-heading text-4xl text-text-primary">Order unavailable</h1><p className="mt-4 text-sm text-text-secondary">{error}</p><Link href="/account/orders" className="mt-6 inline-block rounded bg-text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white">Back to orders</Link></main>;

    const address = order.shipping_address;
    return (
        <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link href="/account/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary"><ChevronLeft className="h-4 w-4" />Back to orders</Link>
            <section className="mt-7 rounded border border-border bg-surface p-6 sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Order details</p><h1 className="mt-2 font-heading text-4xl text-text-primary">Order #{order.display_id ?? order.id}</h1><p className="mt-2 text-sm text-text-secondary">Placed {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p></div><span className="w-fit rounded-full bg-white px-3 py-1.5 text-xs font-semibold capitalize text-text-primary">{order.status}</span></div></section>
            <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <section className="rounded border border-border bg-white p-5 sm:p-7"><h2 className="font-heading text-2xl text-text-primary">Jewellery</h2><div className="mt-5 divide-y divide-border">{order.items?.map((item: any) => <div key={item.id} className="flex gap-4 py-4 first:pt-0"><div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded bg-surface">{item.thumbnail && <img src={item.thumbnail} alt={item.product_title} className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><h3 className="font-heading text-lg text-text-primary">{item.product_title ?? item.title}</h3><p className="mt-1 text-xs text-text-secondary">{item.variant_title} × {item.quantity}</p></div><p className="text-sm font-semibold text-text-primary">{formatMoney((item.unit_price ?? 0) * item.quantity, order.currency_code)}</p></div>)}</div><div className="mt-5 space-y-3 border-t border-border pt-5 text-sm text-text-secondary"><div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(order.subtotal ?? 0, order.currency_code)}</span></div><div className="flex justify-between"><span>Shipping</span><span>{formatMoney(order.shipping_total ?? 0, order.currency_code)}</span></div><div className="flex justify-between border-t border-border pt-4 font-semibold text-text-primary"><span>Total</span><span className="font-heading text-xl">{formatMoney(order.total ?? 0, order.currency_code)}</span></div></div></section>
                <aside className="space-y-4"><div className="rounded border border-border bg-white p-5"><WalletCards className="h-5 w-5 text-gold" /><h2 className="mt-3 font-heading text-xl text-text-primary">Cash on Delivery</h2><p className="mt-1 text-xs leading-5 text-text-secondary">Payment is collected when delivery is completed.</p></div><div className="rounded border border-border bg-white p-5"><MapPin className="h-5 w-5 text-gold" /><h2 className="mt-3 font-heading text-xl text-text-primary">Delivery address</h2>{address && <p className="mt-2 text-xs leading-5 text-text-secondary">{address.first_name} {address.last_name}<br />{address.address_1}<br />{address.city}, {address.province} {address.postal_code}<br />{address.phone}</p>}</div><div className="rounded border border-border bg-surface p-5"><PackageCheck className="h-5 w-5 text-emerald-700" /><h2 className="mt-3 font-heading text-xl text-text-primary">Fulfilment</h2><p className="mt-1 text-xs capitalize text-text-secondary">{order.fulfillment_status ?? "not fulfilled"}</p></div></aside>
            </div>
        </main>
    );
}
