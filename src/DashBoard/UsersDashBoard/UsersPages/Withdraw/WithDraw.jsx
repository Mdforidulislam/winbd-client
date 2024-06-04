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
      <PaymentMethod number={3} />
      <div className="mt-2">
        <Amount number={8} withdraw='withdraw' />
      </div>
    </div>
  );
};

export default WithDraw;
