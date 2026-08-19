
import { getProduct } from "@/app/lib/medusa/products";
import ProductDetailsClient from "./ProductDetailsClient";


export default async function ProductPage({ params }: { params: { handle: string } }) {
    const { handle } = await params;
    const product = await getProduct(handle);

    // console.log(product)
    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1>Product not found</h1>
            </div>
        );
    }

    return <ProductDetailsClient product={product} />;
}

export const revalidate = 0
