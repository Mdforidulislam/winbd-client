import { useState } from "react";
import { CgProfile } from "react-icons/cg";

const GlobalModal = ({item , openUpdateModal}) => {
    const [openModal, setOpenModal] = useState(openUpdateModal);

    const  { password, phoneNumber, role, subAdmin, uniqueId } = item;
    return (
        <div className=" w-full h-full">
                <button onClick={() => setOpenModal(true)} className=""><span className="text-white text-3xl cursor-pointer"><CgProfile /></span></button>
        <div className={`fixed z-[100] flex items-center justify-center  ${openModal ? 'opacity-1 visible' : 'invisible opacity-0'} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                <div className={`absolute max-w-md rounded-lg  p-3 pb-5 text-center drop-shadow-2xl  ${openModal ? 'scale-1 opacity-1 duration-300' : 'scale-0 opacity-0 duration-150'} `}>
                    {/* modal content here  */}
                    <div className="space-y-4 bg-GlobalGray  py-3 w-full px-20 ">
                        {/*  icons here  */}
                        <svg onClick={() => setOpenModal(false)} className="mx-auto mr-0 w-8 cursor-pointer fill-black " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round"></g><g><path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z"></path></g></svg>
                         {/* content here  */}
                        <h1 className="text-2xl font-semibold mb-4">User Information</h1>
                        <div className=" w-full">
                            <span className="flex items-center mb-2">
                            <span className="w-24 font-semibold">Password:</span>
                            <span>{password}</span>
                            </span>
                            <span className="flex items-center mb-2">
                            <span className="w-24 font-semibold">Phone Number:</span>
                            <span>{phoneNumber}</span>
                            </span>
                            <span className="flex items-center mb-2">
                            <span className="w-24 font-semibold">Role:</span>
                            <span>{role}</span>
                            </span>
                            <span className="flex items-center mb-2">
                            <span className="w-24 font-semibold">Sub Admin:</span>
                            <span>{subAdmin}</span>
                            </span>
                            <span className="flex items-center">
                            <span className="w-24 font-semibold">Unique ID:</span>
                            <span>{uniqueId}</span>
                            </span>
                        </div>
                        {/* button here  */}
                        <button onClick={() => setOpenModal(false)} className="rounded-md bg-indigo-600 hover:bg-indigo-700 px-6 py-1.5 text-white">Ok</button>
                </div>
          </div>
        </div>
      </div>
    );
};

export default GlobalModal;