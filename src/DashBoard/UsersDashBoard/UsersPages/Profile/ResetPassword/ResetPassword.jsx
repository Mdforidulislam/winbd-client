import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { FaRegEye, FaEyeSlash } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import axios from 'axios';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        userId: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'confirmPassword') {
            if (value === formData.password) {
                setPasswordError('Passwords matched');
            } else {
                setPasswordError('Passwords do not match');
            }
        } else if (name === 'password') {
            if (formData.confirmPassword && value !== formData.confirmPassword) {
                setPasswordError('Passwords do not match');
            } else if (formData.confirmPassword) {
                setPasswordError('Passwords matched');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.put(`https://sever.win-pay.xyz/passwordForgotuser?userName=${formData.userId}&newPassword=${formData.password}`, {
                userName: formData.userId,
                newPassword: formData.password
            });

            console.log(response.data);
            if (response.data.message === 'Password updated successfully') {
                toast.success('Password updated successfully')
                console.log('Password updated successfully');
            } else {
                console.error('Failed to update password');
                toast.error('Failed to update password')
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
    };


    return (
        <div className=" w-full flex min-h-screen bg-[#171717]">
            <div className="h-full w-full flex justify-center items-center md:items-start md:min-h-screen ">
                <div className="md:w-[27%] w-full mb-6">
                    <div className="w-full shadow-md mb-4 text-white py-1 pb-4 flex items-center bg-DarkGreen px-2">
                        <Link to={'/profile/user'} className="relative z-10">
                            <div className="">
                                <span className="text-white font-bold text-3xl"><MdOutlineKeyboardArrowLeft /></span>
                            </div>
                        </Link>

                        <div className="flex-grow justify-center -ml-8">
                            <h1 className="text-center py-2 text-sm font-normal">Reset password</h1>
                        </div>
                    </div>
                    <form className="px-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="userName" className="block ml-1 mb-2 text-white">User Name</label>
                            <input
                                type="text"
                                id="userName"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                                className="w-full py-3 px-3 rounded-md bg-GlobalGray focus:outline-none font-medium items-center rounded-t-sm text-lg text-DarkGreen"
                                placeholder="Enter Username.."
                                required
                            />
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="password" className="block ml-1 mb-2 text-white">Password</label>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full py-3 px-3 rounded-md bg-GlobalGray focus:outline-none font-medium items-center rounded-t-sm text-lg text-DarkGreen"
                                placeholder="New Password"
                                required
                            />
                            <div className="absolute right-4 top-3.5 flex gap-4 h-full items-center">
                                <div className="text-bydefaultWhite bg-DarkGreen rounded-full cursor-pointer">
                                    <span onClick={() => handleClear('password')}><RxCross2 className='text-xl p-[1px]' /></span>
                                </div>
                                <div onClick={() => setPasswordVisible(!passwordVisible)} className="text-bydefaultWhite rounded-full cursor-pointer">
                                    {passwordVisible ? <FaRegEye className="text-xl text-white" /> : <FaEyeSlash className="text-xl text-white" />}
                                </div>
                            </div>
                        </div>
                        <div className="mb-4 relative">
                            <label htmlFor="confirmPassword" className="block ml-1 mb-2 text-white">Confirm Password</label>
                            <input
                                type={confirmPasswordVisible ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full py-3 px-3 rounded-md bg-GlobalGray focus:outline-none font-medium items-center rounded-t-sm text-lg text-DarkGreen"
                                placeholder="Confirm Password"
                                required
                            />
                            <div className="absolute right-4 top-3.5 flex gap-4 h-full items-center">
                                <div className="text-bydefaultWhite bg-DarkGreen rounded-full cursor-pointer">
                                    <span onClick={() => handleClear('confirmPassword')}><RxCross2 className="text-xl text-white p-[1px]" /></span>
                                </div>
                                <div onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className="text-bydefaultWhite rounded-full cursor-pointer">
                                    {confirmPasswordVisible ? <FaRegEye className="text-xl text-white" /> : <FaEyeSlash className="text-xl text-white" />}
                                </div>
                            </div>
                            {passwordError && (
                                <p className={`text-sm mt-2 ${passwordError === 'Passwords matched' ? 'text-green-500' : 'text-red-500'}`}>
                                    {passwordError}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 w-full text-white py-2 px-14 rounded-md hover:bg-green-600 transition duration-200">
                            Submit
                        </button>
                    </form>

                </div>
            </div>
        </div >
    );
};

export default ResetPassword;