// import { useState } from "react";
// import SiteShell from "@/app/components/site-shell";
import { getHomepage } from "@/app/lib/strapi/queries";
import DynamicZone from "@/app/components/cms/DynamicZone";
import { getFeaturedProducts, getProductCategories } from "./lib/medusa/products";

export const revalidate = 300;

export default async function Home() {
  const [homepage, featuredProducts, categories] = await Promise.all([
    getHomepage(),
    getFeaturedProducts().catch(() => []),
    getProductCategories().catch(() => []),
  ]);
  return (
    <main className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
      <DynamicZone sections={homepage.data.sections} featuredProducts={featuredProducts} categories={categories} />
    </main>
  );
}
