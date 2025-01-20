import React, {   useState } from 'react';
import { IoReloadSharp } from "react-icons/io5";
import './style.css'

import DepositeTable from './TransitoinReqtabs/DepositeTable';
import WithDrawTalbe from './TransitoinReqtabs/Withdraw';
import VerifyTab from './TransitoinReqtabs/Verify';


const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
};



const TransitionReq = () => {
  const [activeTab, setActiveTab] = useState(1); // Default active tab index

  const [uniqueValue, setUniqueValue] = useState();
  const [isRotating, setIsRotating] = useState(false);
  // const [authoreId, setAuthorId] = useState(); 
  // const [dependenciy, setDependencity] = useState();
  // const [transType, setTransType] = useState();
  

//      // Retrieve userId from localStorage and set it in the context
// useEffect(() => {
//   const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
//   setUniqueId(authurId);
  
// }, []);



// useEffect(() => {
//   if (!uniqueId) return;

//   WebSocketInstance.connect();

//   WebSocketInstance.waitForSocketConnection(() => {
//       const message = { type: 'join', userId: uniqueId };
//       WebSocketInstance.sendMessage(message);
//   });

//   WebSocketInstance.addCallbacks('new_transaction', (data) => {
//       const StingData = JSON.stringify(data?.transInfo?.authorId);
//       const StingDataType = JSON.stringify(data?.transInfo?.transactionType);
//       if (StingData && StingDataType) {
//           localStorage.setItem('transactionRequestResponse', StingData)
//           localStorage.setItem('transReqReseType', StingDataType)
//       }
      
//       setDependencity(data);
//       console.log('New transaction data:', data);
//       // Handle the new transaction data
//       // For example, update the state to display the new transaction
//   });

//   return () => {
//       WebSocketInstance.socketRef.close();
//   };
// }, [uniqueId,activeTab]);




// useEffect(() => {
//   const transactionReqGetingAuthorId = localStorage.getItem('transactionRequestResponse');
//   const AuthordIdPars = JSON.parse(transactionReqGetingAuthorId);
//   const transTypeData = localStorage.getItem('transReqReseType');
//   const transTypePars = JSON.parse(transTypeData);
//   setTransType(transTypePars);
//   setAuthorId(AuthordIdPars);

// }, [dependenciy])
  
  
const hanldReloadAction = () => {
  const newUniqueId = generateUniqueId();
  setUniqueValue(newUniqueId);
  setIsRotating(true);
  setTimeout(() => {
      setIsRotating(false);
  }, 3000);
  
  }
  

  
const tabs = [
  { id: 1, label: 'Deposit', component: <DepositeTable  tab='deposite' uniqueValue={uniqueValue} /> },
  { id: 2, label: 'Withdraw', component: <WithDrawTalbe tab='withdraw' uniqueValue={ uniqueValue} /> },
  { id: 3, label: 'Verify', component: <VerifyTab activeTab='verify' uniqueValue={uniqueValue}  />},
];



  // handle the tab action here
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  

  return (
    <div className="md:mx-4 md:my-8 bg-GlobalDarkGray">
      
      <div className=" block md:flex  py-2 gap-2 md:gap-20 px-2 justify-center items-center">
      <div onClick={hanldReloadAction} className='flex justify-center items-center h-full cursor-pointer'>
            <span className={`text-2xl text-white ${isRotating ? 'rotate' : ''}`}>
                <IoReloadSharp />
            </span>
        </div>
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
