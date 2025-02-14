import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddLink = () => {
    const [link, setLink] = useState("");
    const [localData, setLocalData] = useState('');


    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
        setLocalData(authurId);
        const fetchDynamicUrl = async () => {
            try {
                const response = await axios.get('https://server.win-pay.xyz/getingDynamicallyUrl');
                if (response.data.data.length > 0) {
                    setLink(response.data.data[0].redirectUrl);
                }
            } catch (error) {
                console.error('Error fetching dynamic URL:', error);
            }
        };

        fetchDynamicUrl();
    }, []);

    const handleUpdateCustomerCareNumber = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.patch('https://server.win-pay.xyz/insertDynamiceUrl', {
                uniqueId: localData,
                redirectUrl: link
            });
            if (response.data.message === 'URL has been successfully created or updated') {
                toast.success('Link Added successfully');
            }
        } catch (error) {
            toast.error('Failed to update Link');
            console.error('Error updating link:', error);
        }
    };



    return (
        <div className='max-w-screen-md mx-auto px-2 md:px-6'>
            <div className='text-center text-2xl font-medium text-white my-10'>Add Link</div>
            <div className="flex justify-center gap-2 items-center">
                <input
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full py-2 px-3 text-white rounded-sm bg-GlobalGray focus:outline-none"
                    placeholder='Add your link...'
                />
                <button
                    type="submit"
                    onClick={handleUpdateCustomerCareNumber}
                    className="bg-green-500 w-full max-w-20 md:max-w-32 text-sm text-white py-2 px-3 rounded-sm hover:bg-DarkGreen transition duration-200"
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default AddLink;
