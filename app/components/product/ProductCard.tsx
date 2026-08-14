"use client";

import Image from "next/image";
import Link from "next/link";
import type { ShopProduct } from "@/app/types/product";

type ProductCardProps = {
    product: ShopProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
    // Sort images by rank or grab the first two images for primary/hover states
    const sortedImages = product.images
        ? [...product.images].sort((a, b) => a.rank - b.rank)
        : [];

    const primaryImage = product.thumbnail || sortedImages[0]?.url;
    const hoverImage = sortedImages[1]?.url || primaryImage;

    // Fallback dummy values
    const price = product.price.formatted;
    const details = "18K Gold · Diamond";

    return (
        <article className="group relative w-full max-w-[280px]">
            <Link href={`/product/${product.handle}`} className="block">
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-100 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                    {primaryImage ? (
                        <>
                            {/* Primary Image (Front View) */}
                            <Image
                                src={primaryImage}
                                alt={product.title}
                                fill
                                className={`object-cover transition-opacity duration-700 ease-in-out ${hoverImage !== primaryImage ? "group-hover:opacity-0" : ""
                                    }`}
                                sizes="(max-width: 768px) 50vw, 25vw"
                                unoptimized
                            />

                            {/* Secondary Image (Side/Detail View on Hover) */}
                            {hoverImage && hoverImage !== primaryImage && (
                                <Image
                                    src={hoverImage}
                                    alt={`${product.title} alternate view`}
                                    fill
                                    className="object-cover opacity-0 transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    unoptimized
                                />
                            )}
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center text-xs uppercase tracking-wider text-neutral-400">
                            No image
                        </div>
                    )}

                    {/* Floating Wishlist Button */}
                    <button
                        type="button"
                        aria-label={`Add ${product.title} to wishlist`}
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 text-neutral-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-red-500 active:scale-95"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
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
                <div className="mt-3 space-y-1 px-1">
                    <div className="flex items-baseline justify-between gap-2">
                        <h2 className="truncate text-sm font-medium tracking-tight text-neutral-900">
                            {product.title}
                        </h2>
                        <span className="shrink-0 text-sm font-semibold text-neutral-900">
                            {price}
                        </span>
                    </div>

                    <p className="text-xs font-normal tracking-wide text-neutral-500">
                        {details}
                    </p>
                </div>
            </Link>
        </article>
    );
}