import Link from "next/link";
import { redirect } from "next/navigation";
import ProductGrid from "@/app/components/product/ProductGrid";
import ShopFilters from "@/app/components/product/ShopFilters";
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
    const allowedSorts: NonNullable<ShopProductQuery["sort"]>[] = ["newest", "title-asc", "title-desc", "price-asc", "price-desc"];
    const sort: NonNullable<ShopProductQuery["sort"]> = allowedSorts.includes(sortValue as NonNullable<ShopProductQuery["sort"]>) ? (sortValue as NonNullable<ShopProductQuery["sort"]>) : "newest";

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
    const activeFilters = [categoryId, minPriceValue, maxPriceValue].filter(Boolean).length;
    const persistentParams = new URLSearchParams();
    if (q) persistentParams.set("q", q);
    if (categoryId) persistentParams.set("category", categoryId);
    if (minPriceValue) persistentParams.set("min_price", minPriceValue);
    if (maxPriceValue) persistentParams.set("max_price", maxPriceValue);
    if (sort && sort !== "newest") persistentParams.set("sort", sort);
    if (page > totalPages) redirect(pageUrl(persistentParams, totalPages));
    const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((number) => Math.abs(number - currentPage) <= 2);

    return <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Shop jewellery</p>
            <h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Find something you&apos;ll love.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-text-secondary">Discover timeless jewellery designed for every moment.</p>
        </header>

        <ShopFilters categories={categories} values={{ q, category: categoryId, minPrice: minPriceValue, maxPrice: maxPriceValue, sort }} activeFilterCount={activeFilters} />

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
