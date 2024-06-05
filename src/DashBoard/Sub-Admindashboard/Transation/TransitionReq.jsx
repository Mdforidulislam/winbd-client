import React, {  useState } from 'react';

import DepositeTable from './TransitoinReqtabs/DepositeTable';
import Withdraw from './TransitoinReqtabs/Withdraw';
import Verify from './TransitoinReqtabs/Verify';
// import VerifyTable from './TransitoinReqtabs.jsx/VerifyTable';

const tabs = [
  { id: 1, label: 'Deposit', component: <DepositeTable /> },
  { id: 2, label: 'Withdraw', component: <Withdraw /> },
  { id: 3, label: 'Verify', component: <Verify /> },
  // { id: 4, label: 'History', component: <TransitionHistory /> }
];

const TransitionReq = () => {
const [activeTab, setActiveTab] = useState(1); // Default active tab index
  // handle the tab action here
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="md:mx-4 md:my-8 bg-GlobalDarkGray">
      
      <div className="flex py-2 gap-2 md:gap-20 px-2 justify-center">
        <div className="tab-container ">
          <input type="radio" name="tab" id="tab1" className="tab tab--1" />
          <label onClick={() => handleTabClick(1)} className="tab_label" htmlFor="tab1">Deposit</label>

          <input type="radio" name="tab" id="tab2" className="tab tab--2" />
          <label onClick={() => handleTabClick(2)} className="tab_label" htmlFor="tab2">Withdraw</label>

          <input type="radio" name="tab" id="tab3" className="tab tab--3" />
          <label onClick={() => handleTabClick(3)} className="tab_label" htmlFor="tab3">Verify</label>

          <div className="indicator"></div>
        </div>

      </div>

      {/* Render active tab content */}
      <div className="mt-2 md:mt-6 max-w-5xl mx-auto">
        {tabs.map(tab => (
          <div key={tab.id} className={`${activeTab === tab.id ? 'block' : 'hidden'}`}>
            {tab.component}
          </div>
        ))}
      </div>
    </div >
  );
};

export default TransitionReq;
