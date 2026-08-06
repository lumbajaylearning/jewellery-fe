"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SiteShell from "@/app/components/site-shell";
import { Badge, Button, CartProgress, SectionHeading } from "@/app/components/ui";

interface CartItem {
    id: number;
    name: string;
    price: number;
    note: string;
}

const fallbackItems: CartItem[] = [
    { id: 1, name: "Sculpted pearl drop", price: 14800, note: "18k vermeil • bridal edit" },
    { id: 2, name: "Contour diamond ring", price: 12200, note: "Wedding season • 18k gold" },
    { id: 3, name: "Lattice cuff bracelet", price: 9400, note: "Everyday wear • versatile" },
];

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>(fallbackItems);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem("consultation-cart");
            if (stored) {
                const parsed = JSON.parse(stored) as CartItem[];
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setItems(parsed);
                }
            }
        } catch {
            // ignore storage failures and keep the fallback items
        }
    }, []);

    const total = useMemo(() => items.reduce((sum, item) => sum + item.price, 0), [items]);

    const removeItem = (id: number) => {
        const nextItems = items.filter((item) => item.id !== id);
        setItems(nextItems);
        window.localStorage.setItem("consultation-cart", JSON.stringify(nextItems));
    };

    return (
        <SiteShell activePage="/cart" cartCount={3}>
            <section className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <Badge label="Consultation cart" tone="gold" />
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">Your shortlist for the home visit.</h1>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                            This is a preview list of the pieces you want your representative to bring. You can add up to four pieces before booking.
                        </p>
                    </div>
                    <Button href={items.length > 0 ? "/book" : "/category"} variant="primary">
                        {items.length > 0 ? "Book a home visit" : "Browse collections"}
                    </Button>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-4 rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
                    <SectionHeading eyebrow="Selected pieces" title="Up to four items at once" />
                    <div className="mt-4 space-y-4">
                        {items.length > 0 ? items.map((item) => (
                            <div key={item.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-stone-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold text-stone-900">{item.name}</h3>
                                    <p className="mt-2 text-sm text-stone-600">{item.note}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-stone-900">₹{item.price.toLocaleString("en-IN")}</span>
                                    <button onClick={() => removeItem(item.id)} className="rounded-full border border-stone-300 px-3 py-2 text-sm text-stone-600">Remove</button>
                                </div>
                            </div>
                        )) : (
                            <p className="text-sm text-stone-600">Your consultation cart is empty. Browse the collection to add pieces.</p>
                        )}
                    </div>
                </div>

                <div className="space-y-6 rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                    <SectionHeading eyebrow="Preview total" title="Indicative soft cap" />
                    <CartProgress total={total} cap={20000} />
                    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 text-sm leading-7 text-stone-600">
                        <p className="font-semibold text-stone-900">Need a fifth piece?</p>
                        <p className="mt-2">We keep the consultation focused. If you want to add another item, you can book a second visit after the first consultation.</p>
                    </div>
                    <Link href="/category" className="inline-flex text-sm font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4">
                        Continue browsing collections
                    </Link>
                </div>
            </section>
        </SiteShell>
    );
}
