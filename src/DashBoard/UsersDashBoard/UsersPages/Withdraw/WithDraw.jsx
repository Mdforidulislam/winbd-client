import { TfiReload } from "react-icons/tfi";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import Amount from "../Amount/Amount";
import { AuthContext } from "../../../../Authentication/Authentication";
import { useContext, useState } from "react";

const WithDraw = () => {
  const { userTransationOption } = useContext(AuthContext)
  userTransationOption('withdraw')

  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };


  return (
    <div className="min-h-screen flex flex-col">
      <div className="mt-2 flex-shrink-0">
        <PaymentMethod number={3} />
      </div>
      <div className="mt-2">
        <Amount withdraw='withdraw' />
      </div>
    </div>
  );
};

export default WithDraw;
