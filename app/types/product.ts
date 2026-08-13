export type StoreProduct = {
    id: string;
    title: string;
    handle: string;
    thumbnail: string | null;
    images: {
        id: string;
        url: string;
        rank: number;
    }[];
};

export interface ShopProduct {
    id: string;
    title: string;
    handle: string;
    description: string | null;
    thumbnail: string | null;
    images: {
        id: string;
        url: string;
        rank: number;
    }[];
    price: {
        amount: number;
        currencyCode: string;
        formatted: string;
    };

    priceRange?: {
        min: number;
        max: number;
    };

    variants: {
        id: string;
        title: string;
        amount: number;
        currencyCode: string;
    }[];
}