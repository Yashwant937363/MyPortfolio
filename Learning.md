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
- **Seamless URL Synchronization**:
  - Entering a URL in the address bar smoothly scrolls to the desired section in-page once resolved.
  - Scrolling through sections updates the browser address bar dynamically via an `IntersectionObserver` without interrupting user scroll.
- **Live Search & Route Suggestions**:
  - Typing into the address bar opens an interactive suggestions dropdown matching against all available sections (`/about`, `/experience`, `/education`, `/skills`, `/projects`), specific software projects (`/projects/queuecast`, `/projects/tictactoe`, `/projects/gossip`, `/projects/todo`), and keyword tags.
  - Supports keyboard navigation (`↑`/`↓` to highlight, `Enter` to navigate, `Escape` to close) and click-outside dismissal.

---

## 2. ⚡ Single Flow Backend Retrieval (Unified Server Flow)
- **Single Flow for Everything**: Instead of interrupting the user by jumping into diagram animations for each section, the system performs a **single comprehensive server flow** right after DNS resolution.
- **End-to-End Aggregation Flow**:
  1. `Browser` $\rightarrow$ `API Gateway`: Client issues `GET / HTTP/1.1 (Complete Portfolio Bundle)`.
  2. `API Gateway`: Resolves route table and queries the microservice backend cluster (`/about`, `/experience`, `/education`, `/skills`, `/projects`).
  3. `Microservices` $\rightarrow$ `API Gateway`: Servers aggregate and return `200 OK` with all section records.
  4. `API Gateway` $\rightarrow$ `Browser`: Gateway delivers the complete portfolio payload in one unified HTTP response.
- **Immediate Data Availability**: Once the single flow completes, all sections and project records are fully unlocked and instantly accessible without subsequent server animation interruptions.

---

## 3. ⚡ Big Diagram Architecture Traversal
- **One Large World View**: All DNS resolution and server request animations execute directly on the **ONE LARGE WORLD Architecture SVG Diagram** (`FullWorldFlow`), providing clear visual insight into real-world networking:
  - Cache checks and recursive DNS resolution (Root $\rightarrow$ TLD $\rightarrow$ Authoritative).
  - API Gateway routing and reverse proxying to microservices.
- **Smooth GSAP Camera Panning**: Dynamic camera panning and zooming follow packet trajectories with calibrated durations for optimal observability.

---

## 4. 📜 Continuous Natural Scrolling (Snapping Removed)
- **Fluid Content Flow**: Removed rigid CSS scroll snapping (`snap-y`, `snap-mandatory`, `snap-start`, `snap-always`) and fixed viewport height locks (`min-h-full`). Sections now flow naturally with clean vertical rhythm (`space-y-12 sm:space-y-16`).
- **Scroll-Lock Feedback Loop Prevention**:
  - Previously, `IntersectionObserver` updates triggered parent state changes that re-invoked `scrollIntoView`, causing an artificial snapping lock during manual scrolling.
  - Resolved using an active scroll guard (`isUserScrollingRef` and `currentActiveSectionRef`), ensuring `scrollIntoView` is only invoked upon explicit URL bar navigation, never while scrolling.
  - Removed duplicate `<section id="...">` container wrappers to ensure unique DOM element references.

---

## 5. 🎨 Custom Scroll Experience (Hidden Default Scrollbar)
- **Clean Aesthetic**: Removed the default operating system vertical scrollbar across all browsers:
  - `scrollbar-width: none;` (Firefox)
  - `-ms-overflow-style: none;` (IE/Edge)
  - `::-webkit-scrollbar { display: none; }` (Chrome/Safari/Opera)
- **Full Scroll Functionality**: Complete touchpad, wheel, and keyboard scrolling remains completely functional with a cleaner, application-like presentation.

---

## 6. 🔍 DNS Resolution Simulation
- Checks local browser cache (`localStorage`).
- On cache miss, traverses: `Recursive Resolver` $\rightarrow$ `Root DNS Server (.)` $\rightarrow$ `.dev TLD Server` $\rightarrow$ `Authoritative DNS Server`.
- Resolves IP (`93.184.216.34`) and stores in local cache.
- Immediately transitions into the Single Server Flow to fetch all application data.
