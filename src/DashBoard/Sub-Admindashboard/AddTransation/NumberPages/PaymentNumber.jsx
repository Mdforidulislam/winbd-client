import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaCheck, FaRegCheckCircle } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import UpdateModal from '../UpdateModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from '../../../../Components/Loader/Loader';


const PaymentNumber = ({ paymentType, activeTab }) => {
    const [selectedOption, setSelectedOption] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [storeData, setStoreData] = useState([]);
    const [localData, setLocalData] = useState('');
    const [data, setData] = useState(null);
    const [newNote, setNewNote] = useState([]);
    const [newId, setNewId] = useState([]);
    const [activeId, setActiveId] = useState([]);
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
        setLocalData(authurId);
        setActiveId(JSON.parse(localStorage.getItem("activeId")) || []);
    }, []);

    const handleDropdownClick = (index) => {
        const updatedDropdownOpen = dropdownOpen.map((open, i) => (i === index ? !open : false));
        setDropdownOpen(updatedDropdownOpen);
    };

    const handleOptionSelect = (index, option) => {
        const updatedSelectedOption = selectedOption.map((opt, i) => (i === index ? option : opt));
        setSelectedOption(updatedSelectedOption);
        setDropdownOpen(dropdownOpen.map((open, i) => (i === index ? false : open))); // Close the dropdown for the selected index
        const updatedStatus = status.map((stat, i) => (i === index ? option : stat));
        setStatus(updatedStatus);
    };

    useEffect(() => {
        const fetchAgentData = async () => {
            setLoading(true); 
            try {
                const serverData = await axios.get(`https://pay-winbd-server.vercel.app/getingPaymentmethod?uniqueId=${localData}&paymentType=${paymentType}`);
                const data = serverData?.data || [];
                setStoreData(data);
                setSelectedOption(data.map(item => item.status || null));
                setDropdownOpen(Array(data.length).fill(false));
                setStatus(data.map(item => item.status || null));
            } catch (error) {
                console.error('Error fetching agent data:', error);
                toast.error('Failed to fetch agent data');
            } finally {
                setLoading(false); // Set loading state to false after data is fetched
            }
        };
        fetchAgentData();
    }, [paymentType, activeTab, activeId,localData]);

    const handleModal = (item) => {
        setData(item);
        setOpenModal(true);
    };

    const handleUpdatePayment = async (e) => {
        e.preventDefault();
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        const Logo = newId?.Logo;
        const depositeChannel = newId?.depositeChannel;
        const number = e.target.number.value || newId?.number;
        const transactionMethod = newId?.transactionMethod;
        const authorId = localData;
        const idNumber = newId?.idNumber;

        // Wait for the latest value of newNote
        const formValues = {
            Logo,
            depositeChannel,
            note: newNote,
            number,
            status: status[index] || newId?.status,
            transactionMethod,
            authorId,
            idNumber
        };
        console.log(formValues);
        try {
            const response = await axios.patch('https://pay-winbd-server.vercel.app/updatePaymentMethod', formValues);
            const res = response.data;
            if (res.message === 'Successfully processed payment method') {
                const updatedActiveID = JSON.parse(localStorage.getItem("activeId")) || [];
                updatedActiveID.push(newId?.id);
                localStorage.setItem("activeId", JSON.stringify(updatedActiveID));
                toast.success(res.message);
            }
        } catch (error) {
            console.error('Error updating payment method:', error);
            toast.error('Failed to update payment method');
        }

    };

    return (
        <>
            {
                loading ?
                    <Loader /> :
                    <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                        {storeData?.map((data, index) => (
                            <form onClick={(e) => setNewId(data)} onSubmit={handleUpdatePayment} data-index={index} key={index} className="bg-GlobalGray p-4 rounded-md shadow-md text-center relative">
                                <div className="flex h-12 gap-2 relative">
                                    <img src={data?.Logo} alt="" />
                                    <input
                                        className="w-full py-2 px-3 text-sm rounded bg-GlobalDarkGray focus:outline-none"
                                        name="number"
                                        defaultValue={`0${data?.number}`}
                                        type="text"
                                        placeholder="Phone Number"
                                    />
                                    <div className="absolute right-10 top-[10px]">
                                        {selectedOption[index] && (
                                            <button
                                                type="submit"
                                                name={`status${selectedOption[index]}`}
                                                value={selectedOption[index]}
                                                className={`${selectedOption[index] === 'active'
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                                    } text-[10px] text-white tracking-wide rounded-full text-xl p-1 font-medium `}
                                            >
                                                {selectedOption[index] === 'active' ? <FaCheck /> : <RxCross2 />}
                                            </button>
                                        )}
                                    </div>
                                    <div className="absolute right-2 top-3 hover:bg-GlobalGray cursor-pointer transition-opacity rounded-full p-1"
                                        onClick={() => handleDropdownClick(index)} >
                                        <MdKeyboardArrowDown className="" />
                                    </div>
                                    {dropdownOpen[index] && (
                                        <div className="absolute right-0 mt-12 w-32 z-20 bg-white text-black rounded shadow-lg">
                                            <div
                                                className="p-2 cursor-pointer hover:bg-green-400 hover:text-white"
                                                onClick={() => handleOptionSelect(index, 'active')}
                                            >
                                                Active
                                            </div>
                                            <div
                                                className="p-2 cursor-pointer hover:bg-red-400 hover:text-white"
                                                onClick={() => handleOptionSelect(index, 'reject')}
                                            >
                                                Reject
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className='flex gap-3'>
                                    <button
                                        type="button"
                                        onClick={() => handleModal(data)}
                                        className="rounded-sm my-3 relative w-full h-10 px-2 cursor-pointer flex justify-between items-center border-2 border-gray-300/10 bg-GlobalGray"
                                    >
                                        <span className="text-gray-200/50 font-semibold" >Add Note</span >
                                        <IoMdAddCircleOutline className='text-green-700' />
                                    </button>
                                    <div className="group">
                                        <button
                                            type="submit"
                                            className="rounded-sm my-3 relative max-w-44 h-10 px-3 cursor-pointer flex transition duration-200 gap-2 justify-between items-center border-2 border-gray-300/10 bg-green-700 group-hover:bg-green-600"
                                        >
                                            <span className="text-gray-200 font-semibold">
                                                Update
                                            </span>
                                            <FaRegCheckCircle className='text-[18px] ' />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ))}
                        {openModal && <UpdateModal setNewNote={setNewNote} newNote={newNote} setOpenModal={setOpenModal} openModal={openModal} data={data} />}
                    </div>
            }
        </>
    );
};

export default PaymentNumber;