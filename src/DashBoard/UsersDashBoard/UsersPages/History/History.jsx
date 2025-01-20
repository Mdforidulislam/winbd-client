import { IoFunnelOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import Drawer from "./Drawer";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Authentication/Authentication";
import Modal from "./Modal";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const History = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsOpenModalOpen] = useState(false);
    const [historyModal, setHistoryModal] = useState({});
    const { userSearchData, selectedFilters } = useContext(AuthContext);

    const [showProgress, setShowProgress] = useState(false);
 
    // drawer state here 
    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };



    //  modal  state here 
    const openModal = (info) => {
        setIsOpenModalOpen(true);
        setHistoryModal(info);
        setShowProgress(true);
    };


    return (
        <div className="">
            <div className="bg-[#393939]">
                <div className="flex justify-between items-center">
                    <div className="w-full pl-2 overflow-hidden text-white/50">
                        <div className="flex w-full gap-2 overflow-x-auto">
                            {selectedFilters.filter(type => type !== null).map(type => (
                                <button
                                    key={type}
                                    onClick={() => handleButtonClick('paymentType', type)}
                                    className={`py-0.5 pb-[2.5px] px-2 rounded-sm text-[9px] bg-LightGreen text-white`}
                                >
                                    <span className="capitalize">{type}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={handleOpenDrawer} className="p-2.5 pt-3.5 border-[0.5px] border-l-[0.5px] border-y-transparent border-r-transparent border-gray-400 flex justify-center items-center"><span className="text-white text-xl"><IoFunnelOutline /></span></button>
                    <Drawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
                </div>
            </div>


            <div className="py-2 text-white bg-[#4C4C4C]">
                <div className="grid grid-cols-4">
                    <div className="flex-1 border-r-2 border-gray-400 text-center text-[11.5px]">Type</div>
                    <div className="flex-1 border-r-2 border-gray-400 text-center text-[11.5px]">Amount</div>
                    <div className="flex-1 border-r-2 border-gray-400 text-center text-[11.5px]">Status</div>
                    <div className="flex-1 text-center text-[11.5px]">Txn Date</div>
                </div>
            </div>

            <div className="text-white">
                {
                    userSearchData && userSearchData.map((item, index) => (
                        <div key={index} className="">
                            <div className="flex justify-between w-full px-2 bg-[#111014] text-white/50 py-1 mt-1">
                                <div className="flex items-center gap-2">
                                    <span><FaCalendarAlt /></span>
                                    <h3 className="text-[10.8px]">{item?.date}</h3>
                                </div>
                                <div className="border rounded-[3px] border-white/30 border-opacity-30 px-0.5">
                                    <h1 className="text-[9px]">GMT+6</h1>
                                </div>
                            </div>

                            <div className="w-full ">
                                {item && item?.data?.map((item, index) => (
                                    <div onClick={() => openModal(item)} key={index} className={`flex cursor-pointer items-center py-[3px] ${index % 2 === 0 ? 'bg-[#2f2f2f]' : 'bg-[#262626]'}`}>
                                        <div className="flex-1 text-center border-[0.2px] py-1 border-l-transparent border-y-transparent border-white/20 text-[11px] capitalize">{item.transactionType}</div>
                                        <div className="flex-1 text-end border-[0.2px] py-1 border-l-transparent border-y-transparent border-white/20 text-[11px] capitalize">
                                            <span className={`${item?.transactionType === 'withdraw' ? 'text-red-400' : 'text-white'} pr-3`}>{item.amount}</span>
                                        </div>
                                        <div className={`flex-1 border-[0.2px] text-center py-1 border-l-transparent border-y-transparent border-white/20 text-[9px] capitalize`}>
                                            <span className={`px-2 py-[2px] pb-[5px] ${item.requestStatus === "Approved" ? "bg-green-600 text-white rounded-[3px]" : item.requestStatus === "verify" ? 'bg-yellow-600 text-white rounded-[3px]' : item.requestStatus === "Processing" ? "bg-slate-700 text-white rounded-[3px]" : item.requestStatus === "Rejected" ? "bg-HistoryRed text-white rounded-[3px]" : item.requestStatus === "success" ? "bg-green-600 text-white rounded-[3px]" : ''}`}>
                                                {item.requestStatus}
                                            </span>
                                        </div>
                                        <div className="flex-1 text-[10px] py-1 text-center relative">
                                            {item.time} <MdOutlineKeyboardArrowRight className="text-lg absolute -right-[2px] top-[3px] text-white/50" />
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    ))
                }
            </div>

            <span className="text-white text-[12px] justify-center flex w-full mt-3 font-semibold">End of the page...</span>
            <div className="absolute h-full">
                <Modal setIsOpenModalOpen={setIsOpenModalOpen} showProgress={showProgress} setShowProgress={setShowProgress} isModalOpen={isModalOpen} historyModal={historyModal} />
            </div>
        </div >
    );
};

export default History;