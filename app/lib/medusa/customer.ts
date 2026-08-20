import { medusa } from "./client";

export async function loginCustomer(email: string, password: string) {
    const result = await medusa.auth.login("customer", "emailpass", { email, password });
    if (typeof result !== "string") {
        throw new Error("Email login could not be completed.");
    }
    const cartId = window.localStorage.getItem("medusa_cart_id");
    if (cartId) {
        await medusa.store.cart.transferCart(cartId).catch(() => undefined);
    }
    const { customer } = await medusa.store.customer.retrieve();
    return customer;
}

export async function registerCustomer(data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}) {
    const { email, password, first_name, last_name } = data;
    const result = await medusa.auth.register("customer", "emailpass", { email, password });
    if (typeof result !== "string") {
        throw new Error("Customer registration could not be completed.");
    }
    await medusa.store.customer.create({ email, first_name, last_name });
    return loginCustomer(email, password);
}

export async function retrieveCustomer() {
    const { customer } = await medusa.store.customer.retrieve();
    return customer;
}

export async function updateCustomerProfile(data: {
    first_name: string;
    last_name: string;
    phone?: string;
}) {
    const { customer } = await medusa.store.customer.update(data);
    return customer;
}

export async function logoutCustomer() {
    await medusa.auth.logout();
}

export async function listCustomerOrders() {
    const response = await medusa.store.order.list({
        limit: 50,
        fields: "+items.*,+shipping_address.*",
    });
    return response.orders;
}

export async function retrieveCustomerOrder(orderId: string) {
    const { order } = await medusa.store.order.retrieve(orderId, {
        fields: "+items.*,+shipping_address.*,+shipping_methods.*",
    });
    return order;
}

export async function listCustomerAddresses() {
    const response = await medusa.store.customer.listAddress({ limit: 50 });
    return response.addresses;
}

export async function createCustomerAddress(address: any) {
    const { customer } = await medusa.store.customer.createAddress(address);
    return customer.addresses ?? [];
}

export async function updateCustomerAddress(addressId: string, address: any) {
    const { customer } = await medusa.store.customer.updateAddress(addressId, address);
    return customer.addresses ?? [];
}

export async function deleteCustomerAddress(addressId: string) {
    const { parent } = await medusa.store.customer.deleteAddress(addressId);
    return parent.addresses ?? [];
}
