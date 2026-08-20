"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Check, MapPin, PackageCheck, WalletCards } from "lucide-react";
import { medusa } from "@/app/lib/medusa/client";

function formatMoney(amount: number, currencyCode = "inr") {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currencyCode.toUpperCase(),
        maximumFractionDigits: 0,
    }).format(amount);
}

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;
        const savedOrder = window.sessionStorage.getItem("aurelia_last_order");

        if (savedOrder) {
            try {
                const parsedOrder = JSON.parse(savedOrder);
                if (!orderId || parsedOrder.id === orderId) {
                    setOrder(parsedOrder);
                    setLoading(false);
                    return;
                }
            } catch {
                window.sessionStorage.removeItem("aurelia_last_order");
            }
        }

        if (!orderId) {
            setError("Order reference is missing.");
            setLoading(false);
            return;
        }

        medusa.store.order.retrieve(orderId)
            .then(({ order: retrievedOrder }) => active && setOrder(retrievedOrder))
            .catch(() => active && setError("We could not retrieve this order. Check it from your account once customer login is connected."))
            .finally(() => active && setLoading(false));

        return () => { active = false; };
    }, [orderId]);

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading order confirmation…</p></main>;
    if (error || !order) return <main className="mx-auto min-h-[55vh] w-full max-w-3xl px-5 py-16 text-center"><h1 className="font-heading text-4xl text-text-primary">Order unavailable</h1><p className="mt-4 text-sm text-text-secondary">{error}</p><Link href="/shop" className="mt-7 inline-block rounded bg-text-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">Continue shopping</Link></main>;

    const address = order.shipping_address;

    return (
        <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6 lg:py-20">
            <section className="rounded border border-border bg-surface px-6 py-10 text-center sm:px-10">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-700 text-white"><Check className="h-7 w-7" /></span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Order confirmed</p>
                <h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Thank you for your order.</h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-text-secondary">Your Cash on Delivery order has been placed. Its latest status and fulfilment details are available in your account.</p>
                <p className="mt-5 text-xs font-semibold text-text-primary">Order #{order.display_id ?? order.id}</p>
            </section>

            <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
                <section className="rounded border border-border bg-white p-5 sm:p-7">
                    <h2 className="font-heading text-2xl text-text-primary">Items ordered</h2>
                    <div className="mt-6 divide-y divide-border">
                        {order.items?.map((item: any) => (
                            <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0"><div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded bg-surface">{item.thumbnail && <img src={item.thumbnail} alt={item.product_title} className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><h3 className="font-heading text-lg text-text-primary">{item.product_title ?? item.title}</h3><p className="mt-1 text-xs text-text-secondary">{item.variant_title} × {item.quantity}</p></div><p className="text-sm font-semibold text-text-primary">{formatMoney(item.total ?? (item.unit_price ?? 0) * item.quantity, order.currency_code)}</p></div>
                        ))}
                    </div>
                    <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm text-text-secondary"><div className="flex justify-between"><span>Subtotal</span><span>{formatMoney(order.subtotal ?? 0, order.currency_code)}</span></div>{order.discount_total > 0 && <div className="flex justify-between text-emerald-700"><span>Discount</span><span>-{formatMoney(order.discount_total, order.currency_code)}</span></div>}<div className="flex justify-between"><span>Shipping</span><span>{formatMoney(order.shipping_total ?? 0, order.currency_code)}</span></div>{order.tax_total > 0 && <div className="flex justify-between"><span>Taxes</span><span>{formatMoney(order.tax_total, order.currency_code)}</span></div>}<div className="flex justify-between border-t border-border pt-4 font-semibold text-text-primary"><span>Total due on delivery</span><span className="font-heading text-xl">{formatMoney(order.total ?? 0, order.currency_code)}</span></div></div>
                </section>

                <aside className="space-y-4">
                    <div className="rounded border border-border bg-white p-5"><div className="flex items-center gap-2 text-gold"><WalletCards className="h-5 w-5" /><h2 className="font-heading text-xl text-text-primary">Payment</h2></div><p className="mt-3 text-sm font-semibold text-text-primary">Cash on Delivery</p><p className="mt-1 text-xs leading-5 text-text-secondary">Pay the order total when delivery is completed.</p></div>
                    <div className="rounded border border-border bg-white p-5"><div className="flex items-center gap-2 text-gold"><MapPin className="h-5 w-5" /><h2 className="font-heading text-xl text-text-primary">Delivery address</h2></div>{address ? <p className="mt-3 text-sm leading-6 text-text-secondary">{address.first_name} {address.last_name}<br />{address.address_1}{address.address_2 ? `, ${address.address_2}` : ""}<br />{address.city}, {address.province} {address.postal_code}<br />{address.phone}</p> : <p className="mt-3 text-sm text-text-secondary">Address saved with the order.</p>}</div>
                    <div className="rounded border border-border bg-surface p-5"><PackageCheck className="h-5 w-5 text-emerald-700" /><p className="mt-3 text-sm font-semibold text-text-primary">What happens next?</p><p className="mt-1 text-xs leading-5 text-text-secondary">The order will move through the fulfilment workflow configured in Medusa. Check your account for its latest status.</p></div>
                </aside>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3"><Link href="/shop" className="rounded bg-text-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">Continue shopping</Link><Link href="/account" className="rounded border border-border bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary">My account</Link></div>
        </main>
    );
}

export default function OrderConfirmationPage() {
    return <Suspense fallback={<main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading order…</p></main>}><OrderConfirmationContent /></Suspense>;
}
