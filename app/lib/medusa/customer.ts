import { medusa } from "./client";

type Registration = { phone: string; first_name: string; last_name: string };
type TokenResponse = { token?: string } | string;

const tokenFrom = (value: TokenResponse, message: string) => {
    const token = typeof value === "string" ? value : value.token;
    if (!token) throw new Error(message);
    return token;
};

export function normalizeIndianPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    const national = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
    if (!/^[6-9]\d{9}$/.test(national)) throw new Error("Enter a valid 10-digit Indian mobile number.");
    return `+91${national}`;
}

export async function requestCustomerOtp(value: string) {
    const phone = normalizeIndianPhone(value);
    await medusa.client.fetch("/auth/customer/phone-auth", { method: "POST", body: { phone } });
    return phone;
}

export async function verifyCustomerOtp(value: string, otp: string) {
    const phone = normalizeIndianPhone(value);
    const code = otp.replace(/\D/g, "");
    if (code.length < 4) throw new Error("Enter the OTP sent to your mobile number.");
    const response = await medusa.client.fetch<TokenResponse>(`/auth/customer/phone-auth/callback?phone=${encodeURIComponent(phone)}&otp=${encodeURIComponent(code)}`, { method: "POST" });
    await medusa.client.setToken(tokenFrom(response, "OTP verification could not be completed."));
    const cartId = window.localStorage.getItem("medusa_cart_id");
    if (cartId) await medusa.store.cart.transferCart(cartId).catch(() => undefined);
    return (await medusa.store.customer.retrieve()).customer;
}

export async function registerCustomer(data: Registration) {
    const phone = normalizeIndianPhone(data.phone);
    const response = await medusa.client.fetch<TokenResponse>("/auth/customer/phone-auth/register", { method: "POST", body: { phone } });
    await medusa.client.setToken(tokenFrom(response, "Mobile registration could not be started."));
    try {
        await medusa.store.customer.create({
            email: `${phone.slice(1)}@phone.aurum.local`,
            phone,
            first_name: data.first_name.trim(),
            last_name: data.last_name.trim(),
        });
    } finally {
        await medusa.client.clearToken();
    }
    await requestCustomerOtp(phone);
    return phone;
}

export async function retrieveCustomer() { return (await medusa.store.customer.retrieve()).customer; }
export async function updateCustomerProfile(data: { first_name: string; last_name: string }) { return (await medusa.store.customer.update(data)).customer; }
export async function logoutCustomer() { await medusa.auth.logout(); }
export async function listCustomerOrders() { return (await medusa.store.order.list({ limit: 50, fields: "+items.*,+shipping_address.*" })).orders; }
export async function retrieveCustomerOrder(orderId: string) { return (await medusa.store.order.retrieve(orderId, { fields: "+items.*,+shipping_address.*,+shipping_methods.*" })).order; }
export async function listCustomerAddresses() { return (await medusa.store.customer.listAddress({ limit: 50 })).addresses; }
export async function createCustomerAddress(address: any) { return (await medusa.store.customer.createAddress(address)).customer.addresses ?? []; }
export async function updateCustomerAddress(addressId: string, address: any) { return (await medusa.store.customer.updateAddress(addressId, address)).customer.addresses ?? []; }
export async function deleteCustomerAddress(addressId: string) { return (await medusa.store.customer.deleteAddress(addressId)).parent.addresses ?? []; }
