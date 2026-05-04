export default function ProductLoading() {
  return (
    <main className="container py-8">
      <div className="mb-6 h-5 w-40 rounded bg-muted animate-pulse motion-reduce:animate-none" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-square rounded-lg bg-muted animate-pulse motion-reduce:animate-none" />
        <div className="space-y-5">
          <div className="h-6 w-24 rounded-md bg-muted animate-pulse motion-reduce:animate-none" />
          <div className="h-10 w-full max-w-md rounded bg-muted animate-pulse motion-reduce:animate-none" />
          <div className="h-4 w-48 rounded bg-muted animate-pulse motion-reduce:animate-none" />
          <div className="h-12 w-36 rounded bg-muted animate-pulse motion-reduce:animate-none" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full rounded bg-muted animate-pulse motion-reduce:animate-none" />
            <div className="h-4 w-full rounded bg-muted animate-pulse motion-reduce:animate-none" />
            <div className="h-4 w-3/4 rounded bg-muted animate-pulse motion-reduce:animate-none" />
          </div>
          <div className="h-12 w-full max-w-sm rounded-md bg-muted animate-pulse motion-reduce:animate-none" />
        </div>
      </div>
    </main>
  );
}
