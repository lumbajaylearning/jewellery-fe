import type { ReactNode } from "react";

/**
 * Content wrapper retained for the original consultation pages.
 * Navigation and footer are provided once by the root Strapi layout.
 */
export default function SiteShell({ children }: {
    children: ReactNode;
    activePage?: string;
    cartCount?: number;
}) {
    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            {children}
        </main>
    );
}
