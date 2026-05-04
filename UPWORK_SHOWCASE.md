# Upwork Portfolio Listing — E-commerce Dashboard

Replace `[live]` and `[repo]` with your real Vercel URL and GitHub repo.

---

## Title (60 char max)

**React E-commerce Storefront — Next.js + Redux + Tailwind**

## Short description

Production-grade storefront with search, filters, persistent cart, and checkout — all in TypeScript with Redux Toolkit.

## Full project description

I built a complete e-commerce storefront with the patterns real shops actually need. Users can search and filter a 20-product catalog, sort by price/rating/popularity, dive into detail pages, manage a slide-out cart with quantity controls, and run through a full checkout flow. The cart persists across refreshes via localStorage, all state lives in Redux Toolkit, and every product page is statically generated at build time for instant navigation and great Lighthouse scores.

**Live demo:** [your-app.vercel.app]
**Source code:** [github.com/yourname/ecommerce-dashboard]

### Tech I used
- **Next.js 14** App Router with RSC + client islands
- **TypeScript** strict mode end-to-end
- **Redux Toolkit** + react-redux for cart state
- **Tailwind CSS** + shadcn-style primitives
- **next/image** with remote pattern allowlists
- Static generation via `generateStaticParams`

### What it demonstrates
- Real-world Redux setup in App Router (per-request store, hydration on mount)
- Typed selectors that derive presentation values (subtotal/shipping/tax/total) from minimal state
- localStorage persistence via `store.subscribe()` — no extra libs
- Server-side filter/sort API contract that maps cleanly to a future DB swap
- Responsive grid, dark mode, accessible quantity steppers and cart controls
- Realistic checkout form with proper `autoComplete` attributes and submission UX

### Outcome
A storefront that feels like a real product. Free to host, 100% Vercel-deployable in 90 seconds, and structured so swapping the mock product list for a Shopify Storefront API or Postgres call is a one-file change.

---

## Skills tags

```
React, Next.js, TypeScript, Redux, Redux Toolkit, Tailwind CSS,
E-commerce, Frontend Development, Vercel, Responsive Design,
Full Stack Development, JavaScript, UI/UX, Web Application
```

## Cover letter snippet (paste when applying for e-commerce / storefront gigs)

> I recently shipped a Next.js + Redux Toolkit storefront with search, filters, persistent cart, and checkout flow — exactly the patterns most shops need. Live demo: [your-url]. Source: [your-repo]. The cart logic, product API contract, and checkout submit handler are all designed to drop straight into a real store (Stripe, Shopify, Postgres) with one or two file swaps. Happy to walk through it.

## Pricing reference (April 2026 rates for this stack)

| Tier | Hourly range |
|------|--------------|
| Junior | $25–40 |
| Mid (good portfolio) | $45–75 |
| Senior (e-commerce niche) | $80–120+ |

Pair this with the RAG Chatbot (Project 1) and you're well-positioned for both AI gigs ($60+) and storefront gigs ($45+).
