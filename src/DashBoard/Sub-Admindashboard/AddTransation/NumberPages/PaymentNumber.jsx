import React, { useEffect, useState } from 'react';
import bkash from '/payment_logo/bkash.png';
import nogod from '/payment_logo/nagad.png';
import rocket from '/payment_logo/rocket.png';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { FaCheck, FaRegCheckCircle } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import UpdateModal from '../UpdateModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from '../../../../Components/Loader/Loader';
import ToggleSwitch from '../../../../Components/ToggleSwitch/ToggleSwitch';


const PaymentNumber = ({ paymentType, activeTab }) => {
    const [selectedOption, setSelectedOption] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [storeData, setStoreData] = useState([]);
    const [localData, setLocalData] = useState('');
    const [data, setData] = useState(null);
    const [newNote, setNewNote] = useState('');
    const [newId, setNewId] = useState({});
    const [activeId, setActiveId] = useState([]);
    const [status, setStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subAdminInfo,setSubAdminInfo] = useState({})

    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"));

        setLocalData(authurId?.uniqueId);
        setActiveId(JSON.parse(localStorage.getItem("activeId")) || []);
    }, []);

    useEffect(()=>{
      
            let x = setTimeout(async() => {
                const reponse = await axios.get(`https://server.win-pay.xyz/getingSingleSubAdmin?uniqueId=${localData}`)
                setSubAdminInfo(reponse.data.data);
            }, 1000);

            ()=> clearTimeout(x);
    },[localData])

    const handleDropdownClick = (index) => {
        setDropdownOpen((prevState) => prevState.map((open, i) => (i === index ? !open : false)));
    };

    const handleOptionSelect = (index, option) => {
        setSelectedOption((prevState) => prevState.map((opt, i) => (i === index ? option : opt)));
        setDropdownOpen((prevState) => prevState.map((open, i) => (i === index ? false : open)));
        setStatus((prevState) => prevState.map((stat, i) => (i === index ? option : stat)));
    };

    useEffect(() => {
        const fetchAgentData = async () => {
            setLoading(true);
            try {
                const { data: serverData } = await axios.get(`https://server.win-pay.xyz/getingPaymentmethod`, {
                    params: {
                        uniqueId: localData,
                        paymentType,
                    }
                });
                const data = serverData || [];
                setStoreData(data);
                setSelectedOption(data.map(item => item.status || null));
                setDropdownOpen(Array(data.length).fill(false));
                setStatus(data.map(item => item.status || null));
            } catch (error) {
                console.error('Error fetching agent data:', error);
                toast.error('Failed to fetch agent data');
            } finally {
                setLoading(false);
            }
        };
        fetchAgentData();
    }, [paymentType, activeTab, activeId, localData]);

    const handleModal = (item) => {
        setData(item);
        setOpenModal(true);
    };

    const handleUpdatePayment = async (e) => {
        e.preventDefault();
        const index = parseInt(e.target.dataset.index, 10);
        const { Logo, depositeChannel, transactionMethod, idNumber } = newId;

        const formValues = {
            Logo,
            depositeChannel,
            note: newNote === "" ? {
                    title: "",
                    list:[],
                    remainder:""
            } : newNote,
            number: e.target.number.value || newId.number,
            status: status[index] || newId.status,
            transactionMethod,
            authorId: localData,
            idNumber,
        };

        try {
            const { data: res } = await axios.patch('https://server.win-pay.xyz/updatePaymentMethod', formValues);
            if (res.message === 'Successfully processed payment method') {
                toast.success(res.message);
            }
        } catch (error) {
            console.error('Error updating payment method:', error);
            toast.error('Failed to update payment method');
        }
    };

    const handlePaymentSwitch =async (id, type) =>{
        const response = await axios.put(`https://server.win-pay.xyz/updatePaymentPermission?id=${id}&type=${type}`);
    }


    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                    {storeData?.filter((item)=> item?.transactionMethod === "bkash" || item?.transactionMethod === "nogod" || item?.transactionMethod === "rocket"  )?.map((data, index) => (
                        <form onClick={() => setNewId(data)} onSubmit={handleUpdatePayment} data-index={index} key={index} className="bg-GlobalGray p-4 rounded-md shadow-md text-center relative">
                            <div className="flex h-12 gap-2 relative">
                                <img src={data?.transactionMethod === "bkash" ? bkash :data?.transactionMethod === "nogod" ? nogod : rocket } alt="" />
                                <input
                                    className="w-full py-2 px-3 text-sm rounded bg-GlobalDarkGray focus:outline-none"
                                    name="number"
                                    defaultValue={`${data?.number}`}
                                    type="text"
                                    placeholder="Phone Number"
                                />
                                <div className="absolute right-10 top-[10px]">
                                    {selectedOption[index] && (
                                        <button
                                            type="submit"
                                            className={`text-[10px] text-white tracking-wide rounded-full text-xl p-1 font-medium ${
                                                selectedOption[index] === 'active' ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                        >
                                            {selectedOption[index] === 'active' ? <FaCheck /> : <RxCross2 />}
                                        </button>
                                    )}
                                </div>
                                <div className="absolute right-2 top-3 hover:bg-GlobalGray cursor-pointer transition-opacity rounded-full p-1"
                                    onClick={() => handleDropdownClick(index)}>
                                    <MdKeyboardArrowDown />
                                </div>
                                {dropdownOpen[index] && (
                                    <div className="absolute right-0 mt-12 w-32 z-20 bg-white text-black rounded shadow-lg">
                                        <div className="p-2 cursor-pointer hover:bg-green-400 hover:text-white" onClick={() => handleOptionSelect(index, 'active')}>
                                            Active
                                        </div>
                                        <div className="p-2 cursor-pointer hover:bg-red-400 hover:text-white" onClick={() => handleOptionSelect(index, 'reject')}>
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
                                    <span className="text-gray-200/50 font-semibold">Add Note</span>
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
                                        <FaRegCheckCircle className='text-[18px]' />
                                    </button>
                                </div>
                            </div>

                            {/* Payment system Availbe section */}
                            <div className={`flex justify-around  ${subAdminInfo?.paymentPermissions?.some((item)=> item.type === "automatic" && item.allowed) ? "" : "hidden" }`}>
                               
                                <div className='flex gap-3 items-center'>
                                    {
                                       data?.activePayMethod?.map((item,index)=>(
                                         <div key={`${data.id}-${item.type}`} onClick={()=>handlePaymentSwitch(data?.id,item?.type)}>
                                             <ToggleSwitch   tooltip={item.type} initialState={item.allowed} /> 
                                         </div>
                                       )) 
                                    }
                                </div>
                            </div>
                        </form>
                    ))}
                    {openModal && <UpdateModal setNewNote={setNewNote} newNote={newNote} setOpenModal={setOpenModal} openModal={openModal} data={data} />}
                </div>
            )}
        </>
    );
};

export default PaymentNumber;
