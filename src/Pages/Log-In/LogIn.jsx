import { RxCross2 } from "react-icons/rx";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import "./LogIn.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Authentication/Authentication";
import axios from "axios";

const LogIn = () => {
  const [redirectUrl, setRedirectUrl] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [clearUsername, setClearUsername] = useState(false);
  const [clearPassword, setClearPassword] = useState(false);
  const { setValue, register, watch, handleSubmit, formState: { errors } } = useForm();
  const { loginUserNamePassword, role } = useContext(AuthContext);
  const navigate = useNavigate();

  // Fetching dynamic URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://server.win-pay.xyz/getingDynamicallyUrl');
        setRedirectUrl(res.data.data[0].redirectUrl);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };
    fetchData();
  }, []);

  // Handle form submission
  const onSubmit = (data) => {
    loginUserNamePassword(data.userName, data.password);
  };

  // Clear input fields based on state
  useEffect(() => {
    if (clearUsername) {
      setValue('userName', '');
      setClearUsername(false);
    }
    if (clearPassword) {
      setValue('password', '');
      setClearPassword(false);
    }
  }, [clearUsername, clearPassword, setValue]);

  // Watch input fields
  const userName = watch('userName', '');
  const password = watch('password', '');

  // Handle input change for username
  const handleInputChange = (e) => {
    let value = e.target.value.toLowerCase().replace(/\s+/g, ' ').trim();
    setValue('userName', value);
  };

  // Handle input change for password
  const handleInputChangePassword = (e) => {
    let value = e.target.value.replace(/\s+/g, ' ').trim();
    setValue('password', value);
  };

  // Handle paste event for username
  const handlePasteUsername = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const trimmedText = pastedText.replace(/\s+/g, '');
    e.preventDefault(); // Prevent the default paste action
    setValue('userName', trimmedText);
  };

  // Handle paste event for password
  const handlePastePassword = (e) => {
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const trimmedText = pastedText.replace(/\s+/g, '');
    e.preventDefault(); // Prevent the default paste action
    setValue('password', trimmedText);
  };

  // Redirect based on role
  useEffect(() => {
    if (role === 'user') {
      navigate('/profile/user', { replace: true });
    } else if (role === 'subAdmin') {
      navigate('/dashboard/transtionReq', { replace: true });
    } else if (role === 'admin') {
      navigate('/dashboard/admin', { replace: true });
    }
  }, [role, navigate]);

  return (
    <div className="w-full flex min-h-screen bg-[#111114]">
      <div className="h-full w-full md:flex justify-center items-center md:min-h-screen">
        <div className="md:w-2/6">
          <div className="w-full text-white py-1 mb-2 md:mb-12 grid grid-cols-3 bg-GlobalDarkGray px-2">
            <Link to={redirectUrl} className="relative z-10">
              <div>
                <span className="text-white font-bold text-3xl"><MdOutlineKeyboardArrowLeft /></span>
              </div>
            </Link>
            <Link to={redirectUrl} className="">
              <h1 className="text-center py-2 text-sm capitalize font-medium">winBD</h1>
            </Link>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-2">
            <div className="border-b border-gray-500">
              <div className="w-full flex gap-7 h-full items-center py-4 px-5 bg-loginfildBg rounded-t-sm">
                <label htmlFor="username" className="text-inputLabel">Username</label>
                <div className="relative w-full">
                  <input
                    className="focus:bg-loginfildBg w-full font-medium h-full items-center bg-loginfildBg rounded-t-sm text-sm focus:outline-none placeholder:grayPlaceInput placeholder:font-normal placeholder:text-sm text-DarkGreen"
                    placeholder="Username"
                    {...register("userName", { required: "Username is required" })}
                    type="text"
                    onChange={handleInputChange}
                    onPaste={handlePasteUsername} // Specific handler for username
                    id="username"
                  />
                  <div onClick={() => setClearUsername(true)} className="absolute right-0 top-1 text-bydefaultWhite bg-DarkGreen rounded-full">
                    <span className={`${userName ? '' : 'hidden'}`}><RxCross2 /></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="w-full flex gap-8 h-full items-center py-4 px-5 bg-loginfildBg rounded-t-sm">
                <label htmlFor="password" className="text-inputLabel">Password</label>
                <div className="relative w-full">
                  <input
                    className="focus:bg-loginfildBg w-full font-medium h-full items-center bg-loginfildBg rounded-t-sm text-sm focus:outline-none placeholder:grayPlaceInput placeholder:font-normal placeholder:text-sm text-DarkGreen font-serif"
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Minimum length is 6 characters" },
                      maxLength: { value: 16, message: "Maximum length is 16 characters" }
                    })}
                    type={showPassword ? 'text' : "password"}
                    onChange={handleInputChangePassword}
                    onPaste={handlePastePassword} // Specific handler for password
                    id="password"
                  />
                  <div className="absolute right-0 top-0 flex gap-1 h-full items-center">
                    <div className="text-bydefaultWhite bg-DarkGreen rounded-full m-2">
                      <span onClick={() => setClearPassword(true)} className={`${password ? '' : 'hidden'}`}><RxCross2 /></span>
                    </div>
                    <div onClick={() => setShowPassword(!showPassword)} className="text-bydefaultWhite rounded-full">
                      {showPassword ? <FaRegEye className="text-xl mt-2 text-white" /> : <FaEyeSlash className="text-xl mt-2 text-white" />}
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${errors.password ? 'bg-inputlartBg p-[3px]' : 'hidden'}`}>
                {errors.password && (
                  <div className="flex gap-2 items-center h-full">
                    <MdOutlineError className="text-alartColor" />
                    <span className="text-alartColor font-thin text-sm">{errors.password.message}</span>
                  </div>
                )}
              </div>
            </div>
            <Link to={"/forgotpassword"} className="w-full h-full flex justify-end items-center py-3">
              <div className="border-DarkGreen text-DarkGreen border px-2 py-1 rounded-sm flex items-center">
                <p className="text-[14px]">Forgot password?</p>
              </div>
            </Link>
            <div className="text-center">
              <button className="text-white w-full bg-DarkGreen py-2 rounded-sm">Login</button>
            </div>
          </form>
          <div className="text-white mt-4 text-sm justify-center flex w-full">
            <h1>
              <span>Don&apos;t Have An Verified?</span>
              <Link to={'/register'}>
                <span className="text-sm text-barndColor font-bold"> Verify</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
