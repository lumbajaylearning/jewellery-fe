import React from "react";

// --- Types based on your API response ---
export interface TestimonialItem {
    id: number;
    quote: string;
    customerName: string;
    location?: string;
    rating?: number;
}

export interface TestimonialsProps {
    id?: number;
    eyebrow?: string;
    title: string;
    description?: string | null;
    testimonials: TestimonialItem[];
    __component?: string;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
    eyebrow,
    title,
    description,
    testimonials,
}) => {
    return (
        <section className=" py-12 md:py-20 flex flex-col items-center text-center gap-12 md:gap-16">

            {/* Header Block */}
            <div className="space-y-3 max-w-xl">
                {eyebrow && (
                    <span className="text-xs uppercase tracking-widest font-semibold text-gray-500 block">
                        {eyebrow}
                    </span>
                )}

                <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm md:text-base text-gray-600 pt-1">
                        {description}
                    </p>
                )}
            </div>

            {/* Testimonials Grid (Stacked on Mobile, 3 Columns on Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 w-full items-start">
                {testimonials.map((item) => {
                    const ratingCount = item.rating || 5;

                    return (
                        <div
                            key={item.id}
                            className="flex flex-col items-center space-y-4 max-w-sm mx-auto"
                        >
                            {/* Star Rating */}
                            <div className="flex items-center space-x-1 text-black text-xs tracking-widest">
                                {"★".repeat(ratingCount)}
                            </div>

                            {/* Quote Text */}
                            <p className="text-xs md:text-sm text-gray-700 leading-relaxed italic whitespace-pre-line">
                                {item.quote.trim().replace(/t$/, "")}
                            </p>

                            {/* Customer Info */}
                            <div className="text-xs space-y-0.5 pt-1">
                                <p className="font-medium text-gray-900">
                                    — {item.customerName.trim()}
                                </p>
                                {item.location && (
                                    <p className="text-gray-500">{item.location}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
};

export default Testimonials;