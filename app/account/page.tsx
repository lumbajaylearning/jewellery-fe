"use client";

import { useState } from "react";
import SiteShell from "@/app/components/site-shell";
import { Badge, Button, SectionHeading } from "@/app/components/ui";

export default function AccountPage() {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState<"phone" | "otp">("phone");
    const [message, setMessage] = useState("Enter your phone number to receive an OTP.");
    const [submitting, setSubmitting] = useState(false);

    const requestOtp = async () => {
        if (!phone.trim()) {
            setMessage("Please enter a phone number.");
            return;
        }

        setSubmitting(true);
        setMessage("Sending OTP...");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/otp/request", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipient: phone }),
            });

            if (!response.ok) {
                throw new Error("Unable to request OTP");
            }

            setStep("otp");
            setMessage("OTP requested. Use 123456 to continue.");
        } catch {
            setMessage("Unable to request OTP right now.");
        } finally {
            setSubmitting(false);
        }
    };

    const verifyOtp = async () => {
        setSubmitting(true);
        setMessage("Verifying OTP...");

        try {
            const response = await fetch("http://127.0.0.1:8000/api/auth/otp/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recipient: phone, code: otp }),
            });

            if (!response.ok) {
                throw new Error("Invalid OTP");
            }

            setMessage("OTP verified. You can now continue booking consultations.");
        } catch {
            setMessage("Invalid OTP. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

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
                        <input
                            className="w-full rounded-[1rem] border border-stone-300 px-4 py-3 text-sm text-stone-700 outline-none"
                            placeholder="+91 98765 43210"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                        {step === "otp" ? (
                            <input
                                className="w-full rounded-[1rem] border border-stone-300 px-4 py-3 text-sm text-stone-700 outline-none"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(event) => setOtp(event.target.value)}
                            />
                        ) : null}
                        {step === "phone" ? (
                            <Button variant="primary" onClick={requestOtp} disabled={submitting}>
                                {submitting ? "Sending…" : "Send OTP"}
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={verifyOtp} disabled={submitting}>
                                {submitting ? "Verifying…" : "Verify OTP"}
                            </Button>
                        )}
                    </div>
                </div>

                <div className="rounded-[2rem] border border-stone-200 bg-[var(--surface)] p-6 sm:p-8">
                    <SectionHeading eyebrow="Mock flow" title="OTP confirmation" />
                    <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-white p-5 text-sm leading-7 text-stone-600">
                        <p>{message}</p>
                        <p className="mt-3">We’re currently using a mocked OTP flow so the design and customer journey are ready before real authentication is connected.</p>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
