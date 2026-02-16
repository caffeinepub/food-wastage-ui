# Specification

## Summary
**Goal:** Turn the Food Wastage UI into a persistence-backed web app by adding a Motoko backend for food donation posts and wiring the frontend to use it, while also applying a cohesive non-blue/purple visual theme.

**Planned changes:**
- Add a Motoko data model in `backend/main.mo` with stable storage of food donation posts partitioned per caller (e.g., keyed by Principal).
- Expose backend methods to create/add a post, list posts for the current caller, fetch the most recent post, and fetch tracking status (for most recent or by post id).
- Update frontend data flow to use the backend actor + React Query hooks (in `frontend/src/hooks/useQueries.ts`) for post creation and reading instead of client-only/localStorage hydration.
- Update History, NGO Alert, and Track screens to resolve state from backend data (including after refresh) and show appropriate loading/empty/fallback states when no data exists.
- Replace the Track page’s hard-coded steps with backend-derived tracking steps/status for the most recent donation.
- Apply a consistent visual theme (colors, typography, surfaces, spacing) across key screens without changing routes or adding product features, avoiding a blue/purple primary palette.

**User-visible outcome:** Users can create food donation posts that persist across refreshes/devices, view their history reliably, see NGO Alert/Track based on the latest saved donation, and experience a more cohesive, polished UI theme across the app.
