import { ShopProduct } from "@/app/types/product";
import { medusa } from "./client";

function formatPrice(amount: number, currencyCode: string) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currencyCode.toUpperCase(),
        maximumFractionDigits: 0,
    }).format(amount);
}

export function mapMedusaProduct(product: any): ShopProduct {
    const variants = product.variants.map((variant: any) => ({
        id: variant.id,
        title: variant.title,
        amount: variant.calculated_price.calculated_amount,
        currencyCode: variant.calculated_price.currency_code,
    }));

    const amounts = variants.map((variant: any) => variant.amount);

    const min = Math.min(...amounts);
    const max = Math.max(...amounts);

    return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        description: product.description,
        thumbnail: product.thumbnail,
        images: (product.images ?? [])
            .sort((a: any, b: any) => (a.rank ?? 0) - (b.rank ?? 0))
            .map((image: any) => ({
                id: image.id,
                url: image.url,
                rank: image.rank ?? 0,
            })),

        price: {
            amount: min,
            currencyCode: variants[0]?.currencyCode ?? "inr",
            formatted: formatPrice(
                min,
                variants[0]?.currencyCode ?? "inr"
            ),
        },

        priceRange: {
            min,
            max,
        },

        variants,
    };
}

export async function getProducts(categoryId?: string): Promise<ShopProduct[]> {
    const response = await medusa.store.product.list({
        category_id: categoryId ? [categoryId] : undefined,
        fields: "*variants.calculated_price,*variants.prices",
        limit: 20,
    });

    return response.products.map(mapMedusaProduct);
}


export async function getProduct(handle: string) {

    const { products } = await medusa.store.product.list(
        {
            handle,
            fields: "*variants.calculated_price,+variants.inventory_quantity,*variants.options,*options,*images,*categories,*collection,*metadata",
        }
    );
    return products[0];
}


export async function getFeaturedProducts() {
    const { products } = await medusa.store.product.list({
        collection_id: ["pcol_01M09T5873KDF1DS10MX0GVA77"],
        limit: 4,
        fields: "*variants,*variants.calculated_price,*images",
        // Filter by tag or collection if configured
    })
    return products.map(mapMedusaProduct)
}
