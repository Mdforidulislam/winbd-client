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
  const [userfild, setUserfild] = useState(false);
  const [password, setPassword] = useState(false);
  const [passcorss, setPasswordCros] = useState(false);
  const { setValue, register, watch, handleSubmit, formState: { errors }, } = useForm();
  const { loginUserNamePassword, role } = useContext(AuthContext)
  const navigate = useNavigate();
  // console.log(role, 'from login page');
  // console.log('from login page', redirectUrl);

  // save the register authorId or Uniqui id here 



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://pay-winbd-server.vercel.app/getingDynamicallyUrl');
        setRedirectUrl(res.data.data[0].redirectUrl);
      } catch (error) {
        console.error('Error fetching the data:', error);
      }
    };

    fetchData();
  }, []);

  // login working here ========================

  const onSubmit = (data) => {
    loginUserNamePassword(data.userName, data.password);
    // need to take the response and with the waiting time need to show proccessing intead of login and make the button delete
  };

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
  }, [userfild, setValue, passcorss]);

  // show the condtion crose bar !!
  const userName = watch('userName', '');
  const passworduser = watch('password', '');

  // input value upper case and loware case

  const handleInputChange = (e) => {
    let value = e.target.value || e;
    // Convert to lowercase
    value = value.toLowerCase().replace(/\s+/g, ' ').trim();
    // Minimize spaces
    value = value.replace(/\s+/g, ' ').trim();
    setValue('userName', value);
  };
  //  handleChangePassword Remove the space

  const handleInputChangePassword = (e) => {
    let value = e.target.value;
    // Minimize spaces
    value = value.replace(/\s+/g, ' ').trim();
    setValue('password', value);
  };

  //  remove copy past space white space 
  const handleInputPaste = (e) => {
    // Get pasted text and remove white spaces
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const trimmedText = pastedText.replace(/\s+/g, '');
    // Manually set the input value
    e.target.value = trimmedText;
    console.log(e.target.value);
    // Trigger the input change handler
    handleInputChange(e);
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

  return (
    <div className=" w-full flex min-h-screen bg-[#111114]">
      <div className=" h-full w-full md:flex justify-center items-center md:min-h-screen ">
        <div className="md:w-1/3">

          <div className="w-full text-white py-1 mb-2 md:mb-12 flex items-center bg-GlobalDarkGray px-2">

            <Link to={redirectUrl} className="relative z-10">
              <div className="">
                <span className="text-white font-bold text-3xl"><MdOutlineKeyboardArrowLeft /></span>
              </div>
            </Link>

            <div className="flex-grow justify-center -ml-8">
              <h1 className="text-center py-2 text-sm capitalize font-medium">winBD</h1>
            </div>

          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-2">
            {/* fast fild here */}
            <div className=" border-b border-gray-500 ">
              <div className="w-full flex gap-7 h-full items-center py-4 px-5 bg-loginfildBg rounded-t-sm">
                <label htmlFor="" className="text-inputLabel">Username</label>
                <div className="relative w-full">
                  <input
                    className="focus:bg-loginfildBg w-full  font-medium  h-full items-center  bg-loginfildBg rounded-t-sm  text-sm  focus:outline-none  placeholder:grayPlaceInput placeholder:font-normal placeholder:text-sm text-DarkGreen"
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
            <div className="">
              <div className="w-full flex gap-8 h-full items-center py-4 px-5 bg-loginfildBg rounded-t-sm">
                <label htmlFor="" className="text-inputLabel">Password</label>
                <div className="relative w-full">
                  <input
                    className="-full h-full items-center  bg-loginfildBg rounded-t-sm  text-sm  focus:outline-none  placeholder:grayPlaceInput placeholder:font-normal placeholder:text-sm text-DarkGreen font-serif"
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
                  <div className="absolute right-0 top-0 flex gap-1 h-full items-center">

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
                  <div className="flex gap-2 items-center h-full">
                    <span className="text-alartColor "><MdOutlineError /></span>
                    <span className="text-alartColor font-thin text-sm"> {errors.password.message}</span>
                  </div>

                )}
              </div>
            </div>
            {/* forgot password here */}
            <Link to={"/forgotpassword"} className="w-full h-full flex justify-end items-center py-3">
              <div className="border-DarkGreen text-DarkGreen border px-2 py-1 rounded-sm flex items-center">
                <p className="text-[14px]">Forgot password?</p>
              </div>
            </Link>
            {/* login button here */}
            <div className=" text-center">
              <button className="text-white w-full bg-DarkGreen py-2 rounded-sm ">Login</button>
            </div>
            {/* sing up link here */}
          </form>
          <div className=" text-white mt-4 text-sm justify-center flex w-full">
            <h1 className="">
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
