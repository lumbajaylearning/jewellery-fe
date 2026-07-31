# customer-web — design plan

Reference: isharya.com's visual language and UX patterns (minimalist
black/white/gold, editorial photography-led grids, category tiles,
quick-view modals, tabbed collections) — adapted structurally, not
copied. No Isharya copy, imagery, or branding is reused; this plan
borrows *patterns*, not assets.

## The core adaptation

Isharya is instant-checkout e-commerce: browse → add to cart → pay.
This app has a fundamentally different core action: browse → add to
a **consultation cart** (max 4 items) → **book a home visit** → a
representative brings the items → buy only what you keep. Every page
below is Isharya's pattern with that substitution made explicit.

## Visual language

- Palette: near-black (`#111`-ish) for text/nav, warm off-white
  background, one warm accent (gold/blush) for CTAs and price
  highlights — same register as Isharya's premium-minimal look, kept
  intentionally generic rather than matching their exact tone.
- Typography: a serif or high-contrast display face for headings
  (evokes the "modern Indian jewellery" editorial feel), clean sans
  for body/UI text — mirrors Isharya's heading/body split.
- Photography-led product cards, generous whitespace, thin hairline
  borders rather than heavy card shadows.
- Badges reused from Isharya's pattern but re-labeled for this
  business: "Bestseller" and "New" carry over as-is; "Sale" doesn't
  apply (no direct pricing online) — replaced with "Popular pick" or
  similar where useful.

## Site map

1. **Home** — hero, category tiles, how-it-works strip, bestsellers
   grid, persistent consultation-cart status banner
2. **Category / collection page** — grid + filters
3. **Product detail page**
4. **Consultation cart** (replaces a checkout cart)
5. **Book a visit** — address, date, slot
6. **Booking confirmation**
7. **My consultations** — tracking / history
8. **Account / login** (phone OTP)

## Page-by-page plan

### 1. Home
Already shown in the wireframe above. Sections top to bottom:
header/nav → hero banner → category tiles (Earrings, Necklaces,
Rings, Wristwear — same four categories Isharya uses, since they map
directly onto real jewellery categories) → a 3-step "how a home
consultation works" strip (new, not in Isharya — this is the thing
that needs explaining since the model is unfamiliar) → bestsellers
grid → a persistent cart-status banner ("2 of 4 items added, approx
₹X, book a visit") replacing the "view cart" pattern.

### 2. Category / collection page
Isharya's pattern: grid + sidebar/top filter bar + quick-view modal
on hover. Carried over directly:
- Filters: category (already selected via URL), occasion, price
  range (indicative), availability
- Grid of product cards — image, name, indicative price ("from
  ₹X, approx"), a quick-view affordance
- Quick view (modal): larger image, weight/purity range if
  available across pieces, occasion tags, "Add to consultation" and
  "View full details" — Isharya's quick-view shows price + add-to-cart;
  here it shows indicative price + add-to-consultation, with an
  explicit note that final price is calculated at the visit

### 3. Product detail page
- Image gallery (multiple angles, same as Isharya)
- Name, category, occasion tags
- Indicative price, clearly labeled "approximate — final price
  calculated by your representative during the visit" (this
  disclaimer needs to be visually present here, not buried in fine
  print, since it's core to how the business works)
- "Add to consultation" button (disabled/replaced with a message if
  the cart already has 4 items)
- No reviews/ratings section for MVP (not in scope per the PRD)
- Related/similar items strip (same pattern as Isharya's "you may
  also like")

### 4. Consultation cart
This is the page with no Isharya equivalent — it's not a checkout
cart, it's a "here's what you're bringing into the visit" summary.
- List of up to 4 selected items, each removable
- Running indicative total, with a visible progress-style indicator
  against the ₹20,000 cap (e.g. "₹8,098 of ~₹20,000 typical limit")
  — a soft preview only, matching the client-side-preview-not-
  authoritative note from the backend design
- If a 5th item is attempted: block with a clear message rather than
  silently failing
- CTA: "Book a home visit" (disabled with a message if cart is empty)

### 5. Book a visit
- Address selection (saved addresses, or add new)
- Date picker
- Time slot grid (Isharya has no equivalent; borrow the "clean grid
  of selectable options" visual pattern from their filter UI instead)
- A visible reminder: "Your consultation lasts about 40 minutes, and
  a representative stays with you the whole time" — sets expectations
  since this is an unfamiliar interaction model for most shoppers
- Confirm booking button

### 6. Booking confirmation
- Booking summary (date, time, address, item count)
- "What happens next" — 3-step recap of the visit itself (OTP
  verification, try-on, buy only what you want)
- Link to "My consultations" and an option to cancel (respecting the
  4-hour cancellation window from the business rules)

### 7. My consultations
- List of past/upcoming bookings, status badges (Pending, Confirmed,
  Completed, Cancelled), similar visual weight to Isharya's order
  history pattern but adapted to booking statuses instead of shipment
  statuses

### 8. Account / login
- Phone number entry → OTP (mocked for now, per the staged auth plan)
- No password for customers — matches the PRD's phone-OTP-only
  customer authentication decision

## Component inventory (build once, reuse everywhere)

- Header/nav (with cart-count badge showing "X of 4")
- Category tile
- Product card (grid variant + quick-view variant)
- Quick-view modal
- Cart-status banner (home page + persistent mini version elsewhere)
- Consultation cart line item
- Cap-progress indicator (visual bar/text showing indicative total
  vs. the ₹20,000 soft limit)
- Date picker
- Time slot picker (grid of selectable pills)
- Booking status badge
- "How it works" step (icon + short label, used on home + booking
  confirmation)

## What's deliberately NOT carried over from Isharya

- Instant checkout / payment at time of browsing — doesn't exist in
  this model at all
- "Sale" / discount pricing — not applicable, since online price is
  indicative only and never a final transactable price
- Reviews/ratings — out of MVP scope per the PRD
- Blog/SEO content section, Instagram feed, newsletter footer — nice
  marketing touches on Isharya, but not core to the booking flow and
  worth deferring past MVP
- Wishlist — explicitly out of scope in the PRD

## Build order suggestion

Matches Stage 2 of the overall plan (wiring to `admin-api`'s dummy
JSON API): Home → Category page → Product detail → Consultation cart
→ Book a visit → Confirmation → My consultations → Account/login
(last, alongside Stage 4's real auth). Each of these should be
buildable against `admin-api`'s dummy `/api/products` and
`/api/bookings` endpoints before any real database exists behind them.
