import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RichText from "@/app/components/cms/RichText";
import { getContentPageBySlug } from "@/app/lib/strapi/queries";

export const revalidate = 300;

async function loadPage(slug: string) {
    return getContentPageBySlug(slug).catch(() => null);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = await loadPage(slug);
    if (!page) return {};
    return {
        title: page.seoTitle || `${page.title} | Aurum`,
        description: page.seoDescription || page.summary || undefined,
    };
}

export default async function ContentPageRoute({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await loadPage(slug);
    if (!page) notFound();

    return (
        <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
            <header className="border-b border-border pb-10 text-center sm:pb-12">
                {page.eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{page.eyebrow}</p>}
                <h1 className="mx-auto mt-3 max-w-4xl font-heading text-4xl font-medium leading-tight text-text-primary sm:text-5xl lg:text-6xl">{page.title}</h1>
                {page.summary && <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">{page.summary}</p>}
            </header>
            <article className="mx-auto mt-10 max-w-3xl sm:mt-14">
                <RichText content={page.body} />
            </article>
        </main>
    );
}
