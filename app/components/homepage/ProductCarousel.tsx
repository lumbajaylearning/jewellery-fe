"use client";

import Link from "next/link";
import { Button, SectionHeading, ProductCard } from "@/app/components/ui";
import type { ProductCarouselSection } from "@/app/types/homepage";

interface ProductCarouselProps {
    section: ProductCarouselSection;
    products?: Array<{
        id: number;
        name: string;
        base_price: number;
        category: string;
        description?: string | null;
    }>;
}

export default function ProductCarousel({ section, products = [] }: ProductCarouselProps) {
    // Placeholder products for demo
    const placeholderProducts = [
        {
            id: 1,
            name: "Gold Elegance Ring",
            base_price: 2500,
            category: "Rings",
            description: "A timeless piece",
        },
        {
            id: 2,
            name: "Diamond Necklace",
            base_price: 5000,
            category: "Necklaces",
            description: "Sparkling beauty",
        },
        {
            id: 3,
            name: "Pearl Earrings",
            base_price: 1800,
            category: "Earrings",
            description: "Classic elegance",
        },
        {
            id: 4,
            name: "Silver Bracelet",
            base_price: 1500,
            category: "Wristwear",
            description: "Delicate design",
        },
        {
            id: 5,
            name: "Gemstone Ring",
            base_price: 3200,
            category: "Rings",
            description: "Vibrant colors",
        },
        {
            id: 6,
            name: "Gold Chain",
            base_price: 2800,
            category: "Necklaces",
            description: "Versatile style",
        },
    ];

    const displayProducts = products.length > 0 ? products.slice(0, section.limit) : placeholderProducts;

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title={section.title} subtitle={section.subtitle} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {displayProducts.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`}>
                            <ProductCard
                                name={product.name}
                                price={product.base_price}
                                category={product.category}
                                image="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=60"
                            />
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center mt-12">
                    <Link href="/category">
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
