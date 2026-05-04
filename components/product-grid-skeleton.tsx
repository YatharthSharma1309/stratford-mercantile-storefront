import { cn } from "@/lib/utils";

function SkeletonCard() {
  return (
    <div className="rounded-lg border bg-card overflow-hidden">
      <div className="aspect-square bg-muted animate-pulse motion-reduce:animate-none" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 bg-muted rounded animate-pulse motion-reduce:animate-none" />
        <div className="h-4 w-full bg-muted rounded animate-pulse motion-reduce:animate-none" />
        <div className="h-4 w-2/3 bg-muted rounded animate-pulse motion-reduce:animate-none" />
        <div className="flex justify-between pt-1">
          <div className="h-6 w-20 bg-muted rounded animate-pulse motion-reduce:animate-none" />
          <div className="h-8 w-14 bg-muted rounded-md animate-pulse motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4",
        className,
      )}
      aria-hidden
    >
      {Array.from({ length: 8 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
