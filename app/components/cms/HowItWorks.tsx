import React from "react";

// --- Types based on your API response ---
export interface HowItWorksStep {
    id: number;
    title: string;
    description: string;
}

export interface HowItWorksProps {
    id?: number;
    eyebrow?: string;
    title: string;
    description?: string | null;
    steps: HowItWorksStep[];
    __component?: string;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
    eyebrow,
    title,
    description,
    steps,
}) => {
    return (
        <section id="how-it-works" className="scroll-mt-28 py-12 md:py-20 flex flex-col items-center text-center gap-12 md:gap-16">

            {/* Header Block */}
            <div className="space-y-3 max-w-2xl">
                {eyebrow && (
                    <span className="text-xs uppercase tracking-widest font-semibold text-gray-500 block">
                        {eyebrow}
                    </span>
                )}

                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm md:text-base text-gray-600">
                        {description}
                    </p>
                )}
            </div>

            {/* Steps Grid (Stacked on Mobile, 4-Column Row on Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6 w-full">
                {steps.map((step, index) => {
                    // Format step index as two digits (01, 02, 03, 04)
                    const stepNumber = String(index + 1).padStart(2, "0");

                    return (
                        <div key={step.id} className="flex flex-col items-center space-y-2">
                            {/* Step Number */}
                            <span className="text-xs font-semibold text-gray-400 tracking-wider">
                                {stepNumber}
                            </span>

                            {/* Step Title */}
                            <h3 className="text-base font-medium text-gray-900">
                                {step.title}
                            </h3>

                            {/* Step Description */}
                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed max-w-xs whitespace-pre-line">
                                {step.description.trim()}
                            </p>
                        </div>
                    );
                })}
            </div>

        </section>
    );
};

export default HowItWorks;
