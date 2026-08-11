import Link from "next/link";
import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type ButtonProps = {
    children: ReactNode;
    className?: string;
    href?: string;
    variant?: "primary" | "secondary" | "ghost";
} & Omit<ComponentPropsWithoutRef<"button">, "children">;

export function Button({ children, className, href, variant = "primary", ...props }: ButtonProps) {
    const base = "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200";
    const variants = {
        primary: "bg-[var(--accent)] text-stone-900 hover:bg-[var(--accent-strong)]",
        secondary: "border border-stone-300 bg-white text-stone-800 hover:border-stone-400 hover:bg-stone-100",
        ghost: "bg-transparent px-0 py-0 text-stone-700 hover:text-stone-950",
    };

    const shared = cn(base, variants[variant], className);

    if (href) {
        return (
            <Link href={href} className={shared}>
                {children}
            </Link>
        );
    }

    return (
        <button className={shared} type="button" {...props}>
            {children}
        </button>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    text,
    align = "left",
}: {
    eyebrow: string;
    title: string;
    text?: string;
    align?: "left" | "center";
}) {
    return (
        <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--accent-strong)]">
                {eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-stone-900 sm:text-4xl">{title}</h2>
            {text ? <p className="mt-4 text-lg leading-8 text-stone-600">{text}</p> : null}
        </div>
    );
}

export function Badge({ label, tone = "slate" }: { label: string; tone?: "slate" | "gold" | "rose" | "emerald" }) {
    const tones = {
        slate: "bg-stone-100 text-stone-700",
        gold: "bg-[rgba(182,138,88,0.16)] text-[var(--accent-strong)]",
        rose: "bg-rose-50 text-rose-700",
        emerald: "bg-emerald-50 text-emerald-700",
    };

    return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]", tones[tone])}>{label}</span>;
}

export function StepCard({ number, title, text }: { number: string; title: string; text: string }) {
    return (
        <div className="rounded-[1.5rem] border border-stone-200 bg-[var(--surface)] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-sm font-semibold text-stone-50">
                {number}
            </div>
            <h3 className="mt-6 text-xl font-semibold text-stone-900">{title}</h3>
            <p className="mt-3 text-base leading-7 text-stone-600">{text}</p>
        </div>
    );
}

export function CategoryTile({
    title,
    blurb,
    image,
    href,
}: {
    title: string;
    blurb: string;
    image: string;
    href: string;
}) {
    return (
        <Link href={href || '#'} className="group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white">
            <div className="relative h-56 overflow-hidden">
                <Image src={image || 'vercel.svg'} alt={title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/30 to-transparent" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{blurb}</p>
            </div>
        </Link>
    );
}

export function ProductCard({
    name,
    price,
    image,
    badge,
    href = "/product",
}: {
    name: string;
    price: string;
    image: string;
    badge?: string;
    href?: string;
}) {
    return (
        <article className="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-[var(--surface)] p-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.2rem] bg-stone-100">
                <Image src={image || 'vercel.svg'} alt={name} fill className="object-cover" />
                {badge ? (
                    <div className="absolute left-4 top-4">
                        <Badge label={badge} tone="gold" />
                    </div>
                ) : null}
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-stone-500">Signature edit</p>
                    <h3 className="mt-1 text-lg font-semibold text-stone-900">{name}</h3>
                </div>
                <p className="text-sm font-semibold text-stone-700">{price}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-stone-500">Approximate pricing</span>
                <Link href={href} className="text-sm font-semibold text-stone-900 underline decoration-stone-300 underline-offset-4">
                    View details
                </Link>
            </div>
        </article>
    );
}

export function CartProgress({ total, cap = 20000 }: { total: number; cap?: number }) {
    const percent = Math.min((total / cap) * 100, 100);

    return (
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5">
            <div className="flex items-center justify-between text-sm text-stone-600">
                <span>Indicative consultation total</span>
                <span className="font-semibold text-stone-900">₹{total.toLocaleString("en-IN")} / ~₹{cap.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-4 h-2.5 rounded-full bg-stone-200">
                <div className="h-2.5 rounded-full bg-[var(--accent)]" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-3 text-sm text-stone-500">This is a preview only. Final pricing is confirmed at your home visit.</p>
        </div>
    );
}

export function BookingStatusBadge({ status }: { status: "Pending" | "Confirmed" | "Completed" | "Cancelled" }) {
    const tones = {
        Pending: "bg-amber-50 text-amber-700",
        Confirmed: "bg-emerald-50 text-emerald-700",
        Completed: "bg-stone-100 text-stone-700",
        Cancelled: "bg-rose-50 text-rose-700",
    };

    return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]", tones[status])}>{status}</span>;
}
