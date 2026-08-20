import { useState, type MouseEvent } from "react";
import { Heart, ZoomIn } from "lucide-react";

interface ProductGalleryProps {
    isWishlisted: boolean;
    onToggleWishlist: () => void;
    images?: Array<{ id?: string; url: string; title?: string; alt?: string }>;
    productTitle?: string;
}

const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='900' height='1100' viewBox='0 0 900 1100'%3E%3Crect width='900' height='1100' fill='%23F1ECE4'/%3E%3Ctext x='450' y='550' text-anchor='middle' dominant-baseline='middle' font-family='Arial,sans-serif' font-size='28' fill='%2378716C'%3EImage unavailable%3C/text%3E%3C/svg%3E";

export function ProductGallery({ isWishlisted, onToggleWishlist, images: productImages = [], productTitle = "Jewellery product" }: ProductGalleryProps) {
    const images = productImages.length ? productImages : [{ id: "unavailable", url: PLACEHOLDER_IMAGE, title: "Image unavailable", alt: `${productTitle} image unavailable` }];
    const [activeIndex, setActiveIndex] = useState(0);
    const [zooming, setZooming] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });

    const currentImage = images[activeIndex] ?? images[0];
    const moveZoom = (event: MouseEvent<HTMLDivElement>) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setPosition({ x: ((event.clientX - bounds.left) / bounds.width) * 100, y: ((event.clientY - bounds.top) / bounds.height) * 100 });
    };

    return (
        <div className="flex w-full select-none flex-col-reverse gap-4 lg:flex-row lg:gap-6">
            {images.length > 1 && <div className="flex gap-2.5 overflow-x-auto py-1 lg:max-h-[640px] lg:flex-col lg:overflow-y-auto">
                {images.map((image, index) => <button key={image.id ?? image.url} onClick={() => setActiveIndex(index)} aria-label={`View ${image.title ?? `${productTitle} image ${index + 1}`}`} className={`relative h-20 w-16 flex-none overflow-hidden rounded border transition sm:h-24 sm:w-20 ${activeIndex === index ? "border-gold ring-1 ring-gold" : "border-border opacity-75 hover:opacity-100"}`}><img src={image.url} alt={image.alt ?? `${productTitle} image ${index + 1}`} className="h-full w-full object-cover" /></button>)}
            </div>}

            <div className="group relative flex min-h-[420px] flex-1 items-center justify-center overflow-hidden rounded border border-border bg-white shadow-xs sm:min-h-[540px] lg:min-h-[640px]">
                <button onClick={onToggleWishlist} aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"} className={`absolute right-4 top-4 z-20 rounded-full border p-2.5 shadow-xs backdrop-blur-md transition ${isWishlisted ? "border-text-primary bg-text-primary text-white" : "border-border bg-white/90 text-text-secondary hover:text-text-primary"}`}><Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-gold" : ""}`} /></button>
                <div onMouseEnter={() => setZooming(true)} onMouseLeave={() => setZooming(false)} onMouseMove={moveZoom} className="relative flex min-h-[420px] h-full w-full cursor-crosshair items-center justify-center overflow-hidden sm:min-h-[540px] lg:min-h-[640px]">
                    <img src={currentImage.url} alt={currentImage.alt ?? productTitle} className={`h-full w-full object-cover transition-opacity ${zooming ? "opacity-0" : "opacity-100"}`} />
                    {zooming && <div className="pointer-events-none absolute inset-0 bg-no-repeat" style={{ backgroundImage: `url(${currentImage.url})`, backgroundPosition: `${position.x}% ${position.y}%`, backgroundSize: "240%" }} />}
                    {!zooming && <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-1.5 rounded border border-border bg-white/90 px-3 py-1 text-[11px] text-text-secondary shadow-xs backdrop-blur-md"><ZoomIn className="h-3.5 w-3.5 text-gold" />Hover to magnify</div>}
                </div>
            </div>
        </div>
    );
}
