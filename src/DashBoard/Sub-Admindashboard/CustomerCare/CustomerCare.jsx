import React, { useState, useEffect } from 'react';
import { IoChatboxEllipses } from "react-icons/io5";
import axios from 'axios';
import { FaFacebookMessenger, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import toast from 'react-hot-toast';
import { BiLogoGmail } from 'react-icons/bi';

const AdminCustomerCare = () => {
    const [data, setData] = useState({});
    const [emailData, setEmailData] = useState('');
    const [authorId, setAuthorId] = useState('');

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        const authId = storedUserData?.uniqueId;
        setAuthorId(authId);

        const fetchData = async () => {
            try {
                const [socialResponse, emailResponse] = await Promise.all([
                    axios.get(`https://sever.win-pay.xyz/getSocialMFPF?authorId=${authId}`),
                    axios.get(`https://sever.win-pay.xyz/getingSubAdminEmail?authoreId=${authId}`)
                ]);
                setData(socialResponse.data.data.socialMediaLinks || {});
                setEmailData(emailResponse.data.getngEmail.email || '');
                console.log(emailResponse.data.getngEmail.email);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (authId) {
            fetchData();
        }
    }, []);

    const handleUpdateCustomerCareNumber = async (platform, link) => {
        try {
            const updatedData = {
                role: "admin",
                authorId,
                socialMediaLinks: {
                    ...data,
                    [platform]: { link }
                }
            };
            toast.success('Email Updated successfully');
            await axios.put(`https://sever.win-pay.xyz/insertSocialMFPF?authorId=${authorId}`, updatedData);

        } catch (error) {
            console.error("Error updating social media links:", error);
        }
    };

    const handleUpdateCustomerCareEmail = async (link) => {
        try {
            const updatedData = {
                authorId,
                email: link
            };

            const res = await axios.put(`https://sever.win-pay.xyz/updateSubAdminEmail?authoreId=${authorId}`, updatedData);
            console.log(res);
            if (res.data.message === "Email updated successfully") {
                toast.success('Email Updated successfully');
            }
        } catch (error) {
            console.error("Error updating email:", error);
        }
    };

    const renderForm = (platform, icon, placeholder, defaultValue, isEmail = false) => (
        <form onSubmit={(e) => {
            e.preventDefault();
            const link = e.target.elements.link.value;
            if (isEmail) {
                handleUpdateCustomerCareEmail(link);
            } else {
                handleUpdateCustomerCareNumber(platform, link);
            }
        }} className="mb-2">
            <div className="flex justify-center gap-2 items-center">
                <div className='p-2 bg-GlobalGray rounded-full'>{icon}</div>
                <input
                    defaultValue={defaultValue}
                    name="link"
                    className="w-full py-2 px-3 text-white rounded-sm bg-GlobalGray focus:outline-none"
                    placeholder={placeholder}
                />
                <button
                    type="submit"
                    className="bg-green-500 w-full max-w-20 md:max-w-32 text-sm text-white py-2 px-3 rounded-sm hover:bg-DarkGreen transition duration-200"
                >
                    Update
                </button>
            </div>
        </form>
    );

    return (
        <div className='max-w-screen-md mx-auto px-2 md:px-6'>
            <div className='text-center text-2xl font-medium text-white my-4 md:my-10'>Social Links</div>

            {renderForm('whatApp', <FaWhatsapp className='text-green-600 rounded-full text-2xl' />, "Add your WhatsApp link ...", data.whatApp?.link || "")}
            {renderForm('facebook', <FaFacebookMessenger className='text-blue-600 rounded-full text-2xl' />, "Add your Facebook Messenger link ...", data.facebook?.link || "")}
            {renderForm('teligram', <FaTelegramPlane className='text-blue-500 rounded-full text-2xl' />, "Add your Telegram link ...", data.teligram?.link || "")}
            {renderForm('email', <BiLogoGmail className='text-red-400 rounded-full text-2xl' />, "Add your email ...", emailData, true)}

            <div className='text-center text-2xl font-medium text-white my-10'>Live Chat</div>
            {renderForm('liveChat', <IoChatboxEllipses className='text-red-200 rounded-full text-2xl' />, "Add your Live Chat link...", data.liveChat?.link || "")}
        </div>
    );
};

export default AdminCustomerCare;
