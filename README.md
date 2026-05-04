# Stratford Mercantile — Demonstration storefront

A portfolio **e‑commerce storefront** for the fictional entity **Stratford Mercantile, Ltd.** The experience is deliberately formal in copy and visuals (crest-style logo, serif wordmark) while the implementation stays a transparent **engineering demo**: mock catalogue, illustrative checkout only, no live payments or database.

| | |
|:---|:---|
| **GitHub repository** | [**`stratford-mercantile-storefront`**](https://github.com/YatharthSharma1309/stratford-mercantile-storefront) |
| **Clone** | `git clone https://github.com/YatharthSharma1309/stratford-mercantile-storefront.git` |

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

This codebase is hosted on GitHub as **`stratford-mercantile-storefront`**. The npm **`package.json` name** may still show `ecommerce-dashboard` locally for historical reasons; the public repo name reflects the Stratford Mercantile storefront positioning rather than separate admin/dashboard software.

---

## Licence

Demonstration codebase for portfolio use. Stratford Mercantile, Ltd. is a fictional branding construct, not an actual company endorsement.
