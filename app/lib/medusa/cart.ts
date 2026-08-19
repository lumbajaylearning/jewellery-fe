import { medusa } from "./client";

const CART_STORAGE_KEY = "medusa_cart_id";

export async function getOrCreateCart() {
    const savedId = window.localStorage.getItem(CART_STORAGE_KEY);

    if (savedId) {
        try {
            const { cart } = await medusa.store.cart.retrieve(savedId);
            return cart;
        } catch {
            window.localStorage.removeItem(CART_STORAGE_KEY);
        }
    }

    const { regions } = await medusa.store.region.list({ limit: 1 });
    const region = regions[0];

    if (!region) {
        throw new Error("No Medusa sales region is configured.");
    }

    const { cart } = await medusa.store.cart.create({ region_id: region.id });
    window.localStorage.setItem(CART_STORAGE_KEY, cart.id);
    return cart;
}

export async function addToCart(variantId: string, quantity = 1) {
    const cart = await getOrCreateCart();
    const response = await medusa.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity,
    });
    return response.cart;
}

export async function updateCartLineItem(lineItemId: string, quantity: number) {
    const cart = await getOrCreateCart();
    const response = await medusa.store.cart.updateLineItem(cart.id, lineItemId, { quantity });
    return response.cart;
}

export async function removeCartLineItem(lineItemId: string) {
    const cart = await getOrCreateCart();
    const response = await medusa.store.cart.deleteLineItem(cart.id, lineItemId);
    return response.parent;
}
