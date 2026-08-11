// Image interface for Strapi media objects
export interface StrapiImage {
    id: number;
    documentId: string;
    name: string;
    url: string;
    width: number;
    height: number;
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
export interface HeroBannerSection extends BaseSection {
    __component: "homepage.hero-banner";
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    alignment: string | null;
    desktopImage: StrapiImage | null;
    mobileImage: StrapiImage | null;
}

// Category Grid Section
export interface CategoryGridSection extends BaseSection {
    __component: "homepage.category-grid";
    title: string;
    subtitle: string;
    categoryIds: number[] | null;
}

// Collection Showcase Section
export interface CollectionShowcaseSection extends BaseSection {
    __component: "homepage.collection-showcase";
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    image: StrapiImage | null;
}

// Product Carousel Section
export interface ProductCarouselSection extends BaseSection {
    __component: "homepage.product-carousel";
    title: string;
    subtitle: string;
    limit: number;
    source: "trending" | "new-arrivals" | string;
}

// Home Trial Section
export interface HomeTrialSection extends BaseSection {
    __component: "homepage.home-trial";
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    image: StrapiImage | null;
}

// How It Works Step Section
export interface HowItWorksStepSection extends BaseSection {
    __component: "homepage.how-it-works-step";
    number: number;
    title: string;
    description: string;
    icon: StrapiImage | null;
}

// Trust Section
export interface TrustSection extends BaseSection {
    __component: "homepage.trust-section";
    title: string;
    subtitle: string;
}

// Trust Item Section
export interface TrustItemSection extends BaseSection {
    __component: "homepage.trust-item";
    title: string;
    description: string;
    icon: StrapiImage | null;
}

// Editorial Section
export interface EditorialSection extends BaseSection {
    __component: "homepage.editorial";
    title: string;
    subtitle: string;
}

// CTA Banner Section
export interface CtaBannerSection extends BaseSection {
    __component: "homepage.cta-banner";
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    image: StrapiImage | null;
}

// Discriminated union type of all sections
export type Section =
    | HeroBannerSection
    | CategoryGridSection
    | CollectionShowcaseSection
    | ProductCarouselSection
    | HomeTrialSection
    | HowItWorksStepSection
    | TrustSection
    | TrustItemSection
    | EditorialSection
    | CtaBannerSection;

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
