import React, { useContext} from 'react';
// import { FaAngleDown } from "react-icons/fa";
import WithDraw from '../../../DashBoard/UsersDashBoard/UsersPages/Withdraw/WithDraw';
import Desposite from '../../../DashBoard/UsersDashBoard/UsersPages/Desposite/Desposite';
import History from '../../../DashBoard/UsersDashBoard/UsersPages/History/History';
import { AuthContext } from '../../../Authentication/Authentication';

const Tabs = () => {
    const { activeTab, setActiveTab } = useContext(AuthContext);
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            
            <div className="py-5 px-4 cus-shadow sticky top-14 bg-DarkGreen z-10">
                <div className="flex border-gray-200 bg-[#054D3F] rounded-[5px] relative">
                    <button
                        className={`tab-btn flex-1 py-[3px] text-[12px] font-semibold focus:outline-none focus:border-transparent ${activeTab === 'deposit' ? 'text-white z-20 shadow-sm rounded-md duration-500' : 'text-white'}`}
                        onClick={() => handleTabChange('deposit')}
                    >
                        Deposit
                    </button>

                    <button
                        className={`tab-btn flex-1 py-[3px] text-[12px] font-semibold focus:outline-none focus:border-transparent ${activeTab === 'withdraw' ? 'text-white  z-20 shadow-sm duration-500' : 'text-white '}`}
                        onClick={() => handleTabChange('withdraw')}
                    >
                        Withdraw
                    </button>
                    <button
                        className={`tab-btn flex-1 py-[3px] text-[12px] font-semibold focus:outline-none focus:border-transparent ${activeTab === 'history' ? 'text-white z-20 shadow-sm rounded-md duration-500' : 'text-white '}`}
                        onClick={() => handleTabChange('history')}
                    >
                        History
                    </button>

                    {/* here animation slide  */}
                    <div className='absolute bg-LightGreen shadow-sm h-[115%] -top-[1.5px] w-1/3 rounded-[3px] transition-transform duration-500'
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
            <div className="rounded">
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
