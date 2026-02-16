# Specification

## Summary
**Goal:** Make the NGO “Track” flow work in production by adding a real tracking screen and ensuring food posts persist across page refreshes.

**Planned changes:**
- Update the /ngo-alert “Track” button to navigate to a new dedicated tracking route/view (e.g., /track).
- Implement the tracking view UI to show a clear status timeline/steps and display details of the most recent food post when available.
- Add an English empty state on the tracking view when no food post exists, including a button to navigate to Add Food.
- Persist the client-side food posts store using browser storage so History, NGO Alert (mostRecent), and the tracking view continue working after refresh (no backend changes).

**User-visible outcome:** Clicking “Track” on the NGO Alert screen opens a tracking page that shows a simple status timeline and the latest food post details; food posts remain available after refreshing the page, and if no post exists the tracking page guides the user to add one.
