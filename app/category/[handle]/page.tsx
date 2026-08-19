import { notFound, redirect } from "next/navigation";
import { getProductCategoryByHandle } from "@/app/lib/medusa/products";

type CategoryPageProps = { params: Promise<{ handle: string }> };

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { handle } = await params;
    const category = await getProductCategoryByHandle(handle);
    if (!category) notFound();
    redirect(`/shop?category=${encodeURIComponent(category.id)}`);
}
