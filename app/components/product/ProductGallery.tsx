import React, { useState, useRef } from 'react';
import { Heart, ZoomIn, RotateCcw, ShieldCheck, Sparkles, Award, Maximize2, Camera, Eye } from 'lucide-react';

export const PRODUCT_IMAGES_BY_METAL: Record<string, ProductImage[]> = {
    'yellow-gold': [
        {
            id: 'yg-front',
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
            title: 'Front View',
            category: 'front',
            alt: 'Glorious 22 Karat Yellow Gold Floral Ring - Front View',
            description: 'Intricate blooming flower motif handcrafted with polished layered petals and textured gold granulation.'
        },
        {
            id: 'yg-side',
            url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
            title: 'Side Profile',
            category: 'side',
            alt: 'Side Profile showing comfort-fit shank and dome floral structure',
            description: 'Elevated floral dome with tapering comfort-fit shank designed for seamless everyday wear.'
        },
        {
            id: 'yg-hand',
            url: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=85',
            title: 'On Hand',
            category: 'on-hand',
            alt: 'Glorious 22K Floral Ring worn on hand against natural linen',
            description: 'Proportionate 16.8mm floral bloom gracefully accentuating the finger.'
        },
        {
            id: 'yg-lifestyle',
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
            title: 'Editorial Styling',
            category: 'lifestyle',
            alt: 'Fine jewellery editorial styling on warm textured travertine stone',
            description: 'Designed for effortless transitions from festive celebrations to daily elegance.'
        },
        {
            id: 'yg-craft',
            url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
            title: 'Craftsmanship Macro 10x',
            category: 'diamond',
            alt: 'Macro filigree and hand-carved floral texture details',
            description: 'Microscopic gold wirework and matte-chased petal engravings executed by master artisans.'
        },
        {
            id: 'yg-packaging',
            url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
            title: 'Luxury Box & Certificate',
            category: 'packaging',
            alt: 'Handmade velvet keepsake box with tamper-evident seal and BIS Hallmarking card',
            description: 'Delivered in our signature embossed luxury box with tamper-evident seal and BIS Certificate dossier.'
        }
    ],
    'rose-gold': [
        {
            id: 'rg-front',
            url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1200&q=85',
            title: 'Front View',
            category: 'front',
            alt: 'Floral Ring in 18K Rose Gold - Front View',
            description: 'Warm blush 18K rose gold setting highlighting delicate botanical curves.'
        },
        {
            id: 'rg-side',
            url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
            title: 'Side Profile',
            category: 'side',
            alt: 'Side Profile in 18K Rose Gold',
            description: 'Artisan hand-finished basket setting with ergonomic band.'
        },
        {
            id: 'rg-hand',
            url: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=85',
            title: 'On Hand',
            category: 'on-hand',
            alt: 'Rose Gold Floral Ring worn gracefully on hand',
            description: 'Complements diverse skin tones with gentle warm blush undertones.'
        },
        {
            id: 'rg-lifestyle',
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
            title: 'Editorial Styling',
            category: 'lifestyle',
            alt: 'Fine jewellery editorial styling',
            description: 'Subtle, romantic luxury engineered for a lifetime of comfortable wear.'
        },
        {
            id: 'rg-craft',
            url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
            title: 'Craftsmanship Macro 10x',
            category: 'diamond',
            alt: 'Macro filigree details in rose gold',
            description: 'Chased petal engravings displaying pristine symmetry.'
        },
        {
            id: 'rg-packaging',
            url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
            title: 'Luxury Box & Certificate',
            category: 'packaging',
            alt: 'Luxury packaging box with hallmark authenticity',
            description: 'Arrives in our signature textured keepsake box with official certificate dossier.'
        }
    ],
    'white-gold': [
        {
            id: 'wg-front',
            url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85',
            title: 'Front View',
            category: 'front',
            alt: 'Floral Ring in 18K White Gold - Front View',
            description: 'Luminous rhodium-finished 18K white gold accentuating architectural floral petals.'
        },
        {
            id: 'wg-side',
            url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85',
            title: 'Side Profile',
            category: 'side',
            alt: 'Side Profile in 18K White Gold',
            description: 'Precision engineered comfort-fit inner shank with silky polished bevel.'
        },
        {
            id: 'wg-hand',
            url: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=85',
            title: 'On Hand',
            category: 'on-hand',
            alt: 'White Gold Floral Ring worn gracefully on hand',
            description: 'Ultra-modern brilliance and crisp architectural presence.'
        },
        {
            id: 'wg-lifestyle',
            url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
            title: 'Editorial Styling',
            category: 'lifestyle',
            alt: 'Fine jewellery editorial styling',
            description: 'A contemporary classic for modern celebratory and daily wear.'
        },
        {
            id: 'wg-craft',
            url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85',
            title: 'Craftsmanship Macro 10x',
            category: 'diamond',
            alt: 'Macro facet reflection and floral carving',
            description: 'High-precision micro-setting and rhodium mirror finish.'
        },
        {
            id: 'wg-packaging',
            url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=85',
            title: 'Luxury Box & Certificate',
            category: 'packaging',
            alt: 'Luxury packaging box with hallmark authenticity',
            description: 'Arrives in our signature textured keepsake box with official certificate dossier.'
        }
    ]
};

export type MetalType = 'yellow-gold' | 'rose-gold' | 'white-gold';

export interface ProductImage {
    id: string;
    url: string;
    title: string;
    category: 'front' | 'side' | 'on-hand' | 'lifestyle' | 'diamond' | 'packaging' | '360';
    alt: string;
    description: string;
}


interface ProductGalleryProps {
    selectedMetal: MetalType;
    isWishlisted: boolean;
    onToggleWishlist: () => void;
    onOpen360Modal: () => void;
    onOpenCertificateModal: () => void;
    onOpenVirtualTryOn?: () => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
    selectedMetal,
    isWishlisted,
    onToggleWishlist,
    onOpen360Modal,
    onOpenCertificateModal,
    onOpenVirtualTryOn
}) => {
    const images: ProductImage[] = PRODUCT_IMAGES_BY_METAL[selectedMetal] || PRODUCT_IMAGES_BY_METAL['yellow-gold'];
    const [activeIndex, setActiveIndex] = useState(0);
    const [isZooming, setIsZooming] = useState(false);
    const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0, bgX: 50, bgY: 50 });
    const [is360Active, setIs360Active] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0);
    const isDragging360 = useRef(false);
    const startX = useRef(0);

    const currentImage = images[activeIndex] || images[0];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (is360Active) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        const bgX = (x / width) * 100;
        const bgY = (y / height) * 100;
        setZoomCoords({ x, y, bgX, bgY });
    };

    const handleMouseDown360 = (e: React.MouseEvent) => {
        if (!is360Active) return;
        isDragging360.current = true;
        startX.current = e.clientX;
    };

    const handleMouseMove360 = (e: React.MouseEvent) => {
        if (!is360Active || !isDragging360.current) return;
        const delta = e.clientX - startX.current;
        setRotationAngle((prev) => (prev + delta * 0.8) % 360);
        startX.current = e.clientX;
    };

    const handleMouseUp360 = () => {
        isDragging360.current = false;
    };

    return (
        <div className="w-full flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 select-none">
            {/* Vertical Thumbnails List on Desktop (or horizontal on mobile/tablet) */}
            <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:max-h-[640px] py-1">
                {images.map((img, idx) => {
                    const isSelected = !is360Active && activeIndex === idx;
                    return (
                        <button
                            key={img.id}
                            onClick={() => {
                                setIs360Active(false);
                                setActiveIndex(idx);
                            }}
                            className={`relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded overflow-hidden transition-all duration-200 cursor-pointer border ${isSelected
                                    ? 'border-[#9E7D47] ring-1 ring-[#9E7D47] opacity-100 shadow-md'
                                    : 'border-[#E5DEC9] bg-[#FFFFFF] opacity-80 hover:opacity-100 hover:border-[#9E7D47]'
                                }`}
                            title={img.title}
                            aria-label={`Select ${img.title}`}
                        >
                            <img
                                src={img.url}
                                alt={img.alt}
                                className="w-full h-full object-cover object-center"
                                referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-[8.5px] text-[#FAF8F4] text-center pb-0.5 pt-2 font-medium tracking-tight truncate px-1">
                                {img.title}
                            </span>
                        </button>
                    );
                })}

                {/* 360 Degree View Interactive Thumbnail */}
                <button
                    onClick={() => {
                        setIs360Active(true);
                        onOpen360Modal();
                    }}
                    className={`relative flex-shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded overflow-hidden flex flex-col items-center justify-center transition-all duration-200 cursor-pointer border ${is360Active
                            ? 'border-[#9E7D47] bg-[#F7F3EB] ring-1 ring-[#9E7D47] text-[#9E7D47]'
                            : 'border-[#E5DEC9] bg-[#FFFFFF] text-[#78716C] hover:text-[#1C1917] hover:border-[#9E7D47]'
                        }`}
                    title="Interactive 360° Studio View"
                    aria-label="Open 360 degree turntable view"
                >
                    <RotateCcw className="w-5 h-5 mb-1 text-[#9E7D47] animate-spin-slow" />
                    <span className="text-[9px] font-semibold tracking-wider uppercase text-[#1C1917]">360° View</span>
                    <span className="text-[7.5px] text-[#78716C] mt-0.5">Turntable</span>
                </button>
            </div>

            {/* Primary High-Resolution Stage */}
            <div className="relative flex-1 bg-[#FFFFFF] rounded-md overflow-hidden border border-[#E5DEC9] min-h-[420px] sm:min-h-[540px] lg:min-h-[640px] flex items-center justify-center group shadow-xs">
                {/* Top Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-col sm:flex-row gap-2 items-start">
                    <button
                        onClick={onOpenCertificateModal}
                        className="bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] backdrop-blur-md text-[#1C1917] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-[#E5DEC9] shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                        <ShieldCheck className="w-3.5 h-3.5 text-[#047857]" />
                        <span>BIS 916 Hallmarked</span>
                    </button>

                    <div className="bg-[#FAF8F4]/90 backdrop-blur-md text-[#9E7D47] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-[#E5DEC9] shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#9E7D47]" />
                        <span>22 Karat Pure Gold</span>
                    </div>
                </div>

                {/* Top Right Action Icons */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                    {/* Virtual Try-On AR Button */}
                    <button
                        onClick={onOpen360Modal}
                        className="bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#1C1917] p-2 rounded-full backdrop-blur-md transition-all cursor-pointer shadow-xs border border-[#E5DEC9] flex items-center gap-1 text-[11px] font-medium px-2.5"
                        title="Try with 360 Studio / AR"
                    >
                        <Camera className="w-3.5 h-3.5 text-[#9E7D47]" />
                        <span className="hidden sm:inline">Try It On</span>
                    </button>

                    {/* Wishlist Button */}
                    <button
                        onClick={onToggleWishlist}
                        className={`p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xs border ${isWishlisted
                                ? 'bg-[#1C1917] text-[#FAF8F4] border-[#1C1917]'
                                : 'bg-[#FFFFFF]/90 text-[#57534E] hover:text-[#1C1917] hover:bg-[#FFFFFF] border-[#E5DEC9]'
                            }`}
                        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        aria-label="Wishlist"
                    >
                        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-[#9E7D47]' : ''}`} />
                    </button>
                </div>

                {/* 360 Interactive Mode Stage */}
                {is360Active ? (
                    <div
                        onMouseDown={handleMouseDown360}
                        onMouseMove={handleMouseMove360}
                        onMouseUp={handleMouseUp360}
                        onMouseLeave={handleMouseUp360}
                        className="w-full h-full min-h-[420px] sm:min-h-[540px] flex flex-col items-center justify-center cursor-ew-resize bg-gradient-to-b from-[#FAF8F4] to-[#F1ECE4] p-6 relative select-none"
                    >
                        <div
                            className="w-72 h-72 sm:w-96 sm:h-96 relative flex items-center justify-center transition-transform duration-75"
                            style={{ transform: `rotate(${rotationAngle}deg)` }}
                        >
                            <img
                                src={currentImage.url}
                                alt="360 Turntable Presentation"
                                className="w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                                referrerPolicy="no-referrer"
                            />
                        </div>

                        {/* Bottom 360 Controls */}
                        <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 pointer-events-none">
                            <div className="bg-[#1C1917]/90 text-[#FAF8F4] text-xs px-4 py-1.5 rounded-full backdrop-blur-md font-medium tracking-wide flex items-center gap-2 shadow-lg">
                                <RotateCcw className="w-3.5 h-3.5 text-[#C5A880] animate-spin-slow" />
                                <span>Drag left / right to rotate 360°</span>
                            </div>
                            <span className="text-[10px] text-[#78716C]">
                                Rotation Angle: {Math.round((rotationAngle % 360 + 360) % 360)}°
                            </span>
                        </div>
                    </div>
                ) : (
                    /* Normal Zoomable Photo Viewport */
                    <div
                        onMouseEnter={() => setIsZooming(true)}
                        onMouseLeave={() => setIsZooming(false)}
                        onMouseMove={handleMouseMove}
                        onClick={onOpen360Modal}
                        className="w-full h-full min-h-[420px] sm:min-h-[540px] lg:min-h-[640px] flex items-center justify-center cursor-crosshair overflow-hidden relative"
                    >
                        <img
                            src={currentImage.url}
                            alt={currentImage.alt}
                            className={`w-full h-full object-cover object-center transition-opacity duration-300 ${isZooming ? 'opacity-0' : 'opacity-100'
                                }`}
                            referrerPolicy="no-referrer"
                        />

                        {/* Magnifier Canvas Zoom Box when Hovered */}
                        {isZooming && (
                            <div
                                className="absolute inset-0 w-full h-full bg-no-repeat pointer-events-none transition-all duration-75"
                                style={{
                                    backgroundImage: `url(${currentImage.url})`,
                                    backgroundPosition: `${zoomCoords.bgX}% ${zoomCoords.bgY}%`,
                                    backgroundSize: '240%'
                                }}
                            />
                        )}

                        {/* Micro Lens Zoom Callout when not hovered */}
                        {!isZooming && (
                            <div className="absolute bottom-4 left-4 z-20 bg-[#FFFFFF]/90 backdrop-blur-md px-3 py-1 rounded text-[11px] text-[#57534E] border border-[#E5DEC9] flex items-center gap-1.5 shadow-xs pointer-events-none">
                                <ZoomIn className="w-3.5 h-3.5 text-[#9E7D47]" />
                                <span>Hover to Magnify 2.4x</span>
                            </div>
                        )}

                        {/* Fullscreen Button */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpen360Modal();
                            }}
                            className="absolute bottom-4 right-4 z-20 bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#57534E] hover:text-[#1C1917] p-2 rounded-full border border-[#E5DEC9] shadow-xs cursor-pointer transition-colors"
                            title="Expand High-Resolution View"
                            aria-label="Expand view"
                        >
                            <Maximize2 className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
