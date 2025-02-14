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

const AgentNumber = ({ paymentType, activeTab }) => {
    const [state, setState] = useState({
        selectedOptions: [],
        dropdownOpen: [],
        openModal: false,
        storeData: [],
        localData: '',
        data: null,
        newNote: '',
        newId: null,
        activeId: [],
        status: [],
        loading: true,
    });


    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        const authurId = userData?.uniqueId;
        const activeId = JSON.parse(localStorage.getItem("activeId")) || [];

        setState(prevState => ({
            ...prevState,
            localData: authurId,
            activeId
        }));
    }, []);



    useEffect(() => {
        const fetchAgentData = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            try {
                const { data: serverData } = await axios.get(`https://server.win-pay.xyz/getingPaymentmethod?uniqueId=${state.localData}&paymentType=${paymentType}`);
                const data = serverData || [];
                const options = data.map(item => item.status || null);
                setState(prevState => ({
                    ...prevState,
                    storeData: data,
                    selectedOptions: options,
                    dropdownOpen: Array(data.length).fill(false),
                    status: options,
                    loading: false,
                }));
            } catch (error) {
                console.error('Error fetching agent data:', error);
                toast.error('Failed to fetch agent data');
                setState(prevState => ({ ...prevState, loading: false }));
            }
        };
        if (state.localData) fetchAgentData();
    }, [paymentType, activeTab, state.localData]);

    const handleDropdownClick = (index) => {
        setState(prevState => ({
            ...prevState,
            dropdownOpen: prevState.dropdownOpen.map((open, i) => (i === index ? !open : false)),
        }));
    };

    const handleOptionSelect = (index, option) => {
        setState(prevState => {
            const newStatus = prevState.status.map((stat, i) => (i === index ? option : stat));
            return {
                ...prevState,
                selectedOptions: prevState.selectedOptions.map((opt, i) => (i === index ? option : opt)),
                dropdownOpen: prevState.dropdownOpen.map((open, i) => (i === index ? false : open)),
                status: newStatus,
            };
        });
    };

    const handleModal = (item) => {
        setState(prevState => ({ ...prevState, data: item, openModal: true }));
    };

    const handleUpdatePayment = async (e) => {
        e.preventDefault();
        const index = parseInt(e.target.getAttribute('data-index'), 10);
        const { newId, localData, newNote, status } = state;
        const { Logo, depositeChannel, number, transactionMethod, idNumber } = newId || {};

        const formValues = {
            Logo,
            depositeChannel,
            note: newNote,
            number: e.target.number.value || number,
            status: status[index] || newId?.status,
            transactionMethod,
            authorId: localData,
            idNumber,
        };

        try {
            const { data: response } = await axios.patch('https://server.win-pay.xyz/updatePaymentMethod', formValues);
            if (response.message === 'Successfully processed payment method') {
                toast.success(response.message);
            }
        } catch (error) {
            console.error('Error updating payment method:', error);
            toast.error('Failed to update payment method');
        }
    };

    const { loading, storeData, selectedOptions, dropdownOpen, openModal, data, newNote } = state;

    return (
        <>
            {
                loading ?
                    <Loader /> :
                    <div className="text-white grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                        {storeData?.filter((item)=> item?.transactionMethod === "bkash" || item?.transactionMethod === "nogod" || item?.transactionMethod === "rocket"  )?.map((data, index) => (
                            <form onClick={() => setState(prevState => ({ ...prevState, newId: data }))} onSubmit={handleUpdatePayment} data-index={index} key={index} className="bg-GlobalGray p-4 rounded-md shadow-md text-center relative">
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
                                        {selectedOptions[index] && (
                                            <button
                                                type="submit"
                                                name={`status${selectedOptions[index]}`}
                                                value={selectedOptions[index]}
                                                className={`${selectedOptions[index] === 'active' ? 'bg-green-500' : 'bg-red-500'} text-[10px] text-white tracking-wide rounded-full text-xl p-1 font-medium`}
                                            >
                                                {selectedOptions[index] === 'active' ? <FaCheck /> : <RxCross2 />}
                                            </button>
                                        )}
                                    </div>
                                    <div className="absolute right-2 top-3 hover:bg-GlobalGray cursor-pointer transition-opacity rounded-full p-1" onClick={() => handleDropdownClick(index)}>
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
                                        <span className="text-gray-200/50 font-semibold">Add Note</span>
                                        <IoMdAddCircleOutline className='text-green-700' />
                                    </button>
                                    <div className="group">
                                        <button
                                            type="submit"
                                            className="rounded-sm my-3 relative max-w-44 h-10 px-3 cursor-pointer flex transition duration-200 gap-2 justify-between items-center border-2 border-gray-300/10 bg-green-700 group-hover:bg-green-600"
                                        >
                                            <span className="text-gray-200 font-semibold">Update</span>
                                            <FaRegCheckCircle className='text-[18px]' />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ))}
                        {openModal && <UpdateModal setNewNote={(note) => setState(prevState => ({ ...prevState, newNote: note }))} newNote={newNote} setOpenModal={(open) => setState(prevState => ({ ...prevState, openModal: open }))} openModal={openModal} data={data} />}
                    </div>
            }
        </>
    );
};



export default AgentNumber;
