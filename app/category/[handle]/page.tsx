import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronLeft } from "lucide-react";
import ProductGrid from "@/app/components/product/ProductGrid";
import { getProductCategoryByHandle, getProducts } from "@/app/lib/medusa/products";

type CategoryPageProps = {
    params: Promise<{ handle: string }>;
    searchParams: Promise<{ page?: string | string[] }>;
};

function categoryPageUrl(handle: string, page: number) {
    return page <= 1 ? `/category/${handle}` : `/category/${handle}?page=${page}`;
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
    const [{ handle }, query] = await Promise.all([params, searchParams]);
    const category = await getProductCategoryByHandle(decodeURIComponent(handle));
    if (!category) notFound();

    const pageValue = Array.isArray(query.page) ? query.page[0] : query.page;
    const requestedPage = Math.max(1, Number(pageValue) || 1);
    const { products, count, limit } = await getProducts({ categoryId: category.id, page: requestedPage, limit: 12, sort: "newest" });
    const totalPages = Math.max(1, Math.ceil(count / limit));
    const page = Math.min(requestedPage, totalPages);

    return <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <Link href="/category" className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary"><ChevronLeft className="h-4 w-4" /> All collections</Link>

        <header className="mt-7 flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Jewellery collection</p><h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">{category.name}</h1><p className="mt-3 text-sm leading-6 text-text-secondary">{category.description || `Explore our curated ${category.name.toLowerCase()} collection.`}</p></div>
            <Link href={`/shop?category=${encodeURIComponent(category.id)}`} className="inline-flex items-center gap-2 text-xs font-semibold text-text-primary">Search and filter this collection <ArrowRight className="h-4 w-4 text-gold" /></Link>
        </header>

        <div className="mb-6 mt-8 flex items-center justify-between"><p className="text-sm text-text-secondary"><strong className="text-text-primary">{count}</strong> {count === 1 ? "piece" : "pieces"}</p></div>
        <ProductGrid products={products} />

        {totalPages > 1 && <nav aria-label={`${category.name} pagination`} className="mt-12 flex items-center justify-center gap-2">
            <Link href={categoryPageUrl(category.handle, Math.max(1, page - 1))} aria-disabled={page === 1} className={`rounded border border-border px-4 py-2.5 text-xs font-semibold ${page === 1 ? "pointer-events-none opacity-40" : "hover:border-gold"}`}>Previous</Link>
            <span className="px-3 text-xs text-text-secondary">Page {page} of {totalPages}</span>
            <Link href={categoryPageUrl(category.handle, Math.min(totalPages, page + 1))} aria-disabled={page === totalPages} className={`rounded border border-border px-4 py-2.5 text-xs font-semibold ${page === totalPages ? "pointer-events-none opacity-40" : "hover:border-gold"}`}>Next</Link>
        </nav>}
    </main>;
}
