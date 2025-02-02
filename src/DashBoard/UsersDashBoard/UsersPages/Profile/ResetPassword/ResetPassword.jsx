import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsExclamationCircleFill } from "react-icons/bs";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: ''
    });
    const [customError, setCustomError] = useState('');
    const [passwordMismatchError, setPasswordMismatchError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [findNode, setFindNode] = useState({
        note: {
            remainder: "Password Requirements",
            list: [
                "must be 6-20 characters",
                "must contain 1 uppercase alphabet(A-Z) at least",
                "must contain 1 lowercase alphabet(a-z) at least",
                "must contain 1 number(0-9) at least",
                "allow special characters(@$!%*#)"
            ],
        },
    });

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 6 || password.length > 20) {
            errors.push("Password must be 6-20 characters.");
        }
        if (!/[A-Z]/.test(password)) {
            errors.push("Password must contain 1 uppercase letter.");
        }
        if (!/[a-z]/.test(password)) {
            errors.push("Password must contain 1 lowercase letter.");
        }
        if (!/[0-9]/.test(password)) {
            errors.push("Password must contain 1 number.");
        }
        if (!/[@$!%*#]/.test(password)) {
            errors.push("Password must allow special characters.");
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // if (name === 'password') {
        //     const passwordErrors = validatePassword(value);
        //     if (passwordErrors.length > 0) {
        //         setCustomError(passwordErrors.join(' '));
        //     } else {
        //         setCustomError('');
        //     }

        //     if (value !== formData.confirmPassword) {
        //         setPasswordMismatchError("Passwords do not match");
        //     } else {
        //         setPasswordMismatchError('');
        //     }
        // }

        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                setPasswordMismatchError("Passwords do not match");
            } else {
                setPasswordMismatchError('');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordMismatchError('Passwords do not match');
            return;
        }

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            setCustomError(passwordErrors.join(' '));
            return;
        }

        try {
            const response = await axios.put(`https://server.win-pay.xyz/passwordForgotuser?userName=${formData.userId}&newPassword=${formData.password}`, {
                userName: formData.userId,
                newPassword: formData.password
            });


            if (response.data.message === 'Password updated successfully') {
                toast.success('Password updated successfully');
     
            } else {
                console.error('Failed to update password');
                toast.error('Failed to update password');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const handleClear = (field) => {
        setFormData({
            ...formData,
            [field]: ''
        });
        setCustomError(''); // Clear custom error
        if (field === 'password' || field === 'confirmPassword') {
            setPasswordMismatchError(''); // Clear password mismatch error only if password field or confirmPassword field is cleared
        }
    };


    return (
        <div className="w-full flex min-h-screen bg-[#111111]">
            <div className="h-full w-full flex justify-center items-center md:items-start md:min-h-screen ">
                <div className="w-full mb-6">
                    <div className="w-full shadow-md mb-3 text-white py-1 pb-2 flex items-center bg-DarkGreen px-2">
                        <Link to={'/profile/user'} className="relative z-10">
                            <div className="">
                                <span className="text-white font-bold text-3xl"><MdOutlineKeyboardArrowLeft /></span>
                            </div>
                        </Link>
                        <div className="flex-grow justify-center -ml-8">
                            <h1 className="text-center py-2 text-[17px] font-normal">Reset password</h1>
                        </div>
                    </div>
                    <form className="px-1" onSubmit={handleSubmit}>
                        <div className="w-[96%] px-1 mx-auto rounded-t-sm bg-[#292929]">
                            <div className="flex gap-6 items-center py-[12px] px-5 border border-t-transparent border-x-transparent border-gray-400/50">
                                <label htmlFor="" className="text-sm text-inputLabel">Username</label>
                                <div className="relative w-full">
                                    <input
                                        className="w-full font-medium items-center rounded-t-sm bg-[#292929] text-sm focus:outline-none placeholder:text-gray-100/50 placeholder:font-normal placeholder:text-sm text-DarkGreen"
                                        type="text"
                                        id="userName"
                                        name="userId"
                                        value={formData.userId}
                                        placeholder="Enter Username"
                                        onChange={handleChange}
                                    />
                                    {formData.userId && (
                                        <div onClick={() => handleClear('userId')} className="absolute right-0 top-1 text-bydefaultWhite bg-DarkGreen rounded-full">
                                            <span><RxCross2 /></span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="w-[96%] px-1 mx-auto bg-[#292929]">
                            <div className="flex gap-7 items-center py-2 pb-2.5 px-5 relative">
                                <label htmlFor="" className="text-sm leading-[1rem] text-inputLabel">New Password</label>
                                <div className="w-full">
                                    <input
                                        className="w-full items-center bg-[#292929] text-sm focus:outline-none placeholder:text-gray-100/50 placeholder:font-normal placeholder:text-sm text-DarkGreen"
                                        type={passwordVisible ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="New Password"
                                        required
                                    />
                                    <div className="absolute right-2 top-0 flex gap-2 h-full items-center">
                                        {formData.password && (
                                            <div className="text-bydefaultWhite bg-DarkGreen rounded-full cursor-pointer">
                                                <span onClick={() => handleClear('password')}><RxCross2 className='text-[16px] p-[1px]' /></span>
                                            </div>
                                        )}
                                        <div onClick={() => setPasswordVisible(!passwordVisible)} className="text-bydefaultWhite rounded-full cursor-pointer">
                                            {passwordVisible ? <FaRegEye className="text-[17px] p-[1px] text-white" /> : <FaEyeSlash className="text-[17px] p-[1px] text-white" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[96%] px-1 mx-auto rounded-b-sm bg-[#292929]">
                            <div className="flex gap-[15px] items-center py-2 pb-2.5 px-5 relative  border border-x-transparent border-b-transparent border-gray-400/50">
                                <label htmlFor="" className="text-sm leading-[1rem] text-inputLabel">Confirm Password</label>
                                <div className="w-full">
                                    <input
                                        className="w-full items-center bg-[#292929] text-sm focus:outline-none placeholder:text-gray-100/50 placeholder:font-normal placeholder:text-sm text-DarkGreen"
                                        type={confirmPasswordVisible ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm New Password"
                                        required
                                    />
                                    <div className="absolute right-2 top-0 flex gap-2 h-full items-center">
                                        {formData.confirmPassword && (
                                            <div className="text-bydefaultWhite bg-DarkGreen rounded-full cursor-pointer">
                                                <span onClick={() => handleClear('confirmPassword')}><RxCross2 className='text-[16px] p-[1px]' /></span>
                                            </div>
                                        )}
                                        <div onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="text-bydefaultWhite rounded-full cursor-pointer">
                                            {confirmPasswordVisible ? <FaRegEye className="text-[17px] p-[1px] text-white" /> : <FaEyeSlash className="text-[17px] p-[1px] text-white" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* error */}
                        {/* {customError && (
                        <div className="relative p-[6px]">
                            <span className="text-alartColor absolute left-3 top-[11px]"><BsExclamationCircleFill /></span>
                            <p className="text-alartColor text-sm my-[2px] ml-7">{customError}</p>
                        </div>
                        )} */}
                        {passwordMismatchError && (
                            <div className="relative p-[6px]">
                                <span className="text-alartColor absolute left-3 top-[11px]"><BsExclamationCircleFill /></span>
                                <p className="text-alartColor text-sm my-[2px] ml-7">{passwordMismatchError}</p>
                            </div>
                        )}

                        <div className="bg-notifyBlack border border-green-900 rounded-sm mx-2 my-2 p-[6px]">
                            <div className="flex gap-1.5 h-full w-full">
                                <div className="mt-[3px]">
                                    <span className="text-white">
                                        <BsExclamationCircleFill className="text-sm" />
                                    </span>
                                </div>
                                <div>
                                    {findNode && (
                                        <div className="space-y-1 ">
                                            {findNode.note?.remainder && (
                                                <h1 className="text-[15px] text-white">{findNode.note.remainder}</h1>
                                            )}
                                            {findNode.note?.list && findNode.note.list.length > 0 && (
                                                <div className="flex flex-col tracking-tight leading-4 -ml-5">
                                                    {findNode.note.list.map((item, index) => (
                                                        <p key={index} className="text-[11.6px] text-white">
                                                            <span className="">{index + 1}. </span>
                                                            <span className=""> {item}</span>
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="text-center my-2">
                            <button type="submit" className="text-white w-[96.5%] mx-auto bg-DarkGreen py-2 rounded-sm ">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
