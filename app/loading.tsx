export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-24" aria-busy="true" aria-label="Loading">
      <div className="skeleton h-8 w-1/3 animate-pulse rounded-full" />
      <div className="skeleton h-64 animate-pulse rounded-3xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="skeleton h-48 animate-pulse rounded-3xl opacity-80" />
        <div className="skeleton h-48 animate-pulse rounded-3xl opacity-80" />
        <div className="skeleton h-48 animate-pulse rounded-3xl opacity-80" />
      </div>
    </div>
  );
}
