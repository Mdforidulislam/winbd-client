import axios from "axios";
import bkash from '/payment_logo/bkash.png';
import nogod from '/payment_logo/nagad.png';
import rocket from '/payment_logo/rocket.png';
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UpdateModal from "./UpdateModal";

const AddNumber = () => {
  const [allPaymentMethod, setAllPaymentMehod] = useState([]); // set the payment mehtod 


  // here all the payment mehtod logo
  const paymenetLogo = {
    bkash: bkash,
    nogod: nogod,
    rocket: rocket,
  };

  // geitng athurization access from the others access

  const getUniqueIdLocal = JSON.parse(localStorage.getItem('userData'))?.uniqueId;


  // ================================ start input fild handlefunction =======================
  const handleAllValue = (e) => {
    e.preventDefault();

    // Access form data from event.target
    const formData = new FormData(e.target);
    const number = formData.get("number");
    const transactionType = formData.get("transactionType");


    const transactionMethod = formData.get("transactionMethod");
    const paymentLogoDynamice = paymenetLogo[transactionMethod]
    const paymenetList = { number, transactionType, transactionMethod, Logo: paymentLogoDynamice, authorId: getUniqueIdLocal };

    //   ======================== add tranaction number ==========================

    axios.post("https://server.win-pay.xyz/addTransaction", paymenetList, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {

        if (response.data.message === 'insert data Sucessfully') {
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
            text: "Payment Method Already exite",

          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the Axios operation:", error);
      });
  };


  // ========================= geting paymentMethod face  ==============================

  useEffect(() => {
    
    if (getUniqueIdLocal) {
      axios.get(`https://server.win-pay.xyz/getingPaymentmethod?uniqueId=${getUniqueIdLocal}`)
        .then(data => {
          setAllPaymentMehod(data.data.getingPaymentMehod);

        })
    }
  }, [getUniqueIdLocal])


  // ====================== configuration active and deactive and update ===========================

  const handleConfiguration = (number, id) => {

    axios.patch("https://server.win-pay.xyz/updatePaymentMethod/", { number, id }, {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (response.data.message === 'update data sucessfully') {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Number Sucessfully Update",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "don't update the number",

          });
        }
      })
      .catch((error) => {
        console.error("There was a problem with the Axios operation:", error);
      });
  }


  console.log(allPaymentMethod,'check allow payment method')


  return (
    <div className="my-4 px-2">
      <form className="flex flex-col md:flex-row justify-center gap-4" onSubmit={handleAllValue}>
       
        <div>
          <input
            type="text"
            name="number"
            placeholder="Enter your Number"
            className="px-4 text-white w-full max-w-[400px] py-3 rounded-md bg-[#222947] focus-visible:outline-none"
          />
        </div>

        <div className="">
          <select name="transactionType" className="w-full max-w-[400px] focus:outline-none  py-3 bg-[#222947] px-10 flex justify-center text-white rounded-md">
            <option selected>Select personal or agent</option>
            <option value={"personal"}>Personal</option>
            <option value={"agent"}>Agent</option>
            <option value={"payment"}>payment</option>
          </select>
        </div>

        <div className="">
          <select name="transactionMethod" className="w-full max-w-[400px] py-3 bg-[#222947] px-10 flex justify-center text-white rounded-md">
            <option selected>Select Method</option>
            <option value={'bkash'}> bkash</option>
            <option value={"nogod"}>Nagad</option>
            <option value={"rocket"}>Rocket</option>
          </select>
        </div>

        <div>
          <button
            className="btn text-white bg-[#283673] hover:bg-[#4860c7] rounded-md"
            type="submit"
          >
            Add Payment System
          </button>
        </div>
      </form>

      {/* All the PaymentMethod Card show here */}
      <div className="grid lg:grid-cols-2 gap-5 md:grid-cols-2 grid-cols-1 ">
        {
          allPaymentMethod?.map((item) => (
            <div key={item._id} className="shadow-md shadow-gray-700 mx-auto my-20 flex flex-col  items-center justify-center md:flex-row">
              <div className="group border relative h-[160px] lg:w-[250px] sm:w-[350px]">
                <img
                  width={100}
                  height={100}
                  className="h-full w-full border-l scale-105 transform rounded-lg bg-[#101733] "
                  src={item.Logo}
                  alt="payment"
                />
              </div>

              <div className=" space-y-1  rounded-br-lg border-r rounded-tr-lg  bg-black/70 py-8 px-6 text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] dark:bg-[#18181B] md:w-[300px] dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">
                <div className="space-y-1  w-full">
                  <div className="flex justify-center items-center w-full h-full mb-7">
                    <div className="w-full ">
                      <p className="text-white text-left">Status: {item.status}</p>
                      <p className="text-white block w-full  text-md capitalize text-left">
                        {item.transactionType} : {item.number}
                      </p>

                    </div>
                  </div>
                </div>

                {/* update section and status change section here  */}
                <div className="flex flex-wrap items-center justify-between">
                  <button onClick={() => handleConfiguration('active', item._id)} className="border-b-2  text-green-400 border-green-700 hover:text-green-100">
                    Active
                  </button>
                  <button onClick={() => handleConfiguration('deActive', item._id)} className="border-b-2  text-red-400 border-red-700  hover:text-red-100">
                    Deactive
                  </button>
                  <button className="border-b-2  text-yellow-400 border-yellow-500 hover:text-yellow-100">
                    <UpdateModal id={item._id} />
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default AddNumber;
