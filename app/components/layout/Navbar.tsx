"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { CART_UPDATED_EVENT, getExistingCart } from "@/app/lib/medusa/cart";
import { readWishlist, WISHLIST_EVENT } from "@/app/lib/wishlist";

export interface NavLinkItem { label: string; href: string }
export interface NavbarProps { logoText?: string; links?: NavLinkItem[]; cartCount?: number }

const DEFAULT_LINKS: NavLinkItem[] = [
    { label: "Jewellery", href: "/shop" },
    { label: "Collections", href: "/category" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Try at Home", href: "/book" },
    { label: "How It Works", href: "/#how-it-works" },
];

function itemCount(cart: any) {
    return (cart?.items ?? []).reduce((total: number, item: any) => total + item.quantity, 0);
}

export default function Navbar({ logoText = "AURUM", links = DEFAULT_LINKS, cartCount: initialCartCount = 0 }: NavbarProps) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(initialCartCount);
    const [wishlistCount, setWishlistCount] = useState(0);

    useEffect(() => {
        getExistingCart().then((cart) => setCartCount(itemCount(cart))).catch(() => undefined);
        setWishlistCount(readWishlist().length);

        const updateCart = (event: Event) => setCartCount(itemCount((event as CustomEvent).detail));
        const updateWishlist = (event: Event) => setWishlistCount(((event as CustomEvent).detail ?? readWishlist()).length);
        window.addEventListener(CART_UPDATED_EVENT, updateCart);
        window.addEventListener(WISHLIST_EVENT, updateWishlist);
        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, updateCart);
            window.removeEventListener(WISHLIST_EVENT, updateWishlist);
        };
    }, []);

    return <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
            <Link href="/" className="font-heading text-2xl tracking-[0.16em] text-text-primary md:text-3xl" aria-label={`${logoText} home`}>{logoText}</Link>

            <div className="hidden items-center gap-8 lg:flex">{links.map((link) => <Link key={link.href + link.label} href={link.href} className="text-sm font-medium tracking-wide text-text-secondary transition hover:text-text-primary">{link.label}</Link>)}</div>

            <div className="flex items-center gap-2 sm:gap-3">
                <ActionLink href="/shop#shop-search" label="Search"><Search className="h-5 w-5" /></ActionLink>
                <ActionLink href="/wishlist" label="Wishlist" count={wishlistCount}><Heart className="h-5 w-5" /></ActionLink>
                <ActionLink href="/account" label="Account" className="hidden sm:flex"><UserRound className="h-5 w-5" /></ActionLink>
                <ActionLink href="/cart" label="Shopping bag" count={cartCount}><ShoppingBag className="h-5 w-5" /></ActionLink>
                <button type="button" onClick={() => setMenuOpen((current) => !current)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Close menu" : "Open menu"} className="flex h-10 w-10 items-center justify-center text-text-primary lg:hidden">{menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
            </div>
        </nav>

        {menuOpen && <div id="mobile-navigation" className="border-t border-border bg-background px-5 pb-6 pt-3 shadow-lg lg:hidden"><nav className="mx-auto flex max-w-7xl flex-col">{links.map((link) => <Link key={link.href + link.label} href={link.href} onClick={() => setMenuOpen(false)} className="border-b border-border py-3 text-sm font-medium text-text-primary last:border-0">{link.label}</Link>)}<Link href="/account" onClick={() => setMenuOpen(false)} className="mt-3 flex items-center gap-2 rounded bg-surface px-4 py-3 text-sm font-semibold text-text-primary sm:hidden"><UserRound className="h-4 w-4 text-gold" />My account</Link></nav></div>}
    </header>;
}

function ActionLink({ href, label, count, className = "" , children }: { href: string; label: string; count?: number; className?: string; children: React.ReactNode }) {
    return <Link href={href} aria-label={label} className={`relative flex h-10 w-9 items-center justify-center text-text-secondary transition hover:text-text-primary sm:w-10 ${className}`}>{children}{count !== undefined && count > 0 && <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-text-primary px-1 text-[9px] font-semibold text-white">{count > 99 ? "99+" : count}</span>}</Link>;
}
