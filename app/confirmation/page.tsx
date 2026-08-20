"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SiteShell from "@/app/components/site-shell";
import { Badge, Button, StepCard } from "@/app/components/ui";
import { HOME_TRIAL_CONFIRMATION_KEY } from "@/app/lib/home-trial";

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const bookingId = searchParams.get("bookingId") ?? "Pending";
    const [details, setDetails] = useState<any>(null);

    useEffect(() => {
        const stored = window.sessionStorage.getItem(HOME_TRIAL_CONFIRMATION_KEY);
        if (!stored) return;
        try {
            setDetails(JSON.parse(stored));
        } catch {
            window.sessionStorage.removeItem(HOME_TRIAL_CONFIRMATION_KEY);
        }
    }, []);

    const itemCount = details?.items?.length ?? 0;
    const address = details?.address;

    return (
        <SiteShell activePage="/cart" cartCount={0}>
            <section className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                <Badge label="Confirmed" tone="emerald" />
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">Your home consultation is booked.</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                    We’ll confirm the details with you shortly. You can keep track of the visit in your consultation history.
                </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-stone-900">Booking summary</h2>
                    <div className="mt-6 space-y-3 text-sm leading-7 text-stone-600">
                        <p><span className="font-semibold text-stone-900">Booking ID:</span> #{bookingId}</p>
                        <p><span className="font-semibold text-stone-900">Date:</span> {details?.dateLabel ?? details?.booking?.preferred_date ?? "To be confirmed"}</p>
                        <p><span className="font-semibold text-stone-900">Time:</span> {details?.slotLabel ?? details?.booking?.preferred_time ?? "To be confirmed"}</p>
                        <p><span className="font-semibold text-stone-900">Address:</span> {address ? `${address.address_1}, ${address.city}, ${address.province} ${address.postal_code}` : details?.booking?.address ?? "Saved with booking"}</p>
                        <p><span className="font-semibold text-stone-900">Items:</span> {itemCount} piece{Number(itemCount) === 1 ? "" : "s"} shortlisted</p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button href="/consultations" variant="primary">View consultations</Button>
                        <Button href="/" variant="secondary">Back to home</Button>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-stone-900">What happens next</h2>
                    <div className="mt-6 space-y-4">
                        <StepCard number="1" title="Verify identity" text="We’ll confirm your details through a quick phone OTP before the visit begins." />
                        <StepCard number="2" title="Try on together" text="Your representative brings the shortlisted collection and helps you try pieces in person." />
                        <StepCard number="3" title="Buy only what you love" text="Only the pieces you keep will be purchased at the final visit price." />
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div className="p-6 text-sm text-stone-600">Loading confirmation…</div>}>
            <ConfirmationContent />
        </Suspense>
    );
}
