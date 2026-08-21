export interface ShopProduct {
    id: string;
    title: string;
    handle: string;
    description: string | null;
    thumbnail: string | null;
    images: Array<{
        id: string;
        url: string;
        rank: number;
    }>;
    price: {
        amount: number;
        currencyCode: string;
        formatted: string;
    };
    priceRange?: {
        min: number;
        max: number;
    };
    variants: Array<{
        id: string;
        title: string;
        amount: number;
        currencyCode: string;
    }>;
}

export interface CartItem {
    id: string;
    title: string;
    metalName: string;
    size: number;
    price: number;
    quantity: number;
    image: string;
    sku: string;
}

export type Category = { id: string; handle: string; image?: string | null; name: string; description?: string | null }