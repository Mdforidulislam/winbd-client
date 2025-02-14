import { useForm } from "react-hook-form";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const AllUserModal = ({ item, setOpenModal, openModal, userDataget }) => {
    const [datList, setDataList] = useState(item)

    console.log('check the data modal ', item)

    const handleCheckboxChange = async (type,id) => {
        const response = await axios.put(`https://server.win-pay.xyz/paymentUpdate?id=${id}&type=${type}`);
        if(response.data.message === 'Successfully updated the payment information.'){
            item.paymentPermissions = item.paymentPermissions.map((perm) => {
                if (perm.type === type) {
                  return {
                    ...perm,
                    allowed: !perm.allowed, // Toggle the `allowed` value
                  };
                }
                return perm;
              });
        }
    }



  

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        // Structure the data as required
        // for user object 
        const formattedData = {
            userName: data?.userName ,
            password: data?.password,
            phoneNumber: data?.phoneNumber,
            authorId: item?.authorId,
            role: item?.role,
        };

        // for subamdin update sent to database 
        const updateSubAdmin = {
            subAdmin: data?.userName,
            phoneNumber: data?.phoneNumber,
            password: data?.password,
        }


        try {

            //  for update only users 
            if (item.userName) {
                const response = await axios.put(`https://server.win-pay.xyz/updateUserInfoAPI?id=${item?._id}`, formattedData, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                console.log('respone',response)

                if (response.data.message === 'Successfully updated the user') {
                    toast.success('User Successfully Updated');
                    setOpenModal(false);
                    userDataget();
                } else {
                    toast.error('User already exists');
                }
            }

            //  for update only subamdin 

            if (item.subAdmin) {
                const response = await axios.put(`https://server.win-pay.xyz/updatesubAdminInfoAPI?id=${item?._id}`, updateSubAdmin, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
    
                if (response.data.message === 'Successfully updated the user') {
                    toast.success('User Successfully Updated');
                    setOpenModal(false);

                    console.log(response)
                } else {
                    toast.error('User already exists');
                }
            }


        } catch (error) {
            console.error("There was a problem with the Axios operation:", error);
        }
    };




    return (
        <div className="flex w-full md:w-72 items-center justify-start">
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] flex items-center justify-center ${openModal ? "opacity-1 visible" : "invisible opacity-0"} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                <div
                    onClick={(e_) => e_.stopPropagation()}
                    className={`absolute w-[95%] md:w-[600px] rounded-lg bg-GlobalDarkGray md:p-6 text-center drop-shadow-2xl ${openModal ? "opacity-1 translate-y-0 duration-300" : "translate-y-20 opacity-0 duration-1000"}`}
                >
                    <div className="flex flex-col items-center justify-center space-y-4 w-full p-4 md:pt-10 md:py-8 md:px-6">
                        <span onClick={() => setOpenModal(false)} className="absolute top-2 right-2 md:top-2 rounded-md text-white cursor-pointer text-2xl bg-red-600"><IoCloseSharp /></span>
                        <form onSubmit={handleSubmit(onSubmit)} className="md:px-6 w-full space-y-4 md:space-y-6">
                            {/* user Name */}
                            <div>
                                <label className="block text-start my-2 pl-2 text-white" htmlFor="userName">UserName</label>
                                <input
                                    id="userName"
                                    className="w-full py-3 px-3 rounded-md text-white bg-GlobalGray focus:placeholder:text-white focus:border-DarkGreen outline-none"
                                    placeholder="User Name"
                                    {...register("userName", { required: "Enter user name" })}
                                    type="text"
                                    defaultValue={item?.userName || item?.subAdmin}
                                />
                                {errors.userName && (
                                    <span className="text-red-600">{errors.userName.message}</span>
                                )}
                            </div>
                            {/* user Phone Number */}
                            <div>
                                <label className="block text-start my-2 pl-2 text-white" htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    id="phoneNumber"
                                    className="w-full py-3 px-3 rounded-md text-white bg-GlobalGray focus:placeholder:text-white focus:border-DarkGreen outline-none"
                                    placeholder="Phone Number"
                                    {...register("phoneNumber", { required: "Enter Phone Number" })}
                                    type="text"
                                    defaultValue={item?.phoneNumber}
                                />
                                {errors.phoneNumber && (
                                    <span className="text-red-600">{errors.phoneNumber.message}</span>
                                )}
                            </div>
                            {/* user Password */}
                            <div>
                                <label className="block text-start my-2 pl-2 text-white" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    className="w-full py-3 px-3 rounded-md text-white bg-GlobalGray focus:placeholder:text-white focus:border-DarkGreen outline-none"
                                    placeholder="Password"
                                    {...register("password", { required: "Enter Password Here" })}
                                    type="text"
                                    defaultValue={item?.password}
                                />
                                {errors.password && (
                                    <span className="text-red-600">{errors.password.message}</span>
                                )}
                            </div>
                                {/* payment opiton add here  */}

                                <div className="p-4">
                                    <h1 className="text-left text-white font-serif mb-5 text-lg">Payment Method Available</h1>
                                    <div className="flex flex-wrap gap-10">
                                        {item?.paymentPermissions?.map((permission, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center justify-center gap-2 bg-gray-800 p-4 rounded-lg w-[120px] shadow-md"
                                        >
                                            {/* Payment Type Name */}
                                            <h1 className="text-white capitalize text-sm">{permission?.type}</h1>
                                            {/* Toggle Switch */}
                                            <label
                                            htmlFor={`toggle-${index}`}
                                            className="flex cursor-pointer items-center"
                                            >
                                            <div className="relative">
                                                <input
                                                id={`toggle-${index}`}
                                                type="checkbox"
                                                checked={permission?.allowed}
                                                onChange={()=>handleCheckboxChange(permission?.type,item?._id)}
                                                className="sr-only"
                                                />
                                                {/* Switch Background */}
                                                <div
                                                className={`block h-6 w-12 rounded-full transition-all ${
                                                    permission?.allowed ? 'bg-blue-500' : 'bg-gray-300'
                                                }`}
                                                ></div>
                                                {/* Switch Knob */}
                                                <div
                                                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-black transition-transform ${
                                                    permission?.allowed ? 'translate-x-6' : 'translate-x-0'
                                                }`}
                                                ></div>
                                            </div>
                                            </label>
                                        </div>
                                        ))}
                                    </div>
                                    </div>
                            <div className="text-center mt-5">
                                <button
                                    type="submit"
                                    className="bg-green-600 px-10 text-sm text-white/80 font-bold py-2 rounded-md hover:bg-DarkGreen transition duration-200"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
