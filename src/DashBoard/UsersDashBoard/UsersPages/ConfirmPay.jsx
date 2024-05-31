import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import toast, { ToastBar } from "react-hot-toast";
import { FaRegCopy, FaCheck } from "react-icons/fa";
import bkash from '../../../../public/bkash.png';
import nagad from '../../../../public/nagad.png';
import rocket from '../../../../public/rocket.jpg';
import two from '../../../../public/two.png';

const ConfirmPay = () => {
    const initialTime = 5 * 60; // 5 minutes in seconds
    const [timeRemaining, setTimeRemaining] = useState(initialTime); // set time function 
    const [localDat, setLocalData] = useState({}); // set data 
    const [PhoneValue, setPhoneValue] = useState(''); // set the value from input
    const [transactionValue, setTransactionValue] = useState(''); // set the value from input
    const [imageValue, setImageValue] = useState(null); // set the value from input
    const [showMassage, setShowMassage] = useState(''); // set error massage 
    const [localUser, setLocalUser] = useState({}); // get local user data
    const [redirect, setRedirect] = useState(false); // set redirection false or true value set for after 2 sec later redirection 
    const [isCopiedNumber, setIsCopiedNumber] = useState(false);
    const [isCopiedAmount, setIsCopiedAmount] = useState(false);
    const [fileName, setFileName] = useState('');
    const [userNumber, setUserNumber] = useState(); // set user Phone Number
    const [subAdminNumber, setSubAdminNumber] = useState(); // set subadmin phone number
    const navigate = useNavigate();

    // ================== Timer calculation =====================
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (timeRemaining > 0) {
                setTimeRemaining(prevTime => prevTime - 1); // Reduce time by 1 second
            }
        }, 1000); // Run every second

        return () => clearInterval(intervalId); // Cleanup the interval
    }, [timeRemaining]);

    // Convert remaining time to minutes and seconds
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    // BD time Function here
    useEffect(() => {
        // geting user number
        const userInfo = JSON.parse(localStorage.getItem('userData'));
        setLocalUser(userInfo);

        // geting transaction info
        const gettingSubmInfo = localStorage.getItem('userTransaction');
        const convertParsData = JSON.parse(gettingSubmInfo);
        setLocalData(convertParsData);

        // geting userNUmber and SubAdmin Number
        const userNumber = JSON.parse(localStorage.getItem('userPhoneNumber')); // geting userNumber
        const subAdminNumber = JSON.parse(localStorage.getItem('authorPhoneNumber')); // geting number author name
        setUserNumber(userNumber);
        setSubAdminNumber(subAdminNumber); // set number 
    }, []);

    // getting submit data from local storage
    useEffect(() => {
      
    }, []);

    // Access the data here all the API or object 
    const author = localUser?.authorId;
    const transType = localDat.channel || '';
    const method = localDat.paymentMethod || '';
    const userName = localUser?.userName;


    // Insert image to imagebb website geting img link 
    const handleSubmiteInsert = async () => {
        let imgURL = '';

        if (imageValue) {
            const formData = new FormData();
            formData.append('image', imageValue);

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
                imgURL = responseImg.data.data.url;
                setFileName(responseImg.data.data.display_url); // Update the state with the displayed file name
            } catch (error) {
                console.error('Error uploading image:', error.message);
            }
        }

        const transactionInfo = {
            userName: userName,
            transactionId: transactionValue,
            transactionType: localDat?.type,
            amount: localDat?.amount,
            number: PhoneValue || userNumber,
            paymentMethod: localDat.paymentMethod,
            paymentChannel: localDat.channel,
            authorId: author,
            transactionImage: imgURL ? imgURL : '',
        };

        console.log(transactionInfo);

        // Ensure all fields are filled before making the API call
        if (Object.values(transactionInfo).every(item => item)) {
            try {
                const insertData = await axios.post('https://pay-winbd-server.vercel.app/insertTransaction', transactionInfo);
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
                    toast('Transaction already exists');
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
        if (showMassage === 'Transaction inserted successfully') {
            const timer = setTimeout(() => {
                setRedirect(true);
            }, 1000); // 1000 milliseconds = 1 second

            return () => clearTimeout(timer); // Cleanup timeout if the component unmounts
        }
    }, [showMassage]);

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
            <div className="w-full space-y-6 bg-[#313131] px-3 py-3 rounded-md">
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
                            <h1 className={`${localDat?.type === 'withdraw' ? 'hidden' : 'px-10 text-white text-center capitalize w-full'}`}>Please pay to the account below within <span className="text-red-600">{minutes}</span> min <span className="text-red-600">{seconds}</span> sec.</h1>
                        </div>
                    </div>
                </div>
            </div>
            {/* Middle portion */}
            <div className="w-full bg-[#313131] flex flex-col items-center justify-start rounded-md px-3 py-3">
                <div className="h-16 w-16 mx-auto my-4 mb-6">
                    <img className="h-full w-full object-contain" src={two} alt="" />
                </div>
                <div className="flex justify-center items-center gap-2 mb-2 relative">
                    <h1 className="text-white text-xl tracking-normal font-medium">{subAdminNumber}</h1>
                    <div
                        className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                        onClick={handleCopyNumber}
                    >
                        {isCopiedNumber ? <FaCheck /> : <FaRegCopy />}
                    </div>
                </div>

                <div className="flex justify-center items-center gap-2 mb-2 relative">
                    <h1 className="text-white text-md tracking-normal font-medium">Amount: <span className="text-xl">{localDat.amount}</span></h1>
                    <div
                        className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                        onClick={handleCopyAmount}
                    >
                        {isCopiedAmount ? <FaCheck /> : <FaRegCopy />}
                    </div>
                </div>

                <input
                    type="text"
                    onChange={(e) => setPhoneValue(e.target.value)}
                    defaultValue={userNumber}
                    placeholder="Phone Number"
                    className="w-full py-2 px-3 my-4 bg-[#272727] focus:outline-none rounded-md text-white"
                />

                <input
                    type="text"
                    onChange={(e) => setTransactionValue(e.target.value)}
                    placeholder="Reference No/ transaction ID"
                    className="w-full py-2 px-3 mb-4 bg-[#272727] focus:outline-none rounded-md text-white"
                />

                <div className="w-full mb-4">
                    <input
                        type="file"
                        id="file-upload"
                        onChange={(e) => setImageValue(e.target.files[0])}
                        className="hidden"
                    />
                    <label
                        htmlFor="file-upload"
                        className="w-full py-2 px-3 bg-[#272727] focus:outline-none rounded-md text-white cursor-pointer flex justify-between items-center"
                    >
                        <span>{fileName || 'Choose a file'}</span>
                        <span className="ml-2 bg-[#373737] px-3 py-1 rounded">Browse</span>
                    </label>
                </div>
            </div>

            <button onClick={handleSubmiteInsert} disabled={showMassage === 'Transaction inserted successfully'} className={`bg-[#19A277] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded w-full`}>
                Confirm <span className="capitalize">{localDat?.type}</span>
            </button>
        </div>
    );
};

export default ConfirmPay;
