import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/category", label: "Collections" },
    { href: "/cart", label: "Consultation cart" },
    { href: "/consultations", label: "My consultations" },
];

export default function SiteShell({
    children,
    activePage,
    cartCount = 2,
}: {
    children: ReactNode;
    activePage?: string;
    cartCount?: number;
}) {
    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[rgba(250,247,242,0.92)] backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-stone-900 text-sm font-semibold text-stone-50">
                            A
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-900">Aurelia</p>
                            <p className="text-sm text-stone-500">Home consultation jewellery</p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-6 md:flex">
                        {navItems.map((item) => {
                            const isActive = activePage === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={isActive ? "text-sm font-semibold text-stone-900" : "text-sm text-stone-600 hover:text-stone-900"}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <Link href="/cart" className="inline-flex items-center gap-3 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-800">
                        <span>Cart</span>
                        <span className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-xs text-stone-900">{cartCount}/4</span>
                    </Link>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                {children}
            </main>

            <footer className="border-t border-stone-200 bg-[var(--surface)]">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-stone-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <p>Private consultations, brought to your home.</p>
                    <div className="flex gap-4">
                        <Link href="/account" className="font-semibold text-stone-900">My account</Link>
                        <Link href="/book" className="font-semibold text-stone-900">Book a visit</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
