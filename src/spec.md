# Specification

## Summary
**Goal:** Recreate the uploaded Food Wastage Solution mobile UI as a responsive web UI and provide multiple Add Food form layout variations with a simple demo flow.

**Planned changes:**
- Build a mobile-first responsive layout matching the prototype style (green top app bar, light background, rounded cards/shadows, consistent typography) and usable on desktop via a centered max-width container.
- Implement 4 screens with English UI text and matching structure: Home/Welcome, Add Food, NGO Alert, and History.
- Add bottom navigation with Home and History tabs with clear active state; provide navigation from Home to Add Food and a simulated flow from posting to NGO Alert.
- Implement at least 3 switchable Add Food form variations (same fields/actions: Title, Quantity, Date, Time, Post) with minimal required-field validation and inline errors.
- Add lightweight in-UI demo data: posting adds an item to History; NGO Alert displays a sample alert for the most recent post; map areas are placeholders (no external map services).
- Add and use required static generated images for food preview and map placeholder cards.

**User-visible outcome:** Users can navigate between Home and History, open Add Food, switch between multiple form layouts to post an item (with basic validation), see it appear in History, and view an NGO Alert screen with placeholder route/map visuals.
