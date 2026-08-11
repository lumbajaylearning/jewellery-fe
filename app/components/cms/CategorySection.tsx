import React from "react";

// --- Types based on your API response ---
export interface CategoryItem {
    id: number;
    name: string;
    link: string;
    image?: string; // Optional image prop with fallback
}

export interface CategorySectionProps {
    id?: number;
    eyebrow?: string;
    title: string;
    description?: string;
    categories: CategoryItem[];
    __component?: string;
}

// Default fallback images for categories if not passed in API
const DEFAULT_IMAGES: Record<string, string> = {
    Rings: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    Earrings: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
    Necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    Bracelets: "https://images.unsplash.com/photo-1611591475179-be2542a275f1?auto=format&fit=crop&w=600&q=80",
};

export const CategorySection: React.FC<CategorySectionProps> = ({
    eyebrow,
    title,
    description,
    categories,
}) => {
    return (
        <section className="max-w-6xl mx-auto px-5 py-12 flex flex-col items-center gap-10 md:gap-12 text-center">

            {/* Header Block */}
            <div className="space-y-2 max-w-xl">
                {eyebrow && (
                    <span className="text-xs uppercase tracking-widest font-semibold text-gray-500 block">
                        {eyebrow}
                    </span>
                )}

                <h2 className="text-3xl md:text-5xl font-serif text-gray-900">
                    {title}
                </h2>

                {description && (
                    <p className="text-sm md:text-base text-gray-600 pt-1">
                        {description}
                    </p>
                )}
            </div>

            {/* Dynamic Category Grid (2 columns on Mobile, 4 columns on Desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full">
                {categories.map((category) => {
                    const imgSrc =
                        category.image ||
                        DEFAULT_IMAGES[category.name] ||
                        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80";

                    return (
                        <a
                            key={category.id}
                            href={category.link}
                            className="group flex flex-col items-center gap-3"
                        >
                            <div className="w-full aspect-[4/5] bg-gray-200 rounded-sm overflow-hidden">
                                <img
                                    src={imgSrc}
                                    alt={category.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <span className="text-sm font-medium text-gray-800 group-hover:text-black">
                                {category.name}
                            </span>
                        </a>
                    );
                })}
            </div>

        </section>
    );
};

export default CategorySection;