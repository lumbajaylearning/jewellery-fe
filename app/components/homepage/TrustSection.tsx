"use client";

import { SectionHeading } from "@/app/components/ui";
import type { TrustSection, TrustItemSection } from "@/app/types/homepage";

interface TrustSectionProps {
    trustSection: TrustSection;
    trustItems?: TrustItemSection[];
}

export default function TrustSectionComponent({ trustSection, trustItems = [] }: TrustSectionProps) {
    const defaultTrustItems = [
        {
            title: "Verified Quality",
            description: "All pieces are handpicked and verified for authenticity",
            icon: "✓",
        },
        {
            title: "Easy Returns",
            description: "Try before you buy - easy 30-day returns",
            icon: "↩",
        },
        {
            title: "Expert Support",
            description: "Our jewelry experts are here to help you find the perfect piece",
            icon: "👥",
        },
    ];

    const items = trustItems.length > 0
        ? trustItems.map(item => ({
            title: item.title,
            description: item.description,
            icon: item.icon?.url || "⭐",
        }))
        : defaultTrustItems;

    return (
        <section className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title={trustSection.title} subtitle={trustSection.subtitle} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {items.map((item) => (
                        <div key={item.title} className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {item.title}
                            </h3>
                            <p className="text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
