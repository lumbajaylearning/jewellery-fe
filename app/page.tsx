"use client";

import { useEffect, useState } from "react";
import SiteShell from "@/app/components/site-shell";
import { Badge, Button, CategoryTile, ProductCard, SectionHeading, StepCard } from "@/app/components/ui";
import { getProducts, type Product } from "@/app/lib/api-client";

const categories = [
  {
    title: "Earrings",
    blurb: "Lightweight sculptural drops and stacked studs.",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
    href: "/category",
  },
  {
    title: "Necklaces",
    blurb: "Layered chains and polished pendants for everyday elegance.",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    href: "/category",
  },
  {
    title: "Rings",
    blurb: "Modern silhouettes with a soft, editorial finish.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    href: "/category",
  },
  {
    title: "Wristwear",
    blurb: "Curved cuffs and delicate bracelets for layered styling.",
    image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=900&q=80",
    href: "/category",
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((items) => {
        if (isMounted) {
          setProducts(items);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load products");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProducts = products.slice(0, 3).map((product) => ({
    name: product.name,
    price: `From ₹${product.base_price.toLocaleString("en-IN")}`,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
    badge: product.category,
    href: `/product?id=${product.id}`,
  }));

  return (
    <SiteShell activePage="/" cartCount={2}>
      <section className="overflow-hidden rounded-[2.25rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-2xl">
            <Badge label="Curated at home" tone="gold" />
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
              Experience fine jewellery through a private home consultation.
            </h1>
            <p className="mt-5 text-lg leading-8 text-stone-600">
              Browse a thoughtful edit, build a shortlist of up to four pieces, and invite a representative to visit your home with the selection.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/category" variant="primary">
                Explore collections
              </Button>
              <Button href="/book" variant="secondary">
                Book a visit
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-[0_30px_80px_rgba(17,17,17,0.08)]">
            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80"
              alt="Fine jewellery styling"
              className="h-[420px] w-full rounded-[1.4rem] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
        <SectionHeading eyebrow="Collections" title="A refined view of signature pieces" text="Choose by style, occasion, or the feeling you want to bring into your space." />
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryTile key={category.title} {...category} />
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
        <SectionHeading eyebrow="How it works" title="A simple flow from browse to booking" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <StepCard number="1" title="Browse" text="Discover a curated collection online and create a shortlist of pieces you love." />
          <StepCard number="2" title="Book" text="Reserve a home visit with a representative who brings your selected pieces." />
          <StepCard number="3" title="Choose" text="Try everything on, keep what you love, and buy only the pieces you decide to take home." />
        </div>
      </section>

      <section className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
        <SectionHeading eyebrow="Popular now" title="Our most-loved pieces" />
        {loading ? (
          <p className="mt-6 text-sm text-stone-600">Loading products…</p>
        ) : error ? (
          <p className="mt-6 text-sm text-rose-600">{error}</p>
        ) : featuredProducts.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-stone-600">No products are available right now.</p>
        )}
      </section>
    </SiteShell>
  );
}
