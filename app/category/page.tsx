import Link from "next/link";
import SiteShell from "@/app/components/site-shell";
import { Badge, Button, ProductCard, SectionHeading } from "@/app/components/ui";

const products = [
    {
        name: "Sculpted pearl drop",
        price: "From ₹14,800",
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
        badge: "New",
    },
    {
        name: "Contour diamond ring",
        price: "From ₹12,200",
        image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
        badge: "Popular pick",
    },
    {
        name: "Lattice cuff bracelet",
        price: "From ₹9,400",
        image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    },
    {
        name: "Soft gold pendant",
        price: "From ₹16,600",
        image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=900&q=80",
        badge: "Bestseller",
    },
];

const filters = ["All pieces", "Occasion: weddings", "Budget: under 15k", "Available this week"];

export default function CategoryPage() {
    return (
        <SiteShell activePage="/category" cartCount={2}>
            <section className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <Badge label="Collections" tone="gold" />
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
                            Editorial pieces for evening occasions and everyday heirlooms.
                        </h1>
                        <p className="mt-4 text-lg leading-8 text-stone-600">
                            Browse by mood and styling, then add pieces to your consultation cart for a guided visit at home.
                        </p>
                    </div>
                    <Button href="/book" variant="primary">
                        Book a home visit
                    </Button>
                </div>
            </section>

            <section className="rounded-[2rem] border border-stone-200 bg-white p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <SectionHeading eyebrow="Refine your edit" title="Find the right pieces quickly" />
                    <div className="flex flex-wrap gap-3">
                        {filters.map((filter) => (
                            <button key={filter} className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-600">
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard key={product.name} {...product} href="/product" />
                    ))}
                </div>
            </section>

            <section className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-strong)]">Consultation notes</p>
                        <h2 className="mt-3 text-2xl font-semibold text-stone-900">Bring up to four pieces into your visit.</h2>
                    </div>
                    <Link href="/cart" className="text-sm font-semibold text-stone-700 underline decoration-stone-300 underline-offset-4">
                        Review your consultation cart
                    </Link>
                </div>
            </section>
        </SiteShell>
    );
}
