const DEFAULT_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

function buildApiUrl(path: string) {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${DEFAULT_API_BASE_URL}${normalizedPath}`;
}

async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await fetch(buildApiUrl(path), {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init.headers ?? {}),
        },
    });

    const contentType = response.headers.get("content-type") ?? "";
    const payload = contentType.includes("application/json") ? await response.json() : await response.text();

    if (!response.ok) {
        const message = typeof payload === "object" && payload && "detail" in payload ? String(payload.detail) : String(payload);
        throw new Error(message || `Request failed with status ${response.status}`);
    }

    return payload as T;
}

export interface Product {
    id: number;
    name: string;
    description?: string | null;
    base_price: number;
    category: string;
}

export interface BookingItemPayload {
    product_id: number;
    quantity: number;
    note?: string | null;
}

export interface BookingPayload {
    customer_name: string;
    slot: string;
    address?: string | null;
    preferred_date?: string | null;
    preferred_time?: string | null;
    notes?: string | null;
    booking_items: BookingItemPayload[];
}

export interface BookingResponse {
    id: number;
    customer_name: string;
    slot: string;
    address?: string | null;
    preferred_date?: string | null;
    preferred_time?: string | null;
    notes?: string | null;
    status: string;
    booking_items: BookingItemPayload[];
}

export async function getProducts(params?: { category?: string; min_price?: number; max_price?: number }): Promise<Product[]> {
    const search = new URLSearchParams();

    if (params?.category) {
        search.set("category", params.category);
    }
    if (params?.min_price !== undefined) {
        search.set("min_price", String(params.min_price));
    }
    if (params?.max_price !== undefined) {
        search.set("max_price", String(params.max_price));
    }

    const query = search.toString();
    return apiRequest<Product[]>(query ? `/api/products?${query}` : "/api/products");
}

export async function getProduct(productId: string | number): Promise<Product> {
    return apiRequest<Product>(`/api/products/${productId}`);
}

export async function createBooking(payload: BookingPayload): Promise<BookingResponse> {
    return apiRequest<BookingResponse>(`/api/bookings`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
}
