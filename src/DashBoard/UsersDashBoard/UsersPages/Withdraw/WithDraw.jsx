import { TfiReload } from "react-icons/tfi";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import Amount from "../Amount/Amount";
import { AuthContext } from "../../../../Authentication/Authentication";
import { useContext, useState } from "react";

const WithDraw = () => {
  const { userTransationOption} = useContext(AuthContext)
  userTransationOption('withdraw')

  const [isRotating, setIsRotating] = useState(false);
  const [balance, setBalance] = useState(0);

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };


  return (
    <div>
      {/* <div className="bg-DarkGreen w-full h-28 relative px-4 py-2">
        <div className="flex justify-start text-white text-sm items-center gap-1.5">
          <h1 className="pt-1">Main Wallet</h1>
          <svg className={`mt-1 ${isRotating ? 'rotate-animation' : ''}`} onClick={handleClick} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15" height="15" viewBox="0 0 30 30">
            <path fill="white" d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
          </svg>
        </div>
        <h1 className="flex h-1/2 justify-end items-end text-5xl font-semibold text-white">{balance}</h1>
      </div> */}
      <PaymentMethod number={3} />
      <div className="mt-2">
        <Amount number={8} withdraw='withdraw' />
      </div>
    </div>
  );
};

export default WithDraw;
