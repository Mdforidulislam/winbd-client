import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import cus from '../../../../public/cus.svg';
import { useEffect, useState } from "react";
import { FaWhatsapp  } from "react-icons/fa";
import { RiMessengerLine } from "react-icons/ri";
import { PiTelegramLogoLight } from "react-icons/pi";
import { IoIosInformationCircle } from "react-icons/io";



const ForgotPass = () => {
    const [fetchedData, setFetchedData] = useState({});
    const [localDat, setLocalData] = useState({});

    useEffect(() => {
        const getingAuthrId = localStorage.getItem('registerAuthrId');
        const convertParsData = JSON.parse(getingAuthrId)
        setLocalData(convertParsData);
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://server.win-pay.xyz/getinPassordContact?authorId=${localDat}`);
                //due
                //have to set authorId dnamically
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFetchedData(data);
      
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, []);

    const { socialMediaLinks } = fetchedData.data || {};

    return (
        <div className=" w-full flex min-h-screen bg-[#171717]">
            <div className="h-full w-full flex justify-center items-center md:items-start md:min-h-screen ">
                <div className="md:w-[27%] mb-6">

                    <div className="w-full shadow-md mb-4 text-white py-1 pb-4 flex items-center bg-DarkGreen px-2">

                        <Link to={'/login'} className="relative z-10">
                            <div className="">
                                <span className="text-white font-bold text-3xl"><MdOutlineKeyboardArrowLeft /></span>
                            </div>
                        </Link>

                        <div className="flex-grow justify-center -ml-8">
                            <h1 className="text-center py-2 text-sm font-normal">Forgot password?</h1>
                        </div>

                    </div>
                    <div className="h-24 py-2 mb-4">
                        <img className="w-full h-full object-contain" src={cus} alt="" />
                    </div>
                    <div className="px-12">
                        <p className="text-white text-center text-[9px]">
                            জীবের মধ্যে সবচেয়ে সম্পূর্ণতা মানুষের। কিন্তু সবচেয়ে অসম্পূর্ণ হয়ে সে জন্মগ্রহণ করে। বাঘ ভালুক তার জীবনযাত্রার পনেরো- আনা মূলধন নিয়ে আসে প্রকৃতির মালখানা থেকে। 
                        </p>
                    </div>
                    <div className="mt-4 pt-4">
                        <ul className="w-full flex justify-between px-12">
                            <li>
                                <Link to={`${socialMediaLinks?.whatApp?.link}`} target="_blank" rel="noopener noreferrer">
                                    <FaWhatsapp />
                                </Link>
                            </li>
                            <li>
                                <Link to={`${socialMediaLinks?.facebook?.link}`} target="_blank" rel="noopener noreferrer">
                                    <RiMessengerLine />
                                </Link>
                            </li>
                            <li>
                                <Link to={`${socialMediaLinks?.teligram?.link}`} target="_blank" rel="noopener noreferrer">
                                    <PiTelegramLogoLight />
                                </Link>

                            </li>
                        </ul>
                    </div>
                    <div className="mx-12 my-8 border border-dotted bg-opacity-10" >
                    </div>

                    <div className="mx-8 mt-4 relative">
                        <div className="absolute top-2 left-1 text-white">
                            <IoIosInformationCircle />
                        </div>
                        <p className="bg-notifyBlack px-5 pl-6 py-2 text-white text-justify text-[9px]">
                            জীবের মধ্যে সবচেয়ে সম্পূর্ণতা মানুষের। কিন্তু সবচেয়ে অসম্পূর্ণ হয়ে সে জন্মগ্রহণ করে। বাঘ ভালুক তার জীবনযাত্রার পনেরো- আনা মূলধন নিয়ে আসে প্রকৃতির মালখানা থেকে।
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ForgotPass;
