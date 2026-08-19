"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, Package } from "lucide-react";
import { listCustomerOrders } from "@/app/lib/medusa/customer";

function formatMoney(amount: number, currencyCode = "inr") {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: currencyCode.toUpperCase(), maximumFractionDigits: 0 }).format(amount);
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listCustomerOrders().then(setOrders).catch(() => setError("Sign in to view your Medusa order history.")).finally(() => setLoading(false));
    }, []);

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading orders…</p></main>;

    return (
        <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link href="/account" className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary"><ChevronLeft className="h-4 w-4" />Back to account</Link>
            <div className="mt-7 border-b border-border pb-7"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">My account</p><h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Order history.</h1><p className="mt-3 text-sm text-text-secondary">Your completed Medusa purchases appear here.</p></div>
            {error ? <section className="mt-8 rounded border border-border bg-surface p-8 text-center"><p className="text-sm text-text-secondary">{error}</p><Link href="/account" className="mt-5 inline-block rounded bg-text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white">Sign in</Link></section> : orders.length === 0 ? <section className="mt-8 rounded border border-border bg-white p-10 text-center"><Package className="mx-auto h-10 w-10 stroke-1 text-gold" /><h2 className="mt-4 font-heading text-3xl text-text-primary">No orders yet.</h2><p className="mt-2 text-sm text-text-secondary">Your COD orders will appear after checkout.</p><Link href="/shop" className="mt-6 inline-block rounded bg-text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white">Explore jewellery</Link></section> : <section className="mt-8 space-y-4">{orders.map((order) => <Link key={order.id} href={`/account/orders/${order.id}`} className="grid gap-4 rounded border border-border bg-white p-5 transition hover:border-gold sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="flex flex-wrap items-center gap-3"><h2 className="font-heading text-xl text-text-primary">Order #{order.display_id ?? order.id}</h2><span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary">{order.status}</span></div><p className="mt-2 text-xs text-text-secondary">{new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })} • {order.items?.length ?? 0} items</p></div><div className="sm:text-right"><p className="font-heading text-xl font-semibold text-text-primary">{formatMoney(order.total ?? 0, order.currency_code)}</p><p className="mt-1 text-xs font-semibold text-gold">View details →</p></div></Link>)}</section>}
        </main>
    );
}
