import { Link } from 'react-router-dom';
import confirmImg from '../../../../public/confirmImg.png'
import { useEffect, useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { MdLocalHospital } from 'react-icons/md';

const ConfirmMsg = () => {
    const [localDat, setLocalData] = useState({}); // set data 
    const [amount, setAmount] = useState(0); // set ammount 
    const [userName, setUserName] = useState('')


    useEffect(() => {
        const getingSubmInfo = localStorage.getItem('userTransaction');
        const convertParsData = JSON.parse(getingSubmInfo)
        console.log(convertParsData);
        setLocalData(convertParsData);
        const userInfo = localStorage.getItem('userName'); // seting user data
        if (userInfo) {
            const userName = JSON.parse(userInfo);
            setUserName(userName);
        }

    }, [])
    return (
        <div className="flex flex-col  items-center gap-3 w-full py-2 px-2 bg-green-700  min-h-screen">
            {/* Top Portion */}
            <div className="w-full min-h-[98vh] flex flex-col justify-start gap-4 pb-20 pt-3 items-center bg-gradient-to-b from-green-600 via-green-700 to-green-900 px-3 rounded-md">

            </div>
        </div >
    );
};

export default ConfirmMsg;


{/* <h1 className='text-xl font-bold text-LightGreen'>Payment Successful ✅</h1>
<div className='flex flex-col gap-4 justify-center items-center mt-10'>
    <div className=' h-20 my-4 w-20'>
        <img className="h-full w-full object-cover" src={confirmImg} alt="" />
    </div>
    <p className='text-white text-[12px] mb-6 text-center px-6'>অভিনন্দন {userName?.userName}! আপনার পেমেন্ট রিকোয়েস্ট {localDat.amount}৳ গ্রহণ করা হয়েছে। যাচাইক্রমে আগামী ৫ মিনিটের মধ্যে আপনার ব্যালেন্স এড হয়ে যাবে।</p>

</div>
<Link to={'/profile/user'} className="text-center overflow-hidden relative w-32 p-2 h-12 bg-LightGreen text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group">Close
    <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
    <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
    <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
    <span className="text-center group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-10 z-10">Close</span>
</Link> */}
