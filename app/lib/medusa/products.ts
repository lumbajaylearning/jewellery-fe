import { medusa } from "./client";

export async function getProducts() {
    const response = await medusa.store.product.list({
        limit: 20,
    });

    return response.products;
}