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

export async function getProducts() {
    const response = await medusa.store.product.list({
        fields: "*variants.calculated_price,*variants.prices",
        limit: 20,
    });

    return response.products.map(mapMedusaProduct);
}


export async function getProduct(handle: string) {
    const { products } = await medusa.store.product.list(
        {
            handle,
            fields: "*variants,*options,*categories",
        }
    );
    return products[0];
}
