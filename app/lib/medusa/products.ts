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
    const variants = (product.variants ?? []).map((variant: any) => ({
        id: variant.id,
        title: variant.title,
        amount: variant.calculated_price?.calculated_amount ?? variant.prices?.[0]?.amount ?? 0,
        currencyCode: variant.calculated_price?.currency_code ?? variant.prices?.[0]?.currency_code ?? "inr",
    }));

    const amounts = variants.map((variant: any) => variant.amount);

    const min = amounts.length ? Math.min(...amounts) : 0;
    const max = amounts.length ? Math.max(...amounts) : 0;

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

export interface ShopProductQuery {
    q?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: "newest" | "title-asc" | "title-desc" | "price-asc" | "price-desc";
    page?: number;
    limit?: number;
}

export async function getProducts(query: ShopProductQuery = {}) {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.max(1, query.limit ?? 12);
    const usesPriceQuery = query.minPrice !== undefined || query.maxPrice !== undefined || query.sort === "price-asc" || query.sort === "price-desc";
    const response = await medusa.store.product.list({
        q: query.q || undefined,
        category_id: query.categoryId ? [query.categoryId] : undefined,
        order: query.sort === "title-asc" ? "title" : query.sort === "title-desc" ? "-title" : "-created_at",
        fields: "*variants.calculated_price,*variants.prices,*images",
        limit: usesPriceQuery ? 100 : limit,
        offset: usesPriceQuery ? 0 : (page - 1) * limit,
    });

    let products = response.products.map(mapMedusaProduct);
    if (query.minPrice !== undefined) products = products.filter((product) => product.priceRange!.max >= query.minPrice!);
    if (query.maxPrice !== undefined) products = products.filter((product) => product.priceRange!.min <= query.maxPrice!);
    if (query.sort === "price-asc") products.sort((a, b) => a.price.amount - b.price.amount);
    if (query.sort === "price-desc") products.sort((a, b) => b.price.amount - a.price.amount);

    const count = usesPriceQuery ? products.length : response.count;
    const offset = usesPriceQuery ? (page - 1) * limit : 0;
    return { products: products.slice(offset, offset + limit), count, page, limit };
}

export async function getProductCategories() {
    const response = await medusa.store.category.list({ limit: 100, order: "name" });
    return response.product_categories.map((category: any) => ({
        id: category.id,
        name: category.name,
        handle: category.handle,
    }));
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
