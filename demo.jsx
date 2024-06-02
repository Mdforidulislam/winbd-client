import { RiLuggageDepositFill } from "react-icons/ri";
import { PiHandWithdraw } from "react-icons/pi";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { CiFacebook } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Authentication/Authentication";
import { IoIosLogOut } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { MdForwardToInbox } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Demo = () => {
    const [userName,setUserName]= useState('')
    const { role, setModalaction, setRole } = useContext(AuthContext);
    

    const handleLogOutAction = () => {
        localStorage.removeItem('userData') 
        setRole(undefined)
    }

    useEffect(() => {
        const userName = JSON.parse(localStorage.getItem('userData'))?.userName;
        setUserName(userName);

    },[])

    return (
        <div className="bg-[#0D0D0D] min-h-screen">
            <div>
                {/* nav profile  */}
                <div className="bg-black h-full py-1 w-full" style={{backgroundImage: 'url("https://img.b112j.com/bj/h5/assets/images/member-header-bg.png?v=1715679064603")',backgroundPosition:'right',backgroundRepeat:'no-repeat', width:'100%',height:'100%',backgroundSize:'390px'}}>
                    <div onClick={() => setModalaction(false)} className="mr-6 pt-4">
                        <span className="w-full justify-end flex text-3xl text-white"><CiHome /></span>
                    </div>
                    <div>
                        <h1 className="text-white pb-12 text-3xl capitalize">{userName }</h1>
                    </div>
                </div>
                <div className="px-2">
                    {/* total Funds */}
                    <div className="bg-[#333333] px-2 py-1">
                        <div className="text-left">
                            <h1 className="text-md capitalize text-white  flex gap-1 items-center h-full w-full"> <span className="text-[#09614F]  font-bold ">|</span> <h1>funds</h1></h1>
                        </div>
                        <div className="flex gap-4 mt-3 py-3 justify-between px-2">
                                {/* Deposite  */}
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-white"><RiLuggageDepositFill /></span>
                                <h1 className="text-white text-sm">Deposite</h1>
                            </div>
                                {/* Withdraw */}
                            <div className="flex flex-col items-center justify-center">
                                <span  className="text-3xl text-white"><PiHandWithdraw /></span>
                                <h1 className="text-white text-sm">Withdrawal</h1>
                            </div>
                                {/* Record */}
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-white"><AiOutlineTransaction /></span>
                                <h1 className="text-white text-sm">Transation Record</h1>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    <div>

                    </div>
                    {/* Contact info  */}
                    <div className="bg-[#333333] px-2 mt-3 ">
                    <div className="text-left ">
                            <h1 className="text-md capitalize text-white  flex gap-1 items-center h-full w-full"> <span className="text-[#09614F]  font-bold ">|</span> <h1>Profile</h1></h1>
                        </div>
                        <div className="flex gap-4 mt-3 justify-between py-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-white"> <CgProfile /></span>
                                <h1 className="text-white text-sm">Profile</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-white"><MdForwardToInbox /></span>
                                <h1 className="text-white text-sm">inbox</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-white"><CiLock /></span>
                                <h1 className="text-white text-sm">Reset Password</h1>
                            </div>
                        </div>
                    </div>
                    {/* Profile info  */}
                    <div className="bg-[#333333] px-2 mt-3">
                    <div className="text-left">
                            <h1 className="text-md capitalize text-white  flex gap-1 items-center h-full w-full"> <span className="text-[#09614F]  font-bold ">|</span> <h1>Contact</h1></h1>
                        </div>
                        <div className="flex gap-4 mt-3 justify-between py-3 px-2">
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-white"><FaWhatsapp /></span>
                                <h1 className="text-white text-sm">WhatsApp</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-white"><MdOutlineMail /></span>
                                <h1 className="text-white text-sm">Email</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <span className="text-3xl text-white"><CiFacebook /></span>
                                <h1 className="text-white text-sm">Facebook</h1>
                            </div>
                        </div>
                    </div>
                    {/* LogOut Page here */}
                    <div onClick={handleLogOutAction} className="w-full bg-[#333333] mt-3 h-[50px]">
                        <button className="py-3 rounded-md text-white text-xl flex justify-center w-full items-center gap-3 "> <span className="text-white text-2xl"><IoIosLogOut /></span>Log out</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Demo;
