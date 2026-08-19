"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import {
    completeCart,
    getOrCreateCart,
    initializeCodPayment,
    listCartShippingOptions,
    setCartShippingMethod,
    updateCartDetails,
} from "@/app/lib/medusa/cart";

const initialAddress = {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    province: "",
    postal_code: "",
    country_code: "in",
    phone: "",
};

function formatMoney(amount: number, currencyCode = "inr") {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: currencyCode.toUpperCase(),
        maximumFractionDigits: 0,
    }).format(amount);
}

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<any>(null);
    const [shippingOptions, setShippingOptions] = useState<any[]>([]);
    const [selectedShippingId, setSelectedShippingId] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState(initialAddress);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        getOrCreateCart()
            .then(async (dataCart) => {
                if (!active) return;
                if (!dataCart.items?.length) {
                    router.replace("/cart");
                    return;
                }

                setCart(dataCart);
                setEmail(dataCart.email ?? "");
                if (dataCart.shipping_address) {
                    setAddress({
                        first_name: dataCart.shipping_address.first_name ?? "",
                        last_name: dataCart.shipping_address.last_name ?? "",
                        address_1: dataCart.shipping_address.address_1 ?? "",
                        address_2: dataCart.shipping_address.address_2 ?? "",
                        city: dataCart.shipping_address.city ?? "",
                        province: dataCart.shipping_address.province ?? "",
                        postal_code: dataCart.shipping_address.postal_code ?? "",
                        country_code: dataCart.shipping_address.country_code ?? "in",
                        phone: dataCart.shipping_address.phone ?? "",
                    });
                }

                const options = await listCartShippingOptions(dataCart.id);
                if (!active) return;
                setShippingOptions(options);
                setSelectedShippingId(dataCart.shipping_methods?.[0]?.shipping_option_id ?? options[0]?.id ?? "");
            })
            .catch((caughtError) => {
                if (active) setError(caughtError instanceof Error ? caughtError.message : "Unable to load checkout.");
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => { active = false; };
    }, [router]);

    const itemCount = useMemo(
        () => (cart?.items ?? []).reduce((count: number, item: any) => count + item.quantity, 0),
        [cart]
    );

    const handleAddressChange = (field: keyof typeof initialAddress, value: string) => {
        setAddress((current) => ({ ...current, [field]: value }));
    };

    const handlePlaceOrder = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!cart || submitting) return;
        if (!selectedShippingId) {
            setError("No shipping method is available. Configure one in the Medusa region first.");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            let updatedCart = await updateCartDetails({
                email,
                shipping_address: address,
                billing_address: address,
            });
            updatedCart = await setCartShippingMethod(selectedShippingId);
            await initializeCodPayment(updatedCart);
            const order = await completeCart();
            window.sessionStorage.setItem("aurelia_last_order", JSON.stringify(order));
            router.push(`/order-confirmation?order_id=${order.id}`);
        } catch (caughtError) {
            setError(caughtError instanceof Error ? caughtError.message : "Unable to place your COD order.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <main className="flex min-h-[55vh] items-center justify-center"><p className="text-sm text-text-secondary">Preparing secure checkout…</p></main>;
    }

    return (
        <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-8 lg:py-16">
            <Link href="/cart" className="mb-7 inline-flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary">
                <ChevronLeft className="h-4 w-4" /> Back to bag
            </Link>

            <div className="mb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Secure checkout</p>
                <h1 className="mt-3 font-heading text-4xl text-text-primary sm:text-5xl">Delivery and payment.</h1>
                <p className="mt-3 text-sm text-text-secondary">Place your order with Cash on Delivery. No online payment is collected.</p>
            </div>

            {error && <div role="alert" className="mb-6 rounded border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</div>}

            <form onSubmit={handlePlaceOrder} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
                <div className="space-y-6">
                    <section className="rounded border border-border bg-white p-5 sm:p-7">
                        <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-xs font-semibold text-white">1</span><h2 className="font-heading text-2xl text-text-primary">Contact details</h2></div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <label className="sm:col-span-2 text-xs font-semibold text-text-primary">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" placeholder="you@example.com" /></label>
                            <label className="text-xs font-semibold text-text-primary">First name<input required value={address.first_name} onChange={(event) => handleAddressChange("first_name", event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>
                            <label className="text-xs font-semibold text-text-primary">Last name<input required value={address.last_name} onChange={(event) => handleAddressChange("last_name", event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>
                            <label className="sm:col-span-2 text-xs font-semibold text-text-primary">Address<input required value={address.address_1} onChange={(event) => handleAddressChange("address_1", event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>
                            <label className="sm:col-span-2 text-xs font-semibold text-text-primary">Apartment, suite or landmark <span className="font-normal text-text-secondary">(optional)</span><input value={address.address_2} onChange={(event) => handleAddressChange("address_2", event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>
                            <label className="text-xs font-semibold text-text-primary">City<input required value={address.city} onChange={(event) => handleAddressChange("city", event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>
                            <label className="text-xs font-semibold text-text-primary">State<input required value={address.province} onChange={(event) => handleAddressChange("province", event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" placeholder="Uttar Pradesh" /></label>
                            <label className="text-xs font-semibold text-text-primary">PIN code<input required inputMode="numeric" pattern="[0-9]{6}" value={address.postal_code} onChange={(event) => handleAddressChange("postal_code", event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>
                            <label className="text-xs font-semibold text-text-primary">Phone<input required type="tel" value={address.phone} onChange={(event) => handleAddressChange("phone", event.target.value)} className="mt-2 w-full rounded border border-border bg-background px-4 py-3 text-sm font-normal outline-none focus:border-gold" /></label>
                        </div>
                    </section>

                    <section className="rounded border border-border bg-white p-5 sm:p-7">
                        <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-xs font-semibold text-white">2</span><h2 className="font-heading text-2xl text-text-primary">Delivery method</h2></div>
                        <div className="mt-6 space-y-3">
                            {shippingOptions.length > 0 ? shippingOptions.map((option) => (
                                <label key={option.id} className={`flex cursor-pointer items-center justify-between rounded border p-4 ${selectedShippingId === option.id ? "border-gold bg-surface" : "border-border"}`}>
                                    <span className="flex items-center gap-3"><input type="radio" name="shipping" value={option.id} checked={selectedShippingId === option.id} onChange={() => setSelectedShippingId(option.id)} /><span><span className="block text-sm font-semibold text-text-primary">{option.name}</span><span className="mt-1 block text-xs text-text-secondary">Insured delivery with tracking</span></span></span>
                                    <span className="text-sm font-semibold text-text-primary">{option.amount ? formatMoney(option.amount, cart?.currency_code) : "Free"}</span>
                                </label>
                            )) : <p className="rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">No shipping method is configured for this cart. Add a shipping option to the Medusa region.</p>}
                        </div>
                    </section>

                    <section className="rounded border border-gold bg-surface p-5 sm:p-7">
                        <div className="flex items-start gap-4"><span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-white"><Check className="h-4 w-4" /></span><div><h2 className="font-heading text-2xl text-text-primary">Cash on Delivery</h2><p className="mt-2 text-sm leading-6 text-text-secondary">Pay when your insured jewellery delivery arrives. The order will use Medusa’s system payment provider.</p></div></div>
                    </section>
                </div>

                <aside className="rounded border border-border bg-surface p-6 lg:sticky lg:top-28">
                    <h2 className="font-heading text-2xl text-text-primary">Order summary</h2>
                    <p className="mt-1 text-xs text-text-secondary">{itemCount} {itemCount === 1 ? "piece" : "pieces"}</p>
                    <div className="mt-5 max-h-72 space-y-4 overflow-y-auto border-y border-border py-5">
                        {cart?.items?.map((item: any) => (
                            <div key={item.id} className="flex gap-3"><div className="h-16 w-14 flex-shrink-0 overflow-hidden rounded bg-white">{item.thumbnail && <img src={item.thumbnail} alt={item.product_title} className="h-full w-full object-cover" />}</div><div className="min-w-0 flex-1"><p className="truncate text-xs font-semibold text-text-primary">{item.product_title}</p><p className="mt-1 text-[11px] text-text-secondary">{item.variant_title} × {item.quantity}</p></div><p className="text-xs font-semibold text-text-primary">{formatMoney((item.unit_price ?? 0) * item.quantity, cart.currency_code)}</p></div>
                        ))}
                    </div>
                    <div className="space-y-3 py-5 text-sm text-text-secondary"><div className="flex justify-between"><span>Subtotal</span><span className="text-text-primary">{formatMoney(cart?.subtotal ?? 0, cart?.currency_code)}</span></div><div className="flex justify-between"><span>Shipping</span><span className="text-text-primary">Calculated by Medusa</span></div><div className="flex justify-between border-t border-border pt-4 font-semibold text-text-primary"><span>Total</span><span className="font-heading text-xl">{formatMoney(cart?.total ?? cart?.subtotal ?? 0, cart?.currency_code)}</span></div></div>
                    <button disabled={submitting || !selectedShippingId} className="w-full rounded bg-text-primary px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Placing order…" : "Place COD order"}</button>
                    <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-text-secondary"><ShieldCheck className="h-4 w-4 text-emerald-700" />Secure Medusa order</div>
                    <div className="mt-5 grid grid-cols-2 gap-3 text-center text-[10px] text-text-secondary"><span className="rounded border border-border bg-white p-3"><Truck className="mx-auto mb-1.5 h-4 w-4 text-gold" />Insured shipping</span><span className="rounded border border-border bg-white p-3"><PackageCheck className="mx-auto mb-1.5 h-4 w-4 text-gold" />Verified delivery</span></div>
                </aside>
            </form>
        </main>
    );
}
