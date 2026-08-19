import Link from "next/link";
import { Gem } from "lucide-react";

export default function NotFound() {
    return <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl items-center justify-center px-5 py-16 text-center"><div><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface text-gold"><Gem className="h-6 w-6" /></span><p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Page not found</p><h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">This piece isn&apos;t here.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-text-secondary">The page may have moved, or this jewellery item is no longer available.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/shop" className="rounded bg-text-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">Explore jewellery</Link><Link href="/" className="rounded border border-border bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary">Return home</Link></div></div></main>;
}
