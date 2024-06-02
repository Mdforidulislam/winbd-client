import React, { useState, useEffect } from 'react';
import { IoChatboxEllipses } from "react-icons/io5";
import axios from 'axios';
import { FaFacebookMessenger, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import toast from 'react-hot-toast';

const AdminCustomerCare = () => {
    const [data, setData] = useState({});
    const [localData, setLocalData] = useState('');

    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
        setLocalData(authurId);
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://sever.win-pay.xyz/getSocialMFPF?authorId=${authurId}`);
                setData(response.data.data.socialMediaLinks || {});
                console.log(response.data.data.socialMediaLinks);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleUpdateCustomerCareNumber = async (platform, link) => {
        try {
            const updatedData = {
                role: "admin",
                authorId: localData,
                socialMediaLinks: {
                    ...data,
                    [platform]: { link }
                }
            };
            console.log(updatedData);
            toast.success('Link Updated successfully');
            await axios.put(`https://sever.win-pay.xyz/insertSocialMFPF?authorId=${localData}`, updatedData);
            setData(prevData => ({
                ...prevData,
                [platform]: { link }
            }));
        } catch (error) {
            console.error("Error updating social media links:", error);
        }
    };

    return (
        <div className='max-w-screen-md mx-auto px-2 md:px-6'>
            <div className='text-center text-2xl font-medium text-white my-10'>Social Links</div>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateCustomerCareNumber('whatApp', e.target.elements.link.value);
            }} className="mb-2">
                <div className="flex justify-center gap-2 items-center">
                    <div className='p-2 bg-GlobalGray rounded-full'><FaWhatsapp className='text-green-600 rounded-full text-2xl' /></div>
                    <input
                        defaultValue={data.whatApp?.link || ""}
                        name="link"
                        className="w-full py-2 px-3 text-white rounded-sm bg-GlobalGray focus:outline-none"
                        placeholder="Add your WhatsApp link..."
                    />
                    <button
                        type="submit"
                        className="bg-green-500 w-full max-w-20 md:max-w-32 text-sm text-white py-2 px-3 rounded-sm hover:bg-DarkGreen transition duration-200"
                    >
                        Update
                    </button>
                </div>
            </form>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateCustomerCareNumber('facebook', e.target.elements.link.value);
            }} className="mb-2">
                <div className="flex justify-center gap-2 items-center">
                    <div className='p-2 bg-GlobalGray rounded-full'><FaFacebookMessenger className='text-blue-600 rounded-full text-2xl' /></div>
                    <input
                        defaultValue={data.facebook?.link || ""}
                        name="link"
                        className="w-full py-2 px-3 text-white rounded-sm bg-GlobalGray focus:outline-none"
                        placeholder="Add your Facebook Messenger link..."
                    />
                    <button
                        type="submit"
                        className="bg-green-500 w-full max-w-20 md:max-w-32 text-sm text-white py-2 px-3 rounded-sm hover:bg-DarkGreen transition duration-200"
                    >
                        Update
                    </button>
                </div>
            </form>

            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateCustomerCareNumber('teligram', e.target.elements.link.value);
            }} className="mb-2">
                <div className="flex justify-center gap-2 items-center">
                    <div className='p-2 bg-GlobalGray rounded-full'><FaTelegramPlane className='text-blue-500 rounded-full text-2xl' /></div>
                    <input
                        defaultValue={data.teligram?.link || ""}
                        name="link"
                        className="w-full py-2 px-3 text-white rounded-sm bg-GlobalGray focus:outline-none"
                        placeholder="Add your Telegram link..."
                    />
                    <button
                        type="submit"
                        className="bg-green-500 w-full max-w-20 md:max-w-32 text-sm text-white py-2 px-3 rounded-sm hover:bg-DarkGreen transition duration-200"
                    >
                        Update
                    </button>
                </div>
            </form>

            <div className='text-center text-2xl font-medium text-white my-10'>Live Chat</div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdateCustomerCareNumber('liveChat', e.target.elements.link.value);
            }} className="mb-2">
                <div className="flex justify-center gap-2 items-center">
                    <div className='p-2 bg-GlobalGray rounded-full'><IoChatboxEllipses className='text-red-200 rounded-full text-2xl' /></div>
                    <input
                        defaultValue={data.liveChat?.link || ""}
                        name="link"
                        className="w-full py-2 px-3 text-white rounded-sm bg-GlobalGray focus:outline-none"
                        placeholder="Add your Live Chat link..."
                    />
                    <button
                        type="submit"
                        className="bg-green-500 w-full max-w-20 md:max-w-32 text-sm text-white py-2 px-3 rounded-sm hover:bg-DarkGreen transition duration-200"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminCustomerCare;
