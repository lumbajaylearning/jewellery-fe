"use client";
import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/app/types/product";

type ProductCardProps = {
    product: StoreProduct;
};

export default function ProductCard({
    product,
}: ProductCardProps) {
    const image = product.thumbnail || product.images?.[0]?.url;

    return (
        <article className="group">
            <Link href={`/shop/${product.handle}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    {image ? (
                        <Image
                            src={image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                            unoptimized
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-text-secondary">
                            No image
                        </div>
                    )}

                    <button
                        type="button"
                        aria-label={`Add ${product.title} to wishlist`}
                        onClick={(event) => {
                            event.preventDefault();
                        }}
                        className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary"
                    >
                        ♡
                    </button>
                </div>

                <div className="pt-4">
                    <h2 className="font-body text-sm text-text-primary">
                        {product.title}
                    </h2>

                    <p className="mt-1 text-sm text-text-secondary">
                        Price coming soon
                    </p>
                </div>
            </Link>
        </article>
    );
}