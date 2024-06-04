import { Outlet } from "react-router-dom";
import { RiCustomerService2Fill } from "react-icons/ri";
import Facebook from "./Facebook";

const UsersLayout = () => {
    return (
        <>
            {/* define  the users Layout here  */}
            <div className='md:w-[28%] bg-[#111014] w-full min-h-screen mx-auto relative'>
                {/* <div className="fixed bottom-10 right-2 h-10 w-10 text-[30px] p-1 z-50 bg-black opacity-30 hover:opacity-100 transition duration-200 rounded-full flex justify-center items-center text-white"><Facebook /></div> */}
                <Outlet />
            </div>
        </>)

}

export default UsersLayout;


