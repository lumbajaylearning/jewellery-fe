"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteShell from "@/app/components/site-shell";
import { Badge, Button, CartProgress, SectionHeading } from "@/app/components/ui";
import { getProduct, type Product } from "@/app/lib/api-client";

const gallery = [
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
];

const related = [
    { name: "Lattice cuff bracelet", price: "From ₹9,400", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80" },
    { name: "Contour diamond ring", price: "From ₹12,200", image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80" },
    { name: "Soft gold pendant", price: "From ₹16,600", image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=900&q=80" },
];

export default function ProductPage() {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id") ?? "";
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(Boolean(productId));
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!productId) {
            setError("No product selected.");
            setLoading(false);
            return;
        }

        let isMounted = true;

        getProduct(productId)
            .then((item) => {
                if (isMounted) {
                    setProduct(item);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Unable to load product details");
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
    }, [productId]);

    const badgeLabel = useMemo(() => product?.category ?? "New", [product]);

    return (
        <SiteShell activePage="/category" cartCount={2}>
            <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
                    {gallery.map((image, index) => (
                        <div key={image} className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white">
                            <img src={image || 'vercel.svg'} alt={`Piece view ${index + 1}`} className="h-56 w-full object-cover" />
                        </div>
                    ))}
                </div>

                <div className="space-y-6 rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                    {loading ? (
                        <p className="text-sm text-stone-600">Loading product details…</p>
                    ) : error ? (
                        <p className="text-sm text-rose-600">{error}</p>
                    ) : product ? (
                        <>
                            <div>
                                <Badge label={badgeLabel} tone="gold" />
                                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">{product.name}</h1>
                                <p className="mt-4 text-lg leading-8 text-stone-600">
                                    {product.description ?? "A thoughtfully curated piece for a private home consultation, with indicative pricing that is finalised during the visit."}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <span className="rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-700">{product.category}</span>
                                <span className="rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-700">Approximate pricing</span>
                            </div>

                            <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
                                <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Indicative price</p>
                                <p className="mt-2 text-3xl font-semibold text-stone-900">From ₹{product.base_price.toLocaleString("en-IN")}</p>
                                <p className="mt-3 text-sm leading-7 text-stone-600">
                                    Approximate — final pricing is calculated by your representative during the home visit.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button href="/cart" variant="primary">Add to consultation</Button>
                                <Button href="/book" variant="secondary">Book a visit</Button>
                            </div>

                            <CartProgress total={Math.min(product.base_price, 20000)} />
                        </>
                    ) : null}
                </div>
            </section>

            <section className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
                <SectionHeading eyebrow="Similar pieces" title="You may also like" />
                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {related.map((item) => (
                        <article key={item.name} className="overflow-hidden rounded-[1.5rem] border border-stone-200 bg-[var(--surface)]">
                            <img src={item.image || 'vercel.svg'} alt={item.name} className="h-48 w-full object-cover" />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold text-stone-900">{item.name}</h3>
                                <p className="mt-2 text-sm text-stone-600">{item.price}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </SiteShell>
    );
}
