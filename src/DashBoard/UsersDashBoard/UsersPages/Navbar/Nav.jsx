import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

const Nav = () => {
    const [userName, setUsername] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUsername(JSON.parse(userData).userName);
        }
    }, []);

    return (
        <div className="min-h-screen h-full flex flex-col" style={{ zIndex: 12 }}>
            <div className="bg-DarkGreen sticky top-0 z-20">
                <div className="flex justify-between w-full items-center px-4 py-2">
                    <div className="flex items-center gap-2">
                        {/* Left arrow */}
                        <div className="text-2xl text-white">
                            <MdKeyboardArrowLeft />
                        </div>
                        {/* User's name */}
                        <div>
                            <h1 className="text-white text-sm">{userName}</h1>
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
