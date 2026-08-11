import React from "react";

// --- Types based on your Strapi API response ---
export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
}

export interface StrapiImageData {
  id: number;
  url: string;
  alternativeText?: string | null;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

export interface HomeTrialProps {
  id?: number;
  eyebrow?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  image?: StrapiImageData;
  __component?: string;
  baseUrl?: string; // Optional API media base URL prefix (e.g., http://localhost:1337)
}

export const HomeTrial: React.FC<HomeTrialProps> = ({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaUrl,
  image,
  baseUrl = "",
}) => {
  // Select best responsive image URL or use fallback
  const rawImageUrl =
    image?.formats?.large?.url ||
    image?.formats?.medium?.url ||
    image?.url;

  const imageUrl = rawImageUrl
    ? rawImageUrl.startsWith("http")
      ? rawImageUrl
      : `${process.env.NEXT_PUBLIC_API_URL}${rawImageUrl}`
    : "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80";
  console.log(imageUrl, rawImageUrl);

  return (
    <section className="max-w-6xl mx-auto px-5 py-12 md:py-20 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

      {/* Content Block (Bottom on Mobile, Left on Desktop) */}
      <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-5">

        {eyebrow && (
          <span className="text-xs uppercase tracking-widest font-semibold text-gray-500">
            {eyebrow}
          </span>
        )}

        <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
          {title}
        </h2>

        {description && (
          <p className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed whitespace-pre-line">
            {description.trim()}
          </p>
        )}

        {ctaLabel && ctaUrl && (
          <div className="pt-2">
            <a
              href={ctaUrl}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-800 text-sm font-medium rounded-sm hover:bg-gray-50 transition"
            >
              {ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}

      </div>

      {/* Image Block (Top on Mobile, Right on Desktop) */}
      <div className="w-full md:flex-1 h-[320px] sm:h-[420px] md:h-[500px]">
        <img
          src={imageUrl}
          alt={image?.alternativeText || title}
          className="w-full h-full object-cover rounded-sm bg-gray-100"
        />
      </div>

    </section>
  );
};

export default HomeTrial;