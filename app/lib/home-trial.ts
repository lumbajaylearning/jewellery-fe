import { getHomeTrialConfig } from "./medusa/home-trial";

export const HOME_TRIAL_STORAGE_KEY = "aurelia_home_trial_items";

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
    window.localStorage.setItem(HOME_TRIAL_STORAGE_KEY, JSON.stringify(items));
}

export async function addHomeTrialItem(item: HomeTrialItem) {
    const config = await getHomeTrialConfig();
    if (!config.enabled) throw new Error("Home Trial booking is currently unavailable.");

    const items = readHomeTrialItems();
    const existingIndex = items.findIndex((current) => current.variant_id === item.variant_id);
    if (existingIndex >= 0) items[existingIndex] = item;
    else items.push(item);

    if (items.length > config.max_item_count) {
        throw new Error(`You can select up to ${config.max_item_count} pieces for a Home Trial.`);
    }

    const total = items.reduce((sum, current) => sum + (current.price ?? 0), 0);
    if (total > config.max_total_value) {
        const limit = new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: config.currency_code.toUpperCase(),
            maximumFractionDigits: 0,
        }).format(config.max_total_value);
        throw new Error(`Your Home Trial selection cannot exceed ${limit}.`);
    }

    writeHomeTrialItems(items);
    return { items, config };
}

export function removeHomeTrialItem(variantId: string) {
    writeHomeTrialItems(readHomeTrialItems().filter((item) => item.variant_id !== variantId));
}
