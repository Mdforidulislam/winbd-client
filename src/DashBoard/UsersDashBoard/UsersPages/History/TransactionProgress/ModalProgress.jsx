import { useEffect, useState } from "react";

import { FaFlag } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

const ModalProgress = ({ historyModal, showProgress }) => {
    const { date, requestStatus, time, transactionType, statusNote } = historyModal;
 
    const [showOrder1, setShowOrder1] = useState(false);
    const [showOrder2, setShowOrder2] = useState(false);
    const [showOrder3, setShowOrder3] = useState(false);
    const [showOrder4, setShowOrder4] = useState(false);

    useEffect(() => {
        if (showProgress) {
            const timers = [
                setTimeout(() => setShowOrder1(true), 50),
                setTimeout(() => setShowOrder2(true), 80),
                setTimeout(() => setShowOrder3(true), 110),
                setTimeout(() => setShowOrder4(true), 500),
            ];

            return () => timers.forEach(timer => clearTimeout(timer));
        }
    }, [showProgress]);


    return (
        <div className="text-white px-3 mt-6">
            {/* tile the transaction info */}
            <div className="flex justify-between">
                <h1 className="text-white">Transaction Progress</h1>
                <p className={`px-2 py-[2px] rounded-md text-[12px] ${requestStatus === 'success' ? 'bg-green-600' :
                    requestStatus === 'Approved' ? 'bg-green-600' :
                        requestStatus === 'Processing' ? 'bg-slate-700' :
                            requestStatus === 'verify' ? 'bg-yellow-600' :
                                requestStatus === 'Rejected' ? 'bg-HistoryRed' : ''}`}>
                    {requestStatus}
                </p>
            </div>
            {/* line activities work */}
            <div className="flex w-full gap-6 ">
                {/* line active bar  */}
                <div className={`h-[180px] mt-14 ml-2 mr-2 w-1 ${requestStatus === 'success' ? 'bg-green-600' : requestStatus === 'Approved' ? 'bg-green-600' : requestStatus === 'Processing' ? 'bg-slate-700' : requestStatus === 'verify' ? 'bg-yellow-600' : requestStatus === 'Rejected' ? 'bg-HistoryRed' : ''} justify-items-stretch relative`}>
                    <div className="absolute top-0">
                        <span className="bg-white h-[12px] w-[12px] rounded-full absolute -ml-1 "></span>
                    </div>
                    <div id="order-4" className={`absolute z-10 
                    ${requestStatus === 'success' ? '-bottom-3.5' :
                            requestStatus === 'Approved' ? '-bottom-3.5' :
                                requestStatus === 'Processing' ? 'top-0' :
                                    requestStatus === 'verify' ? 'top-1/2' :
                                        requestStatus === 'Rejected' ? 'top-0' : ''}
                    
                    ${showOrder4 ? 'animate-scalee' : ''}`}>
                        <div className={`text-xl ${requestStatus === 'success' ? 'bg-green-600' :
                            requestStatus === 'Approved' ? 'bg-green-600' :
                                requestStatus === 'Processing' ? 'bg-slate-700' :
                                    requestStatus === 'verify' ? 'bg-yellow-600' :
                                        requestStatus === 'Rejected' ? 'bg-HistoryRed' : ''} text-white w-10 h-10 flex justify-center items-center rounded-full border-white border-[3px] -ml-4 -mt-4`}>
                            {requestStatus === 'success' ? (
                                <FaCheck />
                            ) : requestStatus === 'Approved' ? (
                                <FaCheck />
                            ) : requestStatus === 'verify' ? (
                                <FaFlag />
                            ) : requestStatus === 'Processing' ? (
                                <FaFlag />
                            ) : requestStatus === 'Rejected' ? (
                                <RxCross2 />
                            ) : null}
                        </div>
                    </div>
                    <div className="absolute top-20">
                        <span className="bg-white h-[12px] w-[12px] rounded-full absolute -ml-1 "></span>
                    </div>
                    <div className="absolute bottom-3">
                        <span className="bg-white h-[12px] w-[12px] rounded-full absolute -ml-1 "></span>
                    </div>
                </div>
                {/* info bar  */}
                <div className="w-full">
                    <div className={`mt-5 space-y-1 relative`}>
                        <div>
                            <p className="text-[12px] text-white -ml-3 ">{date}</p>
                        </div>
                        <div className={`${showOrder1 ? 'animate-slideIn' : 'hiddenn'} flex justify-between px-2 py-3 rounded-sm bg-[#4D4D4D]`}>
                            {requestStatus === 'Processing' || requestStatus === 'Rejected' ? (
                                <p className="text-white text-[12px] capitalize">{statusNote}</p>
                            ) : (
                                <p className="text-white/50 text-[12px]">Deposit Information Received.</p>
                            )}
                            <p className="text-white/50 text-[12px]">{time}</p>
                        </div>
                    </div>
                    <div className={`mt-5 space-y-1 relative`}>
                        <div>
                            <p className="text-[12px] text-white -ml-3 ">{date}</p>
                        </div>
                        <div className={`${showOrder2 ? 'animate-slideIn' : 'hiddenn'} flex justify-between px-2 py-3 rounded-sm bg-[#4D4D4D]`}>
                            {requestStatus === 'verify' ? (
                                <p className="text-white text-[12px] capitalize">{statusNote}</p>
                            ) : (
                                <p className="text-white/50 text-[12px]">Deposit Information Received.</p>
                            )}
                            <p className="text-white/50 text-[12px]">{time}</p>
                        </div>
                    </div>
                    <div className={`mt-5 space-y-1 relative`}>
                        <div>
                            <p className="text-[12px] text-white -ml-3 ">{date}</p>
                        </div>
                        <div className={`${showOrder3 ? 'animate-slideIn' : 'hiddenn'} flex justify-between px-2 py-3 rounded-sm bg-[#4D4D4D]`}>
                            {requestStatus === 'success' || requestStatus === 'Approved' ? (
                                <p className="text-white text-[12px] capitalize">{statusNote}</p>
                            ) : (
                                <p className="text-white/50 text-[12px]">Deposit Initiated.</p>
                            )}
                            <p className="text-white/50 text-[12px]">{time}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModalProgress;
