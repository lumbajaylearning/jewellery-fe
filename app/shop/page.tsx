
import ProductGrid from "@/app/components/product/ProductGrid";
import { getProducts } from "@/app/lib/medusa/products";

export default async function ShopPage() {
    const products = await getProducts();
    return (
        <main className="bg-background">
            <section className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10">
                <div className="mb-10 text-center">
                    <p className="font-body text-xs uppercase tracking-[0.15em] text-gold">
                        Shop Jewellery
                    </p>

                    <h1 className="mt-3 font-heading text-5xl text-text-primary">
                        Find something you&apos;ll love.
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl font-body text-sm text-text-secondary">
                        Discover timeless jewellery designed for every moment.
                    </p>
                </div>

                <ProductGrid products={products} />
            </section>
        </main>
    );
}