import { strapiFetch } from "./client";
import type { HomepageData } from "@/app/types/homepage";
import type { AnnouncementBarProps } from "@/app/components/layout/AnnouncementBar";
import type { FooterProps } from "@/app/components/layout/Footer";
import type { ContentPageResponse } from "@/app/types/content-page";

export interface SiteSettingData {
    data: {
        id: number;
        announcementBar: AnnouncementBarProps;
        footer: FooterProps;
    };
    meta: Record<string, unknown>;
}

const fallbackHomepage: HomepageData = {
    data: {
        id: 1,
        documentId: "fallback-homepage",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        sections: [],
    },
    meta: {},
};

const fallbackSiteSettings: SiteSettingData = {
    data: {
        id: 1,
        announcementBar: {
            id: 1,
            message: "Complimentary home consultation",
            linkLabel: "Book now",
            linkUrl: "/book",
            enabled: true,
        },
        footer: {
            id: 1,
            brandName: "AURUM",
            brandDescription: "Curated jewellery for private, thoughtful gifting.",
            copyright: "© 2026 Aurum",
            columns: [],
            legalLinks: [
                { label: "Privacy", url: "/privacy" },
                { label: "Terms", url: "/terms" },
            ],
        },
    },
    meta: {},
};

export function getHomepage() {
    return strapiFetch<HomepageData>("/api/homepage?populate[sections][populate]=*").catch(() => fallbackHomepage);
}

export function getSiteSetting() {
    return strapiFetch<SiteSettingData>(`/api/site-setting?populate[announcementBar]=*&populate[footer][populate][columns][populate]=*`).catch(() => fallbackSiteSettings);
}

export async function getContentPageBySlug(slug: string) {
    const encodedSlug = encodeURIComponent(slug.toLowerCase());
    const response = await strapiFetch<ContentPageResponse>(`/api/content-pages?filters[slug][$eq]=${encodedSlug}&populate=*&pagination[limit]=1`);
    return response.data[0] ?? null;
}
