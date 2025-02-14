import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaRegCopy, FaCheck, FaCheckCircle } from "react-icons/fa";
import bkash from '/payment_logo/bkash.png';
import nagad from '/payment_logo/nagad.png';
import rocket from '/payment_logo/rocket.png';
import two from '/two.png';
import { IoIosArrowBack } from "react-icons/io";
import { AuthContext } from "../../../Authentication/Authentication";
import Loader from "../../../Components/Loader/Loader";
import { BsInfoCircleFill } from "react-icons/bs";

const ConfirmPay = () => {
    const initialTime = 5 * 60; // 5 minutes in seconds
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    const [minute, setMinute] = useState(Math.floor(initialTime / 60));
    const [second, setSecond] = useState(initialTime % 60);
    const [localDat, setLocalData] = useState({}); // set data 
    const [PhoneValue, setPhoneValue] = useState(''); // set the value from input
    const [transactionValue, setTransactionValue] = useState(''); // set the value from input
    const [imageValue, setImageValue] = useState(null); // set the value from input
    const [imageURL, setImageURL] = useState(''); // store image URL
    const [showMassage, setShowMassage] = useState(''); // set error massage 
    const [localUser, setLocalUser] = useState({}); // get local user data
    const [redirect, setRedirect] = useState(false); // set redirection false or true value set for after 2 sec later redirection 
    const [isCopiedNumber, setIsCopiedNumber] = useState(false);
    const [isCopiedAmount, setIsCopiedAmount] = useState(false);
    const [userNumber, setUserNumber] = useState(); // set user Phone Number
    const [subAdminNumber, setSubAdminNumber] = useState(); // set subadmin phone number
    const [imageUrl, setImageUrl] = useState(''); // img url set inside the post request to imgbb site
    const [promotionTitle, setPromotionTitle] = useState(''); // set the promotion title  here 
    const { activeTab } = useContext(AuthContext)
    const navigate = useNavigate();
    const [isUploading, setIsUploading] = useState(false);
    const [isTransactionValueError, setIsTransactionValueError] = useState(false); // new state for transaction value error
    const [isProcessing, setIsProcessing] = useState(null); // set processing button here

    // ================== Timer calculation =====================
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId); // Stop the interval when time is up
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
    }, []);

    useEffect(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        setMinute(minutes);
        setSecond(seconds);
    }, [timeRemaining]);

    // BD time Function here
    useEffect(() => {
        const userInfo = localStorage.getItem('userData');
        if (userInfo) {
            setLocalUser(JSON.parse(userInfo));
        }

        // Getting transaction info
        const gettingSubmInfo = localStorage.getItem('userTransaction');
        if (gettingSubmInfo) {
            setLocalData(JSON.parse(gettingSubmInfo));
        }

        // Getting user number
        const userNumber = localStorage.getItem('userPhoneNumber');
        if (userNumber) {
            setUserNumber(JSON.parse(userNumber));
        }

     // Getting subAdmin number
        const subAdminNumber = localStorage.getItem('authorPhoneNumber') || {};
        if (subAdminNumber) {

            try {
                const subAdminNumberPars = JSON.parse(subAdminNumber);
                setSubAdminNumber(subAdminNumberPars);
            } catch (e) {
                console.error("Parsing error:", e);
                // Assuming the value might be a plain string and directly setting it
                setSubAdminNumber(subAdminNumber);
            }
        }
        const promoTitle = localStorage.getItem('promotion');
        if (promoTitle) {
            setPromotionTitle(promoTitle);
        }
    }, []);

    // Access the data here all the API or object 
    const author = localUser?.authorId;
    const transType = localDat?.channel || '';
    const method = localDat?.paymentMethod || '';
    const userName = localUser?.userName;
    const paymentType = localDat?.type;

    // Function to handle image upload to ImgBB
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setImageValue(file);

        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            setIsUploading(true);
            try {
                // Upload image to imgbb
                const responseImg = await axios.post('https://api.imgbb.com/1/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    params: {
                        key: 'e63830251586e4c27e94823af65ea6ca',
                    },
                });
                const imgURL = responseImg.data.data.url;
                setImageURL(imgURL); // Update the state with the image URL
                // Set isUploading to false when the upload completes
                setIsUploading(false);
            } catch (error) {
                console.error('Error uploading image:', error.message);
            }
        }
    };

    const handleSubmiteInsert = async () => {

        if (activeTab === 'deposit' && !transactionValue) {
            setIsTransactionValueError(true);
            return;
        }

        const transactionInfo = {
            userName: userName,
            transactionId: transactionValue || "",
            transactionType: localDat?.type,
            amount: localDat?.amount,
            userNumber: PhoneValue || userNumber,
            authoreNumber: subAdminNumber,
            paymentMethod: localDat?.paymentMethod,
            paymentChannel: localDat?.channel,
            authorId: author,
            transactionImage: imageURL ? imageURL : 'input author',
            offers: [{ title: promotionTitle ? promotionTitle : '', }],
        };

        // set the button is processcing
        setIsProcessing(true);

        // console.log(transactionInfo);

        // Ensure all fields are filled before making the API call
        if (transactionInfo) {
            try {
                const insertData = await axios.post('https://server.win-pay.xyz/insertTransaction', transactionInfo);
 
                if (insertData.data.message === 'Transaction ID must be unique.') {
                    toast.error('Transaction ID must be unique.')
                } else if (insertData.data.message === 'Transaction inserted successfully') {
                    setIsProcessing(false);
                    setShowMassage(insertData.data.message);
                    navigate('/profile/confirm-message');
                } else if (insertData.data.message === 'An error occurred while inserting transaction') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Transaction id already exists!',
                    });
                }
                if (insertData.data.message === "Transaction already exists") {
                    toast.error('Transaction already exists');
                }
            } catch (error) {
                console.error('Error inserting transaction:', error.message);
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Missing Information',
                text: 'Please fill in all required fields.',
            });
        }
    };

    // Return to the home page
    useEffect(() => {
        if (showMassage === 'Transaction inserted successfully' || minute <= 0 && second <= 0) {
            const timer = setTimeout(() => {
                setRedirect(true);
            }, 1000); // 1000 milliseconds = 1 second

            return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
        }
    }, [showMassage, minute, second]);

    // if (redirect) {
    //     return <Navigate to="/profile/user" replace={true} />;
    // }

    // Copy function
    const handleCopyAmount = () => {
        navigator.clipboard.writeText(localDat.amount.toString())
            .then(() => {
                setIsCopiedAmount(true);
                toast.success('Amount copied!');
                setTimeout(() => {
                    setIsCopiedAmount(false);
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                toast.error('Failed to copy amount.');
            });
    };

    const handleCopyNumber = () => {
        navigator.clipboard.writeText(subAdminNumber)
            .then(() => {
                setIsCopiedNumber(true);
                toast.success('Number copied!');
                setTimeout(() => {
                    setIsCopiedNumber(false);
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                toast.error('Failed to copy number.');
            });
    };

    console.log(localDat?.paymentMethod)
    console.log(localDat?.channel)

    return (
        <div className="relative flex flex-col items-center gap-3 w-full py-2 px-2 bg-[#424242] min-h-screen">
            {/* Top Portion */}
            <Link to={'/profile/user'} className={`${activeTab === 'deposit' ? 'hidden' : 'absolute top-4 left-4 p-2 rounded-full bg-GlobalGray text-white '}`}>
                <IoIosArrowBack className="text-xl" />
            </Link>
            <div className={`${paymentType === 'withdraw' ? 'hidden' : ' w-full space-y-6 bg-[#313131] px-3 py-3 rounded-md'}`}>
                <div className="text-left space-y-4">
                    <div className="bg-[#313131] rounded-md w-full relative h-full flex flex-col">
                        <Link to={'/profile/user'} className="absolute top-0 left-0 p-2 rounded-full bg-GlobalGray text-white ">
                            <IoIosArrowBack className="text-xl" />
                        </Link>
                        <div className="flex justify-center gap-2 items-center">
                            {localDat?.paymentMethod && (
                                <div className="h-8 w-8">
                                    <img
                                        src={`${localDat?.paymentMethod === 'bkash' ? bkash :
                                            localDat?.paymentMethod === 'nogod' ? nagad :
                                                localDat?.paymentMethod === 'rocket' ? rocket : ''}`}
                                        alt="img"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            )}
                            <h1 className="text-2xl mb-1 text-white capitalize font-bold">{localDat?.paymentMethod} <span className="capitalize">{localDat?.channel === "sendmony" ? "Send Money" : localDat?.channel}</span></h1>
                        </div>
                        <div className="text-white my-2">
                            <h1 className={`${localDat?.type === 'withdraw' ? 'hidden' : 'px-10 text-white text-center capitalize w-full'}`}>Please pay to the account below within <span className="text-red-600">{minute}</span> min <span className="text-red-600">{second}</span> sec.</h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* Middle portion */}
            <div className="w-full bg-[#313131] flex flex-col items-center justify-start rounded-md px-3 py-3">
                <div className="h-16 w-16 mx-auto my-4 mb-6">
                    <img className="h-full w-full object-contain" src={two} alt="" />
                </div>
                <div className={`${paymentType === 'withdraw' ? 'hidden' : 'flex justify-center items-center gap-2 mb-2 relative'}`}>
                    <h1 className="text-white text-xl tracking-normal font-medium">{subAdminNumber}</h1>
                    <div
                        className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                        onClick={handleCopyNumber}
                    >
                        {isCopiedNumber ? <FaCheck /> : <FaRegCopy />}
                    </div>
                </div>

                <div className={`${paymentType === 'withdraw' ? 'hidden' : 'flex justify-center items-center gap-2 mb-2 relative'}`}>
                    <h1 className="text-white text-md tracking-normal font-medium">Amount: <span className="text-xl">{localDat.amount}</span></h1>
                    <div
                        className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                        onClick={handleCopyAmount}
                    >
                        {isCopiedAmount ? <FaCheck /> : <FaRegCopy />}
                    </div>
                </div>

                <div className={`${paymentType === 'withdraw' ? 'text-white text-center font-bengali' : 'hidden'}`}>
                    অপ্রত্যাশিত লেনদেন বিষয়ক সমস্যাগুলি এড়াতে অনুগ্রহ করে সমস্ত বিবরণ পুনরায় যাচাই করুন এবং নিশ্চিত করুন।                </div>
                <div className={`${paymentType === 'withdraw' ? 'w-full mt-10 mb-4' : 'hidden'} flex justify-between gap-3`}>
                    <button className="relative cursor-pointer p-1.5 text-white overflow-hidden w-14 h-11 rounded-md flex justify-start items-center font-normal bg-gradient-to-r from-emerald-600 to-DarkGreen">
                        <div className="h-full w-full">
                            <img
                                src={
                                    localDat.paymentMethod === 'bkash' ? 'https://i.ibb.co/C0mhx9D/bkash.png' :
                                        localDat.paymentMethod === 'nogod' ? 'https://i.ibb.co/qxbhZVX/nagad.png' :
                                            localDat.paymentMethod === 'rocket' ? 'https://i.ibb.co/q0t3nTP/rocket.jpg' : ''
                                }
                                alt=""
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </button>
                    <button className="relative w-full cursor-pointer text-white overflow-hidden  rounded-md p-2 flex justify-start items-center font-normal bg-gradient-to-r from-emerald-600 to-DarkGreen">
                        <p className="z-10 flex justify-center text-lg font-medium items-center gap-4">Amount : {localDat?.amount}</p>
                    </button>
                </div>
                <div className={`${paymentType === 'withdraw' ? 'hidden ' : ''} flex gap-2 my-4  items-center relative w-full py-2 pb-3 px-3 bg-[#272727] focus:outline-none rounded-md text-white`}>
                    <label htmlFor="" className="text-sm pt-[0.8px] leading-[1rem] text-DarkGreen">+88</label>
                    <div className="w-full">
                        <input
                            className={`w-full items-center bg-[#272727] text-sm focus:outline-none placeholder:text-gray-100/50 placeholder:font-normal placeholder:text-sm text-DarkGreen`}
                            type="text"
                            onChange={(e) => setPhoneValue(e.target.value)}
                            defaultValue={userNumber}
                            placeholder="Phone Number"
                            readOnly={paymentType === 'withdraw'}
                            required
                        />
                    </div>
                </div>
                <div className={`${paymentType === 'withdraw' ? 'w-full' : 'hidden'}`}>
                    <button className="relative w-full cursor-pointer text-white overflow-hidden  rounded-md p-2 flex justify-start items-center font-normal bg-gradient-to-r from-emerald-600 to-DarkGreen">
                        <div className="absolute top-12 -right-12 z-10 w-40 h-40 rounded-full scale-150 opacity-50 duration-500 bg-emerald-950"></div>
                        <div className="absolute top-12 -right-12 z-10 w-32 h-32 rounded-full scale-150 opacity-50 duration-500 bg-emerald-800"></div>
                        <div className="absolute top-12 -right-12 z-10 w-24 h-24 rounded-full scale-150 opacity-50 duration-500 bg-emerald-700"></div>
                        <div className="absolute top-12 -right-12 z-10 w-14 h-14 rounded-full scale-150 opacity-50 duration-500 bg-emerald-600"></div>
                        <p className="z-10 flex justify-center items-center text-lg font-medium gap-4"><FaCheckCircle className="text-green-500 text-lg" /> +88 {userNumber}</p>
                    </button>
                </div>

                {/* transaction valu here */}

                <div className={`${paymentType === 'withdraw' ? "hidden" : ""} flex gap-2 items-center relative w-full py-2 pb-3 px-3 bg-[#272727] focus:outline-none rounded-md text-white`}>
                    <div className="w-full">
                        <input
                            className="w-full items-center pl-2 bg-[#272727] text-sm focus:outline-none placeholder:text-gray-100/50 placeholder:font-normal placeholder:text-sm text-DarkGreen"
                            type="text"
                            onChange={(e) => setTransactionValue(e.target.value)}
                            placeholder="Reference No/ transaction ID"
                            required
                        />
                    </div>
                </div>
                {isTransactionValueError &&
                    <div className={`${paymentType === 'withdraw' ? "hidden" : "w-full rounded-md relative p-[6px] mt-1 bg-inputlartBg my-1"}`}>
                        <span className="text-alartColor text-md absolute left-3 top-[9px]"><BsInfoCircleFill /></span>
                        <p className="text-alartColor text-sm mb-1 pt-[1px] ml-8">Transaction id is required</p>
                    </div>
                }

                {/* image filed here */}
                {
                    isUploading ? (
                        <Loader />
                    ) : (
                        <div className="w-full my-4">
                            {imageURL ? (
                                <div className="w-full flex justify-center">
                                    <img
                                        src={imageURL}
                                        alt="Selected"
                                        className="object-contain w-2/5 h-[150px]"
                                    />
                                </div>
                            ) : (
                                <>
                                    <input
                                        type="file"
                                        id="file-upload"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className={`${paymentType === 'withdraw' || imageURL ? "hidden" : ""} w-full py-2 px-3 bg-[#272727] focus:outline-none rounded-md text-white cursor-pointer flex justify-between items-center`}
                                    >
                                        <span>{'Choose a file'}</span>
                                        <span className="ml-2 bg-[#373737] px-3 py-1 rounded">Browse</span>
                                    </label>
                                </>
                            )
                            }
                        </div >
                    )
                }


            </div >

            {/* <button
                onClick={handleSubmiteInsert}

                className={`w-full px-4 py-2 rounded-md ${!transactionValue || isUploading ? 'bg-green-700 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 cursor-pointer'}`}
            >
                Submit
            </button> */}
          <button
            onClick={handleSubmiteInsert}
            disabled={isProcessing} // Disable button while processing
            className={`relative w-full duration-500 group overflow-hidden h-14 rounded-md p-2 flex justify-center items-center font-extrabold text-sky-50
                ${activeTab === "deposit" && isProcessing
                    ? "cursor-not-allowed opacity-50 bg-emerald-700" // Disabled state styles
                    : "hover:border-green-600 bg-emerald-800 cursor-pointer" // Enabled state styles
                }`
            }
        >
            <div className="absolute z-10 w-80 h-48 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-800 delay-150 group-hover:delay-75"></div>
            <div className="absolute z-10 w-64 h-40 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-700 delay-150 group-hover:delay-100"></div>
            <div className="absolute z-10 w-48 h-32 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-600 delay-150 group-hover:delay-150"></div>
            <div className="absolute z-10 w-32 h-24 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-500 delay-150 group-hover:delay-200"></div>
            <div className="absolute z-10 w-20 h-16 rounded-full group-hover:scale-150 transition-all duration-500 ease-in-out bg-emerald-400 delay-150 group-hover:delay-300"></div>
            <p className="z-10">{isProcessing ? "Loading..." : "Confirm"}</p>
        </button>




        </div >
    );
};

export default ConfirmPay;


