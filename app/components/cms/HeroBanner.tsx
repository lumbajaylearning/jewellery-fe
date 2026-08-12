import { HeroBannerProps } from "@/app/types/homepage";

type HeroBannerComponentProps = Omit<HeroBannerProps, "id" | "__component">;

const STRAPI_URL = process.env.STRAPI_URL!;

export default function HeroBanner({
    eyebrow,
    title,
    subtitle,
    ctaText,
    ctaLink,
    image,
}: HeroBannerComponentProps) {
    const imageUrl = image?.url ? `${STRAPI_URL}${image.url}` : null;

    return (
        <section className="max-w-6xl mx-auto px-5 py-12 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">


            <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">

                {eyebrow && (
                    <p className="text-xs uppercase tracking-widest font-semibold text-gray-500">
                        {eyebrow}
                    </p>
                )}

                <h1 className="text-4xl md:text-6xl font-serif text-gray-900 leading-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm md:text-base text-gray-600 max-w-md">
                        {subtitle}
                    </p>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    {ctaText && (
                        <a
                            href={ctaLink}
                            className="px-6 py-3 bg-black bg-primary text-white text-sm font-medium rounded-sm transition-opacity hover:opacity-90 md:mt-10"
                        >
                            {ctaText}
                        </a>
                    )}
                </div>

                <div className="pt-2">
                    <div className="text-sm text-black">★★★★★ <span className="font-semibold text-xs ml-1">4.9/5</span></div>
                    <p className="text-xs text-gray-500">Loved by 20,000+ customers</p>
                </div>

            </div>

            <div className="w-full md:flex-1 h-[320px] sm:h-[420px] md:h-[520px]">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={image?.alternativeText || "Jewellery Collection"}
                        className="w-full h-full object-cover rounded-sm"
                    />
                )}
            </div>

        </section>

    );
}