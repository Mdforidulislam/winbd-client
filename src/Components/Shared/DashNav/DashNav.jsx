import { Navigate, NavLink, useNavigate } from "react-router-dom";
import {
  MdOutlineDashboard,
  MdOutlineDashboardCustomize,
  MdOutlineNotificationsActive,
  MdOutlinePassword,
} from "react-icons/md";
import scrollToTop from "./ScrollToTop";
import MenuClose from "../../SvgIcons/MenuClose";
import MenuOpen from "../../SvgIcons/MenuOpen";
import { useContext, useState } from "react";
import { AuthContext } from "../../../Authentication/Authentication";
import { CiLogout } from "react-icons/ci";
import { AiTwotoneProfile } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { AiOutlineTransaction } from "react-icons/ai";
import { FaLink, FaUsers } from "react-icons/fa";
import { BsFillShareFill } from "react-icons/bs";
import { MdHistory } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";

const DashNav = () => {
  const [open, setOpen] = useState(false);
  const { role, setRole } = useContext(AuthContext);
  const navigate = useNavigate();

  const adminInfo = JSON.parse(localStorage.getItem('userData'))?.userName;

  const handleAction = () => {
    localStorage.removeItem('userData');
    setRole('undefined');
    navigate('/login', { replace: true });
  };

  const onClickFunction = () => {
    scrollToTop();
    setOpen(!open);
  };

  return (
    <div className="w-full md:w-[350px] md:min-h-screen md:p-5 bg-GlobalGray text-white">
      <div>
        <div className="z-50 py-5 w-full md:w-auto flex justify-between text-center">
          <NavLink className="flex gap-2.5 items-center" onClick={scrollToTop} to="/">
            <h3 onClick={scrollToTop} className="text-2xl md:text-3xl text-white font-semibold cursor-pointer">
              <span className="text-xl capitalize ml-6">{adminInfo}</span>
            </h3>
          </NavLink>

          <div className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <MenuClose /> : <MenuOpen />}
          </div>
        </div>

        <hr className="mb-5 hidden md:flex w-[85%] mx-auto" />

        {/* All the condition and nav items here for admin */}
        {role === 'admin' ? (
          <ul className="hidden md:flex menu space-y-3 mb-28 flex-col gap-6 justify-start items-start ml-2">
            <NavLink className="md:w-full" to="/dashboard/admin" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <MdOutlineDashboardCustomize className="text-2xl font-semibold" />
                  <h1>DashBoard</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" to="/dashboard/promotion" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <MdOutlineDashboardCustomize className="text-2xl font-semibold" />
                  <h1>Promotion</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" to="/dashboard/adminCustomerCare" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <RiCustomerService2Fill className="text-2xl font-semibold" />
                  <h1>Admin CustomerCare</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" to="/dashboard/addLink" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <FaLink className="text-2xl font-semibold" />
                  <h1>Add Link</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" to="/dashboard/addSubAdmin" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <AiTwotoneProfile className="text-2xl font-semibold" />
                  <h1>All Sub-Admin</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" onClick={handleAction}>
              <div className="flex justify-start gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2 px-3 rounded-3xl">
                <CiLogout className="text-2xl font-bold" />
                <h1>Logout</h1>
              </div>
            </NavLink>
          </ul>
        ) : role === 'subAdmin' ? (
          <ul className="hidden md:flex flex-col gap-2 justify-start items-start ml-2">
            {/* <NavLink className="md:w-full" to="/dashboard/subAdmin" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                    <MdOutlineDashboard className="text-2xl" />
                  <h1>DashBoard</h1>
                </div>
              )}
            </NavLink> */}
            <NavLink className="md:w-full" to="/dashboard/addNumber" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <MdPayment className="text-2xl" />
                  <h1>Add-Number</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" to="/dashboard/transtionReq" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <AiOutlineTransaction className="text-2xl" />
                  <h1>Transition Request</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" to="/dashboard/history" onClick={onClickFunction}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <MdHistory className="text-2xl" />
                  <h1>history</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" to="/dashboard/allUsers" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <FaUsers className="text-2xl" />
                  <h1>All-Users</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" to="/dashboard/customer-care" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <RiCustomerService2Fill className="text-2xl" />
                  <h1>Customer Care</h1>
                </div>
              )}
              </NavLink>

              <NavLink className="md:w-full" to={"/dashboard/refer"} onClick={onClickFunction}>
                  <div className="flex justify-start items-start gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl   ">
                    <BsFillShareFill className="text-2xl" />
                    <h1 className="">share reffer link</h1>
                  </div>
              </NavLink>
              
            <NavLink className="md:w-full" to="/dashboard/password" onClick={scrollToTop}>
              {({ isActive }) => (
                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                  <MdOutlinePassword className="text-2xl" />
                  <h1>Change Password</h1>
                </div>
              )}
            </NavLink>
            <NavLink className="md:w-full" onClick={handleAction}>
              <div className="flex justify-start gap-2 items-center font-medium hover:bg-DarkGreen transition duration-200 py-2 px-3 rounded-3xl">
                <CiLogout className="text-2xl" />
                <h1>Logout</h1>
              </div>
            </NavLink>
          </ul>
        ) : null}

        {/* all the condition and nav items here for sub-admin */}
      </div>

      {/* mobile resposive */}
      <div>
        {
          role === 'admin' ?
            <ul className={`flex flex-col gap-2 bg-GlobalGray backdrop-blur-3xl md:hidden absolute w-full h-screen top-[72px] z-[100] py-4 px-5 duration-500 ${open ? "left-0" : "-left-full"}`}>
              <NavLink className="md:w-full" to={"/dashboard/admin"} onClick={onClickFunction}>
                <div className="flex justify-start items-start ml-[13px] gap-2  font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl">
                  <MdOutlineDashboardCustomize className="text-2xl font-semibold" />
                  <h1> DashBoard </h1>
                </div>
              </NavLink>
              <NavLink className="md:w-full" to={'/dashboard/promotion'} onClick={onClickFunction}>
                <div className="flex justify-start items-start ml-[13px] gap-2  font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl">
                  <MdOutlineDashboardCustomize className="text-2xl font-semibold" />
                  <h1> Promotion </h1>
                </div>
              </NavLink>
              <NavLink className="md:w-full" to={"/dashboard/addSubAdmin"} onClick={onClickFunction}>
                <div className="flex justify-start items-start ml-[13px] gap-2  font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl ">
                  <RiCustomerService2Fill className="text-2xl font-semibold" />
                  <h1> Admin CustomerCare </h1>
                </div>
              </NavLink>
              <NavLink className="md:w-full" to={'/dashboard/addLink'} onClick={onClickFunction}>
                <div className="flex justify-start items-start ml-[13px] gap-2  font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl ">
                  <FaLink className="text-2xl font-semibold" />
                  <h1>Add Link </h1>
                </div>
              </NavLink>
              <NavLink className="md:w-full" to={"/dashboard/addSubAdmin"} onClick={onClickFunction}>
                <div className="flex justify-start items-start ml-[13px] gap-2  font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl ">
                  <AiTwotoneProfile className="text-2xl font-semibold" />
                  <h1> All Sub-Admin </h1>
                </div>
              </NavLink>

              <NavLink className="md:w-full" onClick={handleAction} >
                <div className="flex justify-start items-start ml-[13px] gap-2  font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl ">
                  <CiLogout className="text-2xl font-bold" />
                  <h1>Logout</h1>
                </div>
              </NavLink>
            </ul> : role === 'subAdmin' ?


              <ul className={`flex flex-col gap-2 bg-GlobalGray backdrop-blur-3xl md:hidden absolute w-full h-screen top-[72px] z-[100] py-4 px-5 duration-500 ${open ? "left-0" : "-left-full"}`}>
{/* 

                <NavLink className="md:w-full" to="/dashboard/subAdmin"  onClick={onClickFunction}>
                        {({ isActive }) => (
                                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                                    <MdOutlineDashboard className="text-2xl" />
                                  <h1>DashBoard</h1>
                                </div>
                        )}
                </NavLink> */}
                 <NavLink className="md:w-full" to="/dashboard/addNumber" onClick={onClickFunction}>
                          {({ isActive }) => (
                                <div className={`flex justify-start gap-2 items-center font-medium transition duration-200 py-2 px-3 rounded-3xl ${isActive ? 'bg-DarkGreen' : 'hover:bg-DarkGreen'}`}>
                                  <MdPayment className="text-2xl" />
                                  <h1>Add-Number</h1>
                                </div>
                          )}
                 </NavLink>

                <NavLink className="md:w-full" to={"/dashboard/transtionReq"} onClick={onClickFunction}>
                  <div className="flex justify-start items-start  gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl   ">
                    <AiOutlineTransaction className="text-2xl" />
                    <h1 className="">Transition Request</h1>
                  </div>
                </NavLink>

                <NavLink className="md:w-full" to={"/dashboard/history"} onClick={onClickFunction}>
                  <div className="flex justify-start items-start  gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl   ">
                    <MdHistory className="text-2xl" />
                    <h1 className="">history</h1>
                  </div>
                </NavLink>

                <NavLink className="md:w-full" to={"/dashboard/allUsers"} onClick={onClickFunction}>
                  <div className="flex justify-start items-start  gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl   ">
                    <FaUsers className="text-2xl" />
                    <h1 className="">All-Users</h1>
                  </div>
                </NavLink>
                <NavLink className="md:w-full" to={'/dashboard/customer-care'} onClick={onClickFunction}>
                  <div className="flex justify-start items-start  gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl   ">
                    <RiCustomerService2Fill className="text-2xl" />
                    <h1 className="">Customer Care</h1>
                  </div>
                </NavLink>
                <NavLink className="md:w-full" to={'/dashboard/password'} onClick={onClickFunction}>
                  <div className="flex justify-start items-start  gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl   ">
                    <MdOutlinePassword className="text-2xl" />
                    <h1 className="">Change Password</h1>
                  </div>
                </NavLink>

                <NavLink className="md:w-full" to={"/dashboard/refer"} onClick={onClickFunction}>
                  <div className="flex justify-start items-start  gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl   ">
                    <BsFillShareFill className="text-2xl" />
                    <h1 className="">share reffer link</h1>
                  </div>
                </NavLink>
                <NavLink className="md:w-full" onClick={handleAction}>
                  <div className="flex justify-start items-start  gap-2 font-medium hover:bg-DarkGreen transition duration-200 py-2  px-3 rounded-3xl   ">
                    <CiLogout className="text-2xl" />
                    <h1 className="">Logout</h1>
                  </div>
                </NavLink>

              </ul> : role === 'user' ? '' : null
        }
      </div>
    </div>
  );
};

export default DashNav;
