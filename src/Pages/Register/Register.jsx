import { RxCross2 } from "react-icons/rx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { MdError } from "react-icons/md";


import "./Reginter.css";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/Authentication";
import axios from "axios";
import toast from "react-hot-toast/headless";


const Register = () => {
    const [userfild, setUserfild] = useState(false);
    const [password, setPassword] = useState(false);
    const [passcorss, setPasswordCros] = useState(false);
    const [rePassword, setRePassword] = useState(false);
    const [rePasscorss, setRePassCros] = useState(false);
    const [phoneField, setPhoneField] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [registerAuthorId, setRegisterAuthorId] = useState('');// set register aurhoreId
    const { setValue, register, watch, handleSubmit, formState: { errors }, } = useForm();
    const { loginUserNamePassword, role } = useContext(AuthContext)
    // const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Function to get the value of a URL parameter
        const getUrlParameter = (name) => {
            const urlParams = new URLSearchParams(location.search);
            return urlParams.get(name);
        }

        // Extract the 'ref' parameter value
        const refValue = getUrlParameter('ref');
        

        // Check if refValue is not null and convert to number if needed
        const refNumber = refValue !== null ? Number(refValue) : null;

  

        // Store data in localStorage
        if (refValue) {
            localStorage.setItem('registerAuthrId', JSON.stringify(refValue));
        }

        // Retrieve data from localStorage
        const retrievedData = JSON.parse(localStorage.getItem('registerAuthrId'));
        setRegisterAuthorId(retrievedData);

    }, [location.search])



    //  validation and clear the userName search value
    useEffect(() => {
        if (userfild) {
            setValue('userName', '');
            setUserfild(false)
        }
        if (passcorss) {
            setValue('password', '');
            setPasswordCros(false)
        }
        if (rePasscorss) {
            setValue('rePassword', '');
            setRePassCros(false)
        }
        if (phoneField) {
            setValue('phone', '');
            setPhoneField(false)
            setErrorMessage('The Phone Number Field is Required');
        }
    }, [userfild, setValue, passcorss, rePasscorss, phoneField]);


    // show the condtion crose bar !!
    const userName = watch('userName', '');
    const passworduser = watch('password', '');
    const rePassworduser = watch('rePassword', '');
    const PhoneNumber = watch('phone', '');


    // input value upper case and loware case

    const handleInputChange = (e) => {
        let value = e.target.value;
        // Remove extra spaces between words and trim leading/trailing spaces
        value = value.replace(/\s+/g, '').trim();
        // Convert to lowercase
        value = value.toLowerCase();
        // Update the form value
        setValue('userName', value);
        // setName(value);
    };



    //  handleChangePassword Remove the space

    const handleInputChangePassword = (e) => {
        let value = e.target.value;
        // Minimize spaces
        value = value.replace(/\s+/g, ' ').trim();
        setValue('password', value);
    };

    const handleInputReChangePassword = (e) => {
        let value = e.target.value;
        // Minimize spaces
        value = value.replace(/\s+/g, ' ').trim();
        setValue('rePassword', value);
    };


    const handleInputPhone = (e) => {
        let value = e.target.value;
        value = value.replace(/\s+/g, ' ').trim();
        setValue('phone', value);

        if (value === '') {
            setErrorMessage('The Phone Number Field is Required');
        } else if (value.length > 0 && value.length < 10) {
            setErrorMessage('Invalid Phone Number');
        } else if (value.length > 14) {
            setErrorMessage('Phone Number cannot exceed 14 digits');
        } else {
            setErrorMessage('');
        }
    };


        // login working here ========================
        const onSubmit = async (data) => {
            data.authorId = registerAuthorId;
       
         
            const register = await axios.post('https://server.win-pay.xyz/insertUsers', data)
           
            if (register.data.message === 'User already registered') {
                toast.error("User already registered")
                alert('User already registered')
            } else {
                toast.success("successfully create account")
                navigate('/login')
            }
    
            // loginUserNamePassword(data.userName, data.password);
    
            // console.log(name);
        };



    // set bydefault login with redirection from the register page 

    // Check the validation of users based on their roles
    if (role === 'user') {
        navigate('/profile/user', { replace: true });
    } else if (role === 'subAdmin') {
        navigate('/dashboard/subAdmin', { replace: true });
    } else if (role === 'admin') {
        navigate('/dashboard/admin', { replace: true });
    }




    // end the before return 
    return (
        <div className="w-full min-h-screen bg-loginbg">
            <div className="md:min-h-screen flex justify-center items-center">
                <div className="w-full md:max-w-xl mx-auto">
                    {/* header makeing here  */}

                    <div className="w-full text-white py-1 mb-6 flex items-center bg-GlobalDarkGray ">

                        <Link to={'/login'} className="relative z-10">
                            <div className="">
                                <span className="text-white font-bold text-3xl"><MdOutlineKeyboardArrowLeft /></span>
                            </div>
                        </Link>

                        <div className="flex-grow justify-center -ml-8">
                            <h1 className="text-center py-2 text-sm capitalize font-medium">winBD</h1>
                        </div>

                    </div>

                    {/* here are end */}
                    <div className="-mt-4">
                        {/* form start here */}
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            {/* fast fild here */}
                            <div className="w-[96%] mx-auto border rounded-t-sm border-gray-600 ">
                                <div className="flex gap-11 items-center py-3 px-5 bg-loginfildBg rounded-t-sm">
                                    <label htmlFor="" className="text-sm text-inputLabel">Username</label>
                                    <div className="relative w-full">
                                        <input
                                            className="w-full font-medium items-center rounded-t-sm bg-loginfildBg text-sm  focus:outline-none  placeholder:grayPlaceInput placeholder:font-normal placeholder:text-sm text-DarkGreen"
                                            placeholder="Username "
                                            {...register("userName", {
                                                required: "userName is required",
                                            })}
                                            type="text"
                                            onChange={handleInputChange}
                                            id=""
                                        />
                                        {/* crose icon here */}
                                        <div onClick={() => setUserfild(true)} className="absolute right-0 top-1 text-bydefaultWhite bg-DarkGreen rounded-full">
                                            <span className={`${userName ? '' : 'hidden'}`}><RxCross2 /></span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* 2nd fild here */}
                            <div className="w-[96%] mx-auto border border-gray-600">
                                <div className="flex gap-12 items-center py-3 px-5 bg-loginfildBg">
                                    <label htmlFor="" className="text-sm text-inputLabel">Password</label>
                                    <div className="relative w-full">
                                        <input
                                            className="-full  items-center bg-loginfildBg text-sm focus:outline-none placeholder:grayPlaceInput placeholder:font-normal placeholder:text-sm text-DarkGreen font-serif"
                                            placeholder="Password"

                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: { value: 6, message: "Minimum length is 6 characters" },
                                                maxLength: { value: 16, message: "MaxLength length is 16 characters" }
                                            })}

                                            type={`${password ? 'text' : "password"}`}
                                            onChange={handleInputChangePassword}
                                            id=""
                                        />
                                        {/* logo hidden the password and show  */}
                                        <div className="absolute right-0 top-0 flex gap-1  items-center">

                                            <div className="text-bydefaultWhite bg-DarkGreen rounded-full m-2">
                                                <span onClick={() => setPasswordCros(true)} className={`${passworduser ? '' : 'hidden'}`}><RxCross2 /></span>
                                            </div>

                                            <div onClick={() => setPassword(!password)} className="text-bydefaultWhite  rounded-full ">
                                                {
                                                    password ? <span className="text-xl mt-2 text-white"><FaRegEye /></span> : <span className="text-xl mt-2 text-white"><FaEyeSlash /></span>
                                                }
                                            </div>
                                        </div>
                                        <span></span>

                                    </div>

                                </div>
                                <div className={`${errors.password ? 'bg-inputlartBg p-[3px]' : 'hidden'}`}>
                                    {errors.password && (
                                        <div className="flex gap-2 items-center ">
                                            <span className="text-alartColor "><MdOutlineError /></span>
                                            <span className="text-alartColor font-thin text-sm"> {errors.password.message}</span>
                                        </div>

                                    )}
                                </div>
                            </div>

                            {/* third fild here */}
                            <div className="w-[96%] rounded-b-sm mx-auto border border-gray-600">
                                <div className="flex gap-10 items-center py-2 px-5 bg-loginfildBg rounded-b-sm">
                                    <label htmlFor="" className="text-sm text-inputLabel">Confirm Password</label>
                                    <div className="relative w-full">
                                        <input
                                            className="-full  items-center rounded-b-sm bg-loginfildBg text-sm focus:outline-none placeholder:grayPlaceInput placeholder:font-normal placeholder:text-sm text-DarkGreen font-serif"
                                            placeholder="Password"

                                            {...register("rePassword", {
                                                required: "Password is required",
                                                minLength: { value: 6, message: "Minimum length is 6 characters" },
                                                maxLength: { value: 16, message: "MaxLength length is 16 characters" }
                                            })}

                                            type={`${rePassword ? 'text' : "password"}`}
                                            onChange={handleInputReChangePassword}
                                            id=""
                                        />
                                        {/* logo hidden the password and show  */}
                                        <div className="absolute right-0 top-0 flex gap-1  items-center">

                                            <div className="text-bydefaultWhite bg-DarkGreen rounded-full m-2">
                                                <span onClick={() => setRePassCros(true)} className={`${rePassworduser ? '' : 'hidden'}`}><RxCross2 /></span>
                                            </div>

                                            <div onClick={() => setRePassword(!rePassword)} className="text-bydefaultWhite  rounded-full ">
                                                {
                                                    rePassword ? <span className="text-xl mt-2 text-white"><FaRegEye /></span> : <span className="text-xl mt-2 text-white"><FaEyeSlash /></span>
                                                }
                                            </div>
                                        </div>
                                        <span></span>

                                    </div>

                                </div>
                                <div className={`${errors.password ? 'bg-inputlartBg p-[3px]' : 'hidden'}`}>
                                    {errors.password && (
                                        <div className="flex gap-2 items-center ">
                                            <span className="text-alartColor "><MdOutlineError /></span>
                                            <span className="text-alartColor font-thin text-sm"> {errors.password.message}</span>
                                        </div>

                                    )}
                                </div>
                            </div>


                            {/* fourth fild here */}
                            <div className="w-[96%] my-3 mx-auto">
                                <div className="flex gap-20 items-center py-2 px-5 bg-loginfildBg rounded-sm  border border-b-transparent rounded-t-sm border-gray-600 ">
                                    <label htmlFor="" className="text-sm text-inputLabel">Phone Number</label>
                                    <div className="relative w-full">
                                        <input
                                            className="w-full font-medium items-center rounded-sm bg-loginfildBg text-sm focus:outline-none placeholder:grayPlaceInput placeholder:font-normal placeholder:text-sm text-DarkGreen"
                                            placeholder="Phone Number"
                                            {...register("phoneNumber", {
                                                required: "Phone Number is required",
                                            })}
                                            type="number"
                                            onChange={handleInputPhone}
                                            id=""
                                        />
                                        <div className="absolute -left-14 top-[2px] text-[15px] text-DarkGreen rounded-full">
                                            +880
                                        </div>
                                        <div onClick={() => setPhoneField(true)} className="absolute right-0 top-1 text-bydefaultWhite bg-DarkGreen rounded-full">
                                            <span className={`${PhoneNumber ? '' : 'hidden'}`}><RxCross2 /></span>
                                        </div>

                                    </div>
                                </div>
                                {errorMessage && (
                                    <span className="p-1 bg-[#242424] flex justify-start items-center gap-1 pl-0.5 text-[12px] text-CustomRed2">
                                        <MdError className="text-[15px]" />{errorMessage}
                                    </span>
                                )}
                            </div>

                            {/* login button here */}
                            <div className=" text-center">
                                <button className="text-white w-[96%] mx-auto bg-DarkGreen py-2 rounded-sm ">Verify</button>
                            </div>
                            {/* sing up link here */}
                        </form>

                        <div className=" flex justify-center w-full">
                            <h1 className=" text-white mt-3 text-sm">Already Have An verified? <Link to={'/login'}>
                                <span className="text-sm text-barndColor font-bold">login</span></Link></h1>
                        </div>

                    </div>

                </div>
            </div>


        </div >
    );
};

export default Register;