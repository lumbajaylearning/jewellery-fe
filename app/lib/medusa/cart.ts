import { medusa } from "./client";

// 1. Get or create a Medusa Cart ID
export async function getOrCreateCartId(): Promise<string | null> {
    let cartId = typeof window !== "undefined" ? localStorage.getItem("medusa_cart_id") : null

    if (!cartId) {
        const { cart } = await medusa.store.cart.create({
            region_id: "reg_01KZXZ7PNYP47GAT5PR5S3H2RX", // Optional: specify your region ID
        })
        cartId = cart.id
        if (typeof window !== "undefined" && cartId) {
            localStorage.setItem("medusa_cart_id", cartId)
        }
    }

    return cartId
}

// 2. Add an item variant to the cart
export async function addToCart(variantId: string, quantity: number = 1) {
    const cartId = await getOrCreateCartId()

    if (cartId) {
        const { cart } = await medusa.store.cart.createLineItem(cartId, {
            variant_id: variantId,
            quantity,
        })

        return cart
    }
}
