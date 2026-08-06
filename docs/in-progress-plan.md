# Frontend in-progress plan

## Current focus
Complete the end-to-end consultation flow with a stronger booking experience and better consultation management UI.

## Priority items
1. Booking form improvements
   - Add address, date, time, and notes fields.
   - Add review/confirmation step before submit.
   - Show validation and loading/error states.

2. Consultation history
   - Replace placeholder data with real booking data from the API.
   - Add empty and retry states.
   - Show booking status badges and a detail view.

3. Cart and browsing
   - Improve cart limit messaging for the 4-item constraint.
   - Make the CTA to book a visit clearer.
   - Add clearer product eligibility messaging.

4. Auth flow
   - Keep OTP flow consistent with the API contract.
   - Persist a lightweight session state for future protected pages.

## Notes
- Keep the UI aligned with the existing design system.
- Continue using the shared API client for all API calls.
- Avoid duplicating backend business rules in the frontend.
