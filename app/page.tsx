// import { useState } from "react";
// import SiteShell from "@/app/components/site-shell";
import { getHomepage } from "@/app/lib/strapi/queries";
import DynamicZone from "@/app/components/cms/DynamicZone";

export default async function Home() {
  const homepage = await getHomepage();

  return (
    // <SiteShell activePage="/" cartCount={2}>
    <DynamicZone sections={homepage.data.sections} />
    // </SiteShell>
  );
}

