import { strapiFetch } from "./client";
import type { HomepageData } from "@/app/types/homepage";
import type { AnnouncementBarProps } from "@/app/components/layout/AnnouncementBar";
import type { FooterProps } from "@/app/components/layout/Footer";

export interface SiteSettingData {
    data: {
        id: number;
        announcementBar: AnnouncementBarProps;
        footer: FooterProps;
    };
    meta: Record<string, unknown>;
}

export function getHomepage() {
    return strapiFetch<HomepageData>("/api/homepage?populate[sections][populate]=*");
}

export function getSiteSetting() {
    return strapiFetch<SiteSettingData>(`/api/site-setting?populate[announcementBar]=*&populate[footer][populate][columns][populate]=*`);
}