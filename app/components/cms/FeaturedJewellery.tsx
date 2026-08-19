import Image from "next/image";
import React from "react";
import ProductGrid from "../product/ProductGrid";

// --- Types ---
export interface ProductItem {
  id: number | string;
  name: string;
  price: string | number;
  subtitle?: string; // e.g., "18K Gold · Diamond"
  imageUrl?: string;
  link?: string;
}

export interface FeaturedJewelleryProps {
  id?: number;
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  products?: ProductItem[];
  __component?: string;
}

// Fallback dummy products matching the Figma layout if none provided in props
const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: "prd_1",
    name: "Aurum Solitaire Ring",
    price: "₹24,999",
    subtitle: "18K Gold · Diamond",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prd_2",
    name: "Classic Diamond Studs",
    price: "₹18,999",
    subtitle: "18K Gold · Diamond",
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prd_3",
    name: "Signature Pendant",
    price: "₹32,999",
    subtitle: "18K Gold · Diamond",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "prd_4",
    name: "Aurum Gold Bracelet",
    price: "₹21,999",
    subtitle: "18K Gold · Diamond",
    imageUrl: "https://images.unsplash.com/photo-1611591475179-be2542a275f1?auto=format&fit=crop&w=600&q=80",
  },
];

export const FeaturedJewellery: React.FC<FeaturedJewelleryProps> = ({
  eyebrow,
  title,
  description,
  products = DEFAULT_PRODUCTS,
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

    </section>
  );
};

export default FeaturedJewellery;