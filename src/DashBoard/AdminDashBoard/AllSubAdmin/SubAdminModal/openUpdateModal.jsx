import { useForm } from "react-hook-form";
import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import toast from "react-hot-toast";

export const SubAdminUpdateModal = ({ item, openUpdateModal, setOpenUpdateModal }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {

        // axios.post("https://server.win-pay.xyz/insertSubAdmin", data, {
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        //     .then((response) => {
        //         console.log(response.data); // Logging the response data from the server
        //         if (response.data.message === 'subadmin insert successfully') {
        //             toast.success('User Successfully Added');
        //         } else {
        //             toast.error('User already exists');
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("There was a problem with the Axios operation:", error);
        //     });
    };

    return (
        <div className="flex w-full md:w-72 items-center justify-start">
            <div onClick={() => setOpenUpdateModal(false)} className={`fixed z-[100] flex items-center justify-center ${openUpdateModal ? "opacity-1 visible" : "invisible opacity-0"} inset-0 bg-black/20 backdrop-blur-sm duration-100`}>
                <div
                    onClick={(e_) => e_.stopPropagation()}
                    className={`absolute w-[95%] md:w-[600px] rounded-lg bg-GlobalDarkGray md:p-6 text-center drop-shadow-2xl ${openUpdateModal ? "opacity-1 translate-y-0 duration-300" : "translate-y-20 opacity-0 duration-1000"}`}
                >
                    <div className="flex flex-col items-center justify-center space-y-4 w-full p-4 pt-10 md:py-8 md:px-6">
                        <span onClick={() => setOpenUpdateModal(false)} className="absolute top-2 right-2 md:top-2 rounded-md text-white cursor-pointer text-2xl bg-red-600"><IoCloseSharp /></span>
                        <form onSubmit={handleSubmit(onSubmit)} className="md:px-6 w-full space-y-4 md:space-y-6">
                            <div>
                                <label className="block text-start my-2 pl-2 text-white" htmlFor="userName">UserName</label>
                                <input
                                    id="userName"
                                    className="w-full py-3 px-3 rounded-md text-white bg-GlobalGray focus:placeholder:text-white focus:border-DarkGreen outline-none"
                                    placeholder="User Name"
                                    {...register("subAdmin", { required: "Enter sub admin user name" })}
                                    type="text"
                                    value={item?.subAdmin}
                                />
                                {errors.subAdmin && (
                                    <span className="text-red-600">{errors.subAdmin.message}</span>
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
                                    value={item?.phoneNumber}
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
                                    value={item?.password}
                                />
                                {errors.password && (
                                    <span className="text-red-600">{errors.password.message}</span>
                                )}
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
