import { useContext, useState } from "react";
import Amount from "../Amount/Amount";
import DepositeChennel from "../DepositeChanel/DepositeChennel";
import PaymentMethod from "../PaymentMethod/PaymentMethod";
import Promotion from "../PaymentMethod/Discount/Promotion";
import { AuthContext } from "../../../../Authentication/Authentication";


const Desposite = () => {
    const { userTransationOption } = useContext(AuthContext)
    userTransationOption('deposite')

    return (
        <div className="">
            <div><Promotion/></div>
            <div className="mt-2"><PaymentMethod /></div>
            <div className="mt-2"><DepositeChennel /></div>
            <div className="mt-2"> <Amount deposite="deposite" /></div>
        </div>
    );
};

export default Desposite;