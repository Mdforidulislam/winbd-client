import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { FaRegCopy, FaCheck, FaCheckCircle } from "react-icons/fa";
import bkash from '../../../../public/bkash.png';
import nagad from '../../../../public/nagad.png';
import rocket from '../../../../public/rocket.jpg';
import two from '../../../../public/two.png';

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

    const navigate = useNavigate();

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

    console.log(minute);
    console.log(second);



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
        const subAdminNumber = localStorage.getItem('authorPhoneNumber');
        if (subAdminNumber) {
            setSubAdminNumber(JSON.parse(subAdminNumber));
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

            } catch (error) {
                console.error('Error uploading image:', error.message);
            }
        }
    };

    const handleSubmiteInsert = async () => {
        const transactionInfo = {
            userName: userName,
            transactionId: transactionValue || "",
            transactionType: localDat?.type,
            amount: localDat?.amount,
            number: PhoneValue || userNumber,
            paymentMethod: localDat?.paymentMethod,
            paymentChannel: localDat?.channel,
            authorId: author,
            transactionImage: imageURL ? imageURL : 'input author',
            offers: [{ title: promotionTitle ? promotionTitle : '', }],

        };

        console.log(transactionInfo);

        // Ensure all fields are filled before making the API call
        if (transactionInfo) {
            try {
                const insertData = await axios.post('https://sever.win-pay.xyz/insertTransaction', transactionInfo);
                console.log(insertData);
                if (insertData.data.message === 'Transaction inserted successfully') {
                    setShowMassage(insertData.data.message);
                    navigate('/profile/confirm-message');
                } else if (insertData.data.message === 'transaction already exists') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Transaction already exists!',
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

    if (redirect) {
        return <Navigate to="/profile/user" replace={true} />;
    }

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
        navigator.clipboard.writeText('01710101016')
            //due
            //have to make it dynamic
            .then(() => {
                setIsCopiedNumber(true);
                toast.success('Number copied');
                setTimeout(() => {
                    setIsCopiedNumber(false);
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
                toast.error('Failed to copy number.');
            });
    };

    return (
        <div className="flex flex-col items-center gap-3 w-full py-2 px-2 bg-[#424242] min-h-screen">
            {/* Top Portion */}
            <div className={`${paymentType === 'withdraw' ? 'hidden' : ' w-full space-y-6 bg-[#313131] px-3 py-3 rounded-md'}`}>
                <div className="text-left space-y-4">
                    <div className="bg-[#313131] rounded-md w-full h-full flex flex-col">
                        <div className="flex justify-center gap-2 items-center">
                            {localDat?.paymentMethod && (
                                <div className="h-8 w-8">
                                    <img
                                        src={`${localDat?.paymentMethod === 'bkash' ? bkash :
                                            localDat?.paymentMethod === 'nogod' ? nagad :
                                                localDat?.paymentMethod === 'rocket' ? rocket : ''}`}
                                        alt=""
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            )}
                            <h1 className="text-2xl mb-1 text-white capitalize font-bold">{localDat?.paymentMethod} <span className="capitalize">{localDat?.channel}</span></h1>
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

                <div className={`${paymentType === 'withdraw' ? 'text-white text-center' : 'hidden'}`}>
                    অপ্রত্যাশিত লেনদেন বিষয়ক সমস্যাগুলি এড়াতে অনুগ্রহ করে সমস্ত বিবরণ পুনরায় যাচাই করুন এবং নিশ্চিত করুন।                </div>
                {/*userNumber here  */}
                <div className={`${paymentType === 'withdraw' ? 'hidden ' : ''} flex gap-2 my-4  items-center relative w-full py-2 pb-3 px-3 bg-[#272727] focus:outline-none rounded-md text-white`}>
                    <label htmlFor="" className="text-sm pt-[0.8px] leading-[1rem] text-DarkGreen">+880</label>
                    <div className="w-full">
                        <input
                            className={`w-full items-center pl-2 bg-[#272727] text-sm focus:outline-none placeholder:text-gray-100/50 placeholder:font-normal placeholder:text-sm text-DarkGreen`}
                            type="text"
                            onChange={(e) => setPhoneValue(e.target.value)}
                            defaultValue={userNumber}
                            placeholder="Phone Number"
                            readOnly={paymentType === 'withdraw'}
                        />
                    </div>
                </div>
                <div className={`${paymentType === 'withdraw' ? 'mt-10 w-full' : 'hidden'}`}>
                    <button className="relative w-full cursor-pointer text-white overflow-hidden  rounded-md p-2 flex justify-start items-center font-normal bg-gradient-to-r from-emerald-600 to-DarkGreen">
                        <div className="absolute top-12 -right-12 z-10 w-40 h-40 rounded-full scale-150 opacity-50 duration-500 bg-emerald-950"></div>
                        <div className="absolute top-12 -right-12 z-10 w-32 h-32 rounded-full scale-150 opacity-50 duration-500 bg-emerald-800"></div>
                        <div className="absolute top-12 -right-12 z-10 w-24 h-24 rounded-full scale-150 opacity-50 duration-500 bg-emerald-700"></div>
                        <div className="absolute top-12 -right-12 z-10 w-14 h-14 rounded-full scale-150 opacity-50 duration-500 bg-emerald-600"></div>
                        <p className="z-10 flex justify-center items-center gap-4"><FaCheckCircle className="text-green-500 text-lg" /> +880 {userNumber}</p>
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
                        />
                    </div>
                </div>

                {/* image filed here */}

                <div className="w-full my-4">
                    {imageURL ? (
                        <div className="w-full flex justify-center ">
                            <img src={imageURL} alt="Selected" className=" object-contain w-2/5 h-[150px] " />
                        </div>
                    ) : (
                        <input
                            type="file"
                            id="file-upload"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    )}
                    <label
                        htmlFor="file-upload"
                        className={`${paymentType === 'withdraw' || imageURL ? "hidden" : ""} w-full py-2 px-3 bg-[#272727] focus:outline-none rounded-md text-white cursor-pointer flex justify-between items-center`}
                    >
                        <span>{ 'Choose a file'}</span>
                        <span className="ml-2 bg-[#373737] px-3 py-1 rounded">Browse</span>
                    </label>
                </div>
            </div>

            <button onClick={handleSubmiteInsert} disabled={showMassage === 'Transaction inserted successfully'} className={`bg-[#19A277] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full`}>
                Confirm <span className="capitalize">{localDat?.type}</span>
            </button>
        </div >
    );
};

export default ConfirmPay;


