export const PostPagination = ({ setPagination, pagination }) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6 mt-4">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: Math.max(prev.currentPage - 1, 1),
            }))
          }
          disabled={pagination.currentPage === 1}
          className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            pagination.currentPage === 1
              ? "text-gray-300"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: Math.min(prev.currentPage + 1, prev.lastPage),
            }))
          }
          disabled={pagination.currentPage === pagination.lastPage}
          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            pagination.currentPage === pagination.lastPage
              ? "text-gray-300"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(pagination.currentPage - 1) * pagination.perPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                pagination.currentPage * pagination.perPage,
                pagination.total
              )}
            </span>{" "}
            of <span className="font-medium">{pagination.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  currentPage: Math.max(prev.currentPage - 1, 1),
                }))
              }
              disabled={pagination.currentPage === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                pagination.currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              } ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
            >
              <span className="sr-only">Previous</span>
              &larr;
            </button>

            {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() =>
                    setPagination((prev) => ({ ...prev, currentPage: page }))
                  }
                  aria-current={
                    pagination.currentPage === page ? "page" : undefined
                  }
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold 
                      ${
                        pagination.currentPage === page
                          ? "z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                      }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  currentPage: Math.min(prev.currentPage + 1, prev.lastPage),
                }))
              }
              disabled={pagination.currentPage === pagination.lastPage}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                pagination.currentPage === pagination.lastPage
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-50"
              } ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
            >
              <span className="sr-only">Next</span>
              &rarr;
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
