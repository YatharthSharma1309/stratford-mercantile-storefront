import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

/** Shown while `Storefront` resolves `useSearchParams` (Suspense boundary). */
export function StorefrontFallback() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="h-10 flex-1 rounded-md bg-muted animate-pulse motion-reduce:animate-none" />
        <div className="h-10 w-full sm:w-[200px] rounded-md bg-muted animate-pulse motion-reduce:animate-none" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="h-8 w-24 shrink-0 rounded-md bg-muted animate-pulse motion-reduce:animate-none"
          />
        ))}
      </div>
      <ProductGridSkeleton />
    </div>
  );
}
