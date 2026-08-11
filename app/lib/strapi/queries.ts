import { strapiFetch } from "./client";

export function getHomepage() {
    return strapiFetch("/api/homepage?populate[sections][populate]=*");
}

export function getSiteSetting() {
    return strapiFetch(`/api/site-setting?populate[announcementBar]=*&populate[footer][populate][columns][populate]=*`);
}