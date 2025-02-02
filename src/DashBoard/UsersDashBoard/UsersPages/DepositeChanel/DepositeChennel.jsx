import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../Authentication/Authentication";
import Title from "../../../../Components/Titile/Title";
import '../style.css';

const DepositeChennel = () => {
    const [depositeChanel, setDepositeChanel] = useState("cashout");
    const { slectedPayment, userDepositeChanel, activeTab ,paymentMethod } = useContext(AuthContext);

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



    const order = ['cashout', 'sendmony', 'payment'];
    const sortedPayment = slectedPayment.sort((a, b) =>{

        return  order.indexOf(a) - order.indexOf(b)

    });


    return (
        <div className="bg-[#343333] h-auto pt-3 pb-4 px-3">
            <Title text="Deposite Chennel" />
            <div className="flex gap-3 justify-start pt-[11px] mt-2 border border-gray-400 border-opacity-30 border-x-transparent border-b-transparent border-t-1">
                {sortedPayment && sortedPayment.map((item, index) => (
                    <button
                        key={index}
                        className={`relative border pt-[4px] pb-[7px] px-3 rounded-sm ${depositeChanel === item ? 'text-CustomYellow border-[#FFE43C] border ' : 'text-white'} hover:border-[#FFE43C] text-[12.5px]`}
                        onClick={() => setDepositeChanel(item)}
                    >
                        <div className={`${item === sortedPayment[0] ? 'absolute h-[14px] w-[14px] rounded-[2px] left-0 top-1 bg-green-500 px-[2px] pt-[1px] pb-[3px]' : 'hidden'} `}>
                            <img className="h-full w-full object-contain" src="https://img.b112j.com/bj/h5/assets/images/icon-set/icon-recommond.svg?v=1716890719883" alt="" />
                        </div>
                        {item === 'cashout' ? 'CashOut' : item === 'sendmony' ? 'Send Money' : item === 'payment' ? 'Payment' : item}
                        {depositeChanel === item && (
                            <>
                                <div className="triangle h-[1rem] w-[1.25rem] flex justify-center items-center bg-CustomYellow absolute bottom-0 right-0"></div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="0.625rem" height="0.625rem" viewBox="0 0 24 24" fill="currentColor" className="absolute bottom-0 right-[0.125rem] text-black">
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
