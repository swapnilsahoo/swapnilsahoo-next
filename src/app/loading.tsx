export default function Loading() {
  return (
    <div id="main-content" role="main" className="flex min-h-[60vh] items-center justify-center">
      <div
        role="status"
        aria-label="Loading"
        className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
      />
    </div>
  );
}
