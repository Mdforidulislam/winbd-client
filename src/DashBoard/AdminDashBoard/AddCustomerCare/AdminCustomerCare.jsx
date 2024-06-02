import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFacebookMessenger, FaTelegramPlane } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
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
                console.log(response.data);
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
            await axios.put(`https://sever.win-pay.xyz/insertSocialMFPF?authorId=${localData}`, updatedData);
            toast.success('Link Updated successfully');
            //due
            //data is updated successfully but showing error in the console
            // console.log(response.data);
            // console.log(updatedData);
        } catch (error) {
            // console.error("Error updating social media links:", error);
        }
        toast.success('Link Updated successfully');

    };

    return (
        <div className='max-w-screen-md mx-auto px-6'>
            <div className='text-center text-2xl font-medium text-white my-10'>Social Links</div>
            {Object.entries(data).map(([platform, details], index) => (
                <form key={index} onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdateCustomerCareNumber(platform, e.target.elements.link.value);
                }} className="mb-2">
                    <div className="flex justify-center gap-2 items-center">
                        {platform === 'whatApp' ? <div className='p-2 bg-GlobalGray rounded-full'><FaWhatsapp className='text-green-400 rounded-full text-2xl' /></div> : platform === 'teligram' ? <div className='p-2 bg-GlobalGray rounded-full'><FaTelegramPlane className='text-blue-400 rounded-full text-2xl' /></div> : platform === 'facebook' ? <div className='p-2 bg-GlobalGray rounded-full'><FaFacebookMessenger className='text-blue-600 rounded-full text-2xl' /></div> : null}
                        <input
                            defaultValue={details.link || ""}
                            name="link"
                            className="w-full py-2 px-3 text-white rounded-sm bg-GlobalGray focus:outline-none"
                            placeholder={`Add your ${platform} link...`}
                        />
                        <button
                            type="submit"
                            className="bg-green-500 w-full max-w-20 md:max-w-32 text-sm text-white py-2 px-3 rounded-sm hover:bg-DarkGreen transition duration-200"
                        >
                            Update
                        </button>
                    </div>
                </form>
            ))}
        </div>
    );
};

export default AdminCustomerCare;
