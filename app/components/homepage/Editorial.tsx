"use client";

import Link from "next/link";
import { Button, SectionHeading } from "@/app/components/ui";
import type { EditorialSection } from "@/app/types/homepage";

interface EditorialProps {
    section: EditorialSection;
    articles?: Array<{
        id: number;
        title: string;
        excerpt: string;
        image: string;
        href: string;
    }>;
}

export default function Editorial({ section, articles = [] }: EditorialProps) {
    const defaultArticles = [
        {
            id: 1,
            title: "How to Choose the Perfect Ring",
            excerpt: "A comprehensive guide to finding your ideal ring size and style",
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=60",
            href: "/article/1",
        },
        {
            id: 2,
            title: "Jewelry Care 101",
            excerpt: "Learn how to keep your jewelry looking beautiful for years",
            image: "https://images.unsplash.com/photo-1517411953704-3c5c7e6b1c7e?auto=format&fit=crop&w=500&q=60",
            href: "/article/2",
        },
        {
            id: 3,
            title: "Latest Jewelry Trends",
            excerpt: "Stay up to date with the hottest jewelry styles this season",
            image: "https://images.unsplash.com/photo-1543294001-6461c3123dd7?auto=format&fit=crop&w=500&q=60",
            href: "/article/3",
        },
    ];

    const displayArticles = articles.length > 0 ? articles : defaultArticles;

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title={section.title} subtitle={section.subtitle} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {displayArticles.map((article) => (
                        <Link key={article.id} href={article.href}>
                            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                <div className="h-48 bg-gray-200 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {article.excerpt}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
