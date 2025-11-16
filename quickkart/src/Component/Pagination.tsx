import React from "react";

interface PaginationProps {
  currentPage: number;
  totalpage: number;
  onPageChange: Function;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalpage,
  onPageChange,
}) => {
  const buttonCount = Array.from(
    { length: totalpage },
    (_, index) => index + 1
  );
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-4 py-2 rounded-md font-semibold text-sm border border-slate-300 transition-all duration-200
            ${
              currentPage === 1
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-pointer"
            }
            `}
        >
          Prev
        </button>
        {buttonCount.map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-4 py-2 rounded-md font-semibold text-sm border border-slate-300 transition-all duration-200 focus:outline-none
              ${
                num === currentPage
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 text-slate-800 hover:bg-slate-200"
              }
              `}
          >
            {num}
          </button>
        ))}
        <button
          disabled={currentPage === totalpage}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-4 py-2 rounded-md font-semibold text-sm border border-slate-300 transition-all duration-200
            ${
              currentPage === totalpage
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-slate-100 text-slate-800 hover:bg-slate-200 cursor-pointer"
            }
            `}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
