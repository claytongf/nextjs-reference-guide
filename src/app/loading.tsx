export default function Loading() {
  return (
    <div
      className="flex items-center justify-center px-4 py-24"
      role="status"
      aria-label="Loading"
    >
      <div className="border-border border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
    </div>
  );
}
