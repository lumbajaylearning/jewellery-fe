"use client";

import Link from "next/link";
import { Button, SectionHeading } from "@/app/components/ui";
import type { HomeTrialSection } from "@/app/types/homepage";

interface HomeTrialProps {
    section: HomeTrialSection;
}

export default function HomeTrial({ section }: HomeTrialProps) {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Content */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
                                {section.title}
                            </h2>
                            <p className="text-lg text-gray-600 mb-4">
                                {section.subtitle}
                            </p>
                            <p className="text-base text-gray-500">
                                {section.description}
                            </p>
                        </div>

                        <Link href={section.ctaLink}>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
                                {section.ctaText}
                            </Button>
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="flex justify-center items-center bg-gray-200 rounded-lg h-96">
                        {section.image ? (
                            <img
                                src={section.image.url}
                                alt={section.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        ) : (
                            <div className="text-center text-gray-500">
                                <p>Home Trial Image</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
