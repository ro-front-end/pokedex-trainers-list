function PaginationControls({ page, setPage }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-500 text-white px-3 py-2 rounded-xl disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-bold text-lg text-yellow-50 ">Page: {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-blue-500 text-white px-3 py-2 rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;
