import React, { useState } from 'react';


export const Pagination = ({ totalPages , setPageNumbers }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const [currentSet, setCurrentSet] = useState(0);
    // set paginatio nnumber

    const pagesPerSet = 4;
    const pageNumbers = Math.ceil(totalPages)// Adjust as needed
    const totalSets = Math.ceil(totalPages / pagesPerSet);
    
    const updatePageNumber = (num) => {

        if (num > totalPages - 1 || num < 0) {
          return setPageNumber(0);
        }
        
      setPageNumber(num);
      setPageNumbers(pageNumber);
    
        // Update the current set if the page number goes out of the current set range
        const newSet = Math.floor(num / pagesPerSet);
        if (newSet !== currentSet) {
          setCurrentSet(newSet);
        }
      };
    
      const handlePreviousSet = () => {
        if (currentSet > 0) {
          setCurrentSet(currentSet - 1);
          setPageNumber((currentSet - 1) * pagesPerSet);
        }
      };
    
      const handleNextSet = () => {
        if (currentSet < totalSets - 1) {
          setCurrentSet(currentSet + 1);
          setPageNumber(currentSet * pagesPerSet + pagesPerSet);
        }
      };
    
      const startPage = currentSet * pagesPerSet;
      const endPage = Math.min(startPage + pagesPerSet, totalPages);

    return (
        <div className="flex select-none justify-center items-center bg-white shadow-lg rounded-sm w-fit mx-auto">
      {/* Left arrow */}
      <div
        onClick={handlePreviousSet}
        className={`transition-all py-2 px-3 text-sm border-r duration-200 cursor-pointer p-2 rounded-md flex hover:bg-gray-200 items-center ${currentSet === 0 ? 'invisible' : ''}`}
      >
        <svg className="w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 7L10 12L15 17" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Previous
      </div>

      <div className="flex justify-center items-center">
        {Array.from({ length: endPage - startPage }, (_, index) => startPage + index).map((item) => (
          <div
            onClick={() => updatePageNumber(item)}
            className={`cursor-pointer text-sm transition-all border-r border-l duration-200 px-4 ${
              pageNumber === item ? 'bg-green-600 text-white' : 'bg-white hover:bg-gray-200'
            } font-semibold text-gray-700 py-[8px]`}
            key={item}
          >
            {item + 1}
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <div
        onClick={handleNextSet}
        className={`transition-all py-2 px-3 text-sm duration-200 cursor-pointer border-l rounded-md flex hover:bg-gray-200 items-center ${currentSet === totalSets - 1 ? 'invisible' : ''}`}
      >
        Next
        <svg className="w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 7L15 12L10 17" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
    );
};
