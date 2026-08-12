"use client";
import React, { useState } from "react";

export interface NavLinkItem {
    label: string;
    href: string;
}

export interface NavbarProps {
    logoText?: string;
    links?: NavLinkItem[];
    cartCount?: number;
}

const DEFAULT_LINKS: NavLinkItem[] = [
    { label: "Jewellery", href: "/jewellery" },
    { label: "Collections", href: "/collections" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Try at Home", href: "/try-at-home" },
    { label: "How It Works", href: "/how-it-works" },
];

export const Navbar: React.FC<NavbarProps> = ({
    logoText = "AURUM",
    links = DEFAULT_LINKS,
    cartCount = 0,
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    return (
        <header className="sticky w-full top-0 z-50  backdrop-blur-md border-b border-gray-100">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">

                {/* Left / Center: Brand Logo */}
                <div className="flex items-center">
                    <a
                        href="/"
                        className="font-serif text-2xl md:text-3xl font-normal tracking-widest text-gray-900 uppercase"
                    >
                        {logoText}
                    </a>
                </div>

                {/* Center: Desktop Navigation Links */}
                <div className="hidden lg:flex items-center space-x-8">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            className="text-xs md:text-sm font-medium text-gray-700 hover:text-black transition-colors tracking-wide"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Right: Actions / Icons (Search, Wishlist, Cart, Mobile Toggle) */}
                <div className="flex items-center space-x-4 md:space-x-5">
                    {/* Search Icon */}
                    <button
                        type="button"
                        aria-label="Search"
                        className="p-1.5 text-gray-700 hover:text-black transition"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>

                    {/* Wishlist Icon */}
                    <button
                        type="button"
                        aria-label="Wishlist"
                        className="p-1.5 text-gray-700 hover:text-black transition"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                            />
                        </svg>
                    </button>

                    {/* Cart Icon */}
                    <button
                        type="button"
                        aria-label="Shopping Bag"
                        className="p-1.5 text-gray-700 hover:text-black transition relative"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.25 10.5a.75.75 0 100-1.5.75.75 0 000 1.5zm7.5 0a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Mobile Hamburger Toggle Button */}
                    <button
                        type="button"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle Menu"
                        className="lg:hidden p-1.5 text-gray-700 hover:text-black focus:outline-none"
                    >
                        {isMobileMenuOpen ? (
                            /* Close Icon (X) */
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            /* Hamburger Icon */
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        )}
                    </button>
                </div>

            </nav>

            {/* Functional Mobile Dropdown Menu Drawer */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-gray-100 px-6 pt-4 pb-6 space-y-4 shadow-lg animate-fadeIn">
                    <div className="flex flex-col space-y-3">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-sm font-medium text-gray-800 hover:text-black py-1 border-b border-gray-50 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;