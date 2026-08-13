import { getProducts } from "@/app/lib/medusa/products";

export default async function TestMedusaPage() {
    const products = await getProducts();
    console.log(products);
    return (
        <main className="p-10">
            <h1 className="font-heading text-4xl">
                Medusa Products
            </h1>

            <pre className="mt-8 overflow-auto">
                {JSON.stringify(products, null, 2)}
            </pre>
        </main>
    );
}