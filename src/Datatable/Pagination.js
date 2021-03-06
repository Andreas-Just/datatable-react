import React from "react";

const Pagination = ({ page, perPage, totalCount, onPageChange }) => {
  const pagesCount = Math.ceil(totalCount / perPage);
  const pages = Array(pagesCount)
    .fill(0).map((_, i) => i + 1);

  return (
    <div className="Datatable__pagination">
      {pages.map(p => (
        <button
          key={p}
          style={{ backgroundColor: p === page ? '#E0E0E0' : 'white' }}
          onClick={() => onPageChange(p)}
        >
          { p }
        </button>
      ))}
    </div>
  );
};

export default Pagination;
