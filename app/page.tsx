import { Suspense } from "react";
import { Storefront } from "@/components/storefront";
import { StorefrontFallback } from "@/components/storefront-fallback";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function HomePage() {
  return (
    <main className="container py-8 space-y-8">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{SITE_NAME}</h1>
        <p className="text-muted-foreground max-w-2xl">{SITE_TAGLINE}</p>
        <p className="text-sm text-muted-foreground/90 max-w-prose leading-relaxed">
          This demonstration environment presents catalogue search, refinement, fulfilment primitives, persistent
          basket behaviour, and a checkout pathway. Contents are illustrative; engineered with Redux Toolkit on
          Next.js.
        </p>
      </section>

      <Suspense fallback={<StorefrontFallback />}>
        <Storefront />
      </Suspense>
    </main>
  );
}
