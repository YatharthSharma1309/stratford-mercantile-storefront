# Stratford Mercantile — Demonstration storefront

A portfolio **e‑commerce storefront** for the fictional entity **Stratford Mercantile, Ltd.** The experience is deliberately formal in copy and visuals (crest-style logo, serif wordmark) while the implementation stays a transparent **engineering demo**: mock catalogue, illustrative checkout only, no live payments or database.

---

## What this project is

| Aspect | Detail |
|--------|--------|
| **Front end** | Next.js 14 (App Router), React 18, TypeScript |
| **Styling & UI** | Tailwind CSS, shared UI primitives, Lucide icons, Playfair Display for the corporate wordmark |
| **Client state** | Redux Toolkit (cart + wishlist), persisted to `localStorage` |
| **Data** | Seeded catalogue in `@/lib/products`; listing queries go through **`GET /api/products`** with filter/sort query parameters |
| **Scope** | Customer-facing shop: catalogue discovery, PDP, basket, checkout UI, wishlist—not an admin/dashboard panel |

Checkout simulates submission only; integrate Stripe (or similar) and a real persistence layer when moving beyond a showcase.

---

## Features

- **URL-driven catalogue**: search debounced ~320 ms; category, sort, price band, “in stock only”; shareable links via `router.replace` + query string  
- **Typed product API**: filters by `q`, `category`, `minPrice`/`maxPrice` (cents), `sort`, `inStock`  
- **Cart drawer** with quantities, persisted cart lines; **order summary** on checkout with subtotal, shipping, tax, total  
- **Wishlist** with count in header  
- **Product detail pages** with gallery, badges, ratings, related products pattern; **SSG** via `generateStaticParams`  
- **Loading & resilience**: Suspense fallback on home grid, skeletons, loading routes, global error boundary, 404  

Branding constants live in `lib/site.ts`; logo and lockup live in `components/logo.tsx`.

---

## Getting started

**Requirements:** Node.js 18+ (LTS recommended), npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint (Next config) |
| `npm run type-check` | `tsc --noEmit` |

No environment variables are required for local runs.

---

## Repository naming note

The package name remains `ecommerce-dashboard` for historical reasons. The shipped product positioning is **“Stratford Mercantile” storefront**, not separate admin analytics software. If you publish the repo publicly, rename the folder/GitHub repo to match (for example `stratford-mercantile-storefront`) once links and CI are updated.

---

## Presenting this on Upwork

Use crisp, honest framing: you are showcasing **architecture and UX patterns for a storefront**, not a production payment stack.

### 1. Profile overview (short paragraph)

Summarise the stack once, name the fictional brand briefly, and state the demo boundaries in one clause. Example spine (rewrite in your own voice):

> I maintain a demonstration storefront—“Stratford Mercantile”—built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Redux Toolkit. It includes URL-synced catalogue filters, a typed products API route, persisted cart and wishlist, SSG product pages, and a checkout UI that is deliberately non-production (mock data, no PSP). Suitable as a baseline for Shopify headless storefronts, custom catalogues, or extensions with Stripe and a real CMS/database.

Avoid calling it a “dashboard” unless you later add merchant/admin screens.

### 2. Specialised profiles and skills tags

Strong fits: **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **Redux Toolkit**, **REST API**, **e‑commerce / storefront**, optionally **SSR/SSG** and **Responsive web**.

### 3. Portfolio item title

Examples:

- **Stratford Mercantile — Next.js storefront (TypeScript & Redux)**  
- **Demonstration B2C shop: filters, basket, checkout UI (portfolio)**

Lead with outcomes (filters, persistence, checkout flow), not only “React project.”

### 4. What to paste in the portfolio description (bullet list clients scan)

Keep technology and scope visible:

- Next.js 14 App Router • TypeScript • Tailwind CSS  
- Redux Toolkit cart + wishlist with `localStorage` persistence  
- `GET /api/products` supporting search, categories, prices, sorting, stock filter  
- Product pages pre-rendered; loading states and empty states handled  
- Checkout and payment fields are demo-only—ready for Stripe/CMS/DB wiring  

Attach a live deploy (for example **Vercel**) plus the Git repository if public.

### 5. Cover letter / proposal snippets

When bidding on storefront or Next.js roles, cite **specific behaviours** tied to buyer pain points:

| Client need | Tie-in from this repo |
|-------------|----------------------|
| Filterable catalogue / SEO-friendly URLs | Query-string state and `router.replace`, debounced search |
| Cart that survives refresh | Redux + `localStorage` hydration pattern |
| Headless-ish API shape | `/api/products` query contract (easy to swap for CMS/Shopify endpoints) |
| Professional UI layer | Responsive layout, formal brand shell, typography |

Close with honesty: payments, inventory backend, accounts, and order processing are integration work you can estimate separately.

### 6. Screenshots or a walkthrough worth recording

- Home with filters visible and URL bar showing params  
- Product page  
- Cart drawer + checkout summary  
- Optional: inspector or README link to **`GET /api/products`** query docs in `app/api/products/route.ts`  

Short Loom beats a long readme for trust.

---

## Licence

Demonstration codebase for portfolio use. Stratford Mercantile, Ltd. is a fictional branding construct, not an actual company endorsement.
