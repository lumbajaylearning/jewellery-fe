"use client";

import { SectionHeading, StepCard } from "@/app/components/ui";
import type { HowItWorksStepSection } from "@/app/types/homepage";

interface HowItWorksProps {
    sections: HowItWorksStepSection[];
}

export default function HowItWorks({ sections }: HowItWorksProps) {
    if (sections.length === 0) {
        return null;
    }

    // Group sections to find the main container
    const firstStep = sections[0];
    const title = "How It Works";
    const subtitle = "Simple steps to get your jewelry at home";

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title={title} subtitle={subtitle} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
                    {sections.map((step) => (
                        <StepCard
                            key={step.id}
                            number={step.number}
                            title={step.title}
                            description={step.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
