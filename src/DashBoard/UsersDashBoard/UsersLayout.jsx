import { Outlet } from "react-router-dom";

const UsersLayout = () => {
    return (
        <>
            {/* define  the users Layout here  */}
            <div className='md:w-[28%] bg-[#111014] w-full min-h-screen mx-auto'>
                <Outlet />
            </div>
        </>)

}

export default UsersLayout;


