import { useContext, useState } from "react";
import Amount from "../Amount/Amount";
import DepositeChennel from "../DepositeChanel/DepositeChennel";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import { AuthContext } from "../../../../Authentication/Authentication";
import { FaAngleDown } from "react-icons/fa";
const truncateText = (text, limit) => {
    const words = text.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
};
const Desposite = () => {
    const { userTransationOption } = useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState("এক্সট্রা ১.৫% ডিপোজিট বোনাস");
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    userTransationOption('deposite')

    return (
        <div className="">
            <div className="bg-[#36BC8B] h-full w-full pt-4 py-3 flex justify-between items-center px-2 relative">
                <div className="flex items-center gap-1.5 ">
                    <img
                        className="w-4"
                        src="https://img.b112j.com/bj/h5/assets/images/icon-set/icon-selectpromotion.svg?v=1715679064603"
                        alt="Select promotion"
                    />
                    <p className="text-white text-[13px]">Select promotion</p>
                </div>

                <div className="paste-button">
                    <button className="button flex justify-center items-center">
                        {truncateText(selectedOption, 4)} <FaAngleDown className='ml-1' />
                    </button>
                    <div className="dropdown-content">
                        <a onClick={() => handleOptionClick("১০০% রিফান্ড বোনাস")}>১০০% রিফান্ড বোনাস</a>
                        <a onClick={() => handleOptionClick("৫০% স্পোর্টস রিফান্ড")}>৫০% স্পোর্টস রিফান্ড</a>
                        <a onClick={() => handleOptionClick("স্লট ও ফিশিং-এ ১০০% বোনাস")}>স্লট ও ফিশিং-এ ১০০% বোনাস</a>
                        <a onClick={() => handleOptionClick("২৫% লাইভ ক্যাসিনো & টেবিল ক্যাশব্যাক")}>২৫% লাইভ ক্যাসিনো & টেবিল ক্যাশব্যাক</a>
                        <a onClick={() => handleOptionClick("৮১০,০০০ লাইভ ক্যাসিনো & টেবিল গেম")}>৮১০,০০০ লাইভ ক্যাসিনো & টেবিল গেম</a>
                        <a onClick={() => handleOptionClick("৮১০,০০০ স্লট এবং ফিশিং রিলোড বোনাস")}>৮১০,০০০ স্লট এবং ফিশিং রিলোড বোনাস</a>
                    </div>
                </div>
            </div>
            <div className="mt-2"><PaymentMethod /></div>
            <div className="mt-3"><DepositeChennel /></div>
            <div className="mt-3"> <Amount deposite="deposite" /></div>
        </div>
    );
};

export default Desposite;