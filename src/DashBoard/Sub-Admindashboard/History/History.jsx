import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { FaSearch } from 'react-icons/fa';
import { MdDateRange, MdOutlineDoubleArrow } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { Pagination } from "../../../Components/Shared/Pagination";
import { debounce } from 'lodash';
import Loader from "../../../Components/Loader/Loader";
import { Pagination } from "../../../Components/Shared/Pagination";

const History = () => {
    const [pageNumber, setPageNumbers] = useState(0);
    const [searchData, setSearchData] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [storeData, setStoreData] = useState([]);
    const [localData, setLocalData] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state variable
    const [totalLenght, setTotalLenght] = useState(0);

    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
        setLocalData(authurId);
    }, []);

    const fetchData = useCallback(debounce(async (searchValue) => {
        if (!localData) return;

        setLoading(true); // Set loading state to true
        let url = `https://sever.win-pay.xyz/getingHistory?authorId=${localData}`;
        if (selectedDate) {
            url += `&date=${selectedDate}`;
        }
        if (searchValue) {
            url += `&userName=${searchData}`;
        }
        if (pageNumber) {
            url += `&pageNumber=${pageNumber}`;
        }
        console.log(pageNumber, 'page number');
        try {
            const response = await axios.get(url);
            setStoreData(response?.data?.requestApprovdeData);
            setTotalLenght(response?.data?.showPageNumber);
            console.log(response?.data);
            setLoading(false); // Set loading state to false once data is fetched
            console.log(response?.data?.requestApprovdeData);
        } catch (error) {
            setLoading(false); // Set loading state to false in case of error
            console.error('Error fetching data:', error);
        }
    }, 300), [localData, selectedDate, pageNumber]);

    const handleSearchChange = (event) => {
        const searchValue = event.target.value;
        setSearchData(searchValue);
        fetchData(searchValue);
    };

    useEffect(() => {
        fetchData(searchData);
    }, [selectedDate, localData, fetchData, searchData]);

    const handleDateButtonClick = () => {
        setShowDatePicker(!showDatePicker);
    };

    console.log(pageNumber);

    return (
        <div className="">
            <form onSubmit={(e) => e.preventDefault()} className={`flex ${showDatePicker ? 'flex-col md:flex-row' : 'md:flex-row'} gap-2 w-full justify-center items-center`}>
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
                <div className='flex'>
                    <input
                        type="text"
                        placeholder="Search Transaction"
                        name="search"
                        id=""
                        className="bg-GlobalGray focus:outline-none text-white px-3 py-3 rounded-l-md"
                        value={searchData}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className='bg-DarkGreen py-4 px-3 rounded-r-md text-white text-md font-bold'><FaSearch /></button>
                </div>
            </form >
            <div className="md:flex md:justify-center md:items-center overflow-x-auto max-w-[1000px] mx-auto my-10">
                <table className="w-full md:w-[1200px] text-white shadow-md border-gray-500 ">
                    <thead>
                        <tr className="bg-DarkGreen text-white">
                            <th className="md:py-3 md:rounded-tl-md py-1 px-2 text-[12px] md:text-lg text-center border-b border-gray-500">Sl.</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500">Type</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500">Name</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 md:pl-5 pl-2 text-[12px] md:text-lg text-left border-b border-gray-500 ">Number</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 pl-8 text-[12px] md:text-lg text-left border-b border-gray-500 ">Date & Time</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 pl-7 text-[12px] md:text-lg text-left border-b border-gray-500 ">TrxId</th>
                            <th className="md:py-3 md:rounded-tr-md py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500 ">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center">
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            storeData?.map((item, i) => (
                                <tr key={i} onClick={() => handleModal(item)} className={`${i % 2 === 0 ? 'bg-[#2f2f2f]' : 'bg-[#393939]'} hover:bg-black/20 cursor-pointer transition duration-300`}>
                                    <td className="py-3 md:py-4 text-white text-center border-b border-gray-700 text-sm font-medium">{i + 1}</td>
                                    <td className="py-3 md:py-4 pl-3 md:pl-6 pr-3 border-b border-gray-700">
                                        <img
                                            src={
                                                item?.paymentMethod === 'bkash' ? 'https://i.ibb.co/rdzW7Nh/bkash.png' :
                                                    item?.paymentMethod === 'nogod' ? 'https://i.ibb.co/qxbhZVX/nagad.png' :
                                                        item?.paymentMethod === 'rocket' ? 'https://i.ibb.co/q0t3nTP/rocket.jpg' : ''
                                            }
                                            alt={item?.paymentMethod}
                                            className="h-6 md:h-8 w-6 md:w-8 object-contain"
                                        /></td>
                                    <td className="py-3 md:py-4 px-3 text-[13px] md:px-6 md:pl-7 -pl-2 border-b border-gray-700">{item?.userName}</td>
                                    <td className="py-3 md:py-4 px-3 text-[13px] md:px-6 border-b border-gray-700">{item?.number}</td>
                                    <td className="py-3 md:py-4 px-3 text-[13px] md:px-6 pl-8 border-b border-gray-700">{item?.date} {item?.time}</td>
                                    <td className="py-3 md:py-4 px-3 text-[13px] md:px-6 pl-8 border-b border-gray-700">{item?.transactionId}</td>
                                    <td className="py-3 md:py-4 text-[13px] md:pl-10 pl-4 cursor-pointer md:px-6 border-b border-gray-700 ">{item?.amount}</td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
            <Pagination userLength={totalLenght} setPageNumbers={setPageNumbers} />
        </div>
    );
};

export default History;
