import Link from "next/link";
import { redirect } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductGrid from "@/app/components/product/ProductGrid";
import { getProductCategories, getProducts, ShopProductQuery } from "@/app/lib/medusa/products";

type ShopPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function valueOf(value: string | string[] | undefined) {
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function positiveNumber(value: string) {
    if (!value.trim()) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
}

function pageUrl(params: URLSearchParams, page: number) {
    const next = new URLSearchParams(params);
    if (page <= 1) next.delete("page");
    else next.set("page", String(page));
    const query = next.toString();
    return query ? `/shop?${query}` : "/shop";
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const raw = await searchParams;
    const q = valueOf(raw.q).trim();
    const categoryId = valueOf(raw.category);
    const minPriceValue = valueOf(raw.min_price);
    const maxPriceValue = valueOf(raw.max_price);
    const sortValue = valueOf(raw.sort);
    const page = Math.max(1, Number(valueOf(raw.page)) || 1);
    const allowedSorts: ShopProductQuery["sort"][] = ["newest", "title-asc", "title-desc", "price-asc", "price-desc"];
    const sort = allowedSorts.includes(sortValue as ShopProductQuery["sort"]) ? sortValue as ShopProductQuery["sort"] : "newest";

    const [{ products, count, limit }, categories] = await Promise.all([
        getProducts({
            q: q || undefined,
            categoryId: categoryId || undefined,
            minPrice: positiveNumber(minPriceValue),
            maxPrice: positiveNumber(maxPriceValue),
            sort,
            page,
            limit: 12,
        }),
        getProductCategories(),
    ]);

    const totalPages = Math.max(1, Math.ceil(count / limit));
    const currentPage = Math.min(page, totalPages);
    const activeFilters = [q, categoryId, minPriceValue, maxPriceValue].filter(Boolean).length;
    const persistentParams = new URLSearchParams();
    if (q) persistentParams.set("q", q);
    if (categoryId) persistentParams.set("category", categoryId);
    if (minPriceValue) persistentParams.set("min_price", minPriceValue);
    if (maxPriceValue) persistentParams.set("max_price", maxPriceValue);
    if (sort !== "newest") persistentParams.set("sort", sort);
    if (page > totalPages) redirect(pageUrl(persistentParams, totalPages));
    const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((number) => Math.abs(number - currentPage) <= 2);

    return <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Shop jewellery</p>
            <h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Find something you&apos;ll love.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-text-secondary">Discover timeless jewellery designed for every moment.</p>
        </header>

        <form action="/shop" className="mb-8 rounded border border-border bg-surface p-4 sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[minmax(240px,1.5fr)_1fr_150px_150px_180px_auto]">
                <label className="relative block"><span className="sr-only">Search jewellery</span><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" /><input name="q" defaultValue={q} placeholder="Search rings, necklaces…" className="h-11 w-full rounded border border-border bg-white pl-10 pr-3 text-sm outline-none focus:border-gold" /></label>
                <label><span className="sr-only">Category</span><select name="category" defaultValue={categoryId} className="h-11 w-full rounded border border-border bg-white px-3 text-sm text-text-primary outline-none focus:border-gold"><option value="">All categories</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></label>
                <label><span className="sr-only">Minimum price</span><input type="number" name="min_price" min="0" step="500" defaultValue={minPriceValue} placeholder="Min ₹" className="h-11 w-full rounded border border-border bg-white px-3 text-sm outline-none focus:border-gold" /></label>
                <label><span className="sr-only">Maximum price</span><input type="number" name="max_price" min="0" step="500" defaultValue={maxPriceValue} placeholder="Max ₹" className="h-11 w-full rounded border border-border bg-white px-3 text-sm outline-none focus:border-gold" /></label>
                <label><span className="sr-only">Sort products</span><select name="sort" defaultValue={sort} className="h-11 w-full rounded border border-border bg-white px-3 text-sm text-text-primary outline-none focus:border-gold"><option value="newest">Newest first</option><option value="title-asc">Name: A–Z</option><option value="title-desc">Name: Z–A</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label>
                <button className="flex h-11 items-center justify-center gap-2 rounded bg-text-primary px-5 text-xs font-semibold uppercase tracking-wider text-white"><SlidersHorizontal className="h-4 w-4" /> Apply</button>
            </div>
            {activeFilters > 0 && <div className="mt-4 flex items-center justify-between border-t border-border pt-3"><p className="text-xs text-text-secondary">{activeFilters} active {activeFilters === 1 ? "filter" : "filters"}</p><Link href="/shop" className="flex items-center gap-1 text-xs font-semibold text-text-primary"><X className="h-3.5 w-3.5" /> Clear filters</Link></div>}
        </form>

        <div className="mb-6 flex items-center justify-between border-b border-border pb-4"><p className="text-sm text-text-secondary"><strong className="text-text-primary">{count}</strong> {count === 1 ? "piece" : "pieces"} found</p>{q && <p className="hidden text-xs text-text-secondary sm:block">Results for “{q}”</p>}</div>

        <ProductGrid products={products} />

        {totalPages > 1 && <nav aria-label="Shop pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
            <Link href={pageUrl(persistentParams, Math.max(1, currentPage - 1))} aria-disabled={currentPage === 1} className={`rounded border border-border px-4 py-2.5 text-xs font-semibold ${currentPage === 1 ? "pointer-events-none opacity-40" : "hover:border-gold"}`}>Previous</Link>
            {visiblePages[0] > 1 && <><Link href={pageUrl(persistentParams, 1)} className="flex h-10 w-10 items-center justify-center rounded border border-border text-xs font-semibold">1</Link>{visiblePages[0] > 2 && <span className="px-1 text-text-secondary">…</span>}</>}
            {visiblePages.map((number) => <Link key={number} href={pageUrl(persistentParams, number)} aria-current={number === currentPage ? "page" : undefined} className={`flex h-10 w-10 items-center justify-center rounded border text-xs font-semibold ${number === currentPage ? "border-text-primary bg-text-primary text-white" : "border-border hover:border-gold"}`}>{number}</Link>)}
            {visiblePages.at(-1)! < totalPages && <>{visiblePages.at(-1)! < totalPages - 1 && <span className="px-1 text-text-secondary">…</span>}<Link href={pageUrl(persistentParams, totalPages)} className="flex h-10 w-10 items-center justify-center rounded border border-border text-xs font-semibold">{totalPages}</Link></>}
            <Link href={pageUrl(persistentParams, Math.min(totalPages, currentPage + 1))} aria-disabled={currentPage === totalPages} className={`rounded border border-border px-4 py-2.5 text-xs font-semibold ${currentPage === totalPages ? "pointer-events-none opacity-40" : "hover:border-gold"}`}>Next</Link>
        </nav>}
    </main>;
}
