import { useEffect, useState } from "react";
import { FaFlag } from "react-icons/fa";

import { GrInProgress } from "react-icons/gr";
import { GrCompliance } from "react-icons/gr";

const ModalProgress = ({ historyModal }) => {
    const { amount, date, requestStatus, time, transactionType ,statusNote} = historyModal;

    const [showOrder1, setShowOrder1] = useState(false);
    const [showOrder2, setShowOrder2] = useState(false);
    const [showOrder3, setShowOrder3] = useState(false);
    const [showOrder4, setShowOrder4] = useState(false);

    useEffect(() => {
        const timers = [
            setTimeout(() => setShowOrder1(true), 50),
            setTimeout(() => setShowOrder2(true), 80),
            setTimeout(() => setShowOrder3(true), 110),
            setTimeout(() => setShowOrder4(true), 500),
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);


    return (
        <div className=" px-3 mt-6">
            {/* tile the transaction info */}
            <div className="flex justify-between">
                <h1 className="text-white">Transaction Progress</h1>
                <p className="text-white bg-loginfildBg p-1 rounded-sm text-[12px]">{requestStatus}</p>
            </div>
            {/* line activities work */}
            <div className="flex w-full gap-6 ">
                {/* line active bar  */}
                <div className=" h-[190px] mt-14 ml-3 mr-2 w-1 bg-CustomYellow  justify-items-stretch relative">
                    <div id="order-4" className={`absolute top-0 ${showOrder4 ? 'animate-scalee' : ''}`}>
                        <span className="bg-white h-[12px] w-[12px] rounded-full absolute -ml-1 "></span>
                        <div className={`text-md text-white bg-CustomYellow  p-2 rounded-full border-white border-[3px] -ml-4 -mt-4 ${requestStatus === 'Processing' || requestStatus === 'fail'?"":"hidden"}`}>
                            <span className="animate-spin font-bold bg-white"><FaFlag /></span>
                        </div>
                    </div>
                    <div className="absolute top-[95px]">
                        <span className="bg-white h-[12px] w-[12px] rounded-full absolute -ml-1 "></span>
                        <div className={`text-md text-white bg-CustomYellow  p-2 rounded-full border-white border-[3px] -ml-4 -mt-4 ${requestStatus === 'verify'?"":"hidden"}`}>
                            <span className="animate-spin font-bold bg-white"><GrInProgress /></span>
                        </div>
                    </div>
                    <div className="absolute bottom-0">
                        <span className="bg-white h-[12px] w-[12px] rounded-full absolute -ml-1 "></span>
                        <div className={`text-md text-white bg-CustomYellow  p-2 rounded-full border-white border-[3px] -ml-4 -mt-4 ${requestStatus === 'Approved' || requestStatus === 'payment' ?"":"hidden"}`}>
                            <span className="animate-spin font-bold bg-white"><GrCompliance /></span>
                        </div>
                    </div>
                </div>
                {/* info bar  */}
                <div className="w-full">
                    {/* first step */}
                    <div className={`mt-5 space-y-1 relative`}>
                        <div>
                            <p className="text-[12px] text-white -ml-3 ">{date}</p>
                        </div>
                        <div className={`${showOrder1 ? 'animate-slideIn' : 'hiddenn'} flex justify-between px-2 py-3 rounded-sm bg-[#4D4D4D]`}>
                            <p className="text-white text-[12px] capitalize">Processing { transactionType}</p>
                            <p className="text-white text-[12px]">{time}</p>
                        </div>
                    </div>
                    {/* send step processing */}
                    <div className={`mt-5 space-y-1 relative`}>
                        <div>
                            <p className="text-[12px] text-white -ml-3 ">{date }</p>
                        </div>
                        <div className={`${showOrder2 ? 'animate-slideIn' : 'hiddenn'} flex justify-between px-2 py-3 rounded-sm bg-[#4D4D4D]`}>
                            <p className="text-white/50 text-[12px] capitalize">{ transactionType} information Received</p>
                            <p className="text-white/50 text-[12px]">{time}</p>
                        </div>
                    </div>
                    {/* receive data */}
                    <div className={`mt-5 space-y-1 relative`}>
                        <div>
                            <p className="text-[12px] text-white -ml-3 ">{date}</p>
                        </div>
                        <div className={` ${showOrder3 ? 'animate-slideIn' : 'hiddenn'} flex justify-between px-2 py-3 rounded-sm bg-[#4D4D4D]`}>
                            <p className="text-white/50 text-[12px] capitalize">{ transactionType} initiated</p>
                            <p className="text-white/50 text-[12px]">{time}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* note section */}
            <div className="mt-3 ">
                <h1 className="text-white text-[12px] font-thin">Note: {statusNote}</h1>
            </div>
        </div>
    );
};

export default ModalProgress;
