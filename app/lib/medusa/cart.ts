import { medusa } from "./client";

const CART_STORAGE_KEY = "medusa_cart_id";
export const CART_UPDATED_EVENT = "medusa-cart-updated";

function notifyCartUpdated(cart: any) {
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: cart }));
}

export async function getExistingCart() {
    const savedId = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!savedId) return null;
    try {
        const { cart } = await medusa.store.cart.retrieve(savedId);
        return cart;
    } catch {
        window.localStorage.removeItem(CART_STORAGE_KEY);
        return null;
    }
}

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
    notifyCartUpdated(response.cart);
    return response.cart;
}

export async function updateCartLineItem(lineItemId: string, quantity: number) {
    const cart = await getOrCreateCart();
    const response = await medusa.store.cart.updateLineItem(cart.id, lineItemId, { quantity });
    notifyCartUpdated(response.cart);
    return response.cart;
}

export async function removeCartLineItem(lineItemId: string) {
    const cart = await getOrCreateCart();
    const response = await medusa.store.cart.deleteLineItem(cart.id, lineItemId);
    notifyCartUpdated(response.parent);
    return response.parent;
}

export async function updateCartDetails(data: any) {
    const cart = await getOrCreateCart();
    const response = await medusa.store.cart.update(cart.id, data);
    return response.cart;
}

export async function listCartShippingOptions(cartId: string) {
    const response = await medusa.store.fulfillment.listCartOptions({ cart_id: cartId });
    return response.shipping_options;
}

export async function setCartShippingMethod(optionId: string) {
    const cart = await getOrCreateCart();
    const response = await medusa.store.cart.addShippingMethod(cart.id, { option_id: optionId });
    return response.cart;
}

export async function initializeCodPayment(cart: any) {
    const { payment_providers } = await medusa.store.payment.listPaymentProviders({
        region_id: cart.region_id,
    });
    const provider = payment_providers.find((item: any) => item.id.startsWith("pp_system"));

    if (!provider) {
        throw new Error("Enable the Medusa system payment provider for this region before accepting COD orders.");
    }

    return medusa.store.payment.initiatePaymentSession(cart, { provider_id: provider.id });
}

export async function completeCart() {
    const cart = await getOrCreateCart();
    const result = await medusa.store.cart.complete(cart.id);

    if (result.type !== "order" || !result.order) {
        throw new Error((result as any).error?.message ?? "Medusa could not complete this order.");
    }

    window.localStorage.removeItem(CART_STORAGE_KEY);
    notifyCartUpdated(null);
    return result.order;
}
