import axios from "axios";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import bkash from '../../../../../../public/bkash.png';
import nagad from '../../../../../../public/nagad.png';
import rocket from '../../../../../../public/rocket.jpg';
import { useState } from "react";

const ModalTransaction = ({ item, setOpenModal, openModal }) => {
  const [status, setStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const transactionId = form.tnxid ? form.tnxid.value : null;
    const note = form.remark.value;

    try {
      let response;
      const transactionFeedbackUrl = `https://sever.win-pay.xyz/transactionFeedback?id=${item?._id}`;
      const params = new URLSearchParams();
      params.append('note', note);

      if (item?.transactionType === 'deposite') {
        params.append('status', status);
        response = await axios.put(transactionFeedbackUrl, null, { params });
      } else if (item?.transactionType === 'withdraw') {
        params.append('status', transactionId);
        response = await axios.put(transactionFeedbackUrl, null, { params });
      }

      const data = response.data;
      console.log(data ,status,transactionId,note);

      if (data.message === 'Request status updated successfully' || data.message === 'Transaction ID updated successfully') {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Transaction ${status || 'Successful'}`,
          showConfirmButton: false,
          timer: 1500
        });
        setOpenModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex items-center justify-start">
      <div
        onClick={() => setOpenModal(false)}
        className={`fixed z-[100] flex items-center justify-center ${openModal ? "opacity-1 visible" : "invisible opacity-0"} inset-0 bg-black/20 backdrop-blur-sm duration-100`}
      >
        <div
          onClick={(e_) => e_.stopPropagation()}
          className={`absolute w-[90%] md:w-1/3 rounded-lg bg-GlobalDarkGray p-2 text-center drop-shadow-2xl ${openModal
            ? "opacity-1 translate-y-0 duration-300"
            : "translate-y-20 opacity-0 duration-1000"
            }`}
        >
          <div className="relative px-4 md:px-12 flex flex-col items-center justify-center space-y-4 w-full py-8 ">

            <div className="">
              <span onClick={() => setOpenModal(false)} className="absolute top-0 right-0 rounded-md text-white cursor-pointer text-2xl bg-red-600"><IoCloseSharp /></span>
            </div>

            <div className="w-full flex justify-between text-[10px] text-white md:text-sm border border-x-transparent border-t-transparent pb-2 border-b border-gray-200/30">
              <div className="flex gap-4">
                <img
                  src={`${item?.paymentMethod === 'bkash' ? bkash :
                    item?.paymentMethod === 'nogod' ? nagad :
                      item?.paymentMethod === 'rocket' ? rocket : ''}`}
                  alt=""
                  className="h-6 w-6 md:h-12 md:w-12 object-contain"
                />
                <div className="flex flex-col items-start">
                  <p>{item?.userName}</p>
                  <p>{item?.number}</p>
                </div>
              </div>
              <div className="flex flex-col items-start">
                <p>{item?.amount}</p>
                <p>{item?.transactionId}</p>
              </div>
            </div>

            <div className="w-full flex justify-between text-[10px] text-white md:text-sm">
              <div className="flex flex-col items-start">
                <p>Old Turnover</p>
                <p>New Turnover</p>
              </div>
              <div className="flex flex-col items-start">
                <p>15000</p>
                <p>23423wer3423</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 w-full">
              <textarea placeholder="Remark: Your deposit is in progress, please wait.." className="focus:outline-none w-full p-1 md:p-3 focus:border-transparent md:text-lg text-white text-[10px] min-h-10 md:min-h-40 rounded-md bg-GlobalGray" name="remark" id="remark"></textarea>

              <p className="w-full text-[10px] text-white md:text-sm text-start">Refarel: Hasi09</p>

            {item?.transactionType === 'deposite' ? (
              <div className="w-full flex justify-between gap-1 md:gap-5">
                <button type="submit" onClick={() => setStatus("Approved")} className="bg-green-700 md:px-8 md:py-3 px-1 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Approved</button>
                <button type="submit" onClick={() => setStatus("verify")} className="bg-yellow-400 md:px-8 md:py-3 px-1 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Verify</button>
                <button type="submit" onClick={() => setStatus("Rejected")} className="bg-red-500 md:px-8 md:py-3 px-1 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Rejected</button>
              </div>
            ) : (
              <div className="w-full">
                <input className="w-full mb-4 py-2 px-3 text-white rounded bg-GlobalGray focus:outline-none" name="tnxid" type="text" placeholder="Transaction number" />
                <button className="bg-green-600 hover:bg-green-700 transition duration-200 px-8 py-3 text-white rounded-md w-full" type="submit" onClick={() => setStatus("Confirm")}>Confirm</button>
              </div>
            )}
          </form>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ModalTransaction;