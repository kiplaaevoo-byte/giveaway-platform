export default function Pagination({
  page,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center gap-2 mt-8">

      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 rounded-lg border bg-white disabled:opacity-40"
      >
        Previous
      </button>

      <div className="flex items-center px-4 font-semibold">
        {page} / {totalPages}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 rounded-lg border bg-white disabled:opacity-40"
      >
        Next
      </button>

    </div>
  );
}