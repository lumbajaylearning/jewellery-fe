"use client";

import Link from "next/link";
import { SectionHeading, CategoryTile } from "@/app/components/ui";
import type { CategoryGridSection } from "@/app/types/homepage";

interface CategoryGridProps {
    section: CategoryGridSection;
    categories?: Array<{
        title: string;
        blurb: string;
        image: string;
        href: string;
    }>;
}

export default function CategoryGrid({ section, categories = [] }: CategoryGridProps) {
    // Default categories if none provided
    const defaultCategories = [
        {
            title: "Earrings",
            blurb: "Lightweight sculptural drops and stacked studs.",
            image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=900&q=80",
            href: "/category?type=earrings",
        },
        {
            title: "Necklaces",
            blurb: "Layered chains and polished pendants for everyday elegance.",
            image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
            href: "/category?type=necklaces",
        },
        {
            title: "Rings",
            blurb: "Modern silhouettes with a soft, editorial finish.",
            image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
            href: "/category?type=rings",
        },
        {
            title: "Wristwear",
            blurb: "Curved cuffs and delicate bracelets for layered styling.",
            image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=900&q=80",
            href: "/category?type=wristwear",
        },
    ];

    const displayCategories = categories.length > 0 ? categories : defaultCategories;

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title={section.title} subtitle={section.subtitle} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    {displayCategories.map((category) => (
                        <Link key={category.title} href={category.href}>
                            <CategoryTile
                                title={category.title}
                                blurb={category.blurb}
                                image={category.image}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
