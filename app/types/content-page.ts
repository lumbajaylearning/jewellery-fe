export interface StrapiTextNode {
    type: "text";
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
}

export interface StrapiContentNode {
    type: string;
    children?: Array<StrapiContentNode | StrapiTextNode>;
    level?: number;
    format?: "ordered" | "unordered";
    url?: string;
    image?: {
        url?: string;
        alternativeText?: string | null;
        caption?: string | null;
        width?: number;
        height?: number;
    };
}

export interface ContentPage {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    eyebrow?: string | null;
    summary?: string | null;
    body?: StrapiContentNode[] | string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string | null;
}

export interface ContentPageResponse {
    data: ContentPage[];
    meta: Record<string, unknown>;
}
