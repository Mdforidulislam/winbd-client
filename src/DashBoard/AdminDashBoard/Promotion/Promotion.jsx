import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPlus, FaBars, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { RiMenu5Line } from 'react-icons/ri';

const Promotion = () => {

    const [campaigns, setCampaigns] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        turnover: '',
        percentage: '',
        fixedAmount: '',
        userType: 'allUser',
        timeType: 'allTime'
    });






    useEffect(() => {
        // Fetch campaigns data on component mount
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get('https://server.win-pay.xyz/getingPromotininfo');
                setCampaigns(response.data.getingPromotionList);
            } catch (error) {
                console.error('Error fetching campaigns:', error);
            }
        };

        fetchCampaigns();
    }, [campaigns]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sidebarRef]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const clearForm = () => {
        setFormData({
            title: '',
            description: '',
            amount: '',
            turnover: '',
            percentage: '',
            fixedAmount: '',
            userType: 'allUser',
            timeType: 'allTime'
        });
        setCurrentId(null);
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('https://server.win-pay.xyz/promtionOfferinser', formData);
            setCampaigns([...campaigns, response.data]);
            if (response.data.message === 'Successfully inserted promotion data') {
                toast.success('Campaign Added successfully');
            }
            clearForm();
        } catch (error) {
            console.error('Error saving data:', error);
            toast.error('Failed to save campaign');
        }
    };

    const handleUpdate = async () => {
        if (!currentId) return;

        try {
            const response = await axios.put(`https://server.win-pay.xyz/updatePromotionData?id=${currentId}`, formData);
            setCampaigns(campaigns.map(campaign => campaign._id === currentId ? response.data : campaign));
            clearForm();
            if (response.data.message === 'Successfully updated promotion') {
                toast.success('Campaign updated successfully');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error('Failed to update campaign');
        }
    };

    const handleDelete = async () => {
        if (!currentId) return;

        try {
            const response = await axios.delete(`https://server.win-pay.xyz/deletedPromtion?id=${currentId}`);
            setCampaigns(campaigns.filter(campaign => campaign._id !== currentId));
            clearForm();
            if (response.data.message === 'Successfully deleted promotion') {
                toast.success('Campaign deleted successfully');
            }
        } catch (error) {
            console.error('Error deleting data:', error);
            toast.error('Failed to delete campaign');
        }
    };

    const handleEdit = (campaign) => {
        setFormData({
            title: campaign.title,
            description: campaign.description,
            amount: campaign.amount,
            turnover: campaign.turnover,
            percentage: campaign.percentage,
            fixedAmount: campaign.fixedAmount,
            userType: campaign.allUser,
            timeType: campaign.allTime
        });
        setCurrentId(campaign._id);
        setIsSidebarOpen(!isSidebarOpen)
    };

    return (
        <>
            <style jsx>{`
                /* Hide the spinner controls for number inputs */
                input[type="number"]::-webkit-outer-spin-button,
                input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                input[type="number"] {
                    -moz-appearance: textfield;
                }
            `}</style>

            <div className="flex justify-center items-center text-white md:max-w-[90%] px-2 md:px-0 mx-auto">
                <div className="md:grid md:grid-cols-12 gap-3 min-h-[90vh] w-full">
                    <div ref={sidebarRef} className={`fixed top-0 left-0 h-full w-full bg-GlobalGray p-2 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:col-span-3`}>
                        <div className='flex justify-end'>
                            <button onClick={clearForm} className="hidden md:flex bg-GlobalDarkGray hover:bg-DarkGreen transition duration-300 rounded-sm text-center justify-evenly group items-center text-xl font-semibold h-16 w-full">
                                NEW CAMPAIGN <span className='text-green-500 group-hover:text-white'><FaPlus /></span>
                            </button>
                            <div className="flex md:hidden justify-end p-2">
                                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl">
                                    {isSidebarOpen ? <FaTimes /> : <FaBars />}
                                </button>
                            </div>
                        </div>

                        <ul className="flex flex-col gap-4 my-10">
                            {campaigns.map((campaign, index) => (
                                <button key={index} type="button" onClick={() => handleEdit(campaign)} className="hover:bg-GlobalDarkGray transition duration-300 md:pl-10 pl-4 text-start text-lg text-white pr-4">
                                    <span className="py-2 border-b-4 w-full border-GlobalDarkGray block">{campaign.title}</span>
                                </button>
                            ))}
                        </ul>
                    </div>
                    <div className="md:col-span-9 h-full w-full bg-GlobalGray p-2 ">
                        <div className="flex md:hidden justify-between gap-4 mb-6">
                            <button onClick={clearForm} className="flex bg-GlobalDarkGray hover:bg-DarkGreen transition duration-300 rounded-sm text-center justify-evenly group items-center text-sm font-semibold py-2 px-4">
                                NEW CAMPAIGN <span className='text-green-500 group-hover:text-white'> <FaPlus /></span>
                            </button>
                            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-2xl">
                                <RiMenu5Line />
                            </button>
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-1 md:gap-3 md:px-10 bg-GlobalDarkGray rounded-sm md:p-4 p-1">
                        
                            <input type="number"
                                name="percentage"
                                value={formData.percentage}
                                onChange={handleChange}
                                className="bg-GlobalGray text-center px-1 md-px-0 md:py-2 py-1 md:text-base font-semibold w-full text-[10px] rounded-sm md:rounded-md focus:outline-none"
                                placeholder="Percentage"
                            />
                            <input
                                type="number"
                                name="fixedAmount"
                                value={formData.fixedAmount}
                                onChange={handleChange}
                                className="bg-GlobalGray text-center px-1 md-px-0 md:py-2 py-1 md:text-base font-semibold w-full text-[10px] rounded-sm md:rounded-md focus:outline-none"
                                placeholder="Fixed Amount"
                            />
                            <input
                                type="number"
                                name="turnover"
                                value={formData.turnover}
                                onChange={handleChange}
                                className="bg-GlobalGray text-center px-1 md-px-0 md:py-2 py-1 md:text-base font-semibold w-full text-[10px] rounded-sm md:rounded-md focus:outline-none"
                                placeholder="Turnover"
                            />
                            <select
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
                                className="bg-GlobalGray text-center py-1 px-1 md:px-0 md:py-2 text-[10px] md:text-lg font-semibold w-full rounded-sm md:rounded-md focus:outline-none"
                            >
                                <option value="allUser">All User</option>
                                <option value="newUser">New User</option>
                            </select>
                            <select
                                name="timeType"
                                value={formData.timeType}
                                onChange={handleChange}
                                className="bg-GlobalGray text-center py-1 px-1 md:px-0 md:py-2 text-[10px] md:text-lg font-semibold w-full rounded-sm md:rounded-md focus:outline-none"
                            >
                                <option value="allTime">All Time</option>
                                <option value="oneTime">One Time</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-4 md:mt-9 my-6 md:my-10">
                            <div className="flex justify-center gap-4 items-center md:px-11">
                                <input
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                    className="w-full max-w-20 md:max-w-44 text-[12px] md:text-lg md:py-3 px-3 py-1 md:px-10 text-white rounded-sm md:rounded-md bg-GlobalDarkGray focus:outline-none"
                                />
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full md:py-3 px-3 py-1 text-[12px] md:text-lg md:px-10 text-white rounded-sm md:rounded-md bg-GlobalDarkGray focus:outline-none"
                                    placeholder="Campaign Title.."
                                />
                            </div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Campaign Description.."
                                className="focus:outline-none md:mx-11 p-1 md:py-3 md:text-lg md:px-10 focus:border-transparent text-white text-[10px] min-h-16 md:min-h-60 rounded-md bg-GlobalDarkGray"
                            ></textarea>
                        </div>
                        <div className="flex justify-between gap-1 w-full md:gap-5 md:w-1/2 md:ml-11">
                            <button type="button" onClick={handleSave} className="bg-green-500    transition duration-200 hover:bg-green-600 py-1 px-3 text-[10px] text-white tracking-wider font-medium md:text-xl rounded-sm md:rounded-md w-full">Save</button>
                            <button type="button" onClick={handleUpdate} className="bg-yellow-400 transition duration-200 hover:bg-yellow-600 py-1 px-3 text-[10px] text-white tracking-wider font-medium md:text-xl rounded-sm md:rounded-md w-full">Update</button>
                            <button type="button" onClick={handleDelete} className="bg-red-500    transition duration-200 hover:bg-red-600 py-1 px-3 text-[10px] text-white tracking-wider font-medium md:text-xl rounded-sm md:rounded-md w-full">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Promotion;
