import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Authentication/Authentication";
import { BsInfoCircleFill } from "react-icons/bs";
import "../style.css"
import axios from "axios";
import Title from "../../../../Components/Titile/Title";
import { TbCurrencyTaka } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "./Modal";
import toast, { Toaster } from "react-hot-toast";

const Amount = ({ number, withdraw, deposite }) => {

    const [amount, setAmount] = useState([]); // set the amount in here for send or selected
    const [sumAmount, setSumAmount] = useState(0);
    const [payInsList, setPayinsList] = useState({}); // set data for show list for suggestion item 
    const [customError, setCustomError] = useState('');
    const [isInteracted, setIsInteracted] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [requiredAmount, setRequiredAmount] = useState(false);
    const [localUser, setLocaluser] = useState({}); // get local user data
    const [localDat, setLocalData] = useState({}); // set data
    const [isProcessgcingMass, setIsProccessing] = useState('');// set the isProcessing validation
    const [availablePayment, setAvailbePayment] = useState(JSON.parse(localStorage.getItem('paymentMethods'))); // set the value here 
    const [isModalOpen, setIsModalOpen] = useState(false); // true the condtion 
    const [isFirstLoad, setIsFirstLoad] = useState(true); // fast load 
    const [findNode, setFindNode] = useState(null); // see all the node here 
    const [userPhoneNumber, setUserPhoneNumber] = useState();
    const [payMehtod, setPayMethod] = useState(''); // set the paymehtod bydefualt store
    const [selectedAmount, setSelectedAmount] = useState(null);

    const navigate = useNavigate();

    const { userAmountInfo, handleAction, error, channel, activeTab, paymentMethod, setSlectedPayment } = useContext(AuthContext); // recive the amount 
    userAmountInfo(sumAmount); // total sum of amount 

    //use Effects
    // ================= Error list
    useEffect(() => {
        if (!isInteracted) return;

        if (isNaN(sumAmount)) {
            setCustomError('Please enter a valid number');
        } else if (sumAmount <= 0) {
            setCustomError('Please select some amount');
        } else if (sumAmount < 200) {
            setCustomError('Please select an amount above 200');
        } else if (sumAmount > 25000) {
            if (channel === 'cashout') {
                setCustomError('Please select an amount less than or equal to 25000');
            } else {
                setCustomError('Please select an amount less than or equal to 10000');
            }
        } else if (channel !== 'cashout' && sumAmount > 10000) {
            setCustomError('Please select an amount between 200 and 10000');
        } else {
            setCustomError('');
        }
    }, [sumAmount, channel, isInteracted]);


    // ================= geting payMentTransaction data list
    useEffect(() => {
        const getingInsetData = async () => {
            const dataList = await axios.get(`https://sever.win-pay.xyz/getingPaymentInstraction`);
            setPayinsList(dataList.data.data);
        }
        getingInsetData()
    }, [])


    // ================= geting Amount===================
    useEffect(() => {
        fetch('/amount.json')
            .then(res => res.json())
            .then(data => {
                if (activeTab === 'deposit') {
                    if (channel === 'cashout') {
                        setAmount(data[0].cashout);
                    } else if (channel === 'sendmoney') {
                        setAmount(data[1].sendmoney);
                    } else if (channel === 'payment') {
                        setAmount(data[1].sendmoney);
                    }
                } else if (activeTab === 'withdraw') {
                    setAmount(data[2].withdraw);
                }
            });
    }, [channel, activeTab]);

    // =================== sum the amount here ===================
    //handle next button
    useEffect(() => {
        if (sumAmount) {
            console.log('access deposit value');
            if (activeTab === 'deposit') {
                if (sumAmount < 200 || sumAmount > 25000) {
                    setCustomError('Please select an amount above 200 or below 25000')
                    setRequiredAmount(false)
                } else {
                    setRequiredAmount(true)
                    setCustomError('')
                }
            } else if (activeTab === 'withdraw') {
                if (sumAmount < 500 || sumAmount > 25000) {
                    setCustomError('Please select an amount above 500 or below 25000')
                    setRequiredAmount(false)
                } else {
                    setRequiredAmount(true)
                    setCustomError('')
                }
            }
        }
    }, [sumAmount, activeTab])

    //  geting dall the info here


    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userData'));
        setLocaluser(userInfo);
    }, [])

    // geting submit data form localstore hre

    useEffect(() => {
        const getingSubmInfo = localStorage.getItem('userTransaction')
        const convertParsData = JSON.parse(getingSubmInfo)
        setLocalData(convertParsData)
    }, [])

    // access the data here all the api or object 

    const author = localUser?.authorId;
    const method = localDat?.paymentMethod || '';
    const userName = localUser?.userName;


    // geting paymethod from localstore
    useEffect(() => {
        const seltedPayment = JSON.parse(localStorage.getItem('payMethod'));
        setPayMethod(seltedPayment);
    }, [])
    console.log(paymentMethod);

    // ===================================== vaildation isProcessgcing and number channel ===========================
    useEffect(() => {
        // Check if all necessary data is available
        const fetchData = async () => {
            try {
                const response = await fetch(`https://sever.win-pay.xyz/showPaymentNumber?author=${author}&userName=${userName}`);
                const convert = await response.json();
                console.log(paymentMethod);
                if (convert?.processingMessage) {
                    setIsProccessing(convert?.processingMessage); // ispocessing transaction for vlidation message
                }
                if (convert?.paymentMethods.length > 0) {
                    setAvailbePayment(convert?.paymentMethods); // set the availabe the method validation 
                    const dataString = JSON.stringify(convert?.paymentMethods);
                    localStorage.setItem('paymentMethods', dataString); // set the data to database 
                    console.log(convert?.paymentMethods);
                }
                if (convert?.userPhoneNumber) {
                    setUserPhoneNumber(convert?.userPhoneNumber)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [author, userName, paymentMethod]);

    // next button here 
    const handleNextButtonClick = () => {
        setProcessing(true);
        setTimeout(() => {
            setProcessing(false);
            handleAction(sumAmount);

            if (isProcessgcingMass) {
                toast(isProcessgcingMass);
                return;
            }

            if (activeTab === 'deposit') {
                navigate('/profile/confirmpay');
            } else if (activeTab === 'withdraw') {
                navigate('/profile/confirmpay');
            }
        }, 500);
    };

    //  sum all the amount here 

    const handleSumAllAmount = (amount) => {
        setSumAmount(sumAmount + amount);
        setSelectedAmount(amount); // Set the selected amount
    }

    // handle th some amoun here 
    const onchangeHandleValue = (event) => {
        event.preventDefault();
        const newAmount = parseInt(event.target.value);
        if (withdraw) {
            setSumAmount(sumAmount);
        } else {
            if (!isNaN(newAmount)) {
                setSumAmount(newAmount);
            } else {
                setSumAmount(0);
            }
        }
        setIsInteracted(true);
    };



    //  find a node here 
    useEffect(() => {
        const findMatchingNode = () => {
            return availablePayment?.find(
                (item) =>
                    item.depositeChannel === channel &&
                    item.transactionMethod === paymentMethod
            );
        };

        const foundNode = findMatchingNode();

        setFindNode(foundNode);
        localStorage.setItem('userPhoneNumber', JSON.stringify(userPhoneNumber));
    }, [availablePayment, paymentMethod, channel, userPhoneNumber]);




    useEffect(() => {
        // Check if the payment method is included
        const isIncluded = availablePayment?.some(payment => payment.transactionMethod === paymentMethod || '');
        const findNumber = availablePayment?.find(item => item.transactionMethod === paymentMethod || '');
        const numberGeting = findNumber?.number;
        localStorage.setItem('authorPhoneNumber', JSON.stringify(numberGeting || ''));
        console.log(numberGeting);
        if (!isIncluded) {
            const timer = setTimeout(() => {
                // Prevent modal from opening on initial load
                if (!isFirstLoad) {
                    setIsModalOpen(true);
                }
                setIsFirstLoad(false); // Update after first load
            }, 600);

            // Clean up the timer if the component unmounts before the timer completes
            return () => clearTimeout(timer);
        } else {
            setIsModalOpen(false);
        }
    }, [availablePayment, paymentMethod, isFirstLoad]);



    // viwe channel mathod availble
    useEffect(() => {
        let channelList = [];
        const channelView = availablePayment?.forEach((item) => {
            if (item.transactionMethod === paymentMethod) {
                console.log('accesss');
                channelList.push(item?.depositeChannel)
            }

        });
        setSlectedPayment(channelList)
    }, [availablePayment, setSlectedPayment, paymentMethod]);

    console.log(isModalOpen);


    const resetSumAmount = () => {
        setSumAmount(0);
        setSelectedAmount(null);
        setCustomError('')
    };


    return (
        <div className="bg-[#343333] pt-3 pb-4  px-3">
            {/* Payment Method use here  */}
            <div>
                <div className="flex justify-between w-full items-center h-full pb-1.5">
                    <Title text={'Amount'} />
                    <div className="text-white/40 text-[10px]">
                        {
                            activeTab === 'deposit' ? (
                                channel === 'cashout' ? (
                                    <><span className="text-[12px]">৳</span> 500.00 - <span className="text-[12px]">৳</span> 25,000.00</>
                                ) : (
                                    <><span className="text-[12px]">৳</span> 200.00 - <span className="text-[12px]">৳</span> 10,000.00</>
                                )

                            ) : (
                                <><span className="text-[12px]">৳</span> 500.00 - <span className="text-[12px]">৳</span> 25,000.00</>

                            )
                        }

                    </div>
                </div>

                <div className="grid grid-cols-4 gap-[10px] pt-[11px] border border-gray-400 border-opacity-30 border-x-transparent border-b-transparent border-t-1">
                    {
                        amount.map((item, index) => (
                            <div key={index} className="rounded-[3px] border-[1.2px] border-gray-500/80 border-opacity-50 w-full h-full flex items-center justify-center hover:border-[#FFE43C] hover:text-[#FFE43C]">
                                <h1 onClick={() => handleSumAllAmount(item.amount)} className="hover:text-[#FFE43C] text-white w-full text-center py-[5.5px] pb-[6.5px] px-3 text-[11px]">{selectedAmount !== null ? (
                                    <span className='mr-1'>+</span>
                                ) : null}
                                    {item.amount === 1000 ? '1,000' : item.amount === 2000 ? '2,000' : item.amount === 3000 ? '3,000' : item.amount === 5000 ? '5,000' : item.amount === 10000 ? '10,000' : item.amount === 15000 ? '15,000' : item.amount === 20000 ? '20,000' : item.amount === 25000 ? '25,000' : item.amount}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Input File Here  */}

            <div className="relative mt-2">
                <input
                    className="w-full h-full py-3 px-3 bg-transparent text-right placeholder:text-left focus:outline-none text-[12px] text-DarkGreen border border-gray-400 border-opacity-30 border-x-transparent border-t-transparent"
                    value={sumAmount}
                    placeholder="$"
                    type="text"
                    onChange={onchangeHandleValue}
                    onClick={resetSumAmount}
                    readOnly
                />
                {customError && (
                    <div className="relative p-[6px] mt-3 rounded-sm bg-inputlartBg my-1">
                        <span className="text-alartColor text-md absolute left-3 top-[11px]"><BsInfoCircleFill /></span>
                        <p className="text-alartColor text-sm mb-1 ml-8">{customError}</p>
                    </div>
                )}
                {activeTab !== 'withdraw' && (
                    <TbCurrencyTaka className="absolute top-3.5 text-md left-2 text-DarkGreen" />
                )}
            </div>

            {/* Notification here  */}
            <div className="bg-notifyBlack border-[1px] border-DarkGreen/50 rounded-[4px] mt-2 mb-4 px-2 py-[11px]">
                {
                    activeTab === 'deposit' ? (
                        <div className="flex gap-2 h-full w-full">
                            <div>
                                <span className="text-white text-[13px]">
                                    <BsInfoCircleFill />
                                </span>
                            </div>
                            <div>
                                {findNode && (
                                    <div className="-mt-[1px]">
                                        {findNode.note?.title && (
                                            <p className="text-[11.5px] leading-[12.5px] tracking-tighter text-white">{findNode.note.title}</p>
                                        )}
                                        {findNode.note?.list && findNode.note.list.length > 0 && (
                                            <div className="flex flex-col">
                                                {findNode.note.list.map((item, index) => (
                                                    <p key={index} className="text-[11.5px] leading-[12.5px] tracking-tighter text-white">
                                                        <span className="font-medium mr-[2.4px]">
                                                            {index + 1}.
                                                        </span>
                                                        {item}
                                                    </p>
                                                ))}
                                            </div>
                                        )}

                                        {findNode.note?.remainder && (
                                            <p className="text-[11.5px] leading-[12.5px] tracking-tighter text-white">Reminder: <br /> {findNode.note.remainder}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div >
                    ) : (
                        <div className="flex gap-2 h-full w-full">
                            <div>
                                <span className="text-white text-[13px]">
                                    <BsInfoCircleFill />
                                </span>
                            </div>
                            <div>
                                {findNode && (
                                    <div className="">
                                        <h1 className="text-[11.5px] leading-[12.8px] tracking-[-0.04em] -mt-1 text-white">Reminder: <br />
                                            <span>1. Please double check the recipient's account details before procceding.</span><br />
                                            <span>2. DO NOT share your account with any one to avoid losing fund on money.</span><br />
                                            <span>2. Please make sure your bank account holder name and WinBD registered name should match to prevent from withdrawal rejection</span><br />
                                        </h1>
                                    </div>
                                )}
                            </div>
                        </div>

                    )
                }

            </div >

            {
                activeTab === 'withdraw' &&
                <div className="mt-2">
                    <Title text={'Phone Number'} />
                    <div className="border border-gray-400 border-opacity-90 my-2"></div>

                    {/* bg-[url('https://img.b112j.com/bj/h5/assets/images/player/bg-bankcard.png?v=1716890719883')] */}
                    <button className="relative w-full cursor-pointer text-white overflow-hidden  rounded-md p-2 my-4 flex justify-start items-center font-normal bg-gradient-to-r from-emerald-600 to-DarkGreen">
                        <div className="absolute top-12 -right-12 z-10 w-40 h-40 rounded-full scale-150 opacity-50 duration-500 bg-emerald-950"></div>
                        <div className="absolute top-12 -right-12 z-10 w-32 h-32 rounded-full scale-150 opacity-50 duration-500 bg-emerald-800"></div>
                        <div className="absolute top-12 -right-12 z-10 w-24 h-24 rounded-full scale-150 opacity-50 duration-500 bg-emerald-700"></div>
                        <div className="absolute top-12 -right-12 z-10 w-14 h-14 rounded-full scale-150 opacity-50 duration-500 bg-emerald-600"></div>
                        <p className="z-10 flex justify-center items-center gap-4"><FaCheckCircle className="text-green-500 text-lg" /> {userPhoneNumber}</p>
                    </button>
                </div>
            }

            {/* button  here */}
            <div className="mt-3">
                <button
                    onClick={handleNextButtonClick}
                    className={`${!requiredAmount ? 'bg-[#0A3E2D] text-opacity-100' : 'bg-[#0D6152]'} text-white justify-center flex w-full py-2 rounded-sm`}
                    disabled={!requiredAmount}
                >
                    {processing ? 'Processing...' : 'Next'}
                </button>
            </div>
            <div>
                {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
            </div>
        </div >
    );
};

export default Amount;