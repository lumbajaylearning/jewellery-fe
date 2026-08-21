# API integration plan for the frontend app

## Goal
Connect the Next.js customer experience to the FastAPI backend so the UI moves from static demo content to real data without duplicating business rules.

## Current state
- Backend exposes the main routes under `/api` from [jewellery-api/main.py](../jewellery-api/main.py).
- The frontend pages in [jewellery-fe/app](../app) are still using hard-coded content and mock UI state.
- The backend already has working routers for products, bookings, and auth; the frontend needs to consume them.

## Integration architecture
1. Add a shared frontend API client in [jewellery-fe/app/lib/api-client.ts](../app/lib/api-client.ts) (to be created).
2. Use `http://127.0.0.1:8000` in local development.
3. Keep the frontend responsible for UI state and user flow; keep the backend responsible for pricing, cart rules, and booking validation.
4. Add proper loading, empty, and error states on every page that calls the API.

## Backend endpoints to wire up first

### Products
- `GET /api/products` → catalog page
- `GET /api/products/{id}` → product detail page

Expected shape:
- `id`
- `name`
- `description`
- `base_price`
- `category`

### Bookings
- `POST /api/bookings` → confirm booking from the cart flow
- `GET /api/bookings` → consultation history page

Expected shape:
- `id`
- `customer_name`
- `slot`
- `status`
- `booking_items`

### Auth
- `POST /api/auth/otp/request` → send OTP request on account page
- `POST /api/auth/otp/verify` → complete login flow
- `GET /api/auth/me` → fetch logged-in customer profile

## Page-by-page integration order

### Phase 1 — foundation
- Create the shared API client wrapper.
- Add environment config for the API base URL.
- Enable CORS in the FastAPI app so the Next.js app can call the backend during local development.

### Phase 2 — catalog and product experience
- Replace hard-coded product data on the home and category pages with `GET /api/products`.
- Replace the product detail mock with `GET /api/products/{id}`.
- Keep the current “indicative price” UX; do not introduce a final-price display in the frontend.

### Phase 3 — consultation cart and booking
- Move cart state from static demo data to a client-side cart that is populated from the products API.
- On booking submit, call `POST /api/bookings` with the selected items and booking details.
- Keep the cart cap preview in the UI, but let the backend remain the authority.

### Phase 4 — consultation history and account
- Load bookings from `GET /api/bookings` into the consultations page.
- Wire the account page to the OTP endpoints and store the session state for subsequent booking actions.

## Frontend implementation notes
- Use client components for the cart, booking form, and account flow.
- Persist the consultation cart in `localStorage` so it survives refreshes.
- Keep all business-rule decisions in the backend and treat the frontend preview as a UX hint only.
- Add clear states for:
  - loading
  - empty data
  - request failures
  - validation errors from the API

## Important integration caveats
- The backend is the source of truth for booking rules and pricing.
- The frontend should never calculate the final visit price itself.
- The current booking payload expects `customer_name`, `slot`, and `booking_items`; the UI should map form values to this structure.
- The backend currently uses a simple OTP mock; the frontend should be ready for a future real-auth switch without redesigning the flow.

## Recommended next step
Finish the end-to-end booking flow and make the frontend API client the single source of truth across products, cart, bookings, and auth.

### Immediate milestone
1. Use the shared API client everywhere instead of ad-hoc fetch calls.
2. Persist the selected cart items and submit a real booking from the booking page.
3. Route successful booking submissions to the confirmation page with the returned booking details.
4. Add auth-session handling for the OTP flow so future login steps can reuse the same request layer.
5. Verify the full path locally: products list → product detail → cart → booking submission → consultations history.
