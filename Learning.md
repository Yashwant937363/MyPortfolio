# Portfolio Architecture & System Learnings

This document summarizes the core architectural patterns, design decisions, and system simulation mechanics implemented in this interactive portfolio.

---

## 1. 🌐 Browser & URL-Based Navigation
- **Primary Navigation**: Navigation is driven directly via the **Browser Mockup Address Bar** (`yashwantpoyrekar.dev/<route>`).
- **Supported Routes**:
  - `yashwantpoyrekar.dev/about`
  - `yashwantpoyrekar.dev/experience`
  - `yashwantpoyrekar.dev/education`
  - `yashwantpoyrekar.dev/skills`
  - `yashwantpoyrekar.dev/projects` (and subroutes like `/projects/gossip-app`, `/projects/queuecast`, `/projects/tic-tac-toe`, `/projects/todo-list`)
- **Bi-Directional URL Synchronization**:
  - Submitting or typing a route in the URL address bar initiates a backend microservice query.
  - Scrolling through snapped sections automatically updates the browser address bar URL via an `IntersectionObserver`.

---

## 2. ⚡ Automatic Scroll-Triggered Backend Route Hits
- **Auto-Fetch on Scroll**: When a user scrolls into a section whose backend route has not been loaded yet, the system **automatically triggers the HTTP route request** without requiring manual button clicks.
- **Pending Request Lock**: Uses a `pendingRouteRef` lock to prevent duplicate or concurrent requests while an animation traversal is active.

---

## 3. ⚡ Big Diagram Architecture Traversal
- **No Mini Diagrams**: All HTTP request animations execute directly on the **ONE LARGE WORLD Architecture SVG Diagram** (`FullWorldFlow`), providing full visibility into network packet routing.
- **5-Leg Traversal Flow**:
  1. `Browser` $\rightarrow$ `API Gateway`: Client sends `GET /route HTTP/1.1`.
  2. `API Gateway` $\rightarrow$ `Target Microservice`: Gateway proxies request to specific server (`/about`, `/experience`, `/education`, `/skills`, `/projects`).
  3. `Server Record Processing`: Node expands, record list scrolls, and target record highlights with cyan glow.
  4. `Target Microservice` $\rightarrow$ `API Gateway`: Server returns `200 OK` payload.
  5. `API Gateway` $\rightarrow$ `Browser`: Gateway delivers HTTP response back to client browser.
- **Smooth GSAP Camera Panning**: Camera moves gracefully alongside packet traversal with a 1.0s duration per leg for clear observability.

---

## 4. 📦 Progressive Backend Data Loading
- **Deferred Data Rendering**: Portfolio sections are locked until their corresponding backend routes are hit.
- **Automatic Route Unlocking**: Scrolling into an un-fetched section automatically launches the 5-leg Big Diagram traversal, receives `200 OK`, adds the route to `loadedRoutes`, and reveals the section content.

---

## 5. 📱 Full-Height Section Scroll Snapping
- **One Section at a Time**: The layout enforces CSS scroll snapping (`snap-y snap-mandatory scroll-smooth`).
- **Section Sizing**: Each section wrapper uses `snap-start snap-always min-h-full flex flex-col justify-center` so that scrolling naturally locks onto exactly one section per screen.

---

## 6. 🔍 DNS Resolution Simulation
- Checks local browser cache (`localStorage`).
- On cache miss, queries: `Recursive Resolver` $\rightarrow$ `Root DNS Server` $\rightarrow$ `.dev TLD Server` $\rightarrow$ `Authoritative DNS Server`.
- Resolves IP (`93.184.216.34`) and caches result for subsequent page requests.
