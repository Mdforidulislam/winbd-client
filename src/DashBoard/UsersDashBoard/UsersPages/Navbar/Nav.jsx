import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import axios from "axios";

const Nav = () => {
    const [userName, setUsername] = useState('');
    const [redirectUrl, setRedirectUrl] = useState('');

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUsername(JSON.parse(userData).userName);
        }
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://server.win-pay.xyz/getingDynamicallyUrl');
                setRedirectUrl(res.data.data[0].redirectUrl);
            } catch (error) {
                console.error('Error fetching the data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen h-full flex flex-col" style={{ zIndex: 12 }}>
            <div className="bg-DarkGreen sticky top-0 z-20">
                <div className="flex justify-between w-full items-center px-4 py-2">
                    <div className="flex items-center gap-2">
                        {/* Left arrow */}
                        <Link to={redirectUrl} className="text-2xl text-white">
                            <MdKeyboardArrowLeft />
                        </Link>
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
