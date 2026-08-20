import { medusa } from "./client";

export type HomeTrialConfig = {
    enabled: boolean;
    max_item_count: number;
    max_total_value: number;
    currency_code: string;
    cancellation_cutoff_minutes: number;
    trial_fee: number;
};

export type HomeTrialSlot = {
    id: string;
    date: string;
    start_time: string;
    end_time: string;
    capacity: number;
    available_capacity: number;
};

export type HomeTrialBooking = {
    id: string;
    display_id: string;
    phone: string;
    first_name: string;
    last_name?: string | null;
    address: Record<string, string>;
    postal_code: string;
    appointment_starts_at: string;
    appointment_ends_at: string;
    status: "confirmed" | "assigned" | "in_progress" | "completed" | "cancelled";
    notes?: string | null;
    currency_code: string;
    item_count: number;
    estimated_value: number;
    assigned_representative_id?: string | null;
    cancelled_at?: string | null;
    completed_at?: string | null;
    items?: Array<{
        id: string;
        product_id: string;
        variant_id: string;
        product_title: string;
        variant_title?: string | null;
        thumbnail?: string | null;
        unit_price: number;
        currency_code: string;
        quantity: number;
    }>;
};

export async function getHomeTrialConfig() {
    const response = await medusa.client.fetch<{ home_trial: HomeTrialConfig }>("/store/home-trial/config");
    return response.home_trial;
}

export async function getHomeTrialSlots(postalCode: string) {
    return medusa.client.fetch<{ serviceable: boolean; slots: HomeTrialSlot[]; service_area?: { id: string; name: string; city: string } }>(`/store/home-trial/slots?postal_code=${encodeURIComponent(postalCode)}`);
}

export async function getInrRegionId() {
    const response = await medusa.client.fetch<{ regions: Array<{ id: string; currency_code: string }> }>("/store/regions?limit=100");
    const region = response.regions.find((entry) => entry.currency_code?.toLowerCase() === "inr");
    if (!region) throw new Error("The Indian sales region is not configured.");
    return region.id;
}

export async function createHomeTrial(input: {
    region_id: string;
    slot_id: string;
    items: Array<{ variant_id: string; quantity: number }>;
    address: Record<string, string>;
    notes?: string;
}) {
    const response = await medusa.client.fetch<{ home_trial: HomeTrialBooking }>("/store/home-trials", { method: "POST", body: input });
    return response.home_trial;
}

export async function listHomeTrials() {
    return (await medusa.client.fetch<{ home_trials: HomeTrialBooking[] }>("/store/home-trials")).home_trials;
}

export async function retrieveHomeTrial(id: string) {
    return (await medusa.client.fetch<{ home_trial: HomeTrialBooking }>(`/store/home-trials/${encodeURIComponent(id)}`)).home_trial;
}

export async function cancelHomeTrial(id: string) {
    return (await medusa.client.fetch<{ home_trial: HomeTrialBooking }>(`/store/home-trials/${encodeURIComponent(id)}/cancel`, { method: "POST" })).home_trial;
}
