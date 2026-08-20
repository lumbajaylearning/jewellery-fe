"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Package, ShieldCheck } from "lucide-react";
import { cancelHomeTrial, getHomeTrialConfig, HomeTrialBooking, listHomeTrials } from "@/app/lib/medusa/home-trial";

const money = (amount = 0, currency = "inr") => new Intl.NumberFormat("en-IN", { style: "currency", currency: currency.toUpperCase(), maximumFractionDigits: 0 }).format(amount);
const dateTime = (value: string) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" }).format(new Date(value));

export default function ConsultationsPage() {
    const [bookings, setBookings] = useState<HomeTrialBooking[]>([]);
    const [cutoff, setCutoff] = useState(60);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        Promise.all([listHomeTrials(), getHomeTrialConfig()]).then(([trials, config]) => { setBookings(trials); setCutoff(config.cancellation_cutoff_minutes); }).catch((error) => setError(error instanceof Error ? error.message : "Unable to load Home Trials.")).finally(() => setLoading(false));
    }, []);

    const canCancel = (booking: HomeTrialBooking) => ["confirmed", "assigned"].includes(booking.status) && Date.now() <= new Date(booking.appointment_starts_at).getTime() - cutoff * 60_000;
    const cancel = async (booking: HomeTrialBooking) => {
        if (!window.confirm(`Cancel Home Trial #${booking.display_id}? Reserved inventory will be released.`)) return;
        setCancelling(booking.id); setError(null);
        try { const next = await cancelHomeTrial(booking.id); setBookings((current) => current.map((entry) => entry.id === next.id ? next : entry)); }
        catch (error) { setError(error instanceof Error ? error.message : "Unable to cancel this booking."); }
        finally { setCancelling(null); }
    };

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading your Home Trials…</p></main>;

    return <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="rounded border border-border bg-surface p-7 sm:p-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">My Home Trials</p><h1 className="mt-3 font-heading text-4xl sm:text-5xl">Upcoming and past appointments.</h1><p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary">Bookings are connected to your verified mobile account. Eligible bookings can be cancelled up to {cutoff} minutes before the appointment.</p></section>
        {error && <div role="alert" className="mt-6 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error} {bookings.length === 0 && <Link href="/account" className="ml-1 font-semibold underline">Sign in</Link>}</div>}
        <section className="mt-7 rounded border border-border bg-white p-5 sm:p-8"><div className="flex items-center justify-between gap-4"><h2 className="font-heading text-2xl">Booking history</h2><Link href="/book" className="rounded bg-text-primary px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white">Book a trial</Link></div>
            {!error && bookings.length === 0 ? <div className="py-14 text-center"><ShieldCheck className="mx-auto h-7 w-7 text-gold" /><p className="mt-4 text-sm text-text-secondary">You have no Home Trial bookings yet.</p></div> : <div className="mt-7 space-y-4">{bookings.map((booking) => <article key={booking.id} className="rounded border border-border p-5 sm:p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">#{booking.display_id}</p><h3 className="mt-2 font-heading text-2xl">{dateTime(booking.appointment_starts_at)}</h3><div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-secondary"><span className="flex items-center gap-1.5"><Package className="h-4 w-4 text-gold" />{booking.item_count} piece{booking.item_count === 1 ? "" : "s"} · {money(booking.estimated_value, booking.currency_code)}</span><span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-gold" />{booking.postal_code}</span></div></div><Status value={booking.status} /></div><div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4"><Link href={`/confirmation?bookingId=${encodeURIComponent(booking.id)}`} className="text-xs font-semibold underline">View details</Link>{canCancel(booking) && <button disabled={cancelling === booking.id} onClick={() => cancel(booking)} className="text-xs font-semibold text-rose-700 underline disabled:opacity-50">{cancelling === booking.id ? "Cancelling…" : "Cancel booking"}</button>}</div></article>)}</div>}
        </section>
    </main>;
}

function Status({ value }: { value: HomeTrialBooking["status"] }) {
    const colors = value === "completed" ? "bg-emerald-50 text-emerald-800" : value === "cancelled" ? "bg-rose-50 text-rose-800" : "bg-amber-50 text-amber-800";
    return <span className={`w-fit rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${colors}`}>{value.replaceAll("_", " ")}</span>;
}
