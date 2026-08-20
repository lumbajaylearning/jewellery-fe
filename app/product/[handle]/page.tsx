
import { getProduct } from "@/app/lib/medusa/products";
import ProductDetailsClient from "./ProductDetailsClient";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await getProduct(handle);

    if (!product) {
        notFound();
    }

    return <ProductDetailsClient product={product} />;
}

export const revalidate = 0;
