"use client";

import Link from "next/link";
import { Button } from "@/app/components/ui";
import type { CtaBannerSection } from "@/app/types/homepage";

interface CtaBannerProps {
    section: CtaBannerSection;
}

export default function CtaBanner({ section }: CtaBannerProps) {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {section.title}
                    </h2>
                    <p className="text-lg text-purple-100 mb-8">
                        {section.description}
                    </p>

                    <Link href={section.ctaLink}>
                        <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold">
                            {section.ctaText}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
