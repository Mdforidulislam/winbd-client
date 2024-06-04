import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../Authentication/Authentication";
import Title from "../../../../Components/Titile/Title";
import '../style.css';

const DepositeChennel = () => {
    const [depositeChanel, setDepositeChanel] = useState("cashout");
    const { slectedPayment, userDepositeChanel } = useContext(AuthContext);

    // Update user deposite channel in context whenever it changes
    useEffect(() => {
        if (depositeChanel) {
            userDepositeChanel(depositeChanel);
        }
    }, [depositeChanel, userDepositeChanel]);

    // Set default deposit channel to the first item in the selectedPayment array
    useEffect(() => {
        if (slectedPayment.length > 0) {
            setDepositeChanel(slectedPayment[0]);
        }
    }, [slectedPayment]);

    return (
        <div className="bg-GlobalDarkGray px-4 py-4 bottom-to-top">
            <Title text="Deposite Chennel" />
            <div className="flex gap-3 justify-start py-3 my-2 border border-gray-400 border-x-transparent border-b-transparent border-t-1">
                {slectedPayment && slectedPayment.map((item, index) => (
                    <button
                        key={index}
                        className={`relative border py-2 px-3 rounded-sm ${depositeChanel === item ? 'text-CustomYellow border-[#FFE43C] border ' : 'text-white'} hover:border-[#FFE43C] capitalize text-[13px]`}
                        onClick={() => setDepositeChanel(item)}
                    >
                        {item}
                        {depositeChanel === item && (
                            <>
                                <div className="triangle h-4 w-5 flex justify-center items-center bg-CustomYellow absolute bottom-0 right-0"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="absolute bottom-0 right-[2px] text-black">
                                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                </svg>
                            </>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DepositeChennel;
