"use client";

import { useEffect, useState } from "react";
import SiteShell from "@/app/components/site-shell";
import { Badge, BookingStatusBadge, SectionHeading } from "@/app/components/ui";

interface BookingSummary {
    id: number;
    customer_name: string;
    slot: string;
    status: string;
}

export default function ConsultationsPage() {
    const [bookings, setBookings] = useState<BookingSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetch("http://127.0.0.1:8000/api/bookings", {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Unable to load consultations");
                }

                const payload = (await response.json()) as BookingSummary[];
                if (isMounted) {
                    setBookings(payload);
                    setError(null);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Unable to load consultations");
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <SiteShell activePage="/consultations" cartCount={1}>
            <section className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <Badge label="My consultations" tone="gold" />
                        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">Track upcoming and past home visits.</h1>
                        <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                            Every booking keeps the same flow: review, visit, and buy only the pieces you keep.
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
                <SectionHeading eyebrow="Booking history" title="Your consultations" />
                <div className="mt-8 space-y-4">
                    {loading ? (
                        <p className="text-sm text-stone-600">Loading consultations…</p>
                    ) : error ? (
                        <p className="text-sm text-rose-600">{error}</p>
                    ) : bookings.length > 0 ? bookings.map((booking) => (
                        <div key={booking.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-stone-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">#{booking.id}</p>
                                <h3 className="mt-2 text-xl font-semibold text-stone-900">{booking.customer_name} • {booking.slot}</h3>
                                <p className="mt-2 text-sm text-stone-600">Home visit with representative</p>
                            </div>
                            <BookingStatusBadge status={booking.status as "Pending" | "Confirmed" | "Completed" | "Cancelled"} />
                        </div>
                    )) : (
                        <p className="text-sm text-stone-600">No consultations have been created yet.</p>
                    )}
                </div>
            </section>
        </SiteShell>
    );
}
