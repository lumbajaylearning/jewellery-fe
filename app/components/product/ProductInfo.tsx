import Link from "next/link";
import { Check, Copy, Heart, Info, ShoppingBag, ShieldCheck, Zap } from "lucide-react";

interface ProductInfoProps {
    onOpenPriceBreakdown: () => void;
    onOpenCertificateModal: () => void;
    onAddToCart: () => void; onBuyNow: () => void; isWishlisted: boolean; onToggleWishlist: () => void;
    product: any; selectedVariant: any;
    selectedOptions: Record<string, string>; onOptionChange: (title: string, value: string) => void; cartLoading?: boolean;
}

export function ProductInfo({ product, selectedVariant, selectedOptions, onOptionChange, onOpenPriceBreakdown, onOpenCertificateModal, onAddToCart, onBuyNow, isWishlisted, onToggleWishlist, cartLoading = false }: ProductInfoProps) {
    const price = selectedVariant?.calculated_price;
    const amount = price?.calculated_amount ?? product.variants?.[0]?.calculated_price?.calculated_amount ?? 0;
    const originalAmount = price?.original_amount ?? amount;
    const currency = price?.currency_code ?? product.variants?.[0]?.calculated_price?.currency_code ?? "inr";
    const metadata = product.metadata ?? {};
    const hallmark = metadata.hallmark || metadata.bis_hallmark;
    const certificate = metadata.certificate_number || metadata.certificate_url;
    const sku = selectedVariant?.sku || product.id;
    const inStock = selectedVariant && (selectedVariant.manage_inventory === false || selectedVariant.inventory_quantity == null || selectedVariant.inventory_quantity > 0);
    const formatMoney = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: currency.toUpperCase(), maximumFractionDigits: 0 }).format(value);

    const copySku = () => navigator.clipboard?.writeText(sku);
    const category = product.categories?.[0];
    const quickSpecs = [
        product.weight ? ["Weight", `${product.weight}${metadata.weight_unit || "g"}`] : null,
        product.material || metadata.material ? ["Material", product.material || metadata.material] : null,
        metadata.purity ? ["Purity", metadata.purity] : null,
    ].filter(Boolean) as string[][];

    return <div className="flex w-full flex-col space-y-6">
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 overflow-x-auto text-xs text-text-secondary"><Link href="/">Home</Link><span>/</span><Link href="/shop">Jewellery</Link>{category && <><span>/</span><Link href={`/category/${category.handle}`}>{category.name}</Link></>}<span>/</span><span className="truncate font-medium text-text-primary">{product.title}</span></nav>

        <header className="space-y-3 border-b border-border pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2"><div className="flex flex-wrap gap-2">{product.collection?.title && <span className="rounded border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">{product.collection.title}</span>}{hallmark && <button onClick={onOpenCertificateModal} className="flex items-center gap-1 rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-800"><ShieldCheck className="h-3 w-3" />{String(hallmark)}</button>}</div><button onClick={copySku} className="flex items-center gap-1 font-mono text-xs text-text-secondary" title="Copy SKU">SKU: {sku}<Copy className="h-3.5 w-3.5" /></button></div>
            <h1 className="font-heading text-3xl leading-tight text-text-primary sm:text-4xl">{product.title}</h1>
            {product.subtitle && <p className="text-sm font-medium text-text-secondary">{product.subtitle}</p>}
            {product.description && <p className="text-sm leading-6 text-text-secondary">{product.description}</p>}
            {certificate && <button onClick={onOpenCertificateModal} className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold"><ShieldCheck className="h-4 w-4" />View configured certificate details</button>}
        </header>

        <section className="rounded border border-border bg-surface p-4 sm:p-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><div className="flex flex-wrap items-baseline gap-2"><span className="font-heading text-3xl font-semibold text-text-primary">{amount ? formatMoney(amount) : "Price unavailable"}</span>{originalAmount > amount && <><span className="text-sm text-text-secondary line-through">{formatMoney(originalAmount)}</span><span className="rounded bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-800">Save {formatMoney(originalAmount - amount)}</span></>}</div><p className="mt-1 text-[11px] text-text-secondary">Calculated by Medusa for the selected variant</p></div><button onClick={onOpenPriceBreakdown} className="inline-flex items-center gap-1 text-xs font-semibold text-gold"><Info className="h-4 w-4" />Price details</button></div></section>

        <section className="space-y-4">{product.options?.map((option: any) => <div key={option.id}><p className="text-xs font-semibold uppercase tracking-wider text-text-primary">{option.title}: <span className="font-normal normal-case text-text-secondary">{selectedOptions[option.title]}</span></p><div className="mt-2.5 flex flex-wrap gap-2">{option.values?.map((value: any) => { const selected = selectedOptions[option.title] === value.value; return <button key={value.id} type="button" onClick={() => onOptionChange(option.title, value.value)} className={`min-w-20 rounded border px-3 py-2.5 text-xs font-medium ${selected ? "border-gold bg-surface ring-1 ring-gold" : "border-border bg-white text-text-secondary hover:border-gold"}`}>{value.value}{selected && <Check className="ml-2 inline h-3 w-3 text-gold" />}</button>; })}</div></div>)}{!selectedVariant && <p className="text-xs text-rose-700">This option combination is unavailable.</p>}{selectedVariant && !inStock && <p className="text-xs text-rose-700">This variant is currently out of stock.</p>}</section>

        {quickSpecs.length > 0 && <div className="grid grid-cols-1 gap-3 rounded border border-border bg-surface p-3 text-center sm:grid-cols-3 sm:gap-0">{quickSpecs.map(([label, value], index) => <div key={label} className={index ? "sm:border-l sm:border-border sm:px-2" : "sm:px-2"}><span className="block text-[10px] uppercase tracking-wider text-text-secondary">{label}</span><span className="mt-1 block truncate text-xs font-semibold text-text-primary">{value}</span></div>)}</div>}

        <div className="space-y-3 pt-1"><div className="grid gap-3 sm:grid-cols-2"><button onClick={onAddToCart} disabled={cartLoading || !inStock || !amount} className="flex items-center justify-center gap-2 rounded bg-text-primary px-5 py-3.5 text-xs font-semibold text-white disabled:opacity-50"><ShoppingBag className="h-4 w-4 text-gold" />{cartLoading ? "Adding…" : "Add to Bag"}</button><button onClick={onBuyNow} disabled={cartLoading || !inStock || !amount} className="flex items-center justify-center gap-2 rounded bg-gold px-5 py-3.5 text-xs font-semibold text-white disabled:opacity-50"><Zap className="h-4 w-4" />Buy now</button></div><button onClick={onToggleWishlist} className={`flex w-full items-center justify-center gap-2 rounded border px-4 py-2.5 text-xs font-semibold ${isWishlisted ? "border-gold bg-surface text-gold" : "border-border bg-white"}`}><Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</button></div>
    </div>;
}
