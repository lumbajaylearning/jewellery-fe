"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, ChevronLeft, Clock, MapPin, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { createBooking } from "@/app/lib/api-client";
import { createCustomerAddress, listCustomerAddresses, retrieveCustomer, updateCustomerAddress } from "@/app/lib/medusa/customer";
import { HOME_TRIAL_CONFIRMATION_KEY, HomeTrialItem, readHomeTrialItems, removeHomeTrialItem, writeHomeTrialItems } from "@/app/lib/home-trial";

const emptyAddress = { first_name: "", last_name: "", address_1: "", address_2: "", city: "", province: "", postal_code: "", country_code: "in", phone: "" };
const slots = [
    { value: "11:00-13:00", label: "11:00 AM – 1:00 PM" },
    { value: "14:00-16:00", label: "2:00 PM – 4:00 PM" },
    { value: "17:00-19:00", label: "5:00 PM – 7:00 PM" },
];

function formatMoney(amount = 0, currency = "inr") {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: currency.toUpperCase(), maximumFractionDigits: 0 }).format(amount);
}

function mapAddress(value: any) {
    return Object.fromEntries(Object.keys(emptyAddress).map((key) => [key, value[key] ?? (key === "country_code" ? "in" : "")])) as typeof emptyAddress;
}

function addressText(value: typeof emptyAddress) {
    return [`${value.first_name} ${value.last_name}`.trim(), value.address_1, value.address_2, `${value.city}, ${value.province} ${value.postal_code}`, value.phone].filter(Boolean).join(", ");
}

export default function BookPage() {
    const router = useRouter();
    const [items, setItems] = useState<HomeTrialItem[]>([]);
    const [dates, setDates] = useState<Array<{ value: string; label: string }>>([]);
    const [date, setDate] = useState("");
    const [slot, setSlot] = useState(slots[0].value);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [addressId, setAddressId] = useState<string | null>(null);
    const [address, setAddress] = useState(emptyAddress);
    const [addressOpen, setAddressOpen] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [customer, setCustomer] = useState<any>(null);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setItems(readHomeTrialItems());
        const nextDates = Array.from({ length: 5 }, (_, index) => {
            const next = new Date();
            next.setDate(next.getDate() + index + 1);
            return { value: next.toISOString().slice(0, 10), label: new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" }).format(next) };
        });
        setDates(nextDates);
        setDate(nextDates[0].value);
        retrieveCustomer().then(async (profile) => {
            setCustomer(profile);
            setAuthenticated(true);
            const saved = await listCustomerAddresses();
            setAddresses(saved);
            if (saved.length) {
                const preferred = saved.find((entry: any) => entry.is_default_shipping) ?? saved[0];
                setAddressId(preferred.id);
                setAddress(mapAddress(preferred));
                setAddressOpen(false);
            } else {
                setAddress((current) => ({ ...current, first_name: profile.first_name ?? "", last_name: profile.last_name ?? "", phone: profile.phone ?? "" }));
            }
        }).catch(() => undefined).finally(() => setLoading(false));
    }, []);

    const dateLabel = dates.find((entry) => entry.value === date)?.label ?? date;
    const slotLabel = slots.find((entry) => entry.value === slot)?.label ?? slot;
    const totalValue = useMemo(() => items.reduce((sum, item) => sum + (item.price ?? 0), 0), [items]);

    const selectAddress = (saved: any) => {
        setAddressId(saved.id);
        setAddress(mapAddress(saved));
        setAddressOpen(false);
        setError(null);
    };

    const differentAddress = () => {
        setAddressId(null);
        setAddress({ ...emptyAddress, first_name: customer?.first_name ?? "", last_name: customer?.last_name ?? "", phone: customer?.phone ?? "" });
        setAddressOpen(true);
        setError(null);
    };

    const validateAddress = () => {
        const required: Array<keyof typeof emptyAddress> = ["first_name", "last_name", "address_1", "city", "province", "postal_code", "phone"];
        if (required.some((field) => !address[field].trim())) {
            setError("Complete all required address fields.");
            return false;
        }
        if (!/^[0-9]{6}$/.test(address.postal_code)) {
            setError("Enter a valid 6-digit PIN code.");
            return false;
        }
        return true;
    };

    const useAddress = () => {
        if (!validateAddress()) return;
        setAddressOpen(false);
        setError(null);
    };

    const saveAddress = async () => {
        if (!validateAddress() || saving) return;
        setSaving(true);
        setError(null);
        try {
            let saved: any[];
            if (addressId) {
                const current = addresses.find((entry) => entry.id === addressId);
                saved = await updateCustomerAddress(addressId, { ...address, address_name: current?.address_name || "Home trial address", is_default_shipping: current?.is_default_shipping ?? false, is_default_billing: current?.is_default_billing ?? false });
            } else {
                saved = await createCustomerAddress({ ...address, address_name: "Home trial address" });
            }
            setAddresses(saved);
            const match = addressId ? saved.find((entry) => entry.id === addressId) : saved.find((entry) => entry.address_1 === address.address_1 && entry.postal_code === address.postal_code);
            if (match) setAddressId(match.id);
            setAddressOpen(false);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to save this address.");
        } finally {
            setSaving(false);
        }
    };

    const removeItem = (variantId: string) => {
        removeHomeTrialItem(variantId);
        setItems(readHomeTrialItems());
    };

    const bookTrial = async () => {
        if (!items.length) return setError("Select at least one jewellery piece for your home trial.");
        if (addressOpen || !validateAddress()) {
            setAddressOpen(true);
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            const booking = await createBooking({
                customer_name: `${address.first_name} ${address.last_name}`.trim(),
                address: addressText(address), preferred_date: date, preferred_time: slot, slot: `${date} ${slot}`, notes,
                booking_items: items.map((item) => ({ product_id: item.product_id, variant_id: item.variant_id, quantity: 1 })),
            });
            window.sessionStorage.setItem(HOME_TRIAL_CONFIRMATION_KEY, JSON.stringify({ booking, items, dateLabel, slotLabel, address }));
            writeHomeTrialItems([]);
            router.push(`/confirmation?bookingId=${booking.id}`);
        } catch (caught) {
            setError(caught instanceof Error ? caught.message : "Unable to book your home trial.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Preparing your home trial…</p></main>;

    const fields: Array<[keyof typeof emptyAddress, string]> = [["first_name", "First name"], ["last_name", "Last name"], ["city", "City"], ["province", "State"], ["postal_code", "PIN code"], ["phone", "Phone"]];

    return <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <Link href="/shop" className="mb-7 inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary"><ChevronLeft className="h-4 w-4" /> Continue selecting jewellery</Link>
        <div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Complimentary home trial</p><h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Try your favourites at home.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">Choose up to four pieces. A verified jewellery specialist brings them in a secured kit for a private 30–40 minute consultation.</p></div>
        {error && <div role="alert" className="mb-6 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start"><div className="space-y-6">
            <section className="rounded border border-border bg-white p-5 sm:p-7"><StepTitle number="1" title="Trial selection" />
                {items.length ? <div className="mt-6 divide-y divide-border">{items.map((item) => <article key={item.variant_id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"><div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded bg-surface">{item.thumbnail && <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><h3 className="font-heading text-lg text-text-primary">{item.title}</h3><p className="mt-1 text-xs text-text-secondary">{item.variant_title || "Selected variant"}</p>{item.price !== undefined && <p className="mt-2 text-xs font-semibold">{formatMoney(item.price, item.currency_code)}</p>}</div><button type="button" onClick={() => removeItem(item.variant_id)} className="p-2 text-text-secondary hover:text-rose-700"><Trash2 className="h-4 w-4" /></button></article>)}</div> : <div className="mt-6 rounded border border-dashed border-border bg-surface p-6 text-center"><Sparkles className="mx-auto h-5 w-5 text-gold" /><p className="mt-3 text-sm text-text-secondary">No jewellery selected yet.</p><Link href="/shop" className="mt-4 inline-block text-xs font-semibold underline underline-offset-4">Browse jewellery</Link></div>}
                <p className="mt-5 text-[11px] text-text-secondary">{items.length}/4 pieces selected · Approximate value {formatMoney(totalValue, items[0]?.currency_code)}</p>
            </section>
            <section className="rounded border border-border bg-white p-5 sm:p-7"><StepTitle number="2" title="Visit date and time" />
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">{dates.map((entry) => <button key={entry.value} type="button" onClick={() => setDate(entry.value)} className={`rounded border px-3 py-4 text-xs font-semibold ${date === entry.value ? "border-gold bg-surface ring-1 ring-gold" : "border-border text-text-secondary hover:border-gold"}`}><CalendarDays className="mx-auto mb-2 h-4 w-4 text-gold" />{entry.label}</button>)}</div>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">{slots.map((entry) => <button key={entry.value} type="button" onClick={() => setSlot(entry.value)} className={`flex items-center justify-between rounded border p-4 text-left text-xs font-semibold ${slot === entry.value ? "border-gold bg-surface ring-1 ring-gold" : "border-border text-text-secondary hover:border-gold"}`}><span className="flex items-center gap-2"><Clock className="h-4 w-4 text-gold" />{entry.label}</span>{slot === entry.value && <Check className="h-4 w-4 text-gold" />}</button>)}</div>
            </section>
            <section className="rounded border border-border bg-white p-5 sm:p-7"><StepTitle number="3" title="Trial address" />
                {!!addresses.length && <div className="mt-6 flex gap-3 overflow-x-auto pb-2">{addresses.map((saved) => <button key={saved.id} type="button" onClick={() => selectAddress(saved)} className={`min-w-52 rounded border p-3 text-left text-xs ${addressId === saved.id && !addressOpen ? "border-gold bg-surface ring-1 ring-gold" : "border-border"}`}><span className="flex justify-between font-semibold">{saved.address_name || "Saved address"}{addressId === saved.id && !addressOpen && <Check className="h-3.5 w-3.5 text-gold" />}</span><span className="mt-1 block truncate text-text-secondary">{saved.address_1}, {saved.city}</span></button>)}</div>}
                {!addressOpen && <div className="mt-5 rounded border border-gold bg-surface p-4"><div className="flex justify-between gap-4"><p className="text-sm leading-6 text-text-secondary"><strong className="text-text-primary">{address.first_name} {address.last_name}</strong><br />{address.address_1}{address.address_2 ? `, ${address.address_2}` : ""}<br />{address.city}, {address.province} {address.postal_code}<br />{address.phone}</p><MapPin className="h-5 w-5 text-gold" /></div><div className="mt-4 flex gap-4 border-t border-border pt-3"><button type="button" onClick={() => setAddressOpen(true)} className="text-xs font-semibold">Edit address</button><button type="button" onClick={differentAddress} className="text-xs font-semibold text-gold">Use a different address</button></div></div>}
                {addressOpen && <div className="mt-6 grid gap-4 sm:grid-cols-2">{fields.map(([field, label]) => <Field key={field} label={label} value={address[field]} numeric={field === "postal_code"} onChange={(value) => setAddress((current) => ({ ...current, [field]: value }))} />)}<div className="sm:col-span-2"><Field label="Address" value={address.address_1} onChange={(value) => setAddress((current) => ({ ...current, address_1: value }))} /></div><div className="sm:col-span-2"><Field label="Apartment, suite or landmark (optional)" value={address.address_2} onChange={(value) => setAddress((current) => ({ ...current, address_2: value }))} /></div><div className="sm:col-span-2 flex flex-wrap justify-end gap-3 border-t border-border pt-4">{!!addresses.length && <button type="button" onClick={() => selectAddress(addresses.find((entry) => entry.id === addressId) ?? addresses[0])} className="px-3 py-2 text-xs font-semibold text-text-secondary">Cancel</button>}<button type="button" onClick={useAddress} className="rounded border border-text-primary px-4 py-2.5 text-xs font-semibold">Use for this trial</button>{authenticated && <button type="button" disabled={saving} onClick={saveAddress} className="rounded bg-text-primary px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-50">{saving ? "Saving…" : addressId ? "Update saved address" : "Save and use address"}</button>}</div></div>}
            </section>
        </div><aside className="rounded border border-border bg-surface p-6 lg:sticky lg:top-28"><h2 className="font-heading text-2xl">Trial summary</h2><div className="mt-5 space-y-4 border-y border-border py-5 text-sm text-text-secondary"><Summary icon={<CalendarDays />} title={dateLabel || "Select a date"} detail={slotLabel} /><Summary icon={<MapPin />} title={address.address_1 ? `${address.address_1}, ${address.city}` : "Add your trial address"} /><Summary icon={<Sparkles />} title={`${items.length} ${items.length === 1 ? "piece" : "pieces"} in your secured trial kit`} /></div><label className="mt-5 block text-xs font-semibold">Notes for the jewellery specialist <span className="font-normal text-text-secondary">(optional)</span><textarea rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-2 w-full resize-none rounded border border-border bg-white px-4 py-3 text-sm font-normal outline-none focus:border-gold" placeholder="Sizing, access instructions or preferences" /></label><button type="button" disabled={submitting || !items.length} onClick={bookTrial} className="mt-5 w-full rounded bg-text-primary px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50">{submitting ? "Booking trial…" : "Confirm free home trial"}</button><div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-text-secondary"><ShieldCheck className="h-4 w-4 text-emerald-700" />No payment required</div></aside></div>
    </main>;
}

function StepTitle({ number, title }: { number: string; title: string }) {
    return <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-xs font-semibold text-white">{number}</span><h2 className="font-heading text-2xl">{title}</h2></div>;
}

function Field({ label, value, onChange, numeric = false }: { label: string; value: string; onChange: (value: string) => void; numeric?: boolean }) {
    return <label className="text-xs font-semibold">{label}<input required inputMode={numeric ? "numeric" : undefined} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>;
}

function Summary({ icon, title, detail }: { icon: React.ReactNode; title: string; detail?: string }) {
    return <div className="flex items-start gap-3"><span className="mt-0.5 block h-4 w-4 text-gold [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div><p className="text-xs font-semibold text-text-primary">{title}</p>{detail && <p className="mt-1 text-xs">{detail}</p>}</div></div>;
}
