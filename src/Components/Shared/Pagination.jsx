import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export const Pagination = ({ totalPages , setPageNumbers }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const pageNumbers = totalPages ;
    // set paginatio nnumber
    
    useEffect(() => {
        if (pageNumber) {
            setPageNumbers(pageNumber);
        }
    }, [pageNumber, setPageNumbers]);

    const updatePageNumber = (num) => {
        if (num >= 0 && num < pageNumbers) {
            setPageNumber(num);
        }
    };

    console.log(pageNumber);

    const handlePageClick = (num) => () => {
        updatePageNumber(num);
    };

    return (
        <div className='flex select-none justify-center items-center gap-3 md:gap-5 my-5'>
            {/* Left Arrow */}
            <div 
                onClick={() => updatePageNumber(pageNumber - 1)} 
                className='hover:scale-110 scale-100 transition-all duration-200 cursor-pointer hover:bg-DarkGreen p-2 rounded-full'
            >
                <IoIosArrowBack className="text-white text-2xl" />
            </div>

            {/* Page Numbers */}
            <div className='flex justify-center items-center gap-2'>
                {Array.from({ length: pageNumbers }, (_, i) => (
                    <div 
                        key={i} 
                        onClick={handlePageClick(i)}
                        className={`cursor-pointer hover:scale-110 scale-100 transition-all duration-200 py-[9px] px-[18px] ${pageNumber === i ? 'bg-DarkGreen text-white' : 'bg-DarkGreen'} border-DarkGreen font-semibold text-white rounded-full`}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <div 
                onClick={() => updatePageNumber(pageNumber + 1)} 
                className='hover:scale-110 scale-100 transition-all duration-200 cursor-pointer hover:bg-DarkGreen p-2 rounded-full'
            >
                <IoIosArrowForward className="text-white text-2xl" />
            </div>
        </div>
    );
};
