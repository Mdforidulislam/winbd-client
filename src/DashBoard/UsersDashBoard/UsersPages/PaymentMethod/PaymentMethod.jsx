import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Authentication/Authentication";
import Discount from "./Discount/Discount";
import Title from "../../../../Components/Titile/Title";

const PaymentMethod = ({ number }) => {
  const [method, setMehod] = useState([]); // store the all paymentmethod use for show data
  const [paymentType, setPaymentType] = useState('bkash');
  // console.log(paymentType);
  const { userPaymentMehtod, optionValue, activeTab } = useContext(AuthContext); // call the context api 

  userPaymentMehtod(paymentType); // send the payment method

  //   set the payementod
  useEffect(() => {
    localStorage.setItem('payMethod', JSON.stringify(paymentType))
  }, [paymentType]);


  useEffect(() => {
    fetch("/method.json")
      .then((res) => res.json())
      .then((data) => setMehod(data));
  }, []);

  return (
    <div className="bg-[#343333] h-auto pt-3 pb-4 mt-1.5 px-3">
      {/* payment method history */}
      <Title text={'payment Method'} />
      <div className="w-full grid grid-cols-3 gap-[10px] border border-t-[0.0625rem] border-x-transparent border-b-transparent border-gray-400 border-opacity-30 py-[11px] mt-2">
        {method?.slice(0, number).map((item, index) => (
          <div
            key={index}
            onClick={() => setPaymentType(item.title)}
            className={`py-[7%] ${paymentType === item?.title ? 'relative border-CustomYellow border text-Customborder-CustomYellow rounded-[0.1875rem] flex w-full h-full items-center justify-center' : 'border border-gray-400 border-opacity-50 rounded-sm flex w-full h-full items-center justify-center hover:border-CustomYellow '}`}
          >
            <div className="relative h-full w-full flex flex-col justify-center items-center">
              <div className={`h-[1.6rem] w-[4.5rem]`}>
                <img
                  className={`h-full w-full ${item?.title === 'surecash' ? 'object-cover' : 'object-contain'}`}
                  src={item?.img}
                  alt=""
                />
              </div>

              <h1 onClick={() => setPaymentType(item?.title)} className={`${paymentType === item?.title ? 'text-CustomYellow' : 'text-white'} mt-1 hover:text-Customborder-CustomYellow text-[0.820rem]`}>{item?.title === 'bkash' ? 'bKash' : item?.title === 'rocket' ? 'Rocket' : item?.title === 'nogod' ? 'Nagad' : item?.title === 'upay' ? 'Upay' : item?.title === 'surecash' ? 'SureCash' : item?.title === 'okwallet' ? 'OKWallet' : item?.title}</h1>

              {optionValue === 'এক্সট্রা ১.৫% ডিপোজিট বোনাস' && activeTab === 'deposit' && (
                <div className="absolute -top-[5px] -right-[3px]">
                  <Discount />
                </div>
              )}
            </div>
            <div className={`${paymentType === item?.title ? 'triangle h-[1rem] w-[1.25rem] flex justify-center items-center bg-CustomYellow absolute bottom-0 right-0' : 'hidden'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="0.625rem" height="0.625rem" viewBox="0 0 24 24" fill="currentColor" className={`${paymentType === item?.title ? 'absolute bottom-0 right-[0.125rem]' : 'hidden'}`}>
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <hr className={`${activeTab === 'deposit' ? 'border-b border-x-transparent border-t-transparent border-dotted border-gray-400 mb-3' : 'hidden'}`} />

      {
        activeTab !== 'withdraw' && (
          <button className="text-black text-[0.75rem] px-[2rem] rounded-[0.15rem] py-2 bg-CustomYellow">
            {paymentType === 'bkash' ? 'bKash' : paymentType === 'rocket' ? 'Rocket' : paymentType === 'nogod' ? 'Nagad' : paymentType === 'upay' ? 'Upay' : paymentType === 'surecash' ? 'SureCash' : paymentType === 'okwallet' ? 'OKWallet' : paymentType} payment
          </button>
        )
      }
    </div >
  );
};

export default PaymentMethod;
