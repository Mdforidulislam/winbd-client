import React, { useContext } from 'react';
import './style.css';
import { AuthContext } from '../../../../../Authentication/Authentication';

const Discount = () => {
  const { discount } = useContext(AuthContext);

  const isValidDiscount = !isNaN(parseFloat(discount)) && parseFloat(discount) > 1;

  return (
    <div className={`${isValidDiscount ? "discount-badge rounded-r-[3px] " : "hidden"}`}>
      <span className={`${isValidDiscount ? "discount-badge-text tracking font-sans " : "hidden"}`}>+{discount}%</span>
    </div>
  );
};

export default Discount;
