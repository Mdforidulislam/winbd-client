import React, { useState } from "react";
import AgentNumber from "./NumberPages/AgentNumber";
import PaymentNumber from "./NumberPages/PaymentNumber";
import PersonalNumber from "./NumberPages/PersonalNumber";
import { FromCreadiencial } from "../../../Components/Shared/FromCreadientCial";


const tabs = [
    { id: 1, label: 'Agent Number', component: <AgentNumber />, paymentType: 'cashout' },
    { id: 2, label: 'Payment Number', component: <PaymentNumber />, paymentType: 'payment' },
    { id: 3, label: 'Personal Number', component: <PersonalNumber />, paymentType: 'sendmony' },
];


const AddNumberPage = () => {
    const [activeTab, setActiveTab] = useState(1); // Default active tab index

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };


    return (
        <div className="bg-GlobalDarkGray md:py-2">
            <div className="flex justify-center py-2 gap-2 md:gap-20 px-2">
                <div className="tab-containerrr">
                    <input type="radio" name="tab" id="tab1" className="tabbb tab--11" />
                    <label onClick={() => handleTabClick(1)} className="tab_labelll" htmlFor="tab1">Agent Number</label>

                    <input type="radio" name="tab" id="tab2" className="tabbb tab--22" />
                    <label onClick={() => handleTabClick(2)} className="tab_labelll" htmlFor="tab2">Payment Number</label>

                    <input type="radio" name="tab" id="tab3" className="tabbb tab--33" />
                    <label onClick={() => handleTabClick(3)} className="tab_labelll" htmlFor="tab3">Personal Number</label>

                    <div className="indicatorrr"></div>
                </div>
            </div>

            {/* Render active tab content */}
            <div className="mt-2 md:mt-5  mx-auto">
                {tabs.map(tab => (
                    <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
                        {/* Pass activeTab as a prop */}
                        {React.cloneElement(tab.component, { paymentType: tab.paymentType, activeTab: activeTab })}
                    </div>
                ))}
            </div>
            {/*  add creadientcial info */}
            <div>
               <FromCreadiencial/>
            </div>
        </div >
    );
};

export default AddNumberPage;