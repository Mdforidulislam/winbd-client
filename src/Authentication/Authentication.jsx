
import { createContext, useEffect, useState } from "react";
import saveUserInfoLocalStore from "./saveUserDataLocal";
import getLocalUserData from "./getLocalStore";
import toast from "react-hot-toast";

export const AuthContext = createContext(null);

const Authentication = ({ children }) => {

  const [userInfo, setUserInfo] = useState(getLocalUserData()) // store the value for user athutication 
  const [role, setRole] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [amount, setAmount] = useState(0);
  const [channel, setChannel] = useState('');
  const [type, setType] = useState('');
  const [stoeObject, setStoreObject] = useState({});
  const [modalAction, setModalaction] = useState(true); // set for all the modal action 
  const [registerInfo, setRegisterInfo] = useState({});
  const [error, setError] = useState('');//error
  const [userSearchData, setUserSearchData] = useState([]); // set users search data history data here 
  const [optionValue, setOptionValue] = useState('এক্সট্রা ১.৫% ডিপোজিট বোনাস'); // set the promotion opton set here 
  const [rediectionDW, setrediectionDW] = useState('');
  const [activeTab, setActiveTab] = useState('deposit');
  const [slectedPayment, setSlectedPayment] = useState([]); // selected channel payemnt mehtod 
  const [selectedFilters, setSelectedFilters] = useState([]); // 
  const [discount, setDiscount] = useState(); // set discount from promotion offer 
  const [reload, setReload] = useState(null); // set reload here 
  const [requestFilterId, setRequestFilterId] = useState(); // set the transaction request  status id could be update or approve or rejected 
  const [newVersion, setNewVersion] = useState(null);

  // ----------------------- browser issue fix ----------------------------------
  const CASH_KEY = 'APP_VERSION';

  useEffect(() => {
    const checkVersion = async () => {
      try {
        // Fetch the version from the public folder
        const response = await fetch('/version.json');
        const data = await response.json();
        
        const version = data.version;
        setNewVersion(version);

        // Retrieve stored version from localStorage
        const storedVersion = localStorage.getItem(CASH_KEY);

        if (storedVersion && storedVersion !== version) {
          clearCacheAndReload();
        }

        // Store the new version in localStorage for future checks
        localStorage.setItem(CASH_KEY, version);

      } catch (error) {
        console.error('Error checking app version:', error);
      }
    };

    // Call the check version function on component mount
    checkVersion();
  }, []);

  const clearCacheAndReload = () => {
    if ('caches' in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cache) => {
          caches.delete(cache); // Delete all caches
        });
      });
    }

    // Force reload to ensure the latest version is fetched after clearing the cache
    window.location.reload(true);
  };

  //==================== ahutentication data ============================ 

  const loginUserNamePassword = async (userName, password) => {
    try {
      const res = await fetch(`https://server.win-pay.xyz/userValidation?userName=${userName}&password=${password}`);
      const data = await res.json();
      console.log('response after login', data.message,data);

      if (data.message) {
        toast.error("username & password didn't match")
      }
      if (data.role) {
        setRole(data.role);
        const uniqueId = data.uniqueId;
        const authorId = data.authorId;
        const role = data?.role;
        saveUserInfoLocalStore(userName, password, uniqueId, authorId,role);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('An error occurred while logging in. Please try again.');
    }
  };

  // =============================== byDefault store value authenticatio =========================== 

  useEffect(() => {
    const fetchData = async () => {
      try {
       if(userInfo.role){
          const res = await fetch(`https://server.win-pay.xyz/userValidation?userName=${userInfo.userName}&password=${userInfo.password}`);
          const data = await res.json()
          setRole(data?.role)
          setRegisterInfo(data)
        }
        // console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userInfo.userName, userInfo.password,userInfo.role]);

  // ---------------------------- ednd here ----------------------------
  // console.log(registerInfo);
  // console.log(userInfo.userName, userInfo.password);


  // ============================ userTrnsation Info Store =================================
  // Initialize state for transaction information



  const userTransationOption = (type) => {
    setType(type);
  }

  // geting user PaymentMethod 
  const userPaymentMehtod = (payment) => {
    setPaymentMethod(payment)
  }

  // userDeopsiteChanel info

  const userDepositeChanel = (chanel) => {
    setChannel(chanel)
  }

  // userAount Need 
  const userAmountInfo = (amount) => {
    setAmount(amount)
  }

  // handle action here for save data to the localsoter for geting next page 

  const handleAction = (amount) => {
    const transationInfo = {
      paymentMethod,
      amount,
      channel,
      type
    }

    if (amount === 0) {
      setError('please selete some of amount');
    }
    if (amount <= 200) {
      setError('Please select amount more than 25000');
    }
    if (amount > 25000) {
      setError('Please select amount between 200 - 25000');
    }

    setStoreObject(transationInfo)
    const convertSringfy = JSON.stringify(transationInfo);
    localStorage.setItem('userTransaction', convertSringfy);
    console.log(transationInfo);
  }



  // context provide value 
  const authInfo = {
    loginUserNamePassword,
    role,
    userTransationOption,
    userPaymentMehtod,
    userDepositeChanel,
    userAmountInfo,
    handleAction,
    stoeObject,
    setModalaction,
    modalAction,
    setRole,
    error,
    channel,
    setUserSearchData,
    userSearchData,
    setOptionValue,
    optionValue,
    setrediectionDW,
    activeTab,
    setActiveTab,
    paymentMethod,
    setSlectedPayment,
    slectedPayment,
    selectedFilters, 
    setSelectedFilters,
    setDiscount,
    discount,
    reload,
    setReload,
    setRequestFilterId,
    requestFilterId
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default Authentication;
