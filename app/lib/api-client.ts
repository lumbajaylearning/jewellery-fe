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
    booking_items: BookingItemPayload[];
}

export interface BookingResponse {
    id: number;
    customer_name: string;
    slot: string;
    status: string;
    booking_items: BookingItemPayload[];
}

export async function getProducts(): Promise<Product[]> {
    return apiRequest<Product[]>("/api/products");
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
