export type StoreProduct = {
    id: string;
    title: string;
    handle: string;
    thumbnail: string | null;
    images: {
        id: string;
        url: string;
        rank: number;
    }[];
};

export interface ShopProduct {
    id: string;
    title: string;
    handle: string;
    description: string | null;
    thumbnail: string | null;
    images: {
        id: string;
        url: string;
        rank: number;
    }[];
    price: {
        amount: number;
        currencyCode: string;
        formatted: string;
    };

    priceRange?: {
        min: number;
        max: number;
    };

    variants: {
        id: string;
        title: string;
        amount: number;
        currencyCode: string;
    }[];
}



///copy paste type


export type MetalType = 'yellow-gold' | 'rose-gold' | 'white-gold';
export type GoldPurity = '22K' | '18K' | '14K';

export interface MetalOption {
    id: MetalType;
    name: string;
    purity: string;
    colorHex: string;
    badge: string;
    description: string;
}

export interface PurityOption {
    id: GoldPurity;
    name: string;
    karatage: string;
    purityPercentage: string;
    bisCode: string;
    ratePerGram: number;
    multiplier: number;
}

export interface ProductImage {
    id: string;
    url: string;
    title: string;
    category: 'front' | 'side' | 'on-hand' | 'lifestyle' | 'diamond' | 'packaging' | '360';
    alt: string;
    description: string;
}

export interface ReviewItem {
    id: string;
    author: string;
    location: string;
    verified: boolean;
    rating: number;
    title: string;
    date: string;
    comment: string;
    helpfulCount: number;
    images?: string[];
    ringVariant: string;
    metal: string;
}

export interface RelatedProduct {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    originalPrice?: number;
    image: string;
    hoverImage: string;
    tag?: string;
    tryAtHomeEligible: boolean;
    rating: number;
    reviewsCount: number;
    category: string;
    metal: string;
}

export interface PincodeInfo {
    pincode: string;
    city: string;
    state: string;
    isServiceable: boolean;
    deliveryDays: string;
    estimatedArrival: string;
    trialAvailable: boolean;
    codAvailable: boolean;
    nearbyStores?: {
        name: string;
        address: string;
        distance: string;
        inStock: boolean;
        phone: string;
    }[];
}

export interface PriceBreakdownData {
    goldRatePerGram: number;
    netGoldWeightGrams: number;
    goldValue: number;
    stoneValue?: number;
    diamondCarats?: number;
    diamondValue?: number;
    makingCharges: number;
    makingChargeDiscount?: number;
    discount: number;
    subtotal: number;
    gstAmount: number;
    totalPrice: number;
}

export interface HomeTrialBookingState {
    selectedPieces: string[];
    date: string;
    timeSlot: string;
    fullName: string;
    phone: string;
    email: string;
    pincode: string;
    address: string;
    stylistNote: string;
    confirmed: boolean;
}

export interface CartItem {
    id: string;
    title: string;
    metal: MetalType;
    metalName: string;
    purity?: GoldPurity;
    size: number;
    price: number;
    quantity: number;
    image: string;
    sku: string;
    isHomeTrial?: boolean;
}

export type ViewportMode = 'desktop' | 'mobile' | 'wireframe' | 'presentation';

