import SiteShell from "@/app/components/site-shell";
import { Badge, Button, SectionHeading } from "@/app/components/ui";

export default function AccountPage() {
    return (
        <SiteShell activePage="/account" cartCount={1}>
            <section className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                <Badge label="Account" tone="gold" />
                <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900">Secure sign-in with phone OTP.</h1>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
                    No password required. You can book consultations, view history, and manage your saved addresses from one place.
                </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-[2rem] border border-stone-200 bg-white p-6 sm:p-8">
                    <SectionHeading eyebrow="Phone login" title="Enter your mobile number" />
                    <div className="mt-6 space-y-4">
                        <input className="w-full rounded-[1rem] border border-stone-300 px-4 py-3 text-sm text-stone-700 outline-none" placeholder="+91 98765 43210" />
                        <Button variant="primary">Send OTP</Button>
                    </div>
                </div>

                <div className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                    <SectionHeading eyebrow="Mock flow" title="OTP confirmation" />
                    <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-white p-5 text-sm leading-7 text-stone-600">
                        <p>We’re currently using a mocked OTP flow so the design and customer journey are ready before real authentication is connected.</p>
                        <p className="mt-3">Enter the code 123456 to continue.</p>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
