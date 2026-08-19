"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShieldCheck, ShoppingBag, Sparkles, Trash2 } from "lucide-react";
import { getOrCreateCart, removeCartLineItem, updateCartLineItem } from "@/app/lib/medusa/cart";

type MedusaCart = any;

function formatMoney(amount: number, currencyCode: string) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currencyCode.toUpperCase(),
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function CartPage() {
    const [cart, setCart] = useState<MedusaCart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        getOrCreateCart()
            .then((nextCart) => {
                if (active) setCart(nextCart);
            })
            .catch((caughtError) => {
                if (active) {
                    setError(caughtError instanceof Error ? caughtError.message : "Unable to load your shopping bag.");
                }
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => { active = false; };
    }, []);

    const items = cart?.items ?? [];
    const currencyCode = cart?.currency_code ?? "inr";
    const itemCount = useMemo(
        () => items.reduce((count: number, item: any) => count + item.quantity, 0),
        [items]
    );
    const subtotal = cart?.subtotal ?? items.reduce(
        (sum: number, item: any) => sum + (item.unit_price ?? 0) * item.quantity,
        0
    );
    const total = cart?.total ?? subtotal;

    const updateQuantity = async (lineItemId: string, quantity: number) => {
        if (updatingItemId) return;
        setUpdatingItemId(lineItemId);
        setError(null);

        try {
            const nextCart = quantity < 1
                ? await removeCartLineItem(lineItemId)
                : await updateCartLineItem(lineItemId, quantity);
            setCart(nextCart);
        } catch (caughtError) {
            setError(caughtError instanceof Error ? caughtError.message : "Unable to update your shopping bag.");
        } finally {
            setUpdatingItemId(null);
        }
    };

    if (loading) {
        return (
            <main className="mx-auto flex min-h-[55vh] w-full max-w-7xl items-center justify-center px-5">
                <p className="text-sm text-text-secondary">Loading your shopping bag…</p>
            </main>
        );
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Shopping bag</p>
                    <h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Your selected jewellery.</h1>
                    <p className="mt-3 text-sm text-text-secondary">
                        {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? "piece" : "pieces"} ready for checkout.` : "Your bag is waiting for something special."}
                    </p>
                </div>
                <Link href="/shop" className="text-sm font-semibold text-text-primary underline decoration-border underline-offset-4">
                    Continue shopping
                </Link>
            </div>

            {error && (
                <div role="alert" className="mb-6 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
                    {error}
                </div>
            )}

            {items.length === 0 ? (
                <section className="flex min-h-96 flex-col items-center justify-center rounded border border-border bg-white px-6 text-center">
                    <ShoppingBag className="h-12 w-12 stroke-1 text-gold" />
                    <h2 className="mt-5 font-heading text-3xl text-text-primary">Your bag is empty.</h2>
                    <p className="mt-3 max-w-md text-sm leading-6 text-text-secondary">Explore the collection, select an available Medusa variant, and it will appear here.</p>
                    <Link href="/shop" className="mt-6 rounded bg-text-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">
                        Explore jewellery
                    </Link>
                </section>
            ) : (
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
                    <section className="space-y-4">
                        {items.map((item: any) => {
                            const busy = updatingItemId === item.id;
                            return (
                                <article key={item.id} className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 rounded border border-border bg-white p-4 sm:grid-cols-[128px_minmax(0,1fr)_auto] sm:gap-6 sm:p-5">
                                    <div className="aspect-[4/5] overflow-hidden rounded bg-surface">
                                        {item.thumbnail ? <img src={item.thumbnail} alt={item.product_title ?? item.title} className="h-full w-full object-cover" /> : null}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">{item.variant_title ?? "Selected variant"}</p>
                                        <h2 className="mt-2 font-heading text-xl text-text-primary sm:text-2xl">{item.product_title ?? item.title}</h2>
                                        {item.variant_sku && <p className="mt-2 text-xs text-text-secondary">SKU: {item.variant_sku}</p>}
                                        <p className="mt-4 font-heading text-lg font-semibold text-text-primary sm:hidden">
                                            {formatMoney((item.unit_price ?? 0) * item.quantity, currencyCode)}
                                        </p>
                                        <div className="mt-5 flex flex-wrap items-center gap-4">
                                            <div className="flex items-center rounded border border-border bg-surface">
                                                <button disabled={busy} onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2.5 disabled:opacity-40" aria-label="Decrease quantity"><Minus className="h-3.5 w-3.5" /></button>
                                                <span className="min-w-9 text-center text-xs font-semibold">{item.quantity}</span>
                                                <button disabled={busy} onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2.5 disabled:opacity-40" aria-label="Increase quantity"><Plus className="h-3.5 w-3.5" /></button>
                                            </div>
                                            <button disabled={busy} onClick={() => updateQuantity(item.id, 0)} className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-rose-700 disabled:opacity-40">
                                                <Trash2 className="h-3.5 w-3.5" /> Remove
                                            </button>
                                        </div>
                                    </div>
                                    <p className="hidden font-heading text-lg font-semibold text-text-primary sm:block">
                                        {formatMoney((item.unit_price ?? 0) * item.quantity, currencyCode)}
                                    </p>
                                </article>
                            );
                        })}
                    </section>

                    <aside className="rounded border border-border bg-surface p-6 lg:sticky lg:top-28">
                        <h2 className="font-heading text-2xl text-text-primary">Order summary</h2>
                        <div className="mt-6 space-y-3 border-b border-border pb-5 text-sm text-text-secondary">
                            <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-text-primary">{formatMoney(subtotal, currencyCode)}</span></div>
                            <div className="flex justify-between"><span>Insured shipping</span><span className="font-semibold text-emerald-700">Free</span></div>
                            <div className="flex justify-between"><span>Taxes</span><span>Calculated at checkout</span></div>
                        </div>
                        <div className="flex justify-between py-5 font-semibold text-text-primary"><span>Total</span><span className="font-heading text-xl">{formatMoney(total, currencyCode)}</span></div>
                        <button className="w-full rounded bg-text-primary px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white">
                            Proceed to checkout
                        </button>
                        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-text-secondary"><ShieldCheck className="h-4 w-4 text-emerald-700" />Secure Medusa checkout</div>
                        <Link href="/book" className="mt-5 flex w-full items-center justify-center gap-2 rounded border border-border bg-white px-4 py-3 text-xs font-semibold text-text-primary">
                            <Sparkles className="h-4 w-4 text-gold" />Prefer a home trial?
                        </Link>
                    </aside>
                </div>
            )}
        </main>
    );
}
