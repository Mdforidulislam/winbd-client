
import { useState } from 'react';
import { IoIosArrowBack, IoIosArrowDropdown, IoIosArrowDropright, IoIosArrowForward } from 'react-icons/io';

export const Pagination = ({ storeData, setPageNumbers }) => {
    const [pageNumber, setPageNumber] = useState(0)
    const page = storeData?.totalPageNumber; // Adjust the page numbers the way you want
    const updatePageNumber = (num) => {
        if ((num > (page - 1)) || (0 > num)) { return setPageNumber(0) }
        setPageNumber(num)
    }

    if (setPageNumbers) {
        setPageNumbers(pageNumber)
    }


    return (
        <div className='flex select-none justify-center items-center gap-3 md:gap-5 my-5'>
            {/* left arrow */}
            <div onClick={() => { updatePageNumber(pageNumber - 1) }} className=' hover:scale-110 scale-100 transition-all duration-200 cursor-pointer hover:bg-DarkGreen p-2 rounded-full'>
                <IoIosArrowBack className="text-white text-2xl" />
            </div>
            <div className='flex justify-center items-center gap-2 '>
                {[...Array(page).keys()].map((item, ind) => <div onClick={() => { setPageNumber(item) }} className={`cursor-pointer hover:scale-110 scale-100 transition-all duration-200 py-[9px] px-[18px] ${pageNumber === item ? 'bg-DarkGreen text-white' : 'bg-DarkGreen'} border-DarkGreen  font-semibold text-white rounded-full`} key={item}>
                    {item + 1}
                </div>)}
            </div>
            {/* right arrow */}
            <div onClick={() => { updatePageNumber(pageNumber + 1) }} className='bg-DarkGreen hover:scale-110 scale-100 transition-all duration-200 cursor-pointer hover:bg-DarkGreen p-2 rounded-full'>
            <IoIosArrowForward className="text-white text-2xl" />
            </div>
        </div>
    );
};

