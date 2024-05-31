import { MdKeyboardArrowLeft } from "react-icons/md";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";


const Nav = () => {
    const [userName, setUsername] = useState('')
    useEffect(() => {
        setUsername(JSON.parse(localStorage.getItem('userData'))?.userName);
    },[])
  return (
    <div className=" min-h-screen h-full flex flex-col " style={{ zIndex: 12 }}>
    {/* Upper content */}
    <div className="bg-DarkGreen sticky top-0 z-20">
        <div className="flex justify-between w-full items-center px-4 py-2">
            <div className="flex items-center gap-2">
                {/* Left arrow */}
                <div className="text-2xl text-white">
                    <MdKeyboardArrowLeft />
                </div>
                {/* User's name */}
                <div>
                    <h1 className="text-white text-sm capitalize">{userName}</h1>
                </div>
            </div>
            {/* Profile options */}
            <div className="flex items-center gap-2">
                {/* Modal section, takes remaining height and is scrollable */}
                <div className="h-full overflow-y-auto flex-grow z-30">
                    <Modal />
                </div>
            </div>
        </div>
    </div>


</div>
  );
};

export default Nav;
