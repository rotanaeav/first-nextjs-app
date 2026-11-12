export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse space-y-6">
      <div className="h-8 w-48 bg-muted rounded-md" />
      <div className="h-4 w-96 bg-muted rounded-md" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/40 p-4 space-y-3 bg-card"
          >
            <div className="h-48 w-full bg-muted rounded-xl" />
            <div className="h-5 w-3/4 bg-muted rounded-md" />
            <div className="h-4 w-1/2 bg-muted rounded-md" />
            <div className="h-8 w-full bg-muted rounded-lg pt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
