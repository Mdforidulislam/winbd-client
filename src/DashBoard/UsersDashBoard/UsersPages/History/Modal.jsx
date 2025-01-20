import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { LuLayoutList } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import ModalProgress from './TransactionProgress/ModalProgress';
import ModalInfoShow from './TransactionProgress/ModalInfoShow';

const Modal = ({ setIsOpenModalOpen, isModalOpen, historyModal, showProgress, setShowProgress }) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const { paymentMethod } = historyModal;

    const closeModal = () => {
        setIsOpenModalOpen(false);
        setShowProgress(false);
 
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className={`fixed backdrop-blur-sm  md:max-w-[28%] overflow-hidden mx-auto bg-black/80 inset-0 z-50 flex items-end justify-center transition-transform duration-500 ${isModalOpen ? 'translate-y-0 block' : 'translate-y-[800px] hidden'}`}>
            <div className="w-full h-full absolute rounded-t-2xl top-28 bg-GlobalDarkGray ">
                <div className="relative w-full rounded-t-2xl">
                    {/* Header Part */}
                    <div className="bg-[#555555] px-2 rounded-t-2xl p-[0.1px]">
                        {/* Logo and Title */}
                        <div className="absolute -mt-14 flex justify-center items-center w-full">
                            <div className="bg-GlobalDarkGray items-center px-3 py-2 flex gap-2 rounded-xl">
                                <img
                                    width={25}
                                    height={25}
                                    src={
                                        paymentMethod === 'bkash' ? 'https://i.ibb.co/C0mhx9D/bkash.png' :
                                            paymentMethod === 'nogod' ? 'https://i.ibb.co/qxbhZVX/nagad.png' :
                                                paymentMethod === 'rocket' ? 'https://i.ibb.co/q0t3nTP/rocket.jpg' : ''
                                    }
                                    alt="Bkash"
                                />
                                <h1 className="text-white font-semibold text-sm">{paymentMethod === 'bkash' ? 'bKash' : paymentMethod === 'rocket' ? 'Rocket' : paymentMethod === 'nogod' ? 'Nagad' : paymentMethod === 'upay' ? 'Upay' : paymentMethod === 'surecash' ? 'SureCash' : paymentMethod === 'okwallet' ? 'OKWallet' : paymentMethod}</h1>
                            </div>
                        </div>

                        {/* Close Button and Title */}
                        <div className="flex items-center justify-between h-full w-full pt-3 pb-8">
                            <div className="w-full">
                                <h2 className="font-semibold text-white text-center text-[1rem]">Transaction Record Details</h2>
                            </div>
                            <button onClick={closeModal}>
                                <span className="text-white text-2xl">
                                    <IoMdClose />
                                </span>
                            </button>
                        </div>

                        {/* Tab System */}
                        <div className="flex mb-4 rounded-md relative bg-[#3B3B3B]">
                            <button
                                className={`flex-1 text-center ${activeTab === 'tab1' ? 'text-white z-40 py-[5px]' : 'text-white'}`}
                                onClick={() => handleTabClick('tab1')}
                            >
                                <div className="w-full flex justify-center">
                                    <span>
                                        <LuLayoutList />
                                    </span>
                                </div>
                            </button>
                            <button
                                className={`flex-1 text-center ${activeTab === 'tab2' ? 'text-white z-40 py-[5px]' : 'text-white'}`}
                                onClick={() => handleTabClick('tab2')}
                            >
                                <div className="w-full flex justify-center">
                                    <span>
                                        <MdOutlineAddBox />
                                    </span>
                                </div>
                            </button>
                            <div
                                className="absolute bottom-0 h-full bg-DarkGreen shadow-2xl rounded-md transition-transform duration-300 ease-in-out"
                                style={{
                                    width: '50%',
                                    transform: activeTab === 'tab1' ? 'translateX(0%)' : 'translateX(100%)',
                                }}
                            />
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="tab-content px-2">
                        {activeTab === 'tab1' && (
                            <div className="transition-all duration-500" style={{ transform: 'translateX(0px)', }} >
                                <ModalProgress showProgress={showProgress} historyModal={historyModal} />
                            </div>
                        )}
                        {activeTab === 'tab2' && (
                            <div className="transition-all duration-500" style={{ transform: 'translateX(0px)', }}  >
                                <ModalInfoShow historyModal={historyModal} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
