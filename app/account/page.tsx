"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut, MapPin, Package, Pencil, ShieldCheck, UserRound } from "lucide-react";
import { loginCustomer, logoutCustomer, registerCustomer, retrieveCustomer, updateCustomerProfile } from "@/app/lib/medusa/customer";

export default function AccountPage() {
    const [customer, setCustomer] = useState<any>(null);
    const [mode, setMode] = useState<"login" | "register">("login");
    const [form, setForm] = useState({ first_name: "", last_name: "", email: "", password: "" });
    const [profile, setProfile] = useState({ first_name: "", last_name: "", phone: "" });
    const [editingProfile, setEditingProfile] = useState(false);
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileMessage, setProfileMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        retrieveCustomer().then((nextCustomer) => {
            setCustomer(nextCustomer);
            setProfile({ first_name: nextCustomer.first_name ?? "", last_name: nextCustomer.last_name ?? "", phone: nextCustomer.phone ?? "" });
        }).catch(() => undefined).finally(() => setLoading(false));
    }, []);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const nextCustomer = mode === "login"
                ? await loginCustomer(form.email, form.password)
                : await registerCustomer(form);
            setCustomer(nextCustomer);
            setProfile({ first_name: nextCustomer.first_name ?? "", last_name: nextCustomer.last_name ?? "", phone: nextCustomer.phone ?? "" });
        } catch (caughtError) {
            setError(caughtError instanceof Error ? caughtError.message : "Authentication failed.");
        } finally {
            setSubmitting(false);
        }
    };

    const logout = async () => {
        await logoutCustomer();
        setCustomer(null);
        setMode("login");
        setEditingProfile(false);
    };

    const saveProfile = async (event: React.FormEvent) => {
        event.preventDefault();
        if (profileSaving) return;
        setProfileSaving(true);
        setError(null);
        setProfileMessage(null);
        try {
            const nextCustomer = await updateCustomerProfile({
                first_name: profile.first_name.trim(),
                last_name: profile.last_name.trim(),
                phone: profile.phone.trim(),
            });
            setCustomer(nextCustomer);
            setProfile({ first_name: nextCustomer.first_name ?? "", last_name: nextCustomer.last_name ?? "", phone: nextCustomer.phone ?? "" });
            setEditingProfile(false);
            setProfileMessage("Profile updated successfully.");
        } catch (caughtError) {
            setError(caughtError instanceof Error ? caughtError.message : "Unable to update your profile.");
        } finally {
            setProfileSaving(false);
        }
    };

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading your account…</p></main>;

    if (customer) {
        return (
            <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
                <section className="rounded border border-border bg-surface p-6 sm:p-9">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-text-primary text-white"><UserRound className="h-6 w-6" /></span><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">My account</p><h1 className="mt-1 font-heading text-3xl text-text-primary sm:text-4xl">Welcome, {customer.first_name || "jewellery lover"}.</h1><p className="mt-1 text-sm text-text-secondary">{customer.email}</p></div></div>
                        <div className="flex flex-col gap-2 sm:flex-row"><button onClick={() => { setEditingProfile((current) => !current); setProfileMessage(null); setError(null); }} className="inline-flex items-center justify-center gap-2 rounded border border-border bg-white px-4 py-2.5 text-xs font-semibold text-text-primary"><Pencil className="h-4 w-4" />{editingProfile ? "Cancel editing" : "Edit profile"}</button><button onClick={logout} className="inline-flex items-center justify-center gap-2 rounded border border-border bg-white px-4 py-2.5 text-xs font-semibold text-text-primary"><LogOut className="h-4 w-4" />Sign out</button></div>
                    </div>
                </section>

                {profileMessage && <p role="status" className="mt-5 rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{profileMessage}</p>}
                {error && <p role="alert" className="mt-5 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p>}

                {editingProfile && <section className="mt-6 rounded border border-border bg-white p-5 sm:p-7"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Personal details</p><h2 className="mt-2 font-heading text-2xl text-text-primary">Edit your profile</h2></div><form onSubmit={saveProfile} className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold text-text-primary">First name<input required value={profile.first_name} onChange={(event) => setProfile({ ...profile, first_name: event.target.value })} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label><label className="text-xs font-semibold text-text-primary">Last name<input required value={profile.last_name} onChange={(event) => setProfile({ ...profile, last_name: event.target.value })} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label><label className="text-xs font-semibold text-text-primary">Phone number<input type="tel" value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label><label className="text-xs font-semibold text-text-primary">Email address<input readOnly value={customer.email} className="mt-2 w-full cursor-not-allowed rounded border border-border bg-surface px-4 py-3 text-sm font-normal text-text-secondary" /><span className="mt-1.5 block text-[11px] font-normal text-text-secondary">Email is used for account sign-in.</span></label><div className="flex flex-col-reverse gap-3 border-t border-border pt-4 sm:col-span-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => setEditingProfile(false)} className="rounded border border-border bg-white px-5 py-3 text-xs font-semibold">Cancel</button><button disabled={profileSaving} className="rounded bg-text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50">{profileSaving ? "Saving…" : "Save changes"}</button></div></form></section>}

                <section className="mt-8 grid gap-5 md:grid-cols-3">
                    <Link href="/account/orders" className="rounded border border-border bg-white p-6 transition hover:border-gold"><Package className="h-6 w-6 text-gold" /><h2 className="mt-5 font-heading text-2xl text-text-primary">My orders</h2><p className="mt-2 text-sm leading-6 text-text-secondary">Review COD purchases and delivery details.</p><span className="mt-5 inline-block text-xs font-semibold text-text-primary">View order history →</span></Link>
                    <Link href="/account/addresses" className="rounded border border-border bg-white p-6 transition hover:border-gold"><MapPin className="h-6 w-6 text-gold" /><h2 className="mt-5 font-heading text-2xl text-text-primary">Saved addresses</h2><p className="mt-2 text-sm leading-6 text-text-secondary">Manage delivery addresses stored with your Medusa customer.</p><span className="mt-5 inline-block text-xs font-semibold text-text-primary">Manage addresses →</span></Link>
                    <div className="rounded border border-border bg-surface p-6"><ShieldCheck className="h-6 w-6 text-gold" /><h2 className="mt-5 font-heading text-2xl text-text-primary">Home trials</h2><p className="mt-2 text-sm leading-6 text-text-secondary">Booking history will appear here after the Medusa Home Trial module is connected.</p><span className="mt-5 inline-block text-xs font-semibold text-text-secondary">Integration planned</span></div>
                </section>
            </main>
        );
    }

    return (
        <main className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
            <section className="rounded border border-border bg-surface p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Aurelia account</p>
                <h1 className="mt-4 font-heading text-4xl text-text-primary sm:text-5xl">Your jewellery journey, remembered.</h1>
                <p className="mt-5 text-sm leading-7 text-text-secondary">Sign in to manage your profile, COD orders and saved delivery details. Authentication is managed securely by Medusa.</p>
                <div className="mt-8 space-y-4 text-sm text-text-secondary"><p className="flex items-center gap-3"><Package className="h-5 w-5 text-gold" />Complete order history</p><p className="flex items-center gap-3"><MapPin className="h-5 w-5 text-gold" />Saved delivery information</p><p className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-gold" />JWT authentication through Medusa</p></div>
            </section>

            <section className="rounded border border-border bg-white p-7 sm:p-9">
                <div className="flex border-b border-border"><button onClick={() => { setMode("login"); setError(null); }} className={`flex-1 border-b-2 py-3 text-xs font-semibold uppercase tracking-wider ${mode === "login" ? "border-gold text-text-primary" : "border-transparent text-text-secondary"}`}>Sign in</button><button onClick={() => { setMode("register"); setError(null); }} className={`flex-1 border-b-2 py-3 text-xs font-semibold uppercase tracking-wider ${mode === "register" ? "border-gold text-text-primary" : "border-transparent text-text-secondary"}`}>Create account</button></div>
                <form onSubmit={submit} className="mt-7 space-y-4">
                    {mode === "register" && <div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold text-text-primary">First name<input required value={form.first_name} onChange={(event) => setForm({ ...form, first_name: event.target.value })} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label><label className="text-xs font-semibold text-text-primary">Last name<input required value={form.last_name} onChange={(event) => setForm({ ...form, last_name: event.target.value })} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label></div>}
                    <label className="block text-xs font-semibold text-text-primary">Email address<input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>
                    <label className="block text-xs font-semibold text-text-primary">Password<input required type="password" minLength={8} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /><span className="mt-1.5 block text-[11px] font-normal text-text-secondary">Minimum 8 characters</span></label>
                    {error && <p role="alert" className="rounded border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800">{error}</p>}
                    <button disabled={submitting} className="w-full rounded bg-text-primary px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50">{submitting ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}</button>
                </form>
            </section>
        </main>
    );
}
