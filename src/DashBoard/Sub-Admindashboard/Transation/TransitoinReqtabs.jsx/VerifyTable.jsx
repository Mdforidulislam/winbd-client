import { Pagination } from '../../../../Components/Shared/Pagination';
import axios from "axios";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from 'react-icons/sl';
import { FaSearch } from 'react-icons/fa';
import { MdDateRange } from 'react-icons/md';

const VerifyTable = () => {
    const [pageNumber, setPageNumbers] = useState(0); 
    const [searchData, setSearchData] = useState(''); 
    const [selectedDate, setSelectedDate] = useState(null); 
    const [storeData, setStoreData] = useState([]); 
    const [localData, setLocalData] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false); 

    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
        setLocalData(authurId);
    }, []);

    const handleActionSearchButton = async (event) => {
        event.preventDefault();
        const searchValue = event.target.search.value;
        setSearchData(searchValue)
    }

    useEffect(() => {
        const userDataget = async () => {
            if (!localData) return;
            try {
                const userSearch = await axios(`https://pay-winbd-server.vercel.app/getingHistory?authorId=${localData}&date=${selectedDate}&userName=${searchData}&pageNumber=${pageNumber}`);
                setStoreData(userSearch?.data?.requestApprovdeData);
                console.log(userSearch?.data?.requestApprovdeData);
            } catch (error) {
                console.log(error);
            }
        }
        userDataget();
    }, [pageNumber, localData, searchData, selectedDate]);


    const handleDateButtonClick = () => {
        setShowDatePicker(!showDatePicker);
    }


    //due
    //search by date incomplete 

    return (
        <div className="">
            <form onSubmit={handleActionSearchButton} action="" className={`flex ${showDatePicker ? 'flex-col md:flex-row' : 'md:flex-row'} gap-2 w-full justify-center items-center`}>
                <div className='flex'>
                    <input type="text" placeholder="Search Transaction" name="search" id="" className="bg-GlobalGray focus:outline-none text-white px-3 py-3 rounded-l-md " />
                    <button type="submit" className='bg-DarkGreen py-4 px-3 rounded-r-md text-white text-md font-bold'><FaSearch /></button>
                </div>
                <div className='flex'>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy"
                        className={`bg-GlobalGray focus:outline-none text-white px-3 py-3 rounded-l-md ${showDatePicker ? '' : 'hidden'}`}
                        placeholderText="Select a date"
                    />
                    <button type="button" onClick={handleDateButtonClick} className={`bg-DarkGreen py-4 px-3 text-white text-md  ${showDatePicker ? 'md:rounded-r-md rounded-r-md' : 'rounded-md'}`}><MdDateRange /></button>
                </div>
            </form >
            <div className="md:flex md:justify-center md:items-center overflow-x-auto max-w-[1000px] mx-auto my-10">
                <table className="w-[600px] md:w-[1200px] text-white shadow-md border-gray-500 ">
                    <thead>
                        <tr className="bg-GlobalGray text-white">
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500">Payment Method</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500">User Name</th>
                            <th className="py-3 text-left border-b border-gray-500 pl-6">Number</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500">Date</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {storeData && storeData.length > 0 ? (
                            storeData.map((item, i) => (
                                <tr key={i} onClick={() => handleModal(item)} className={`${i % 2 === 0 ? 'bg-[#2f2f2f]' : 'bg-[#393939]'} transition duration-300`}>
                                    <td className="py-4 px-6 pl-10 border-b border-gray-700">
                                        <img
                                            src={
                                                item?.paymentMethod === 'bkash' ? 'https://i.ibb.co/rdzW7Nh/bkash.png' :
                                                    item?.paymentMethod === 'nogod' ? 'https://i.ibb.co/qxbhZVX/nagad.png' :
                                                        item?.paymentMethod === 'rocket' ? 'https://i.ibb.co/q0t3nTP/rocket.jpg' : ''
                                            }
                                            alt={item?.paymentMethod}
                                            className="h-8 w-8 object-contain"
                                        />
                                    </td>
                                    <td className="py-4 px-3 md:px-6 md:pl-7 -pl-2 border-b border-gray-700">{item?.userName}</td>
                                    <td className="py-4 px-3 md:px-6 pl-7 border-b border-gray-700">{item?.number}</td>
                                    <td className="py-4 px-3 md:px-6 border-b border-gray-700">{item?.date}</td>
                                    <td className="py-4 px-3 md:px-6 md:pl-8 border-b border-gray-700">{item?.amount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-start md:text-center pl-1 py-4">No data found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination storeData={storeData} setPageNumbers={setPageNumbers} />
        </div >
    );
};

export default VerifyTable;
