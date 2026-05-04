export default function CheckoutLoading() {
  return (
    <main className="container py-8 max-w-5xl">
      <div className="mb-6 h-5 w-24 rounded bg-muted animate-pulse motion-reduce:animate-none" />
      <div className="mb-8 h-10 w-48 rounded bg-muted animate-pulse motion-reduce:animate-none" />
      <div className="grid gap-8 md:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="space-y-4 rounded-lg border p-6 border-muted"
            >
              <div className="h-5 w-28 rounded bg-muted animate-pulse motion-reduce:animate-none" />
              <div className="h-10 w-full rounded-md bg-muted animate-pulse motion-reduce:animate-none" />
              <div className="h-10 w-full rounded-md bg-muted animate-pulse motion-reduce:animate-none sm:w-1/2" />
            </div>
          ))}
          <div className="h-12 w-full rounded-md bg-muted animate-pulse motion-reduce:animate-none" />
        </div>
        <aside className="rounded-lg border border-muted p-6 space-y-4 h-max">
          <div className="h-6 w-36 rounded bg-muted animate-pulse motion-reduce:animate-none" />
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between gap-3">
                <div className="h-4 flex-1 rounded bg-muted animate-pulse motion-reduce:animate-none" />
                <div className="h-4 w-16 rounded bg-muted animate-pulse motion-reduce:animate-none" />
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
