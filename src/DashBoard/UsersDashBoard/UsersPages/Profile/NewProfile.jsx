import { useContext, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AuthContext } from "../../../../Authentication/Authentication";
import { IoIosLogOut } from "react-icons/io";
import { TfiReload } from "react-icons/tfi";
import { AiTwotoneEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Title from "../../../../Components/Titile/Title";
const NewProfile = ({ animation, handleClose }) => {
    const [fetchedData, setFetchedData] = useState({});
    const [userName, setUserName] = useState('');
    const { role, setRole, setrediectionDW, setActiveTab } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://sever.win-pay.xyz/getinPassordContact?authorId=user123');
                //due
                //have to set authorId dnamically
                //need to check the links are the one for here or not
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFetchedData(data);
                console.log(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, []);

    const { socialMediaLinks } = fetchedData.data || {};


    const handleLogOutAction = () => {
        localStorage.removeItem('userData');
        setRole(undefined);
    };

    useEffect(() => {
        const userName = JSON.parse(localStorage.getItem('userData'))?.userName;
        setUserName(userName);
    }, []);

    const handleChange = (value) => {
        setActiveTab(value);
        setOpenModal(false);
    };
    return (
        <div className={`fixed overflow-x-hidden inset-0 md:max-w-lg md:mx-auto text-white bg-black w-full ${animation}`}>

            <div className="relative h-40 w-[115%] -ml-6 rounded-b-full overflow-x-hidden">
                <div onClick={handleClose} className="absolute right-2 -top-5 z-20">
                    <div className="bg-black rounded-full p-3 pr-8 pt-9">
                        <span className="w-full justify-end flex text-lg text-white">
                            <RxCross1 />
                        </span>
                    </div>
                </div>
                <div className="flex w-full gap-2 items-center top-8 absolute z-20">
                    <div className="ml-7">
                        <img
                            className="w-[55px] h-[55px]"
                            src="https://img.b112j.com/bj/h5/assets/images/vip/bdt/normal.png?v=1715679064603"
                            alt=""
                        />
                    </div>
                    <div className="-mt-2">
                        <h1 className="text-white text-sm capitalize ml-1 -mb-[4px] text-left">
                            {userName}
                        </h1>
                        <div>
                            <span className="text-white bg-GlobalDarkGray rounded-full text-[11px] px-[12px] pb-[3px] pt-[2px]">
                                VIP Points (VP) <span className="text-LightGreen">&#160;***&#160;</span> | My VIP
                            </span>
                        </div>
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 to-transparent rounded-b-full z-10"></div>
                <img
                    className="absolute scale-105 rounded-b-full -top-5"
                    src="https://img.b112j.com/bj/h5/assets/images/member-header-bg.png?v=1715679064603"
                    alt=""
                />
            </div>

            <div className="absolute h-full top-[110px] w-full px-2.5 z-20">
                {/* wallet section */}
                <div className="flex justify-between bg-GlobalDarkGray px-2 rounded-sm py-4 mb-2.5 items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium tracking-wide text-[#7DBFAA]  capitalize">main wallet</span>
                        <span className="text-[14px] font-medium tracking-wide text-[#7DBFAA] "><TfiReload /></span>
                        <span className="text-[16px] font-medium tracking-wide text-[#7DBFAA] "><AiTwotoneEye /></span>
                    </div>
                    <div>
                        <span className="text-[#F2DF1A] pr-5 font-medium text-[15px]"><span className="text-[17px]"></span> ***</span>
                    </div>
                </div>

                {/* total funds */}
                <div className="bg-GlobalDarkGray px-2 py-[5px] rounded-sm">
                    <div className="text-left border-b-[0.5px] pb-2 border-gray-500">
                        <Title text={'Funds'} />
                    </div>
                    <div className="flex gap-4 mt-1 py-3 justify-around px-2">
                        {/* Deposit */}
                        <Link to={'/profile/user'} onClick={() => handleChange('deposit')} className="flex flex-col items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-deposit.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-[12px]">Deposit</h1>
                        </Link>
                        {/* Withdrawal */}
                        <Link to={'/profile/user'} onClick={() => handleChange('withdraw')} className="flex flex-col items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-withdrawal.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-[12px]">Withdrawal</h1>
                        </Link>
                    </div>
                </div>

                {/* history section */}
                <div className="bg-GlobalDarkGray px-2 rounded-sm mt-2.5">
                    <div className="text-left border-b pb-2 border-gray-500 pt-1">
                        <Title text={'history'} />
                    </div>
                    <div className="flex gap-4 mt-1 py-3 justify-between px-2">
                        {/* Betting records */}
                        <div className="flex flex-col items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-bet-records.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-[12px]">Betting Records</h1>
                        </div>
                        {/* Turnover */}
                        <div className="flex flex-col items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-turnover.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-[12px]">Turnover</h1>
                        </div>
                        {/* Transaction records */}
                        <Link to={'/profile/user'} onClick={() => handleChange('history')} className="flex flex-col items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-records.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-[12px]">Transaction Records</h1>
                        </Link>
                    </div>
                </div>

                {/* profile info */}
                <div className="bg-GlobalDarkGray px-2 rounded-sm mt-2.5">
                    <div className="text-left border-b pb-2 border-gray-500 pt-1">
                        <Title text={'history'} />
                    </div>
                    <div className="grid grid-cols-4 items-start py-4 px-2">
                        {/* Personal Info */}
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-profile.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-center leading-none text-[12px]">Personal Info</h1>
                        </div>
                        {/* Reset Password */}
                        <Link to={"/profile/resetPassword"} className="flex flex-col gap-1 items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-resetpasswords.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-center leading-none text-[12px]">Reset Password</h1>
                        </Link>
                        {/* Inbox */}
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-inbox.png?v=1715679064603" alt="" />
                            <h1 className="text-white leading-none text-[12px]">Inbox</h1>
                        </div>
                        {/* Referral */}
                        <div className="flex flex-col gap-1 items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-referral.png?v=1715679064603" alt="" />
                            <h1 className="text-white leading-none text-[12px]">Referral</h1>
                        </div>
                    </div>
                </div>

                {/* contact info */}
                <div className="bg-GlobalDarkGray px-2 rounded-sm mt-2.5">
                    <div className="text-left border-b pb-2 border-gray-500 pt-1">
                        <Title text={'Contact'} />
                    </div>
                    <div className="flex gap-4 mt-1 py-3 justify-between px-2">
                        {/* Personal Info */}
                        <Link to={`${socialMediaLinks?.whatApp?.link}`} className="flex flex-col items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-whatsapp.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-[12px]">WhatsApp</h1>
                        </Link>
                        {/* Reset Password */}
                        {/* //due
                        //have to set email */}
                        <div className="flex flex-col items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-email.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-[12px]">Email</h1>
                        </div>
                        {/* Inbox */}
                        <Link to={`${socialMediaLinks?.facebook?.link}`} className="flex flex-col items-center justify-center">
                            <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-facebook-messenger.png?v=1715679064603" alt="" />
                            <h1 className="text-white text-[12px]">Facebook</h1>
                        </Link>
                    </div>
                </div>

                {/* LogOut Button */}
                <div onClick={handleLogOutAction} className="w-full my-3 pb-10 rounded-sm">
                    <button className="py-3 bg-GlobalDarkGray rounded-sm text-white text-sm flex justify-center w-full items-center gap-3">
                        <span className="text-white text-xl"><IoIosLogOut /></span>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProfile;