"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

type Category = { id: string; name: string };
type Props = {
    categories: Category[];
    values: { q: string; category: string; minPrice: string; maxPrice: string; sort: string };
    activeFilterCount: number;
};

const inputClass = "h-11 w-full rounded border border-border bg-white px-3 text-sm text-text-primary outline-none focus:border-gold";

export default function ShopFilters({ categories, values, activeFilterCount }: Props) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", closeOnEscape);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener("keydown", closeOnEscape);
        };
    }, [open]);

    return <>
        <div className="mb-7 lg:hidden">
            <div className="flex gap-2">
                <form action="/shop" className="relative min-w-0 flex-1">
                    <input type="hidden" name="category" value={values.category} />
                    <input type="hidden" name="min_price" value={values.minPrice} />
                    <input type="hidden" name="max_price" value={values.maxPrice} />
                    <input type="hidden" name="sort" value={values.sort} />
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                    <input name="q" defaultValue={values.q} placeholder="Search jewellery" className="h-12 w-full rounded border border-border bg-white pl-10 pr-12 text-sm outline-none focus:border-gold" />
                    <button aria-label="Search" className="absolute right-1 top-1 h-10 w-10 rounded bg-text-primary text-white"><Search className="mx-auto h-4 w-4" /></button>
                </form>
                <button type="button" onClick={() => setOpen(true)} className="relative flex h-12 items-center gap-2 rounded border border-border bg-surface px-4 text-xs font-semibold text-text-primary">
                    <SlidersHorizontal className="h-4 w-4" /> Filters
                    {activeFilterCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-text-primary px-1 text-[10px] text-white">{activeFilterCount}</span>}
                </button>
            </div>
            {(activeFilterCount > 0 || values.q) && <div className="mt-3 flex items-center justify-between"><p className="text-xs text-text-secondary">{activeFilterCount > 0 ? `${activeFilterCount} filters applied` : `Searching for “${values.q}”`}</p><Link href="/shop" className="text-xs font-semibold text-text-primary">Clear all</Link></div>}
        </div>

        <form action="/shop" className="mb-8 hidden rounded border border-border bg-surface p-5 lg:block">
            <div className="grid gap-3 lg:grid-cols-[minmax(220px,1.5fr)_1fr_130px_130px_170px_auto]">
                <SearchField defaultValue={values.q} />
                <CategoryField categories={categories} defaultValue={values.category} />
                <input type="number" name="min_price" min="0" step="500" defaultValue={values.minPrice} placeholder="Min ₹" className={inputClass} aria-label="Minimum price" />
                <input type="number" name="max_price" min="0" step="500" defaultValue={values.maxPrice} placeholder="Max ₹" className={inputClass} aria-label="Maximum price" />
                <SortField defaultValue={values.sort} />
                <button className="flex h-11 items-center justify-center gap-2 rounded bg-text-primary px-5 text-xs font-semibold uppercase tracking-wider text-white"><SlidersHorizontal className="h-4 w-4" /> Apply</button>
            </div>
            {(activeFilterCount > 0 || values.q) && <div className="mt-4 flex items-center justify-between border-t border-border pt-3"><p className="text-xs text-text-secondary">{activeFilterCount} active {activeFilterCount === 1 ? "filter" : "filters"}</p><Link href="/shop" className="flex items-center gap-1 text-xs font-semibold text-text-primary"><X className="h-3.5 w-3.5" /> Clear all</Link></div>}
        </form>

        {open && <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="Shop filters">
            <button type="button" aria-label="Close filters" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-2xl bg-background px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-2xl">
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />
                <div className="flex items-center justify-between border-b border-border pb-4"><div><p className="font-heading text-2xl text-text-primary">Filter jewellery</p><p className="mt-1 text-xs text-text-secondary">Refine the collection</p></div><button type="button" onClick={() => setOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white"><X className="h-4 w-4" /></button></div>
                <form action="/shop" className="mt-5 space-y-5">
                    <input type="hidden" name="q" value={values.q} />
                    <label className="block text-xs font-semibold text-text-primary">Category<div className="mt-2"><CategoryField categories={categories} defaultValue={values.category} /></div></label>
                    <fieldset><legend className="text-xs font-semibold text-text-primary">Price range</legend><div className="mt-2 grid grid-cols-2 gap-3"><input type="number" name="min_price" min="0" step="500" defaultValue={values.minPrice} placeholder="Minimum ₹" className={inputClass} /><input type="number" name="max_price" min="0" step="500" defaultValue={values.maxPrice} placeholder="Maximum ₹" className={inputClass} /></div></fieldset>
                    <label className="block text-xs font-semibold text-text-primary">Sort by<div className="mt-2"><SortField defaultValue={values.sort} /></div></label>
                    <div className="sticky bottom-0 grid grid-cols-[auto_1fr] gap-3 border-t border-border bg-background pt-4"><Link href="/shop" className="flex h-12 items-center justify-center rounded border border-border px-5 text-xs font-semibold">Reset</Link><button className="h-12 rounded bg-text-primary px-5 text-xs font-semibold uppercase tracking-wider text-white">Show results</button></div>
                </form>
            </div>
        </div>}
    </>;
}

function SearchField({ defaultValue }: { defaultValue: string }) {
    return <label className="relative block"><span className="sr-only">Search jewellery</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" /><input name="q" defaultValue={defaultValue} placeholder="Search rings, necklaces…" className={`${inputClass} pl-10`} /></label>;
}

function CategoryField({ categories, defaultValue }: { categories: Category[]; defaultValue: string }) {
    return <select name="category" defaultValue={defaultValue} className={inputClass} aria-label="Category"><option value="">All categories</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>;
}

function SortField({ defaultValue }: { defaultValue: string }) {
    return <select name="sort" defaultValue={defaultValue} className={inputClass} aria-label="Sort products"><option value="newest">Newest first</option><option value="title-asc">Name: A–Z</option><option value="title-desc">Name: Z–A</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select>;
}
