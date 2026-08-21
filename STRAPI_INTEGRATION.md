# Strapi Homepage API Integration Guide

## Overview
The jewellery-fe application now fetches dynamic homepage content from the Strapi CMS API. The homepage is composed of multiple sections that are dynamically rendered based on the API response.

## Architecture

### File Structure
```
jewellery-fe/
├── app/
│   ├── types/
│   │   └── homepage.ts                 # Type definitions for homepage data
│   ├── lib/
│   │   └── api-client.ts               # API client with fetchHomepageData()
│   ├── components/
│   │   ├── homepage/
│   │   │   ├── HeroBanner.tsx          # Hero banner section
│   │   │   ├── CategoryGrid.tsx        # Category showcase
│   │   │   ├── ProductCarousel.tsx     # Product carousel
│   │   │   ├── CollectionShowcase.tsx  # Featured collection
│   │   │   ├── HomeTrial.tsx           # Home trial CTA
│   │   │   ├── HowItWorks.tsx          # Steps/workflow
│   │   │   ├── TrustSection.tsx        # Trust/benefits
│   │   │   ├── Editorial.tsx           # Articles/blog
│   │   │   ├── CtaBanner.tsx           # CTA banner
│   │   │   └── SectionRenderer.tsx     # Dynamic router
│   ├── page.tsx                         # Homepage (updated)
├── .env.local                           # Environment configuration (local dev)
├── .env.example                         # Environment template
```

## Setup Instructions

### 1. Environment Configuration
The `.env.local` file is already configured with the default Strapi URL:

### 2. Verify Strapi is Running
Ensure Strapi CMS is running with the homepage content type configured:
```bash
# In jewell-app-cms directory
pnpm dev
```

Strapi should be accessible at: `http://localhost:1337`

### 3. Create Homepage Content in Strapi
Before the integration works, you need to create homepage content in Strapi:

1. Navigate to Strapi Admin: `http://localhost:1337/admin`
2. Create a "Homepage" collection type with the sections structure
3. Add content matching the response structure shown below
4. Publish the homepage entry

### 4. Start the Frontend Application
```bash
# In jewellery-fe directory
pnpm dev
```

The frontend should be accessible at: `http://localhost:3000`

## API Response Structure

The API endpoint (`/api/homepages?populate=*`) returns data matching this structure:

```json
{
  "data": {
    "id": 2,
    "documentId": "vbsj2rawxfm0fajfq5p5bhle",
    "createdAt": "2026-08-09T18:17:33.016Z",
    "updatedAt": "2026-08-09T18:17:33.016Z",
    "publishedAt": "2026-08-09T18:17:33.090Z",
    "sections": [
      {
        "id": 2,
        "title": "...",
        "subtitle": "...",
        "__component": "homepage.hero-banner",
        ...
      }
    ]
  },
  "meta": {}
}
```

## Supported Section Types

### 1. Hero Banner (`homepage.hero-banner`)
Main hero section with title, subtitle, CTA, and background image.

**Required Fields:**
- `title`: Hero title
- `subtitle`: Hero subtitle
- `ctaText`: Call-to-action button text
- `ctaLink`: CTA button link

**Optional Fields:**
- `desktopImage`: Desktop background image array
- `mobileImage`: Mobile background image array
- `alignment`: Text alignment

### 2. Category Grid (`homepage.category-grid`)
Displays product categories in a grid.

**Fields:**
- `title`: Section title
- `subtitle`: Section subtitle
- `categoryIds`: Array of category IDs (optional)

### 3. Product Carousel (`homepage.product-carousel`)
Carousel of products filtered by source.

**Fields:**
- `title`: Section title
- `subtitle`: Section subtitle
- `limit`: Number of products to display
- `source`: Filter source ("trending", "new-arrivals", etc.)

### 4. Collection Showcase (`homepage.collection-showcase`)
Featured collection with image and CTA.

**Fields:**
- `title`: Collection title
- `subtitle`: Collection description
- `ctaText`: CTA button text
- `ctaLink`: CTA link
- `image`: Collection image

### 5. Home Trial (`homepage.home-trial`)
Home trial booking section.

**Fields:**
- `title`: Section title
- `subtitle`: Short description
- `description`: Detailed description
- `ctaText`: CTA button text
- `ctaLink`: CTA link
- `image`: Section image

### 6. How It Works Step (`homepage.how-it-works-step`)
Individual step in the workflow section (multiple instances group together).

**Fields:**
- `number`: Step number
- `title`: Step title
- `description`: Step description
- `icon`: Step icon image

### 7. Trust Section (`homepage.trust-section`)
Container for trust/benefit items.

**Fields:**
- `title`: Section title
- `subtitle`: Section subtitle

### 8. Trust Item (`homepage.trust-item`)
Individual trust/benefit item.

**Fields:**
- `title`: Benefit title
- `description`: Benefit description
- `icon`: Benefit icon

### 9. Editorial (`homepage.editorial`)
Articles/blog section.

**Fields:**
- `title`: Section title
- `subtitle`: Section subtitle

### 10. CTA Banner (`homepage.cta-banner`)
Final call-to-action banner.

**Fields:**
- `title`: Banner title
- `description`: Banner description
- `ctaText`: CTA button text
- `ctaLink`: CTA link
- `image`: Banner image

## Data Flow

```
1. User loads homepage (page.tsx)
   ↓
2. useEffect triggers fetchHomepageData()
   ↓
3. API request to Strapi: GET /api/homepages?populate=*
   ↓
4. Response data stored in state (sections array)
   ↓
5. SectionRenderer processes sections:
   - Groups related sections (HowItWorks steps, TrustItems)
   - Maps __component field to component type
   ↓
6. Individual components render with data props
   ↓
7. User sees dynamic homepage content
```

## Error Handling

### Loading State
- Displays spinning loader while fetching data
- Shows "Loading homepage..." message

### Error State
- Displays error message with retry button
- Console logs detailed error information
- User can click "Retry" to reload

### Fallback Behavior
- Missing images show placeholder text
- Unknown section types are logged and skipped
- Empty/null data fields display sensible defaults

## Customization

### Adding New Section Types

1. **Add Type Definition** (`app/types/homepage.ts`):
```typescript
export interface NewSectionType extends BaseSection {
  __component: "homepage.new-section";
  field1: string;
  field2: number;
}
```

2. **Add to Union Type**:
```typescript
export type Section = 
  | HeroBannerSection
  | NewSectionType  // Add here
  | ...
```

3. **Create Component** (`app/components/homepage/NewSection.tsx`):
```typescript
export default function NewSection({ section }: { section: NewSectionType }) {
  return (
    <section>
      {/* Your component JSX */}
    </section>
  );
}
```

4. **Add to SectionRenderer** (`app/components/homepage/SectionRenderer.tsx`):
```typescript
case "homepage.new-section":
  return <NewSection key={index} section={data} />;
```

## Testing

### Manual Testing Checklist
- [ ] Strapi is running and accessible
- [ ] Homepage content is published in Strapi
- [ ] Frontend loads without console errors
- [ ] All sections render correctly
- [ ] Images display (or show placeholders)
- [ ] CTAs link to correct pages
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Error state works (temporarily break API URL to test)

### API Testing
Use curl or Postman to test the endpoint:
```bash
curl http://localhost:1337/api/homepages?populate=*
```

## Troubleshooting

### 1. API Connection Error
**Problem**: "Unable to load homepage data"
**Solution**: 
- Check if Strapi is running (`pnpm dev` in jewell-app-cms)
- Check browser console for detailed error

### 2. Empty Sections
**Problem**: Homepage loads but shows no sections
**Solution**:
- Ensure homepage content is created in Strapi
- Verify content is published (not in draft)
- Check that sections are properly added and structured

### 3. Missing Images
**Problem**: Images show placeholders
**Solution**:
- Ensure images are uploaded in Strapi
- Verify media URLs are accessible
- Check CORS settings if images are on different domain

### 4. Type Errors
**Problem**: TypeScript compilation errors
**Solution**:
- Ensure all section components are properly typed
- Verify `Section` union type includes all component types
- Check that component prop types match the type definitions

## Performance Considerations

1. **Caching**: Consider adding caching headers to the API response
2. **Revalidation**: Can use Next.js ISR (Incremental Static Regeneration) for better performance
3. **Image Optimization**: Components use Next.js Image component where applicable
4. **Code Splitting**: Section components are loaded on-demand

## Next Steps

### Future Enhancements
1. Convert to Server Component for better performance
2. Add ISR revalidation for static generation
3. Implement image optimization with Next.js Image component
4. Add analytics tracking to CTA clicks
5. Add A/B testing capabilities
6. Implement section caching with React Query or SWR

## Support & Documentation

- [Strapi Documentation](https://docs.strapi.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

## Example Strapi Content Structure

For reference, here's what the Strapi content model should look like:

```
Homepage (Single Type or Collection Type)
├── Sections (Repeatable Component)
│   ├── Hero Banner Component
│   │   ├── title (Short Text)
│   │   ├── subtitle (Short Text)
│   │   ├── ctaText (Short Text)
│   │   ├── ctaLink (Short Text/URL)
│   │   ├── alignment (Enumeration)
│   │   ├── desktopImage (Media)
│   │   └── mobileImage (Media)
│   ├── Category Grid Component
│   │   ├── title (Short Text)
│   │   ├── subtitle (Short Text)
│   │   └── categoryIds (JSON)
│   ├── Product Carousel Component
│   │   ├── title (Short Text)
│   │   ├── subtitle (Short Text)
│   │   ├── limit (Number)
│   │   └── source (Enumeration)
│   └── ... (other components)
└── Meta information (timestamps, etc.)
```

This integration is fully functional and ready for customization!
