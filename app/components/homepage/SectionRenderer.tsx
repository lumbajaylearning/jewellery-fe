"use client";

import React from "react";
import HeroBanner from "./HeroBanner";
import CategoryGrid from "./CategoryGrid";
import ProductCarousel from "./ProductCarousel";
import CollectionShowcase from "./CollectionShowcase";
import HomeTrial from "./HomeTrial";
import HowItWorks from "./HowItWorks";
import TrustSection from "./TrustSection";
import Editorial from "./Editorial";
import CtaBanner from "./CtaBanner";
import type { Section, HowItWorksStepSection, TrustItemSection } from "@/app/types/homepage";

interface SectionRendererProps {
    sections: Section[];
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
    // Group related sections
    const processedSections = sections.reduce((acc, section, index) => {
        const lastGroup = acc[acc.length - 1];

        // Group HowItWorks steps and TrustItems
        if (section.__component === "homepage.how-it-works-step") {
            if (lastGroup?.type === "how-it-works") {
                (lastGroup.data as HowItWorksStepSection[]).push(section as HowItWorksStepSection);
            } else {
                acc.push({
                    type: "how-it-works",
                    data: [section as HowItWorksStepSection],
                });
            }
        } else if (section.__component === "homepage.trust-item") {
            if (lastGroup?.type === "trust-items") {
                (lastGroup.data as TrustItemSection[]).push(section as TrustItemSection);
            } else {
                acc.push({
                    type: "trust-items",
                    data: [section as TrustItemSection],
                });
            }
        } else if (section.__component === "homepage.trust-section") {
            acc.push({
                type: "trust-section",
                data: section,
            });
        } else {
            acc.push({
                type: section.__component,
                data: section,
            });
        }

        return acc;
    }, [] as Array<{ type: string; data: any }>);

    return (
        <>
            {processedSections.map((item, index) => {
                const { type, data } = item;

                switch (type) {
                    case "homepage.hero-banner":
                        return <HeroBanner key={index} section={data} />;

                    case "homepage.category-grid":
                        return <CategoryGrid key={index} section={data} />;

                    case "homepage.product-carousel":
                        return <ProductCarousel key={index} section={data} />;

                    case "homepage.collection-showcase":
                        return <CollectionShowcase key={index} section={data} />;

                    case "homepage.home-trial":
                        return <HomeTrial key={index} section={data} />;

                    case "homepage.how-it-works-step":
                        return <HowItWorks key={index} sections={data} />;

                    case "homepage.trust-section":
                        return <TrustSection key={index} trustSection={data} />;

                    case "homepage.trust-items":
                        // Find the trust section that precedes this group
                        const prevTrustSection = processedSections[index - 1];
                        const trustSection = prevTrustSection?.type === "trust-section"
                            ? prevTrustSection.data
                            : null;
                        return (
                            <TrustSection
                                key={index}
                                trustSection={trustSection || {
                                    id: 0,
                                    title: "Why Choose Us",
                                    subtitle: "Why Choose Us",
                                    __component: "homepage.trust-section"
                                }}
                                trustItems={data}
                            />
                        );

                    case "homepage.editorial":
                        return <Editorial key={index} section={data} />;

                    case "homepage.cta-banner":
                        return <CtaBanner key={index} section={data} />;

                    default:
                        console.warn(`Unknown section type: ${type}`);
                        return null;
                }
            })}
        </>
    );
}
