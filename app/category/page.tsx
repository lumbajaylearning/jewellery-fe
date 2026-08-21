import Link from "next/link";
import { ArrowRight, Gem, Sparkles } from "lucide-react";
import { getProductCategories } from "@/app/lib/medusa/products";
import { Category } from "@/app/types/product";

export default async function CategoriesPage() {
    const categories = await getProductCategories();

    return <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <header className="rounded border border-border bg-surface px-5 py-10 text-center sm:px-10 sm:py-14">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white text-gold"><Sparkles className="h-5 w-5" /></span>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Explore the collection</p>
            <h1 className="mx-auto mt-3 max-w-3xl font-heading text-4xl text-text-primary sm:text-5xl">Jewellery for every chapter.</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-text-secondary">Browse our Medusa-powered catalogue by category, then refine your selection by price or style.</p>
        </header>

        {categories.length > 0 ? <section className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {categories.map((category: Category, index: number) => <Link key={category.id} href={`/category/${category.handle}`} className="group min-w-0 overflow-hidden rounded border border-border bg-white transition hover:border-gold hover:shadow-sm">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-[16/10]">
                    {category.image ? <img src={category.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,#ffffff_0,#f1ece4_70%)]"><Gem className="h-8 w-8 text-gold sm:h-12 sm:w-12" /><span className="absolute left-3 top-3 text-[10px] font-semibold tracking-[0.2em] text-text-secondary sm:left-5 sm:top-5">{String(index + 1).padStart(2, "0")}</span></div>}
                </div>
                <div className="p-4 sm:p-5"><div className="flex min-w-0 items-center justify-between gap-2"><h2 className="truncate font-heading text-xl text-text-primary sm:text-2xl">{category.name}</h2><ArrowRight className="h-4 w-4 flex-none text-gold transition-transform group-hover:translate-x-1" /></div><p className="mt-2 line-clamp-2 text-xs leading-5 text-text-secondary">{category.description || `Discover our curated ${category.name.toLowerCase()} collection.`}</p></div>
            </Link>)}
        </section> : <section className="mt-8 rounded border border-dashed border-border bg-white px-5 py-16 text-center"><Gem className="mx-auto h-7 w-7 text-gold" /><h2 className="mt-4 font-heading text-2xl text-text-primary">Collections are being curated.</h2><p className="mt-2 text-sm text-text-secondary">Create product categories in Medusa Admin to display them here.</p><Link href="/shop" className="mt-5 inline-block text-xs font-semibold text-text-primary underline underline-offset-4">Browse all jewellery</Link></section>}

        <section className="mt-10 flex flex-col items-center justify-between gap-4 rounded border border-gold bg-surface p-6 text-center sm:flex-row sm:p-8 sm:text-left"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Not sure where to begin?</p><h2 className="mt-2 font-heading text-2xl text-text-primary">Explore the complete jewellery edit.</h2></div><Link href="/shop" className="inline-flex w-full items-center justify-center gap-2 rounded bg-text-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white sm:w-auto">Shop all jewellery <ArrowRight className="h-4 w-4" /></Link></section>
    </main>;
}
