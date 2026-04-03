import React from 'react'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages).keys()].map(n => n + 1)
    }
    let start = Math.max(1, currentPage - 2)
    let end = Math.min(totalPages, start + 4)
    if (end === totalPages) start = Math.max(1, end - 4)
    return [...Array(end - start + 1).keys()].map(n => n + start)
  }

  const pages = getPageNumbers()

  return (
    <div className="flex justify-center items-center gap-1 mt-8 flex-wrap">

      {/* First */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 rounded-md border text-sm ${
          currentPage === 1
            ? 'opacity-40 cursor-not-allowed bg-gray-100'
            : 'bg-white hover:bg-gray-100'
        }`}
      >«</button>

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md border text-sm ${
          currentPage === 1
            ? 'opacity-40 cursor-not-allowed bg-gray-100'
            : 'bg-white hover:bg-gray-100'
        }`}
      >Prev</button>

      {/* Leading ellipsis */}
      {pages[0] > 1 && (
        <span className="px-2 py-1 text-sm text-gray-400">...</span>
      )}

      {/* Page numbers */}
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border text-sm ${
            currentPage === page
              ? 'bg-yellow-500 text-white border-yellow-500'
              : 'bg-white hover:bg-gray-100'
          }`}
        >{page}</button>
      ))}

      {/* Trailing ellipsis */}
      {pages[pages.length - 1] < totalPages && (
        <span className="px-2 py-1 text-sm text-gray-400">...</span>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md border text-sm ${
          currentPage === totalPages
            ? 'opacity-40 cursor-not-allowed bg-gray-100'
            : 'bg-white hover:bg-gray-100'
        }`}
      >Next</button>

      {/* Last */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 rounded-md border text-sm ${
          currentPage === totalPages
            ? 'opacity-40 cursor-not-allowed bg-gray-100'
            : 'bg-white hover:bg-gray-100'
        }`}
      >»</button>

      {/* Page info */}
      <span className="text-xs text-gray-500 ml-2">
        Page {currentPage} of {totalPages}
      </span>

    </div>
  )
}

export default Pagination
