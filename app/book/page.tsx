"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Check, ChevronLeft, Clock, MapPin, ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { createCustomerAddress, listCustomerAddresses, retrieveCustomer, updateCustomerAddress } from "@/app/lib/medusa/customer";
import { createHomeTrial, getHomeTrialConfig, getHomeTrialSlots, getInrRegionId, HomeTrialConfig, HomeTrialSlot } from "@/app/lib/medusa/home-trial";
import { HomeTrialItem, readHomeTrialItems, removeHomeTrialItem, writeHomeTrialItems } from "@/app/lib/home-trial";

const emptyAddress = { first_name: "", last_name: "", address_1: "", address_2: "", city: "Lucknow", province: "Uttar Pradesh", postal_code: "", country_code: "in", phone: "" };
const money = (amount = 0, currency = "inr") => new Intl.NumberFormat("en-IN", { style: "currency", currency: currency.toUpperCase(), maximumFractionDigits: 0 }).format(amount);
const mapAddress = (value: any) => Object.fromEntries(Object.keys(emptyAddress).map((key) => [key, value[key] ?? (key === "country_code" ? "in" : "")])) as typeof emptyAddress;
const slotDate = (value: string) => new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(`${value}T12:00:00+05:30`));

export default function BookPage() {
    const router = useRouter();
    const [items, setItems] = useState<HomeTrialItem[]>([]);
    const [config, setConfig] = useState<HomeTrialConfig | null>(null);
    const [customer, setCustomer] = useState<any>(null);
    const [addresses, setAddresses] = useState<any[]>([]);
    const [addressId, setAddressId] = useState<string | null>(null);
    const [address, setAddress] = useState(emptyAddress);
    const [addressOpen, setAddressOpen] = useState(true);
    const [slots, setSlots] = useState<HomeTrialSlot[]>([]);
    const [slotId, setSlotId] = useState("");
    const [serviceChecked, setServiceChecked] = useState(false);
    const [notes, setNotes] = useState("");
    const [loading, setLoading] = useState(true);
    const [checking, setChecking] = useState(false);
    const [saving, setSaving] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setItems(readHomeTrialItems());
        Promise.all([retrieveCustomer(), getHomeTrialConfig(), listCustomerAddresses()]).then(([profile, settings, saved]) => {
            setCustomer(profile); setConfig(settings); setAddresses(saved);
            if (saved.length) {
                const preferred = saved.find((entry: any) => entry.is_default_shipping) ?? saved[0];
                setAddressId(preferred.id); setAddress(mapAddress(preferred)); setAddressOpen(false);
            } else setAddress((current) => ({ ...current, first_name: profile.first_name ?? "", last_name: profile.last_name ?? "", phone: profile.phone ?? "" }));
        }).catch(() => undefined).finally(() => setLoading(false));
    }, []);

    const totalValue = useMemo(() => items.reduce((sum, item) => sum + (item.price ?? 0), 0), [items]);
    const selectedSlot = slots.find((entry) => entry.id === slotId);

    const checkAvailability = async (postalCode = address.postal_code) => {
        if (!/^\d{6}$/.test(postalCode)) return setError("Enter a valid 6-digit PIN code.");
        setChecking(true); setError(null); setServiceChecked(false); setSlotId("");
        try {
            const response = await getHomeTrialSlots(postalCode);
            setSlots(response.slots); setServiceChecked(true);
            if (!response.serviceable) setError("Home Trial is not available at this PIN code yet.");
            else if (!response.slots.length) setError("No appointment slots are currently available for this PIN code.");
            else setSlotId(response.slots[0].id);
        } catch (error) { setError(error instanceof Error ? error.message : "Unable to check availability."); }
        finally { setChecking(false); }
    };

    const selectAddress = (saved: any) => {
        const next = mapAddress(saved); setAddressId(saved.id); setAddress(next); setAddressOpen(false); setSlots([]); setSlotId(""); setServiceChecked(false); setError(null);
    };
    const validateAddress = () => {
        if (["first_name", "last_name", "address_1", "city", "province", "postal_code"].some((key) => !address[key as keyof typeof address].trim())) { setError("Complete all required address fields."); return false; }
        if (!/^\d{6}$/.test(address.postal_code)) { setError("Enter a valid 6-digit PIN code."); return false; }
        return true;
    };
    const useAddress = async () => { if (validateAddress()) { setAddressOpen(false); await checkAvailability(); } };
    const saveAddress = async () => {
        if (!validateAddress() || saving) return; setSaving(true); setError(null);
        try {
            const payload = { ...address, phone: customer.phone, address_name: "Home trial address" };
            const saved = addressId ? await updateCustomerAddress(addressId, payload) : await createCustomerAddress(payload);
            setAddresses(saved); setAddressOpen(false); await checkAvailability();
        } catch (error) { setError(error instanceof Error ? error.message : "Unable to save this address."); }
        finally { setSaving(false); }
    };
    const removeItem = (id: string) => { removeHomeTrialItem(id); setItems(readHomeTrialItems()); };

    const book = async () => {
        if (!config?.enabled) return setError("Home Trial booking is currently unavailable.");
        if (!items.length) return setError("Select at least one jewellery piece.");
        if (items.length > config.max_item_count) return setError(`Select no more than ${config.max_item_count} pieces.`);
        if (totalValue > config.max_total_value) return setError(`Trial-kit value cannot exceed ${money(config.max_total_value, config.currency_code)}.`);
        if (addressOpen || !validateAddress()) return setAddressOpen(true);
        if (!slotId) return setError("Check your PIN code and select an available appointment slot.");
        setSubmitting(true); setError(null);
        try {
            const booking = await createHomeTrial({
                region_id: await getInrRegionId(), slot_id: slotId,
                items: items.map((item) => ({ variant_id: item.variant_id, quantity: 1 })),
                address: { first_name: address.first_name, last_name: address.last_name, address_1: address.address_1, address_2: address.address_2, city: address.city, province: address.province, postal_code: address.postal_code, country_code: "in" },
                notes: notes.trim() || undefined,
            });
            writeHomeTrialItems([]); router.push(`/confirmation?bookingId=${encodeURIComponent(booking.id)}`);
        } catch (error) { setError(error instanceof Error ? error.message : "Unable to book your Home Trial."); }
        finally { setSubmitting(false); }
    };

    if (loading) return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Preparing your Home Trial…</p></main>;
    if (!customer) return <main className="mx-auto flex min-h-[55vh] max-w-xl items-center px-5"><section className="w-full rounded border border-border bg-surface p-8 text-center"><ShieldCheck className="mx-auto h-7 w-7 text-gold" /><h1 className="mt-4 font-heading text-3xl">Mobile login required</h1><p className="mt-3 text-sm leading-6 text-text-secondary">Register or sign in with your verified mobile number before booking a Home Trial.</p><Link href="/account?returnTo=/book" className="mt-6 inline-block rounded bg-text-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">Continue to account</Link></section></main>;

    return <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
        <Link href="/shop" className="mb-7 inline-flex items-center gap-1 text-xs font-semibold text-text-secondary"><ChevronLeft className="h-4 w-4" /> Continue selecting jewellery</Link>
        <div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Home Trial</p><h1 className="mt-3 font-heading text-4xl sm:text-5xl">Try your favourites at home.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">Choose up to {config?.max_item_count ?? 4} pieces within {money(config?.max_total_value, config?.currency_code)}. Availability and limits are verified by Medusa before booking.</p></div>
        {error && <div role="alert" className="mb-6 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start"><div className="space-y-6">
            <section className="rounded border border-border bg-white p-5 sm:p-7"><Step number="1" title="Trial selection" />{items.length ? <div className="mt-6 divide-y divide-border">{items.map((item) => <article key={item.variant_id} className="flex items-center gap-4 py-4"><div className="h-20 w-16 overflow-hidden rounded bg-surface">{item.thumbnail && <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><h3 className="font-heading text-lg">{item.title}</h3><p className="text-xs text-text-secondary">{item.variant_title}</p><p className="mt-2 text-xs font-semibold">{money(item.price, item.currency_code)}</p></div><button onClick={() => removeItem(item.variant_id)} className="p-2 text-text-secondary"><Trash2 className="h-4 w-4" /></button></article>)}</div> : <div className="mt-6 rounded border border-dashed border-border bg-surface p-6 text-center"><Sparkles className="mx-auto h-5 w-5 text-gold" /><p className="mt-3 text-sm text-text-secondary">No jewellery selected yet.</p><Link href="/shop" className="mt-4 inline-block text-xs font-semibold underline">Browse jewellery</Link></div>}<p className="mt-5 text-[11px] text-text-secondary">{items.length}/{config?.max_item_count ?? 4} pieces · Approximate value {money(totalValue, items[0]?.currency_code)}</p></section>
            <section className="rounded border border-border bg-white p-5 sm:p-7"><Step number="2" title="Trial address" />{!!addresses.length && <div className="mt-6 flex gap-3 overflow-x-auto">{addresses.map((saved) => <button key={saved.id} onClick={() => selectAddress(saved)} className={`min-w-52 rounded border p-3 text-left text-xs ${addressId === saved.id && !addressOpen ? "border-gold bg-surface" : "border-border"}`}><strong>{saved.address_name || "Saved address"}</strong><span className="mt-1 block truncate text-text-secondary">{saved.address_1}, {saved.city}</span></button>)}</div>}{!addressOpen && <div className="mt-5 rounded border border-gold bg-surface p-4"><p className="text-sm leading-6 text-text-secondary"><strong className="text-text-primary">{address.first_name} {address.last_name}</strong><br />{address.address_1}{address.address_2 && `, ${address.address_2}`}<br />{address.city}, {address.province} {address.postal_code}</p><button onClick={() => setAddressOpen(true)} className="mt-3 text-xs font-semibold underline">Edit address</button></div>}{addressOpen && <div className="mt-6 grid gap-4 sm:grid-cols-2"><Field label="First name" value={address.first_name} set={(value) => setAddress({ ...address, first_name: value })} /><Field label="Last name" value={address.last_name} set={(value) => setAddress({ ...address, last_name: value })} /><Field label="City" value={address.city} set={(value) => setAddress({ ...address, city: value })} /><Field label="State" value={address.province} set={(value) => setAddress({ ...address, province: value })} /><Field label="PIN code" value={address.postal_code} numeric set={(value) => { setAddress({ ...address, postal_code: value }); setServiceChecked(false); setSlots([]); setSlotId(""); }} /><div /><div className="sm:col-span-2"><Field label="Address" value={address.address_1} set={(value) => setAddress({ ...address, address_1: value })} /></div><div className="sm:col-span-2"><Field label="Landmark (optional)" required={false} value={address.address_2} set={(value) => setAddress({ ...address, address_2: value })} /></div><div className="sm:col-span-2 flex justify-end gap-3"><button type="button" onClick={useAddress} className="rounded border border-text-primary px-4 py-2.5 text-xs font-semibold">Use this address</button><button type="button" disabled={saving} onClick={saveAddress} className="rounded bg-text-primary px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-50">{saving ? "Saving…" : "Save and use"}</button></div></div>}</section>
            <section className="rounded border border-border bg-white p-5 sm:p-7"><Step number="3" title="Available date and time" /><div className="mt-6"><button onClick={() => checkAvailability()} disabled={checking || addressOpen} className="rounded border border-text-primary px-4 py-2.5 text-xs font-semibold disabled:opacity-50">{checking ? "Checking…" : "Check availability"}</button></div>{serviceChecked && slots.length > 0 && <div className="mt-5 grid max-h-[320px] gap-3 overflow-y-auto pr-2 sm:grid-cols-2">{slots.map((slot) => <button key={slot.id} onClick={() => setSlotId(slot.id)} className={`rounded border p-4 text-left ${slotId === slot.id ? "border-gold bg-surface ring-1 ring-gold" : "border-border"}`}><span className="flex items-center justify-between text-xs font-semibold"><span className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-gold" />{slotDate(slot.date)}</span>{slotId === slot.id && <Check className="h-4 w-4 text-gold" />}</span><span className="mt-2 flex items-center gap-2 text-xs text-text-secondary"><Clock className="h-4 w-4" />{slot.start_time}–{slot.end_time} · {slot.available_capacity} available</span></button>)}</div>}</section>
        </div>
            <aside className="rounded border border-border bg-surface p-6 lg:sticky lg:top-28"><h2 className="font-heading text-2xl">Trial summary</h2><div className="mt-5 space-y-4 border-y border-border py-5"><Summary icon={<CalendarDays />} text={selectedSlot ? `${slotDate(selectedSlot.date)}, ${selectedSlot.start_time}–${selectedSlot.end_time}` : "Select an available slot"} /><Summary icon={<MapPin />} text={address.address_1 ? `${address.address_1}, ${address.city}` : "Add your address"} /><Summary icon={<Sparkles />} text={`${items.length} piece${items.length === 1 ? "" : "s"} selected`} /></div><label className="mt-5 block text-xs font-semibold">Notes (optional)<textarea maxLength={500} rows={3} value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-2 w-full resize-none rounded border border-border bg-white px-4 py-3 text-sm font-normal" /></label><button disabled={submitting || !items.length || !slotId} onClick={book} className="mt-5 w-full rounded bg-text-primary px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50">{submitting ? "Booking…" : config?.trial_fee ? `Book for ${money(config.trial_fee, config.currency_code)}` : "Confirm free Home Trial"}</button><div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-text-secondary"><ShieldCheck className="h-4 w-4 text-emerald-700" />Verified mobile booking</div></aside></div>
    </main>;
}

function Step({ number, title }: { number: string; title: string }) { return <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-xs font-semibold text-white">{number}</span><h2 className="font-heading text-2xl">{title}</h2></div>; }
function Field({ label, value, set, numeric, required = true }: { label: string; value: string; set: (value: string) => void; numeric?: boolean; required?: boolean }) { return <label className="text-xs font-semibold">{label}<input required={required} inputMode={numeric ? "numeric" : undefined} maxLength={numeric ? 6 : undefined} value={value} onChange={(event) => set(numeric ? event.target.value.replace(/\D/g, "") : event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>; }
function Summary({ icon, text }: { icon: React.ReactNode; text: string }) { return <div className="flex items-start gap-3 text-xs font-semibold"><span className="text-gold [&>svg]:h-4 [&>svg]:w-4">{icon}</span>{text}</div>; }
