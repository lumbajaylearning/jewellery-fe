import Link from "next/link";
import React from "react";
import ProductGrid from "../product/ProductGrid";
import type { ShopProduct } from "@/app/types/product";

// --- Types ---
export type ProductItem = ShopProduct;

export interface FeaturedJewelleryProps {
  id?: number;
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  products?: ProductItem[];
  __component?: string;
}

export const FeaturedJewellery: React.FC<FeaturedJewelleryProps> = ({
  eyebrow,
  title,
  description,
  products = [],
}) => {
  return (
    <section className=" py-12 md:py-20 flex flex-col items-center text-center gap-10 md:gap-12">

      {/* Header Block */}
      <div className="space-y-2 max-w-xl">
        {eyebrow && (
          <span className="text-xs uppercase tracking-widest font-semibold text-gray-500 block">
            {eyebrow}
          </span>
        )}

        <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
          {title}
        </h2>

        {description && (
          <p className="text-sm md:text-base text-gray-600 pt-1">
            {description}
          </p>
        )}
      </div>

      {/* Product Grid: 2 columns on Mobile, 4 columns on Desktop */}
      <ProductGrid products={products} />

      <Link href="/shop" className="rounded border border-border bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary transition hover:border-gold">View all jewellery</Link>

    </section>
  );
};

export default FeaturedJewellery;
