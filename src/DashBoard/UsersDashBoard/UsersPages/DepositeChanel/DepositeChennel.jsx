import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../Authentication/Authentication";
import Title from "../../../../Components/Titile/Title";
import '../style.css';

const DepositeChennel = () => {
    // Accessing context values
    const [depositeChanel, setDepositeChanel] = useState();

    const { slectedPayment, userDepositeChanel } = useContext(AuthContext);

    // Initialize state with the first value of the selectedPayment array

    // Effect to handle updates to depositeChanel
    useEffect(() => {
        userDepositeChanel(depositeChanel); // send data with API context
    }, [depositeChanel, userDepositeChanel]);

    //  bydefault selted the value here 

    useEffect(() => {
        setDepositeChanel(slectedPayment[0])
    },[slectedPayment])

  console.log(slectedPayment, depositeChanel, 'check the payment syste');
    return (
        <div className="bg-GlobalDarkGray px-4 py-4 bottom-to-top">
            <Title text="Deposite Chennel" />
            <div className="flex gap-3 justify-start py-3 my-2 border border-gray-400 border-x-transparent border-b-transparent border-t-1">
                {slectedPayment && slectedPayment.map((item) => (
                    <button
                        key={item._id}
                        className={`relative border py-2 px-3 rounded-sm ${depositeChanel === item ? 'text-CustomYellow' : 'text-white'} hover:border-[#FFE43C] capitalize text-[13px] ${depositeChanel === item ? 'border-[#FFE43C] border text-[#FFE43C]' : ''}`}
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
