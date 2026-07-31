import SiteShell from "@/app/components/site-shell";
import { Badge, BookingStatusBadge, SectionHeading } from "@/app/components/ui";

const bookings = [
    { id: "HVC-104", date: "14 Aug 2026", slot: "10:30 AM", status: "Confirmed" as const },
    { id: "HVC-088", date: "03 Aug 2026", slot: "6:00 PM", status: "Completed" as const },
    { id: "HVC-071", date: "20 Jul 2026", slot: "12:00 PM", status: "Cancelled" as const },
];

export default function ConsultationsPage() {
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
                    {bookings.map((booking) => (
                        <div key={booking.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-stone-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">{booking.id}</p>
                                <h3 className="mt-2 text-xl font-semibold text-stone-900">{booking.date} • {booking.slot}</h3>
                                <p className="mt-2 text-sm text-stone-600">Home visit with representative</p>
                            </div>
                            <BookingStatusBadge status={booking.status} />
                        </div>
                    ))}
                </div>
            </section>
        </SiteShell>
    );
}
