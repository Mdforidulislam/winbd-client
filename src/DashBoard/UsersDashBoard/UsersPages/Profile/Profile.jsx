import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Authentication/Authentication";
import { IoIosLogOut } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { TfiReload } from "react-icons/tfi";
import { AiTwotoneEye } from "react-icons/ai";
import Title from "../../../../Components/Titile/Title";

const Profile = ({ setOpenModal }) => {
    const [userName, setUserName] = useState('');
    const { role, setRole, setrediectionDW, setActiveTab } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOutAction = () => {

        localStorage.removeItem('userData');
        setRole(undefined);
        navigate('/login', { replace: true });
        
    };

    useEffect(() => {
        const userName = JSON.parse(localStorage.getItem('userData'))?.userName;
        setUserName(userName);
    }, []);

    const handleChange = (value) => {
        setActiveTab(value);
        setOpenModal(false);
    };
    //due
    //in the contact section the links will come from super admin not sub admin

    return (
        <div className="md:w-1/3 mx-auto bg-[#0D0D0D] min-h-screen relative">
            <div className="w-full h-full ">
                {/* nav profile */}


                <div className="bg-black absolute w-[110vw] -left-4">
                    <div className="bg-black overflow-hidden relative w-full rounded-b-full" style={{ backgroundImage: 'url("https://img.b112j.com/bj/h5/assets/images/member-header-bg.png?v=1715679064603")', backgroundPosition: 'buttom center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '200px' }}>

                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#000000ae] via-transparent to-transparent"></div>
                        <div onClick={() => setOpenModal(false)} className="absolute -right-1 -top-3.5">
                            <div className="bg-black rounded-full p-3 pr-8 pt-9">
                                <span className="w-full justify-end flex text-lg text-white"><RxCross1 /></span>
                            </div>
                        </div>

                        <div className="flex w-full gap-3 items-center mt-12">
                            <div className="ml-7">
                                <img className="w-[55px] h-[55px]" src="https://img.b112j.com/bj/h5/assets/images/vip/bdt/normal.png?v=1715679064603" alt="" />
                            </div>
                            <div className="-mt-2">
                                <h1 className="text-white text-sm capitalize ml-1 -mb-[4px] text-left">{userName}</h1>
                                <div><span className="text-white bg-GlobalDarkGray rounded-full text-[11px] px-[12px] pb-[3px] pt-[2px]">VIP Points (VP) <span className="text-LightGreen">&#160;***&#160;</span> | My VIP</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* profile items */}
                <div className="absolute h-full top-[112px] w-full bg-black px-2">
                    {/* wallet section */}
                    <div className="flex justify-between bg-GlobalDarkGray px-2 rounded-sm py-4 mb-3 items-center">
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
                    <div className="bg-GlobalDarkGray px-2 rounded-sm mt-3">
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
                    <div className="bg-GlobalDarkGray px-2 rounded-sm mt-3">
                        <div className="text-left border-b pb-2 border-gray-500 pt-1">
                            <Title text={'history'} />
                        </div>
                        <div className="grid grid-cols-4 items-start py-4 px-2">
                            {/* Personal Info */}
                            <div className="flex flex-col gap-1 items-center justify-center">
                                <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-profile.png?v=1715679064603" alt="" />
                                <h1 className="text-white leading-none text-[12px]">Personal Info</h1>
                            </div>
                            {/* Reset Password */}
                            <Link to={"/profile/resetPassword"} className="flex flex-col gap-1 items-center justify-center">
                                <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-resetpasswords.png?v=1715679064603" alt="" />
                                <h1 className="text-white leading-none text-[12px]">Reset Password</h1>
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
                    <div className="bg-GlobalDarkGray px-2 rounded-sm mt-3">
                        <div className="text-left border-b pb-2 border-gray-500 pt-1">
                            <Title text={'Contact'} />
                        </div>
                        <div className="flex gap-4 mt-1 py-3 justify-between px-2">
                            {/* Personal Info */}
                            <div className="flex flex-col items-center justify-center">
                                <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-whatsapp.png?v=1715679064603" alt="" />
                                <h1 className="text-white text-[12px]">WhatsApp</h1>
                            </div>
                            {/* Reset Password */}
                            <div className="flex flex-col items-center justify-center">
                                <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-email.png?v=1715679064603" alt="" />
                                <h1 className="text-white text-[12px]">Email</h1>
                            </div>
                            {/* Inbox */}
                            <div className="flex flex-col items-center justify-center">
                                <img width={35} src="https://img.b112j.com/bj/h5/assets/images/icon-set/theme-icon/icon-facebook-messenger.png?v=1715679064603" alt="" />
                                <h1 className="text-white text-[12px]">Facebook</h1>
                            </div>
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
        </div>
    );
};

export default Profile;
