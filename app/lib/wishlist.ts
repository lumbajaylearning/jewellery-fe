import type { ShopProduct } from "@/app/types/product";

const WISHLIST_KEY = "aurelia_wishlist";
export const WISHLIST_EVENT = "aurelia-wishlist-updated";

export function readWishlist(): ShopProduct[] {
    if (typeof window === "undefined") return [];
    try {
        const parsed = JSON.parse(window.localStorage.getItem(WISHLIST_KEY) ?? "[]");
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function isWishlisted(productId: string) {
    return readWishlist().some((product) => product.id === productId);
}

export function toggleWishlist(product: ShopProduct) {
    const current = readWishlist();
    const exists = current.some((item) => item.id === product.id);
    const next = exists ? current.filter((item) => item.id !== product.id) : [...current, product];
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(WISHLIST_EVENT, { detail: next }));
    return { items: next, added: !exists };
}
