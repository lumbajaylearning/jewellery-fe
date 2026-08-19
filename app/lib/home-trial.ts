export const HOME_TRIAL_STORAGE_KEY = "aurelia_home_trial_items";
export const HOME_TRIAL_CONFIRMATION_KEY = "aurelia_home_trial_confirmation";

export interface HomeTrialItem {
    product_id: string;
    variant_id: string;
    title: string;
    variant_title?: string;
    thumbnail?: string;
    price?: number;
    currency_code?: string;
}

export function readHomeTrialItems(): HomeTrialItem[] {
    if (typeof window === "undefined") return [];
    try {
        const stored = window.localStorage.getItem(HOME_TRIAL_STORAGE_KEY);
        const parsed = stored ? JSON.parse(stored) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function writeHomeTrialItems(items: HomeTrialItem[]) {
    window.localStorage.setItem(HOME_TRIAL_STORAGE_KEY, JSON.stringify(items.slice(0, 4)));
}

export function addHomeTrialItem(item: HomeTrialItem) {
    const items = readHomeTrialItems();
    const existingIndex = items.findIndex((current) => current.variant_id === item.variant_id);
    if (existingIndex >= 0) items[existingIndex] = item;
    else items.push(item);
    writeHomeTrialItems(items);
}

export function removeHomeTrialItem(variantId: string) {
    writeHomeTrialItems(readHomeTrialItems().filter((item) => item.variant_id !== variantId));
}
