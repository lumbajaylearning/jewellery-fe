import ProductCard from "./ProductCard";
import type { StoreProduct } from "@/app/types/product";

type ProductGridProps = {
    products: StoreProduct[];
};

export default function ProductGrid({
    products,
}: ProductGridProps) {
    if (!products.length) {
        return (
            <div className="py-20 text-center">
                <p className="text-text-secondary">
                    No products found.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}