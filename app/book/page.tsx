import SiteShell from "@/app/components/site-shell";
import { Badge, Button, SectionHeading } from "@/app/components/ui";

const slots = ["09:00", "10:30", "12:00", "14:00", "16:30", "18:00"];
const addresses = ["Home • 12, Orchard Lane", "Office • 45, Marina Street"];

export default function BookPage() {
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
                                    <input type="radio" name="address" defaultChecked={address === addresses[0]} />
                                    <span className="text-sm text-stone-700">{address}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <SectionHeading eyebrow="Date" title="Select a date" />
                        <div className="mt-4 rounded-[1.5rem] border border-stone-200 bg-[var(--surface)] p-5 text-sm text-stone-700">
                            Wednesday, 14 August 2026
                        </div>
                    </div>

                    <div>
                        <SectionHeading eyebrow="Time" title="Choose a slot" />
                        <div className="mt-4 flex flex-wrap gap-3">
                            {slots.map((slot) => (
                                <button key={slot} className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700">
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6 rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                    <SectionHeading eyebrow="Summary" title="Your booking overview" />
                    <div className="rounded-[1.5rem] border border-stone-200 bg-white p-5 text-sm leading-7 text-stone-600">
                        <p><span className="font-semibold text-stone-900">Date:</span> Wednesday, 14 August</p>
                        <p><span className="font-semibold text-stone-900">Time:</span> 10:30 AM</p>
                        <p><span className="font-semibold text-stone-900">Address:</span> Home • 12, Orchard Lane</p>
                        <p><span className="font-semibold text-stone-900">Items:</span> 3 pieces in consultation</p>
                    </div>
                    <Button href="/confirmation" variant="primary">Confirm booking</Button>
                </div>
            </section>
        </SiteShell>
    );
}
