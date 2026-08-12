import React from "react";

// --- Types based on your Strapi API response ---
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

export const Footer: React.FC<FooterProps> = ({
    brandName = "AURUM",
    brandDescription,
    copyright = "© 2026 Aurum",
    columns = [],
    legalLinks = DEFAULT_LEGAL_LINKS,
}) => {
    return (
        <footer className="w-full flex flex-col items-center bg-primary border-t border-gray-100 pt-12 pb-8 md:pt-16 md:pb-12 text-center md:text-left">
            <div className="w-full max-w-7xl px-5">

                {/* Top Grid: Brand info & Dynamic Navigation Columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 pb-12">

                    {/* Brand Info (Left Column on Desktop) */}
                    <div className="md:col-span-5 space-y-3 flex flex-col items-center md:items-start">
                        <a
                            href="/"
                            className="font-serif text-2xl font-normal tracking-widest text-gray uppercase"
                        >
                            {brandName}
                        </a>
                        {brandDescription && (
                            <p className="text-xs md:text-sm text-gray leading-relaxed max-w-sm whitespace-pre-line">
                                {brandDescription.trim()}
                            </p>
                        )}
                    </div>

                    {/* Dynamic Link Columns (Right Side Grid) */}
                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {columns.map((column) => (
                            <div key={column.id} className="space-y-3">
                                {/* Column Title */}
                                <h4 className="text-xs font-semibold uppercase tracking-widest text-gray">
                                    {column.title}
                                </h4>

                                {/* Column Links List */}
                                <ul className="space-y-2.5">
                                    {column.links
                                        .filter((link) => link.label && link.url)
                                        .map((link) => (
                                            <li key={link.id}>
                                                <a
                                                    href={link.url || "#"}
                                                    target={link.openInNewTab ? "_blank" : "_self"}
                                                    rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                                                    className="text-xs md:text-sm text-gray hover:text-black transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Legal Links */}
                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray">
                    <p>{copyright}</p>

                    <div className="flex items-center space-x-4">
                        {legalLinks.map((item, idx) => (
                            <React.Fragment key={idx}>
                                <a
                                    href={item.url}
                                    className="hover:text-black transition-colors"
                                >
                                    {item.label}
                                </a>
                                {idx < legalLinks.length - 1 && <span>·</span>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;