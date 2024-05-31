import { useState } from "react";
import NotificationHandle from "./NotificationHandle";

const Subnotifications = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className="">
            <div className="flex justify-center">
                <button onClick={() => setOpenModal(true)} className="rounded-md bg-DarkGreen border-2 border-LightGreen/50 px-5 py-[6px] text-white">
                    Add Notification
                </button>
                <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center  justify-center ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100 dark:bg-transparent`}>
                    <div onClick={(e_) => e_.stopPropagation()} className={`text- absolute max-w-md rounded-lg bg-DarkGreen  p-6 drop-shadow-lg dark:bg-gray-800 dark:text-white ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'}`}>
                        <h1 className="text-2xl uppercase font-bold text-center text-white">Submit Your Notifications</h1>

                        <div className="my-5 px-5 space-y-2 flex flex-col justify-center items-center">
                            <input type="text" name="" id="" placeholder="Enter Your Title" className="w-[440px] py-2 text-white px-2 shadow-sm border-b shadow-gray-600 rounded-sm bg-GlobalGray  " /><br />
                            <input type="date" name="" id="" placeholder="Enter Your Title" className="w-[440px] py-2 border-b text-white px-2 shadow-sm shadow-gray-600 rounded-sm bg-GlobalGray  " /><br />
                            <textarea rows={7} name="" id="" placeholder="Enter Your Title" className="w-[440px] py-2 text-white px-2 shadow-sm border-b shadow-gray-600 rounded-sm bg-GlobalGray " /><br />


                        </div>
                        <div className="flex justify-between">
                            <button className="bg-GlobalGray  border-r border-l rounded-lg text-white px-5 py-2 font-semibold hover:bg-black">Send Notification</button>

                            <button onClick={() => setOpenModal(false)} className="rounded-md border border-rose-600 px-6 py-[6px] text-rose-600 duration-150 hover:bg-rose-600 hover:text-white">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>




            {/* ----------------------  handle notification ----------------- */}
            <NotificationHandle />

        </div>
    );
};

export default Subnotifications;