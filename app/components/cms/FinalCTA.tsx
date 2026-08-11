import React from "react";

// --- Types based on your Strapi API response ---
export interface FinalCTASectionProps {
    id?: number;
    eyebrow?: string | null;
    title: string;
    description?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
    image?: unknown | null;
    __component?: string;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
    eyebrow,
    title,
    description,
    ctaLabel,
    ctaUrl,
}) => {
    return (
        <section className="max-w-4xl mx-auto px-5 py-16 md:py-24 flex flex-col items-center text-center space-y-6">

            {/* Eyebrow & Title */}
            <div className="space-y-3">
                {eyebrow && (
                    <span className="text-xs uppercase tracking-widest font-semibold text-gray-500 block">
                        {eyebrow}
                    </span>
                )}

                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
                    {title}
                </h2>
            </div>

            {/* Description */}
            {description && (
                <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed">
                    {description.trim()}
                </p>
            )}

            {/* Call to Action Button */}
            {ctaLabel && ctaUrl && (
                <div className="pt-2">
                    <a
                        href={ctaUrl}
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-900 text-sm font-medium rounded-sm hover:bg-gray-50 transition"
                    >
                        {ctaLabel}
                    </a>
                </div>
            )}

        </section>
    );
};

export default FinalCTASection;