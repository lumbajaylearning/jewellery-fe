import Link from "next/link";
import SiteShell from "@/app/components/site-shell";
import { Badge, Button, StepCard } from "@/app/components/ui";

export default function ConfirmationPage() {
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
                        <p><span className="font-semibold text-stone-900">Date:</span> Wednesday, 14 August</p>
                        <p><span className="font-semibold text-stone-900">Time:</span> 10:30 AM</p>
                        <p><span className="font-semibold text-stone-900">Address:</span> Home • 12, Orchard Lane</p>
                        <p><span className="font-semibold text-stone-900">Items:</span> 3 pieces shortlisted</p>
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
