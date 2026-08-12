import type { CategoryItem } from "@/app/components/cms/CategorySection";
import type { ProductItem } from "@/app/components/cms/FeaturedJewellery";
import type { HowItWorksStep } from "@/app/components/cms/HowItWorks";
import type { TestimonialItem } from "@/app/components/cms/Testimonials";
import type { StrapiImageData } from "@/app/components/cms/HomeTrial";

// Image interface for Strapi media objects
export interface StrapiImage {
    id: number;
    documentId: string;
    name: string;
    url: string;
    width: number;
    height: number;
    alternativeText?: string | null;
    formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
    };
}

// Base interface for all sections
interface BaseSection {
    id: number;
    __component: string;
}


// Hero Banner Section
export interface HeroBannerProps extends BaseSection {
    __component: "homepage.hero-banner";
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    alignment?: string | null;
    image?: StrapiImage | null;
}

// Category Section
export interface CategorySectionData extends BaseSection {
    __component: "homepage.category-section";
    eyebrow?: string;
    title: string;
    description?: string;
    categories: CategoryItem[];
}

// Home Trial Section
export interface HomeTrialSection extends BaseSection {
    __component: "homepage.home-trial";
    eyebrow?: string;
    title: string;
    description?: string;
    ctaLabel?: string;
    ctaUrl?: string;
    image?: StrapiImageData;
}

// Featured Jewellery Section
export interface FeaturedJewellerySection extends BaseSection {
    __component: "homepage.featured-jewellery";
    eyebrow?: string | null;
    title: string;
    description?: string | null;
    products?: ProductItem[];
}

// How It Works Section
export interface HowItWorksSection extends BaseSection {
    __component: "homepage.how-it-works";
    eyebrow?: string;
    title: string;
    description?: string | null;
    steps: HowItWorksStep[];
}

// Testimonials Section
export interface TestimonialsSection extends BaseSection {
    __component: "homepage.testimonials";
    eyebrow?: string;
    title: string;
    description?: string | null;
    testimonials: TestimonialItem[];
}

// Final CTA Section
export interface FinalCTASectionData extends BaseSection {
    __component: "homepage.final-cta";
    eyebrow?: string | null;
    title: string;
    description?: string | null;
    ctaLabel?: string | null;
    ctaUrl?: string | null;
    image?: unknown | null;
}

// Discriminated union type of all sections
export type Section =
    | HeroBannerProps
    | CategorySectionData
    | HomeTrialSection
    | FeaturedJewellerySection
    | HowItWorksSection
    | TestimonialsSection
    | FinalCTASectionData;

// Main Homepage data structure
export interface HomepageData {
    data: {
        id: number;
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        sections: Section[];
    };
    meta: Record<string, any>;
}
