"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CalendarDays, CheckCircle2, MapPin, Package } from "lucide-react";
import { HomeTrialBooking, retrieveHomeTrial } from "@/app/lib/medusa/home-trial";

const money = (amount = 0, currency = "inr") => new Intl.NumberFormat("en-IN", { style: "currency", currency: currency.toUpperCase(), maximumFractionDigits: 0 }).format(amount);
const dateTime = (value: string) => new Intl.DateTimeFormat("en-IN", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(value));

function ConfirmationContent() {
    const id = useSearchParams().get("bookingId");
    const [booking, setBooking] = useState<HomeTrialBooking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) { setError("Booking ID is missing."); setLoading(false); return; }
        retrieveHomeTrial(id).then(setBooking).catch((error) => setError(error instanceof Error ? error.message : "Unable to retrieve this booking.")).finally(() => setLoading(false));
    }, [id]);

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading your booking…</p></main>;
    if (error || !booking) return <main className="mx-auto flex min-h-[55vh] max-w-xl items-center px-5"><section className="w-full rounded border border-rose-200 bg-rose-50 p-8 text-center"><h1 className="font-heading text-3xl">Booking unavailable</h1><p className="mt-3 text-sm text-rose-800">{error}</p><Link href="/account" className="mt-6 inline-block text-xs font-semibold underline">Sign in or open your account</Link></section></main>;

    const address = booking.address ?? {};
    return <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="rounded border border-emerald-200 bg-emerald-50 p-7 sm:p-10"><CheckCircle2 className="h-8 w-8 text-emerald-700" /><p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800">Booking confirmed</p><h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Your Home Trial is booked.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary">No admin approval is required. An administrator can assign your representative before the appointment.</p></section>
        <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div className="rounded border border-border bg-white p-6 sm:p-8"><h2 className="font-heading text-2xl">Booking details</h2><dl className="mt-6 grid gap-5 text-sm sm:grid-cols-2"><Detail label="Booking reference" value={`#${booking.display_id || booking.id}`} /><Detail label="Status" value={booking.status.replaceAll("_", " ")} /><Detail label="Appointment" value={dateTime(booking.appointment_starts_at)} icon={<CalendarDays />} /><Detail label="Trial kit" value={`${booking.item_count} piece${booking.item_count === 1 ? "" : "s"} · ${money(booking.estimated_value, booking.currency_code)}`} icon={<Package />} /><Detail label="Address" value={[address.address_1, address.address_2, address.city, address.province, address.postal_code].filter(Boolean).join(", ")} icon={<MapPin />} /></dl><div className="mt-7 flex flex-wrap gap-3"><Link href="/consultations" className="rounded bg-text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white">View Home Trials</Link><Link href="/shop" className="rounded border border-border bg-white px-5 py-3 text-xs font-semibold">Continue shopping</Link></div></div>
            <div className="rounded border border-border bg-surface p-6 sm:p-8"><h2 className="font-heading text-2xl">What happens next</h2><ol className="mt-6 space-y-5"><Next number="1" title="Representative assignment" text="An administrator assigns the representative for your visit." /><Next number="2" title="Home appointment" text="The reserved pieces are brought to your registered trial address." /><Next number="3" title="Your decision" text="Trying the pieces is free and purchasing is optional." /></ol></div>
        </section>
    </main>;
}

export default function ConfirmationPage() { return <Suspense fallback={<main className="p-8 text-sm">Loading confirmation…</main>}><ConfirmationContent /></Suspense>; }
function Detail({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) { return <div className="sm:col-span-1"><dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-secondary"><span className="text-gold [&>svg]:h-4 [&>svg]:w-4">{icon}</span>{label}</dt><dd className="mt-2 capitalize leading-6 text-text-primary">{value}</dd></div>; }
function Next({ number, title, text }: { number: string; title: string; text: string }) { return <li className="flex gap-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-text-primary text-xs font-semibold text-white">{number}</span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-text-secondary">{text}</p></div></li>; }
