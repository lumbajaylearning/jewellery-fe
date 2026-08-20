"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronLeft, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";
import { createCustomerAddress, deleteCustomerAddress, listCustomerAddresses, updateCustomerAddress } from "@/app/lib/medusa/customer";

const emptyAddress = { address_name: "Home", first_name: "", last_name: "", company: "", address_1: "", address_2: "", city: "", province: "", postal_code: "", country_code: "in", phone: "", is_default_shipping: false, is_default_billing: false };

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<any[]>([]);
    const [form, setForm] = useState(emptyAddress);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formOpen, setFormOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listCustomerAddresses().then(setAddresses).catch(() => setError("Sign in to manage saved addresses.")).finally(() => setLoading(false));
    }, []);

    const change = (field: keyof typeof emptyAddress, value: string | boolean) => setForm((current) => ({ ...current, [field]: value }));
    const closeForm = () => { setFormOpen(false); setEditingId(null); setForm(emptyAddress); setError(null); };
    const edit = (address: any) => {
        setEditingId(address.id);
        setForm({
            address_name: address.address_name ?? "Home",
            first_name: address.first_name ?? "",
            last_name: address.last_name ?? "",
            company: address.company ?? "",
            address_1: address.address_1 ?? "",
            address_2: address.address_2 ?? "",
            city: address.city ?? "",
            province: address.province ?? "",
            postal_code: address.postal_code ?? "",
            country_code: address.country_code ?? "in",
            phone: address.phone ?? "",
            is_default_shipping: address.is_default_shipping ?? false,
            is_default_billing: address.is_default_billing ?? false,
        });
        setFormOpen(true);
    };
    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const nextAddresses = editingId ? await updateCustomerAddress(editingId, form) : await createCustomerAddress(form);
            setAddresses(nextAddresses);
            closeForm();
        } catch (caughtError) {
            setError(caughtError instanceof Error ? caughtError.message : "Unable to save this address.");
        } finally {
            setSubmitting(false);
        }
    };
    const remove = async (id: string) => {
        if (!window.confirm("Remove this saved address?")) return;
        try { setAddresses(await deleteCustomerAddress(id)); } catch { setError("Unable to remove this address."); }
    };

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Loading addresses…</p></main>;

    return (
        <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
            <Link href="/account" className="inline-flex items-center gap-1 text-xs font-semibold text-text-secondary"><ChevronLeft className="h-4 w-4" />Back to account</Link>
            <div className="mt-7 flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">My account</p><h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Saved addresses.</h1><p className="mt-3 text-sm text-text-secondary">Use these addresses during Medusa checkout.</p></div><button onClick={() => { setForm(emptyAddress); setEditingId(null); setFormOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded bg-text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white"><Plus className="h-4 w-4" />Add address</button></div>
            {error && <p role="alert" className="mt-6 rounded border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{error}</p>}
            {addresses.length === 0 ? <section className="mt-8 rounded border border-border bg-white p-10 text-center"><MapPin className="mx-auto h-10 w-10 stroke-1 text-gold" /><h2 className="mt-4 font-heading text-3xl text-text-primary">No saved addresses.</h2><p className="mt-2 text-sm text-text-secondary">Add your first delivery address to speed up checkout.</p></section> : <section className="mt-8 grid gap-5 sm:grid-cols-2">{addresses.map((address) => <article key={address.id} className="relative rounded border border-border bg-white p-6"><div className="flex items-start justify-between gap-4"><div><div className="flex flex-wrap gap-2"><span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-primary">{address.address_name || "Address"}</span>{address.is_default_shipping && <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">Default shipping</span>}</div><h2 className="mt-4 font-heading text-xl text-text-primary">{address.first_name} {address.last_name}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">{address.address_1}{address.address_2 ? `, ${address.address_2}` : ""}<br />{address.city}, {address.province} {address.postal_code}<br />{address.phone}</p></div><MapPin className="h-5 w-5 flex-shrink-0 text-gold" /></div><div className="mt-5 flex gap-3 border-t border-border pt-4"><button onClick={() => edit(address)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-primary"><Pencil className="h-3.5 w-3.5" />Edit</button><button onClick={() => remove(address.id)} className="inline-flex items-center gap-1.5 text-xs text-rose-700"><Trash2 className="h-3.5 w-3.5" />Remove</button></div></article>)}</section>}
            {formOpen && <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-4"><div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded border border-border bg-background p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{editingId ? "Edit address" : "New address"}</p><h2 className="mt-2 font-heading text-3xl text-text-primary">Delivery details</h2></div><button onClick={closeForm} className="rounded-full border border-border p-2"><X className="h-4 w-4" /></button></div><form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2"><label className="text-xs font-semibold text-text-primary">Label<input required value={form.address_name} onChange={(event) => change("address_name", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" placeholder="Home" /></label><div /><label className="text-xs font-semibold text-text-primary">First name<input required value={form.first_name} onChange={(event) => change("first_name", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><label className="text-xs font-semibold text-text-primary">Last name<input required value={form.last_name} onChange={(event) => change("last_name", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><label className="sm:col-span-2 text-xs font-semibold text-text-primary">Address<input required value={form.address_1} onChange={(event) => change("address_1", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><label className="sm:col-span-2 text-xs font-semibold text-text-primary">Apartment or landmark<input value={form.address_2} onChange={(event) => change("address_2", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><label className="text-xs font-semibold text-text-primary">City<input required value={form.city} onChange={(event) => change("city", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><label className="text-xs font-semibold text-text-primary">State<input required value={form.province} onChange={(event) => change("province", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><label className="text-xs font-semibold text-text-primary">PIN code<input required pattern="[0-9]{6}" value={form.postal_code} onChange={(event) => change("postal_code", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><label className="text-xs font-semibold text-text-primary">Phone<input required value={form.phone} onChange={(event) => change("phone", event.target.value)} className="mt-2 w-full rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><label className="sm:col-span-2 flex items-center gap-2 text-xs text-text-secondary"><input type="checkbox" checked={form.is_default_shipping} onChange={(event) => change("is_default_shipping", event.target.checked)} />Use as default shipping address</label><div className="sm:col-span-2 flex justify-end gap-3 pt-3"><button type="button" onClick={closeForm} className="rounded border border-border bg-white px-5 py-3 text-xs font-semibold">Cancel</button><button disabled={submitting} className="rounded bg-text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50">{submitting ? "Saving…" : "Save address"}</button></div></form></div></div>}
        </main>
    );
}
