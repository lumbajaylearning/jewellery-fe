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