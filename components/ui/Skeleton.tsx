export default function Skeleton({ rows = 12 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-full animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </div>
  );
}
