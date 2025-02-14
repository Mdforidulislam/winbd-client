import axios from 'axios';
import React, { useState } from 'react';

const PaymentInstruction = () => {
    const [formData, setFormData] = useState({
        startTitle: '',
        listItems: ['', '', '', ''],
        endTitle: '',
        type: '',  // Add type for cashOut and sendMoney
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleListChange = (index, value) => {
        const newListItems = [...formData.listItems];
        newListItems[index] = value;
        setFormData({
            ...formData,
            listItems: newListItems,
        });
    };

    const addListItem = () => {
        setFormData({
            ...formData,
            listItems: [...formData.listItems, ''],
        });
    };

    const removeListItem = (index) => {
        const newListItems = formData.listItems.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            listItems: newListItems,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://server.win-pay.xyz/insertPayInstraction', formData);
            const finalData = await response.data;

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-gray-900 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-white">Payment Instructions</h1>
            <form onSubmit={handleSubmit}>
                {/* Type Selection */}
                <div className="mb-4">
                    <label className="block text-white">Select Type</label>
                    <select 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 rounded-lg mt-1 text-white bg-gray-800 focus:outline-none border-none"
                    >
                        <option value="">Select an option</option>
                        <option value="cashout">Cash Out</option>
                        <option value="sendmoney">Send Money</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-white">Start Title</label>
                    <input 
                        type="text" 
                        name="startTitle" 
                        value={formData.startTitle} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 rounded-lg mt-1 text-white bg-gray-800 focus:outline-none border-none"
                    />
                </div>
                {
                    formData.listItems.map((item, index) => (
                        <div key={index} className="mb-4 flex items-center">
                            <div className="flex-grow">
                                <label className="block text-white">List Number {index + 1}</label>
                                <input 
                                    type="text" 
                                    name={`listItem${index}`} 
                                    value={item} 
                                    onChange={(e) => handleListChange(index, e.target.value)} 
                                    className="w-full px-3 py-2 rounded-lg mt-1 text-white bg-gray-800 focus:outline-none border-none"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() => removeListItem(index)}
                                className="ml-4 mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                }
                <div className="mb-4 text-center">
                    <button 
                        type="button" 
                        onClick={addListItem} 
                        className="bg-[#17936C] text-white py-2 px-4 rounded-lg hover:bg-[#127354] transition duration-200"
                    >
                        Add Item
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-white">Ending Title</label>
                    <input 
                        type="text" 
                        name="endTitle" 
                        value={formData.endTitle} 
                        onChange={handleChange} 
                        className="w-full px-3 py-2 rounded-lg mt-1 text-white bg-gray-800 focus:outline-none border-none"
                    />
                </div>
                <div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#17936C] text-white py-2 px-4 rounded-lg hover:bg-[#127354] transition duration-200"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PaymentInstruction;
