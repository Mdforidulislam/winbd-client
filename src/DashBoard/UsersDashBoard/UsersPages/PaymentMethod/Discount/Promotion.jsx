import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaAngleDown } from "react-icons/fa";
import { AuthContext } from '../../../../../Authentication/Authentication';
import './style.css'; // Import the style for better code organization

const truncateText = (text, limit) => {
    const words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
};

const Promotion = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [promotion, setPromotion] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const { setDiscount } = useContext(AuthContext);

    const handleOptionClick = (item) => {
        setSelectedOption(item.title);
        setDiscount(item.percentTage);
        setDropdownVisible(false);
    };

    useEffect(() => {
        const getPromotionValue = async () => {
            try {
                const userData = localStorage.getItem("userData");
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    const userName = parsedUser?.userName;
                    if (userName) {
                        const response = await axios.get(`https://server.win-pay.xyz/promotionOfferShow?userName=${userName}`);
                        const promotionData = response.data;
            
                        setPromotion(promotionData);
                        if (promotionData?.length > 0) {
                            handleOptionClick(promotionData[0]);
                        }
                    } else {
                        console.error("UserName is not found in the localStorage data.");
                    }
                } else {
                    console.error("No user data found in localStorage.");
                }
            } catch (error) {
                console.error("Error fetching promotion value:", error);
            }
        };

        getPromotionValue();
    }, []);

    useEffect(() => {
        if (selectedOption) {
            localStorage.setItem('promotion', selectedOption);
        }
    }, [selectedOption]);

    return (
        <div className="bg-LightGreen h-full w-full pt-4 py-3 flex justify-between items-center px-2 relative">
            <div className="flex items-center gap-1.5">
                <img
                    className="w-4"
                    src="https://img.b112j.com/bj/h5/assets/images/icon-set/icon-selectpromotion.svg?v=1715679064603"
                    alt="Select promotion"
                />
                <p className="text-white text-[13px]">Select promotion</p>
            </div>

            <div className="relative">
                <button className="button flex justify-center items-center" onClick={() => setDropdownVisible(!dropdownVisible)}>
                    <h1 className='text-sm'>{selectedOption || (promotion[0] && truncateText(promotion[0].title, 5)) || "No promotions available"}</h1>
                    <FaAngleDown className="ml-2" />
                </button>
                {dropdownVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-inputlartBg border border-inputlartBg rounded shadow-lg z-10">
                        {promotion.length > 0 ? (
                            promotion.map((item,index) => (
                                <div key={index}>
                                    <a
                                        onClick={() => handleOptionClick(item)}
                                        className="block px-4 py-2 text-LightGreen hover:bg-gray-200 cursor-pointer"
                                    >
                                        {truncateText(item.title, 5)}
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-2 text-gray-800">No promotions available</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Promotion;
