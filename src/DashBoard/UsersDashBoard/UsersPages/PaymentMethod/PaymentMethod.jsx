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
    <div className="bg-GlobalDarkGray px-4 py-4">
      {/* payment method history */}
      <Title text={'payment Method'} />
      <div className="w-full grid grid-cols-3 gap-2 border border-t-1 border-x-transparent border-b-dotted border-gray-400 py-3 my-2">
        {method?.slice(0, number).map((item, index) => (
          <div
            key={index}
            onClick={() => setPaymentType(item.title)}
            className={`${paymentType === item?.title ? 'relative border-CustomYellow border text-Customborder-CustomYellow rounded-sm flex w-full h-full items-center justify-center' : 'border border-gray-400 rounded-sm flex w-full h-full items-center justify-center hover:border-CustomYellow '}`}
          >
            <div className=" py-1.5 relative h-full w-full flex flex-col justify-center items-center">
              <img width={20} height={22} src={item?.img} alt="" />

              <h1 onClick={() => setPaymentType(item?.title)} className="text-white mt-1 hover:text-Customborder-CustomYellow text-[10px] capitalize">{item?.title}</h1>
              {optionValue === 'এক্সট্রা ১.৫% ডিপোজিট বোনাস' ?
                <div className="absolute top-0.5 -right-0.5">
                  <Discount />
                </div> : null
              }
              <div className={`${paymentType === item?.title ? 'triangle h-4 w-5 flex justify-center items-center bg-CustomYellow absolute bottom-0 right-0' : 'hidden'}`}>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className={`${paymentType === item?.title ? 'absolute bottom-0 right-[2px]' : 'hidden'}`}>
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
              </svg>

            </div>
          </div>
        ))}

      </div>

      {activeTab !== 'withdraw' && (
        <button className="text-black text-[12px] px-10 rounded-[4px] py-2 capitalize bg-CustomYellow">
          {paymentType} payment
        </button>
      )}
    </div>
  );
};

export default PaymentMethod;
