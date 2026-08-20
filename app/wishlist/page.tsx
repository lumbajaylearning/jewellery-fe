"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import ProductGrid from "@/app/components/product/ProductGrid";
import type { ShopProduct } from "@/app/types/product";
import { readWishlist, WISHLIST_EVENT } from "@/app/lib/wishlist";

export default function WishlistPage() {
    const [products, setProducts] = useState<ShopProduct[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const update = () => setProducts(readWishlist());
        update();
        setReady(true);
        window.addEventListener(WISHLIST_EVENT, update);
        return () => window.removeEventListener(WISHLIST_EVENT, update);
    }, []);

    return <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-10 border-b border-border pb-8"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Saved jewellery</p><h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Your wishlist.</h1><p className="mt-3 text-sm text-text-secondary">Pieces you saved on this device for another look.</p></header>
        {!ready ? <p className="py-16 text-center text-sm text-text-secondary">Loading your wishlist…</p> : products.length ? <><div className="mb-6 flex items-center justify-between"><p className="text-sm text-text-secondary"><strong className="text-text-primary">{products.length}</strong> saved {products.length === 1 ? "piece" : "pieces"}</p><Link href="/shop" className="text-xs font-semibold text-text-primary underline underline-offset-4">Continue shopping</Link></div><ProductGrid products={products} /></> : <section className="rounded border border-dashed border-border bg-surface px-5 py-16 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-gold"><Heart className="h-5 w-5" /></span><h2 className="mt-5 font-heading text-2xl text-text-primary">Nothing saved yet.</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-text-secondary">Tap the heart on any jewellery piece to keep it here.</p><Link href="/shop" className="mt-6 inline-block rounded bg-text-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">Explore jewellery</Link></section>}
    </main>;
}
