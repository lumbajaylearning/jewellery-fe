"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut, MapPin, Package, Pencil, ShieldCheck, Smartphone, UserRound } from "lucide-react";
import { logoutCustomer, registerCustomer, requestCustomerOtp, retrieveCustomer, updateCustomerProfile, verifyCustomerOtp } from "@/app/lib/medusa/customer";

type Mode = "login" | "register";

export default function AccountPage() {
    const [customer, setCustomer] = useState<any>(null);
    const [mode, setMode] = useState<Mode>("login");
    const [otpStep, setOtpStep] = useState(false);
    const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", otp: "" });
    const [verifiedPhone, setVerifiedPhone] = useState("");
    const [profile, setProfile] = useState({ first_name: "", last_name: "" });
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const acceptCustomer = (next: any) => {
        setCustomer(next);
        setProfile({ first_name: next.first_name ?? "", last_name: next.last_name ?? "" });
    };

    useEffect(() => { retrieveCustomer().then(acceptCustomer).catch(() => undefined).finally(() => setLoading(false)); }, []);

    const resetAuth = (nextMode: Mode) => {
        setMode(nextMode); setOtpStep(false); setVerifiedPhone(""); setError(null);
        setForm({ first_name: "", last_name: "", phone: "", otp: "" });
    };

    const submit = async (event: React.FormEvent) => {
        event.preventDefault(); setSubmitting(true); setError(null);
        try {
            if (!otpStep) {
                const phone = mode === "register"
                    ? await registerCustomer({ phone: form.phone, first_name: form.first_name, last_name: form.last_name })
                    : await requestCustomerOtp(form.phone);
                setVerifiedPhone(phone); setOtpStep(true);
            } else {
                acceptCustomer(await verifyCustomerOtp(verifiedPhone, form.otp));
                const returnTo = new URLSearchParams(window.location.search).get("returnTo");
                if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) window.location.assign(returnTo);
            }
        } catch (error) { setError(error instanceof Error ? error.message : "Authentication failed."); }
        finally { setSubmitting(false); }
    };

    const resend = async () => {
        setSubmitting(true); setError(null);
        try { await requestCustomerOtp(verifiedPhone); setMessage("A new OTP was sent."); }
        catch (error) { setError(error instanceof Error ? error.message : "Unable to resend OTP."); }
        finally { setSubmitting(false); }
    };

    const saveProfile = async (event: React.FormEvent) => {
        event.preventDefault(); setSubmitting(true); setError(null); setMessage(null);
        try {
            acceptCustomer(await updateCustomerProfile({ first_name: profile.first_name.trim(), last_name: profile.last_name.trim() }));
            setEditing(false); setMessage("Profile updated successfully.");
        } catch (error) { setError(error instanceof Error ? error.message : "Unable to update your profile."); }
        finally { setSubmitting(false); }
    };

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading your account…</p></main>;

    if (customer) return <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section className="rounded border border-border bg-surface p-6 sm:p-9">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-text-primary text-white"><UserRound className="h-6 w-6" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">My account</p><h1 className="mt-1 font-heading text-3xl text-text-primary sm:text-4xl">Welcome, {customer.first_name || "jewellery lover"}.</h1><p className="mt-1 text-sm text-text-secondary">{customer.phone}</p></div></div>
                <div className="flex flex-col gap-2 sm:flex-row"><button onClick={() => { setEditing(!editing); setMessage(null); setError(null); }} className="inline-flex items-center justify-center gap-2 rounded border border-border bg-white px-4 py-2.5 text-xs font-semibold"><Pencil className="h-4 w-4" />{editing ? "Cancel editing" : "Edit profile"}</button><button onClick={async () => { await logoutCustomer(); setCustomer(null); resetAuth("login"); }} className="inline-flex items-center justify-center gap-2 rounded border border-border bg-white px-4 py-2.5 text-xs font-semibold"><LogOut className="h-4 w-4" />Sign out</button></div>
            </div>
        </section>
        {message && <p role="status" className="mt-5 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{message}</p>}
        {error && <p role="alert" className="mt-5 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}
        {editing && <section className="mt-6 rounded border border-border bg-white p-5 sm:p-7"><h2 className="font-heading text-2xl">Edit your profile</h2><form onSubmit={saveProfile} className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="First name" value={profile.first_name} onChange={(value) => setProfile({ ...profile, first_name: value })} /><Field label="Last name" value={profile.last_name} onChange={(value) => setProfile({ ...profile, last_name: value })} /><label className="text-xs font-semibold sm:col-span-2">Verified mobile number<input readOnly value={customer.phone ?? ""} className="mt-2 w-full cursor-not-allowed rounded border border-border bg-surface px-4 py-3 text-sm font-normal text-text-secondary" /><span className="mt-1.5 block text-[11px] font-normal text-text-secondary">Contact support to change the number used for sign-in.</span></label><div className="sm:col-span-2 sm:text-right"><button disabled={submitting} className="rounded bg-text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50">{submitting ? "Saving…" : "Save changes"}</button></div></form></section>}
        <section className="mt-8 grid gap-5 md:grid-cols-3"><AccountCard href="/account/orders" icon={<Package />} title="My orders" copy="Review COD purchases and delivery details." /><AccountCard href="/account/addresses" icon={<MapPin />} title="Saved addresses" copy="Manage addresses stored with your Medusa customer." /><AccountCard href="/consultations" icon={<ShieldCheck />} title="Home trials" copy="Review and manage your Home Trial bookings." /></section>
    </main>;

    return <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
        <section className="rounded border border-border bg-surface p-7 sm:p-9"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Aurum account</p><h1 className="mt-4 font-heading text-4xl sm:text-5xl">Your jewellery journey, remembered.</h1><p className="mt-5 text-sm leading-7 text-text-secondary">Register and sign in with your mobile number. Every login is verified by OTP before orders or Home Trial bookings can be accessed.</p><div className="mt-8 space-y-4 text-sm text-text-secondary"><p className="flex items-center gap-3"><Smartphone className="h-5 w-5 text-gold" />Mobile number is your account identity</p><p className="flex items-center gap-3"><Package className="h-5 w-5 text-gold" />Complete order history</p><p className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-gold" />OTP verification through Medusa</p></div></section>
        <section className="rounded border border-border bg-white p-7 sm:p-9">
            <div className="flex border-b border-border"><Tab active={mode === "login"} onClick={() => resetAuth("login")}>Sign in</Tab><Tab active={mode === "register"} onClick={() => resetAuth("register")}>Create account</Tab></div>
            <form onSubmit={submit} className="mt-7 space-y-4">
                {!otpStep ? <>{mode === "register" && <div className="grid gap-4 sm:grid-cols-2"><Field label="First name" value={form.first_name} onChange={(value) => setForm({ ...form, first_name: value })} /><Field label="Last name" value={form.last_name} onChange={(value) => setForm({ ...form, last_name: value })} /></div>}<label className="block text-xs font-semibold">Mobile number<div className="mt-2 flex rounded border border-border bg-background focus-within:border-gold"><span className="flex items-center border-r border-border px-3 text-sm text-text-secondary">+91</span><input required type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="9876543210" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value.replace(/\D/g, "").slice(0, 10) })} className="w-full bg-transparent px-4 py-3 text-sm font-normal outline-none" /></div></label></> : <><div className="rounded border border-border bg-surface p-4 text-sm text-text-secondary">OTP sent to <strong className="text-text-primary">{verifiedPhone}</strong>.<button type="button" onClick={() => { setOtpStep(false); setError(null); }} className="mt-2 block text-xs font-semibold text-text-primary underline">Change mobile number</button></div><label className="block text-xs font-semibold">One-time password<input required autoFocus inputMode="numeric" autoComplete="one-time-code" value={form.otp} onChange={(event) => setForm({ ...form, otp: event.target.value.replace(/\D/g, "").slice(0, 8) })} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-center text-lg tracking-[0.35em] outline-none focus:border-gold" /></label><button type="button" disabled={submitting} onClick={resend} className="text-xs font-semibold underline disabled:opacity-50">Resend OTP</button></>}
                {message && <p role="status" className="rounded border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-800">{message}</p>}{error && <p role="alert" className="rounded border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">{error}</p>}
                <button disabled={submitting} className="w-full rounded bg-text-primary px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50">{submitting ? "Please wait…" : otpStep ? "Verify and sign in" : mode === "login" ? "Send OTP" : "Create account"}</button>
            </form>
        </section>
    </main>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="text-xs font-semibold">{label}<input required value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>; }
function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) { return <button type="button" onClick={onClick} className={`flex-1 border-b-2 py-3 text-xs font-semibold uppercase tracking-wider ${active ? "border-gold text-text-primary" : "border-transparent text-text-secondary"}`}>{children}</button>; }
function AccountCard({ href, icon, title, copy }: { href: string; icon: React.ReactNode; title: string; copy: string }) { return <Link href={href} className="rounded border border-border bg-white p-6 transition hover:border-gold"><span className="block h-6 w-6 text-gold">{icon}</span><h2 className="mt-5 font-heading text-2xl">{title}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">{copy}</p><span className="mt-5 inline-block text-xs font-semibold">Open →</span></Link>; }
