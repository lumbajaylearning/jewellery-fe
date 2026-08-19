import Link from "next/link";
import React from "react";

export interface FooterLink {
    id: number;
    label?: string | null;
    url?: string | null;
    openInNewTab?: boolean | null;
}

export interface FooterColumn {
    id: number;
    title: string;
    links: FooterLink[];
}

export interface FooterProps {
    id?: number;
    brandName?: string;
    brandDescription?: string | null;
    copyright?: string | null;
    columns?: FooterColumn[];
    legalLinks?: { label: string; url: string }[];
    __component?: string;
}

const DEFAULT_LEGAL_LINKS = [
    { label: "Privacy", url: "/privacy" },
    { label: "Terms", url: "/terms" },
];

function normalizeHref(value?: string | null) {
    const href = value?.trim();
    if (!href) return "#";
    if (/^(https?:\/\/|mailto:|tel:|#)/i.test(href)) return href;
    const internalHref = href.startsWith("/") ? href : `/${href}`;
    const [, pathname = internalHref, suffix = ""] = internalHref.match(/^([^?#]*)(.*)$/) ?? [];
    return `${pathname.toLowerCase()}${suffix}`;
}

function FooterAnchor({ href, newTab, children, className }: { href: string; newTab?: boolean | null; children: React.ReactNode; className: string }) {
    const normalizedHref = normalizeHref(href);
    const external = /^(https?:\/\/|mailto:|tel:)/i.test(normalizedHref);

    if (external || newTab) {
        return <a href={normalizedHref} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined} className={className}>{children}</a>;
    }

    return <Link href={normalizedHref} className={className}>{children}</Link>;
}

export const Footer: React.FC<FooterProps> = ({
    brandName = "AURUM",
    brandDescription,
    copyright = "© 2026 Aurum",
    columns = [],
    legalLinks = DEFAULT_LEGAL_LINKS,
}) => {
    const visibleColumns = columns.filter((column) => column.links?.some((link) => link.label && link.url));

    return (
        <footer className="w-full bg-[#D9B37A] text-[#181818]">
            <div className="mx-auto w-full max-w-[1856px] px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:pb-14 lg:pt-24">
                <div className="grid grid-cols-1 gap-12 pb-14 text-center md:grid-cols-12 md:gap-10 md:text-left lg:pb-16">
                    <div className="flex flex-col items-center md:col-span-5 md:items-start">
                        <Link href="/" className="font-heading text-3xl font-medium uppercase tracking-[0.12em] text-[#181818] transition-opacity hover:opacity-70 sm:text-4xl">
                            {brandName}
                        </Link>
                        {brandDescription && <p className="mt-5 max-w-sm whitespace-pre-line text-sm leading-7 text-[#24211D] sm:text-base">{brandDescription.trim()}</p>}
                    </div>

                    <nav aria-label="Footer navigation" className="grid grid-cols-1 gap-10 sm:grid-cols-3 md:col-span-7 md:gap-8">
                        {visibleColumns.map((column) => (
                            <section key={column.id} aria-labelledby={`footer-column-${column.id}`}>
                                <h2 id={`footer-column-${column.id}`} className="font-heading text-xs font-semibold uppercase tracking-[0.18em] text-[#181818]">
                                    {column.title}
                                </h2>
                                <ul className="mt-6 space-y-5">
                                    {column.links.filter((link) => link.label && link.url).map((link) => (
                                        <li key={link.id}>
                                            <FooterAnchor href={link.url!} newTab={link.openInNewTab} className="text-xs md:text-sm text-[#181818] transition-opacity hover:opacity-60 sm:text-base ">
                                                {link.label}
                                            </FooterAnchor>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-col items-center justify-between gap-5 border-t border-[#E8D9C2] pt-8 text-xs text-[#181818] sm:flex-row sm:text-sm lg:pt-10">
                    <p>{copyright}</p>
                    <nav aria-label="Legal" className="flex items-center gap-4">
                        {legalLinks.map((item, index) => (
                            <React.Fragment key={`${item.label}-${item.url}`}>
                                <FooterAnchor href={item.url} className="transition-opacity hover:opacity-60">{item.label}</FooterAnchor>
                                {index < legalLinks.length - 1 && <span aria-hidden="true">·</span>}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
