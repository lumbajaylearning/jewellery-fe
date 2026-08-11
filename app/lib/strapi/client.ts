const STRAPI_URL = process.env.STRAPI_URL;

if (!STRAPI_URL) {
    throw new Error("STRAPI_URL is not configured");
}

export async function strapiFetch<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${STRAPI_URL}${path}`, {
        ...options,
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