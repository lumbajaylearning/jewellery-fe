"use client";

import Link from "next/link";
import { Button, SectionHeading } from "@/app/components/ui";
import type { HeroBannerSection } from "@/app/types/homepage";

interface HeroBannerProps {
    section: HeroBannerSection;
}

export default function HeroBanner({ section }: HeroBannerProps) {
    return (
        <section className="relative bg-gradient-to-r from-purple-50 to-pink-50 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                {section.title}
                            </h1>
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

                    {/* Image Placeholder */}
                    <div className="flex justify-center items-center bg-gray-200 rounded-lg h-96">
                        {section.desktopImage && section.desktopImage.length > 0 ? (
                            <img
                                src={section.desktopImage[0].url}
                                alt={section.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="text-center text-gray-500">
                                <p>Image coming soon</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
