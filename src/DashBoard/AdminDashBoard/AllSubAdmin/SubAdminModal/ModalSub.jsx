import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../../Components/Button/Button";
import "./Button.css";
import axios from "axios";
import Swal from "sweetalert2";

export const ModalSub = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ================================= insert subAdmin ========================================

  const onSubmit = (data) => {
    console.log(data);
    axios.post("https://pay-winbd-server.vercel.app/insertSubAdmin", data, {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      console.log(response.data); // Logging the response data from the server
      if (response.data.message === 'subadmin insert successfully') {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "User Sucessfully save",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "users already exite",
        
        });
      }
    })
    .catch((error) => {
      console.error("There was a problem with the Axios operation:", error);
    });
  };

  // ================================ end the insert data ======================================
  return (
    <div className=" flex w-72 items-center justify-start">
      <div onClick={() => setOpenModal(true)} className="box-1">
        <div className="btn btn-one">
          <span>Add Sub-Admin</span>
        </div>
      </div>
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${
          openModal ? "opacity-1 visible" : "invisible opacity-0"
        } inset-0 bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute w-[600px] rounded-lg bg-[#131932]  p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white ${
            openModal
              ? "opacity-1 translate-y-0 duration-300"
              : "translate-y-20 opacity-0 duration-1000"
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-4 w-full py-8 px-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className=" px-6 w-full space-y-12"
            >
              {/* Sub admin uniqu id here */}
              <div className=" ">
                <div className="">
                  <div>
                    <input
                      className="w-full py-3 px-3 rounded-md text-white bg-slate-900 focus:placeholder:text-white focus:border-DarkGreen outline-none"
                      placeholder="Unique id"
                      {...register("uniqueId", { required: true })}
                      type="text"
                      id=""
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        Enter subAdmin Unique id
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* SubAdmin  Name here */}
              <div className=" ">
                <div className=" ">
                  <div>
                    <input
                      className="w-full py-3 px-3 rounded-md text-white bg-slate-900 focus:placeholder:text-white focus:border-DarkGreen outline-none"
                      placeholder="User Name"
                      {...register("subAdmin", { required: true })}
                      type="text"
                      id=""
                    />
                    {errors.email && (
                      <span className="text-red-600">
                        Enter customer User name
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* SubAdmin Phone Number here  */}
              <div className=" ">
                <div className="  ">
                  <div>
                    <input
                      className="w-full py-3 px-3 rounded-md text-white bg-slate-900 focus:placeholder:text-white focus:border-DarkGreen outline-none"
                      placeholder="Phone Number"
                      {...register("phoneNumber", { required: true })}
                      type="text"
                      id=""
                    />
                    {errors.password && (
                      <span className="text-red-600">Enter Phone Number</span>
                    )}
                  </div>
                </div>
              </div>
              {/* SubAdmin Password */}
              <div className=" ">
                <div className=" space-y-1  ">
                  <div>
                    <input
                      className="w-full py-3 px-3 rounded-md text-white bg-slate-900 focus:placeholder:text-white focus:border-DarkGreen outline-none"
                      placeholder="Password"
                      {...register("password", { required: true })}
                      type="password"
                      id=""
                    />
                    {errors.number && (
                      <span className="text-red-600">
                        Enter Your Password Here
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className=" text-center mt-5  ">
                <Button
                  divClass="hover:bg-white "
                  btnClass="hover:bg-[#131932] text-white"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
