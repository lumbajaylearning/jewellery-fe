import { MetalOption, PurityOption, ProductImage, ReviewItem, RelatedProduct, PincodeInfo, PriceBreakdownData } from '@/app/types/product';

export const LIVE_GOLD_RATES = {
  '24K': 8565,
  '22K': 7850,
  '18K': 6420,
  '14K': 5010,
  lastUpdated: 'Today at 09:30 AM IST',
  change: '+₹45 / g today'
};

export const PURITY_OPTIONS: PurityOption[] = [
  {
    id: '22K',
    name: '22 Karat (916 Purity)',
    karatage: '22KT',
    purityPercentage: '91.6% Pure Gold',
    bisCode: 'BIS 916 Hallmarked',
    ratePerGram: 7850,
    multiplier: 1.0
  },
  {
    id: '18K',
    name: '18 Karat (750 Purity)',
    karatage: '18KT',
    purityPercentage: '75.0% Pure Gold',
    bisCode: 'BIS 750 Hallmarked',
    ratePerGram: 6420,
    multiplier: 0.82
  },
  {
    id: '14K',
    name: '14 Karat (585 Purity)',
    karatage: '14KT',
    purityPercentage: '58.5% Pure Gold',
    bisCode: 'BIS 585 Hallmarked',
    ratePerGram: 5010,
    multiplier: 0.65
  }
];

export const METALS: MetalOption[] = [
  {
    id: 'yellow-gold',
    name: 'Yellow Gold',
    purity: '22KT / 916 Hallmarked',
    colorHex: '#E5C07B',
    badge: 'Classic Heritage',
    description: 'Traditional 22K yellow gold with opulent radiance and BIS 916 hallmark purity.'
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    purity: '18KT / 750 Hallmarked',
    colorHex: '#E8A598',
    badge: 'Romantic Blush',
    description: 'Subtle copper-blended gold alloy offering a delicate, warm blush tone.'
  },
  {
    id: 'white-gold',
    name: 'White Gold',
    purity: '18KT / 750 Hallmarked',
    colorHex: '#E2E8F0',
    badge: 'Contemporary Luminescence',
    description: 'Rhodium-treated gold maximizing contemporary shine and architectural clarity.'
  }
];

export const RING_SIZES = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

// High-resolution photography for Glorious 22 Karat Yellow Gold Floral Ring (Tanishq Aesthetic)
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

// Official Product Specifications matching Tanishq Glorious 22 Karat Yellow Gold Floral Ring (511920FCMAA00)
export const PRODUCT_SPECIFICATIONS = {
  brand: 'Tanishq / AURA Fine Jewellery',
  productName: 'Glorious 22 Karat Yellow Gold Floral Ring',
  productCode: '511920FCMAA00',
  collection: 'Aarambh Heritage Collection',
  gender: 'Women',
  occasion: 'Casual Wear / Festive Celebrations / Anniversary',
  productType: 'Finger Ring',
  styleDesign: 'Floral Bloom Filigree Motif with Granulated Center',
  metal: 'Pure Gold',
  metalPurity: '22 Karat (916 Purity)',
  metalColor: 'Golden Yellow',
  width: '16.8 mm (Motif Span)',
  bandThickness: '1.8 mm (Comfort-Fit Shank)',
  grossWeight: '1.890 grams (approx.)',
  netGoldWeight: '1.890 grams',
  stoneWeight: '0.000 grams (100% Solid Pure Gold)',
  hallmarkBureau: 'BIS Certified Assay Bureau (6-Digit HUID Registered)',
  huidNumber: 'HUID-916-TNQ-882194',
  certification: 'BIS 916 Hallmark & 100% Purity Tested Karatmeter Guarantee',
  sizingRange: 'Sizes 6 to 18 (Custom resizing complimentary)',
  warranty: 'Lifetime Maintenance, Free Polishing & Servicing across 400+ Stores',
  returnPolicy: '15-Day 100% Money-Back Guarantee with Free Doorstep Pickup',
  exchangePolicy: '100% Exchange Value on Gold according to prevailing day rate'
};

// Dynamic Price Breakdown based on 22K Gold Rate @ ₹7,850/g and 1.890g net weight
export const BASE_PRICE_BREAKDOWN: PriceBreakdownData = {
  goldRatePerGram: 7850,
  netGoldWeightGrams: 1.890,
  goldValue: 14836, // 1.890 * 7850
  stoneValue: 0,
  makingCharges: 4435, // Approx 29.8% crafting of intricate floral filigree
  makingChargeDiscount: 665, // 15% special discount on making charges
  discount: 665,
  subtotal: 18606,
  gstAmount: 558, // 3% GST on 18,606
  totalPrice: 19164 // Final payable
};

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Sunita Mehra',
    location: 'Bandra West, Mumbai',
    verified: true,
    rating: 5,
    title: 'Flawless 22K yellow gold finish — looks royal and comfortable!',
    date: 'February 8, 2026',
    comment: 'The floral motif is crafted with such delicate precision. The 22 Karat 916 gold has a rich, luminous golden sheen that stands out beautifully. Checked the BIS HUID code on the BIS Care App and it verified instantly. Sits very comfortably on my finger for daily office wear.',
    helpfulCount: 42,
    ringVariant: '22KT Yellow Gold / Size 9',
    metal: 'Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'rev-2',
    author: 'Kavitha Ranganathan',
    location: 'Indiranagar, Bengaluru',
    verified: true,
    rating: 5,
    title: 'Perfect gift for our 10th anniversary. Transparent pricing.',
    date: 'January 24, 2026',
    comment: 'My husband ordered this for our anniversary. The transparent price breakup showing the exact 1.890 grams of 22K gold at the day’s rate gave us total confidence. The packaging was immaculate with an illuminated display box.',
    helpfulCount: 31,
    ringVariant: '22KT Yellow Gold / Size 8',
    metal: 'Yellow Gold',
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80'
    ]
  },
  {
    id: 'rev-3',
    author: 'Priyanka Sharma',
    location: 'Connaught Place, New Delhi',
    verified: true,
    rating: 5,
    title: 'Tried at home first — exceptional stylist experience',
    date: 'January 12, 2026',
    comment: 'Booked the Try at Home slot. The stylist brought this floral ring along with two matching Aarambh pieces. The comfort-fit court shank is remarkably smooth. Bought it on the spot!',
    helpfulCount: 26,
    ringVariant: '22KT Yellow Gold / Size 7',
    metal: 'Yellow Gold'
  },
  {
    id: 'rev-4',
    author: 'Meenakshi Iyer',
    location: 'T. Nagar, Chennai',
    verified: true,
    rating: 4,
    title: 'Lovely design and weight. Fast 2-day delivery.',
    date: 'December 29, 2025',
    comment: 'The 16.8mm floral motif has great coverage on the hand without feeling heavy or sharp. Delivered safely in a tamper-evident locked pouch with OTP confirmation.',
    helpfulCount: 19,
    ringVariant: '22KT Yellow Gold / Size 10',
    metal: 'Yellow Gold'
  }
];

// Tanishq "Complete the Look" & Matching Floral Collection Pieces
export const RELATED_PRODUCTS: RelatedProduct[] = [
  {
    id: 'rel-1',
    name: 'Glorious 22K Floral Drop Earrings',
    subtitle: 'Matching Aarambh Floral Motif • 3.42g Net Wt.',
    price: 34500,
    originalPrice: 38200,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    tag: 'Matching Set',
    tryAtHomeEligible: true,
    rating: 4.9,
    reviewsCount: 76,
    category: 'Floral Earrings',
    metal: '22K Yellow Gold'
  },
  {
    id: 'rel-2',
    name: 'Glorious 22K Floral Pendant & Chain',
    subtitle: 'Ornate Filigree Bloom with Adjustable 18" Gold Chain',
    price: 29800,
    originalPrice: 33000,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    tag: 'Best Seller',
    tryAtHomeEligible: true,
    rating: 4.9,
    reviewsCount: 94,
    category: 'Floral Pendants',
    metal: '22K Yellow Gold'
  },
  {
    id: 'rel-3',
    name: 'Aarambh 22K Filigree Gold Bangle',
    subtitle: '22 Karat Gold • Intricate Floral Cutwork • 12.5g',
    price: 108500,
    originalPrice: 118000,
    image: 'https://images.unsplash.com/photo-1611591475102-4a008323869a?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    tag: 'Heritage Craft',
    tryAtHomeEligible: true,
    rating: 4.8,
    reviewsCount: 52,
    category: 'Gold Bangles',
    metal: '22K Yellow Gold'
  },
  {
    id: 'rel-4',
    name: 'Lumière Solitaire Diamond Ring',
    subtitle: '18K Gold • 0.25ct Solitaire Round Brilliant (IGI Certified)',
    price: 49999,
    originalPrice: 54500,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80',
    hoverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80',
    tag: 'Solitaire Classic',
    tryAtHomeEligible: true,
    rating: 4.9,
    reviewsCount: 124,
    category: 'Diamond Rings',
    metal: '18K Gold'
  }
];

export const RECENTLY_VIEWED = [
  {
    id: 'rec-1',
    name: 'Glorious Floral Pendant',
    metal: '22K Yellow Gold',
    price: 29800,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'rec-2',
    name: 'Eternal Diamond Studs',
    metal: '18K White Gold',
    price: 41200,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'rec-3',
    name: 'Twisted Vine Gold Ring',
    metal: '18K Rose Gold',
    price: 28900,
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 'rec-4',
    name: 'Lumière Solitaire Ring',
    metal: '18K Yellow Gold',
    price: 49999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80'
  }
];

export const PINCODE_DATABASE: Record<string, PincodeInfo> = {
  '110001': {
    pincode: '110001',
    city: 'New Delhi',
    state: 'Delhi',
    isServiceable: true,
    deliveryDays: '2-3 business days',
    estimatedArrival: 'Thursday, Aug 20',
    trialAvailable: true,
    codAvailable: true,
    nearbyStores: [
      { name: 'Tanishq Boutique - Connaught Place', address: 'F-Block, Inner Circle, CP', distance: '1.2 km', inStock: true, phone: '011-43528800' },
      { name: 'Tanishq - South Extension Part 1', address: 'Main Ring Road, South Ext', distance: '6.5 km', inStock: true, phone: '011-24621100' }
    ]
  },
  '400001': {
    pincode: '400001',
    city: 'Mumbai',
    state: 'Maharashtra',
    isServiceable: true,
    deliveryDays: '1-2 business days',
    estimatedArrival: 'Wednesday, Aug 19',
    trialAvailable: true,
    codAvailable: true,
    nearbyStores: [
      { name: 'Tanishq Flagship - Turner Road, Bandra West', address: 'Plot 34, Turner Road', distance: '3.4 km', inStock: true, phone: '022-66914000' },
      { name: 'Tanishq - Fort / Kala Ghoda', address: 'Flora Fountain, Fort', distance: '0.8 km', inStock: true, phone: '022-22045500' }
    ]
  },
  '560001': {
    pincode: '560001',
    city: 'Bengaluru',
    state: 'Karnataka',
    isServiceable: true,
    deliveryDays: '2-3 business days',
    estimatedArrival: 'Thursday, Aug 20',
    trialAvailable: true,
    codAvailable: true,
    nearbyStores: [
      { name: 'Tanishq - 100ft Road, Indiranagar', address: 'Near HAL 2nd Stage', distance: '2.1 km', inStock: true, phone: '080-41258899' },
      { name: 'Tanishq - Brigade Road, MG Road Area', address: 'Commercial Junction, Brigade Rd', distance: '1.5 km', inStock: true, phone: '080-25586677' }
    ]
  },
  '600001': {
    pincode: '600001',
    city: 'Chennai',
    state: 'Tamil Nadu',
    isServiceable: true,
    deliveryDays: '3-4 business days',
    estimatedArrival: 'Friday, Aug 21',
    trialAvailable: true,
    codAvailable: true,
    nearbyStores: [
      { name: 'Tanishq - Usman Road, T. Nagar', address: 'North Usman Road, T. Nagar', distance: '4.2 km', inStock: true, phone: '044-28143300' }
    ]
  },
  '700001': {
    pincode: '700001',
    city: 'Kolkata',
    state: 'West Bengal',
    isServiceable: true,
    deliveryDays: '3-4 business days',
    estimatedArrival: 'Friday, Aug 21',
    trialAvailable: true,
    codAvailable: true,
    nearbyStores: [
      { name: 'Tanishq - Camac Street', address: 'Park Street Cross, Camac St', distance: '2.8 km', inStock: true, phone: '033-22879900' }
    ]
  },
  '500001': {
    pincode: '500001',
    city: 'Hyderabad',
    state: 'Telangana',
    isServiceable: true,
    deliveryDays: '2-3 business days',
    estimatedArrival: 'Thursday, Aug 20',
    trialAvailable: true,
    codAvailable: true,
    nearbyStores: [
      { name: 'Tanishq - Road No. 36, Jubilee Hills', address: 'Near Peddamma Temple', distance: '5.1 km', inStock: true, phone: '040-23554400' }
    ]
  }
};

export const SIZE_CHART = [
  { indian: 6, us: 3.5, uk: 'G', innerDiameterMm: 14.5, circumferenceMm: 45.5 },
  { indian: 7, us: 4.0, uk: 'H 1/2', innerDiameterMm: 14.9, circumferenceMm: 46.8 },
  { indian: 8, us: 4.5, uk: 'I 1/2', innerDiameterMm: 15.3, circumferenceMm: 48.0 },
  { indian: 9, us: 5.0, uk: 'J 1/2', innerDiameterMm: 15.7, circumferenceMm: 49.3 },
  { indian: 10, us: 5.5, uk: 'L', innerDiameterMm: 16.1, circumferenceMm: 50.6 },
  { indian: 11, us: 6.0, uk: 'M', innerDiameterMm: 16.5, circumferenceMm: 51.9 },
  { indian: 12, us: 6.5, uk: 'N', innerDiameterMm: 16.9, circumferenceMm: 53.1 },
  { indian: 13, us: 7.0, uk: 'O', innerDiameterMm: 17.3, circumferenceMm: 54.4 },
  { indian: 14, us: 7.5, uk: 'P', innerDiameterMm: 17.7, circumferenceMm: 55.7 },
  { indian: 15, us: 8.0, uk: 'Q', innerDiameterMm: 18.1, circumferenceMm: 57.0 },
  { indian: 16, us: 8.5, uk: 'R', innerDiameterMm: 18.5, circumferenceMm: 58.3 },
  { indian: 17, us: 9.0, uk: 'S', innerDiameterMm: 18.9, circumferenceMm: 59.6 },
  { indian: 18, us: 9.5, uk: 'T', innerDiameterMm: 19.3, circumferenceMm: 60.9 }
];
