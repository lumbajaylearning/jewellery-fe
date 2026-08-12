const STRAPI_URL = process.env.STRAPI_URL ?? "http://127.0.0.1:1337";

export async function strapiFetch<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${STRAPI_URL}${path}`, {
        ...options,
        cache: "force-cache",
        next: {
            revalidate: 3600,
        },
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
    });

    if (!response.ok) {
        throw new Error(
            `Strapi request failed: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
}