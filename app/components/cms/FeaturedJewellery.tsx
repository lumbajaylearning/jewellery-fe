import React from "react";

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
    id: 1,
    name: "Aurum Solitaire Ring",
    price: "₹24,999",
    subtitle: "18K Gold · Diamond",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    name: "Classic Diamond Studs",
    price: "₹18,999",
    subtitle: "18K Gold · Diamond",
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    name: "Signature Pendant",
    price: "₹32,999",
    subtitle: "18K Gold · Diamond",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 4,
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
    <section className="max-w-6xl mx-auto px-5 py-12 md:py-20 flex flex-col items-center text-center gap-10 md:gap-12">

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
        {products.map((product) => {
          const formattedPrice =
            typeof product.price === "number"
              ? `₹${product.price.toLocaleString("en-IN")}`
              : product.price;

          return (
            <div key={product.id} className="group flex flex-col items-center text-center">

              {/* Product Image Box with Heart Icon */}
              <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden mb-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Wishlist / Heart Icon */}
                <button
                  type="button"
                  aria-label="Add to Wishlist"
                  className="absolute top-3 right-3 text-gray-600 hover:text-black transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              </div>

              {/* Product Details */}
              <a href={product.link || "#"} className="space-y-1">
                <h3 className="text-xs md:text-sm font-medium text-gray-900 group-hover:underline">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-gray-900">
                  {formattedPrice}
                </p>
                {product.subtitle && (
                  <p className="text-[11px] text-gray-500">
                    {product.subtitle}
                  </p>
                )}
              </a>

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default FeaturedJewellery;