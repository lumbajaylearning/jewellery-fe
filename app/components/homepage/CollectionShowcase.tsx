"use client";

import Link from "next/link";
import { Button, SectionHeading } from "@/app/components/ui";
import type { CollectionShowcaseSection } from "@/app/types/homepage";

interface CollectionShowcaseProps {
    section: CollectionShowcaseSection;
}

export default function CollectionShowcase({ section }: CollectionShowcaseProps) {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div className="flex justify-center items-center bg-gray-200 rounded-lg h-96 order-2 md:order-1">
                        {section.image ? (
                            <img
                                src={section.image.url}
                                alt={section.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="text-center text-gray-500">
                                <p>Collection Image</p>
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-6 order-1 md:order-2">
                        <div>
                            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
                                {section.title}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {section.subtitle}
                            </p>
                        </div>

                        <Link href={section.ctaLink}>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold">
                                {section.ctaText}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
