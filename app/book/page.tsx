"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import SiteShell from "@/app/components/site-shell";
import { Badge, Button, SectionHeading } from "@/app/components/ui";
import { createBooking } from "@/app/lib/api-client";

const slots = ["09:00", "10:30", "12:00", "14:00", "16:30", "18:00"];
const addresses = ["Home • 12, Orchard Lane", "Office • 45, Marina Street"];

interface CartItem {
    id: number;
    name: string;
    price: number;
    note: string;
}

export default function BookPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
    const [selectedSlot, setSelectedSlot] = useState(slots[1]);
    const [selectedDate, setSelectedDate] = useState("Wednesday, 14 August 2026");
    const [notes, setNotes] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem("consultation-cart");
            if (stored) {
                const parsed = JSON.parse(stored) as CartItem[];
                if (Array.isArray(parsed)) {
                    setCartItems(parsed);
                }
            }
        } catch {
            setError("Unable to load your consultation cart.");
        }
    }, []);

    const itemCount = useMemo(() => cartItems.length, [cartItems]);

    const handleSubmit = async () => {
        if (cartItems.length === 0) {
            setError("Add at least one item before booking.");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const booking = await createBooking({
                customer_name: "Guest customer",
                slot: selectedSlot,
                address: selectedAddress,
                preferred_date: selectedDate,
                preferred_time: selectedSlot,
                notes,
                booking_items: cartItems.map((item) => ({ product_id: item.id, quantity: 1, note: item.note })),
            });

            window.localStorage.removeItem("consultation-cart");
            router.push(`/confirmation?bookingId=${booking.id}&slot=${encodeURIComponent(booking.slot)}&items=${booking.booking_items.length}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unable to create booking");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SiteShell activePage="/cart" cartCount={3}>
            <section className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                <div className="max-w-3xl">
                    <Badge label="Book a visit" tone="gold" />
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">Choose where, when, and how long the visit should feel.</h1>
                    <p className="mt-4 text-lg leading-8 text-stone-600">
                        Your consultation lasts around 40 minutes, and a representative stays with you throughout the experience.
                    </p>
                </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6 rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
                    <div>
                        <SectionHeading eyebrow="Address" title="Pick a location" />
                        <div className="mt-4 space-y-3">
                            {addresses.map((address) => (
                                <label key={address} className="flex items-center gap-3 rounded-[1.2rem] border border-stone-200 p-4">
                                    <input type="radio" name="address" checked={selectedAddress === address} onChange={() => setSelectedAddress(address)} />
                                    <span className="text-sm text-stone-700">{address}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <SectionHeading eyebrow="Date" title="Select a date" />
                        <div className="mt-4 rounded-[1.5rem] border border-stone-200 bg-[var(--surface)] p-5 text-sm text-stone-700">
                            {selectedDate}
                        </div>
                    </div>

                    <div>
                        <SectionHeading eyebrow="Notes" title="Add visit notes" />
                        <textarea
                            className="mt-4 w-full rounded-[1.2rem] border border-stone-300 px-4 py-3 text-sm text-stone-700 outline-none"
                            rows={4}
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            placeholder="Mention sizing questions, security access, or anything the representative should know."
                        />
                    </div>

                    <div>
                        <SectionHeading eyebrow="Time" title="Choose a slot" />
                        <div className="mt-4 flex flex-wrap gap-3">
                            {slots.map((slot) => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={slot === selectedSlot ? "rounded-full border border-stone-900 bg-stone-900 px-4 py-2 text-sm font-semibold text-white" : "rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700"}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6 rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                    <SectionHeading eyebrow="Summary" title="Your booking overview" />
                    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 text-sm leading-7 text-stone-600">
                        <p><span className="font-semibold text-stone-900">Date:</span> {selectedDate}</p>
                        <p><span className="font-semibold text-stone-900">Time:</span> {selectedSlot}</p>
                        <p><span className="font-semibold text-stone-900">Address:</span> {selectedAddress}</p>
                        <p><span className="font-semibold text-stone-900">Items:</span> {itemCount} piece{itemCount === 1 ? "" : "s"} in consultation</p>
                        {notes ? <p><span className="font-semibold text-stone-900">Notes:</span> {notes}</p> : null}
                    </div>
                    {error ? <p className="text-sm text-rose-600">{error}</p> : null}
                    <Button onClick={handleSubmit} variant="primary" disabled={submitting}>
                        {submitting ? "Submitting…" : "Confirm booking"}
                    </Button>
                </div>
            </section>
        </SiteShell>
    );
}
