import React, { useContext, useEffect, useState } from 'react';
// import { FaAngleDown } from "react-icons/fa";
import PaymentMethod from '../../../DashBoard/UsersDashBoard/UsersPages/PaymentMethod/PaymentMethod';
import DepositeChennel from '../../../DashBoard/UsersDashBoard/UsersPages/DepositeChanel/DepositeChennel';
import Amount from '../../../DashBoard/UsersDashBoard/UsersPages/Amount/Amount';
import WithDraw from '../../../DashBoard/UsersDashBoard/UsersPages/Withdraw/WithDraw';
import Desposite from '../../../DashBoard/UsersDashBoard/UsersPages/Desposite/Desposite';
import History from '../../../DashBoard/UsersDashBoard/UsersPages/History/History';
import { AuthContext } from '../../../Authentication/Authentication';

// const truncateText = (text, limit) => {
//     const words = text.split(' ');
//     if (words.length > limit) {
//         return words.slice(0, limit).join(' ') + '...';
//     }
//     return text;
// };

const Tabs = () => {
    // const [selectedOption, setSelectedOption] = useState("এক্সট্রা ১.৫% ডিপোজিট বোনাস");
    const { activeTab, setActiveTab } = useContext(AuthContext);
    // const [isSticky, setIsSticky] = useState(false);

    // const handleOptionClick = (option) => {
    //     setSelectedOption(option);
    // };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // const handleScroll = () => {
    //     const threshold = window.innerHeight - 48;
    //     if (window.scrollY > threshold) {
    //         setIsSticky(true);
    //     } else {
    //         setIsSticky(false);
    //     }
    // };

    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);
//  className="min-h-screen h-full flex flex-col" style={{ zIndex: 12 }}
    return (
        <div>
            
            <div className="px-4 cus-shadow py-4 sticky top-14 bg-DarkGreen z-10">
                {/* <div className={`px-4 cus-shadow py-4 sticky ${isSticky ? 'top-0' : 'top-14'} bg-DarkGreen z-10`}> */}
                <div className="flex border-gray-200 bg-[#054D3F] rounded-[5px] relative">
                    <button
                        className={`tab-btn flex-1 py-1  text-[12px]  focus:outline-none focus:border-transparent ${activeTab === 'deposit' ? 'text-white z-20 shadow-sm rounded-md duration-500' : 'text-white'}`}
                        onClick={() => handleTabChange('deposit')}
                    >
                        Deposit
                    </button>

                    <button
                        className={`tab-btn flex-1 py-1 text-[12px] font-semibold focus:outline-none focus:border-transparent ${activeTab === 'withdraw' ? 'text-white  z-20 shadow-sm duration-500' : 'text-white '}`}
                        onClick={() => handleTabChange('withdraw')}
                    >
                        Withdraw
                    </button>
                    <button
                        className={`tab-btn flex-1 py-1 text-[12px] font-semibold focus:outline-none focus:border-transparent ${activeTab === 'history' ? 'text-white z-20 shadow-sm rounded-md duration-500' : 'text-white '}`}
                        onClick={() => handleTabChange('history')}
                    >
                        History
                    </button>

                    {/* here animation slide  */}
                    <div className='absolute bg-LightGreen h-[104%] top-[1px] w-1/3 rounded-[3px] transition-transform duration-500'
                        style={{
                            transform:
                                activeTab === 'deposit' ? 'translateX(0%)' :
                                    activeTab === 'withdraw' ? 'translateX(100%)' :
                                        'translateX(200%)',
                        }}
                    >

                    </div>
                </div>
            </div>
            <div>
                {/* promotion option */}
            </div>
            {/* Tab content */}
            <div className="  rounded ">
                {activeTab === 'withdraw' && (
                    <div className="tab-pane space-y-3">
                        <WithDraw />
                    </div>
                )}
                {activeTab === 'deposit' && (
                    <div className="tab-pane">
                        <Desposite />
                    </div>
                )}
                {activeTab === 'history' && (
                    <div className="tab-pane">
                        <History />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tabs;
