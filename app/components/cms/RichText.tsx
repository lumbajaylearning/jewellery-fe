import { createElement, type ReactNode } from "react";
import type { StrapiContentNode, StrapiTextNode } from "@/app/types/content-page";

const STRAPI_URL = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://127.0.0.1:1337";

function safeHref(value?: string) {
    if (!value) return "#";
    if (/^(https?:\/\/|mailto:|tel:|#)/i.test(value)) return value;
    return value.startsWith("/") ? value : `/${value}`;
}

function mediaUrl(value?: string) {
    if (!value) return null;
    if (/^https?:\/\//i.test(value)) return value;
    return `${STRAPI_URL.replace(/\/$/, "")}${value.startsWith("/") ? value : `/${value}`}`;
}

function renderText(node: StrapiTextNode, key: string): ReactNode {
    let content: ReactNode = node.text;
    if (node.code) content = <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em]">{content}</code>;
    if (node.bold) content = <strong>{content}</strong>;
    if (node.italic) content = <em>{content}</em>;
    if (node.underline) content = <u>{content}</u>;
    if (node.strikethrough) content = <s>{content}</s>;
    return <span key={key}>{content}</span>;
}

function renderChildren(children: StrapiContentNode["children"], key: string) {
    return children?.map((child, index) => {
        const childKey = `${key}-${index}`;
        if (child.type === "text") return renderText(child as StrapiTextNode, childKey);
        if (child.type === "link") {
            const href = safeHref(child.url);
            const external = /^https?:\/\//i.test(href);
            return <a key={childKey} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className="font-medium text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{renderChildren(child.children, childKey)}</a>;
        }
        return renderBlock(child, childKey);
    });
}

function renderBlock(block: StrapiContentNode, key: string): ReactNode {
    switch (block.type) {
        case "paragraph":
            return <p key={key} className="text-base leading-8 text-text-secondary">{renderChildren(block.children, key)}</p>;
        case "heading": {
            const level = Math.min(6, Math.max(2, block.level ?? 2));
            const size = level === 2 ? "text-3xl sm:text-4xl" : level === 3 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl";
            return createElement(`h${level}`, { key, className: `pt-4 font-heading font-medium leading-tight text-text-primary ${size}` }, renderChildren(block.children, key));
        }
        case "quote":
            return <blockquote key={key} className="border-l-2 border-gold bg-surface px-5 py-4 font-heading text-xl italic leading-8 text-text-primary">{renderChildren(block.children, key)}</blockquote>;
        case "list": {
            const List = block.format === "ordered" ? "ol" : "ul";
            return <List key={key} className={`space-y-2 pl-6 text-base leading-7 text-text-secondary ${block.format === "ordered" ? "list-decimal" : "list-disc"}`}>{block.children?.map((child, index) => <li key={`${key}-${index}`}>{renderChildren(child.children, `${key}-${index}`)}</li>)}</List>;
        }
        case "code":
            return <pre key={key} className="overflow-x-auto rounded border border-border bg-[#1C1917] p-5 text-sm leading-6 text-white"><code>{block.children?.map((child) => child.type === "text" ? (child as StrapiTextNode).text : "").join("")}</code></pre>;
        case "image": {
            const url = mediaUrl(block.image?.url);
            if (!url) return null;
            return <figure key={key} className="space-y-2"><img src={url} alt={block.image?.alternativeText ?? ""} width={block.image?.width} height={block.image?.height} className="h-auto w-full rounded object-cover" />{block.image?.caption && <figcaption className="text-center text-xs text-text-secondary">{block.image.caption}</figcaption>}</figure>;
        }
        default:
            return <div key={key}>{renderChildren(block.children, key)}</div>;
    }
}

export default function RichText({ content }: { content?: StrapiContentNode[] | string | null }) {
    if (!content) return null;
    if (typeof content === "string") return <div className="whitespace-pre-line text-base leading-8 text-text-secondary">{content}</div>;
    return <div className="space-y-6">{content.map((block, index) => renderBlock(block, `block-${index}`))}</div>;
}
