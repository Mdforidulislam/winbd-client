import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';


const ConfirmMsg = () => {
    const [localDat, setLocalData] = useState({}); // set data 
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const getingSubmInfo = localStorage.getItem('userTransaction');
        const convertParsData = JSON.parse(getingSubmInfo)
    ;
        setLocalData(convertParsData);
        const userInfo = localStorage.getItem('userData'); // seting user data

        if (userInfo) {
            const userName = JSON.parse(userInfo);
            setUserName(userName.userName);
        }

    }, [])
    return (
        < div className="w-full min-h-screen p-1 px-2 relative flex flex-col justify-start items-center bg-gradient-to-t from-emerald-700 to-emerald-600" >

            <div className='mt-16'>
                <h1 className='text-2xl font-bold text-LightGreen'>Payment Successful ✅</h1>
                <div className='w-fll h-full flex justify-center items-center mt-10'>
                    <img className='w-[200px] h-auto animate-bounce' src="https://cdn-icons-png.flaticon.com/512/148/148767.png" alt="" />
                </div>
            </div>
            <div className='px-4 flex flex-col items-center gap-6 mt-24'>
                <p className="font-bengali text-white font-semibold text-[1.118rem] text-center">
                    অভিনন্দন ! আপনার {localDat.type === 'withdraw' ? 'উত্তলন' : 'পেমেন্ট'} রিকোয়েস্ট {localDat.amount}৳ গ্রহণ করা হয়েছে। যাচাইক্রমে আগামী ৫ মিনিটের মধ্যে আপনার একাউন্টে ব্যালেন্স এড হয়ে যাবে।
                </p>
                <Link to={'/profile/user'} className="text-center overflow-hidden relative w-32 p-2 h-12 bg-LightGreen text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group">Close
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"></span>
                    <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"></span>
                    <span className="text-center group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-10 z-10">Close</span>
                </Link>
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
