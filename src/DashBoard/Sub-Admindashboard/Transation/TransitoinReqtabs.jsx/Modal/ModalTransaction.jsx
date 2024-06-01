import axios from "axios";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import bkash from '../../../../../../public/bkash.png';
import nagad from '../../../../../../public/nagad.png';
import rocket from '../../../../../../public/rocket.jpg';

const ModalTransaction = ({ item, setOpenModal, openModal }) => {


  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const status = form.status ? form.status.value : null;
    const transactionid = form.tnxid ? form.tnxid.value : null;
    const remark = form.remark.value;

    try {
      let response;
      if (item?.transactionType === 'deposite') {
        response = await axios.put(`https://pay-winbd-server.vercel.app/transactionFeedback?id=${item?._id}&status=${status}&note=${remark}`);
      } else if (item?.transactionType === 'withdraw') {
        response = await axios.put(`https://pay-winbd-server.vercel.app/transactionFeedback?id=${item?._id}&status=${transactionid}&note=${remark}`);
      }

      const data = response.data;
      console.log(data);

      if (data.message === 'Request status updated successfully' || data.message === 'Transaction ID updated successfully') {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Transaction ${status || 'Successfull'}`,
          showConfirmButton: false,
          timer: 1500
        });
        setOpenModal(false);
      } else if (data.message === 'Transaction not found') {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } catch (error) {
      console.log(error);
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

            <div className="w-full flex justify-between text-[10px] text-white text-sm border border-x-transparent border-t-transparent pb-2 border-b border-gray-200/30">
              <div className="flex gap-4">
                <img
                  src={`${item?.paymentMethod === 'bkash' ? bkash :
                    item?.paymentMethod === 'nogod' ? nagad :
                      item?.paymentMethod === 'rocket' ? rocket : ''}`}
                  alt=""
                  className="h-12 w-12 object-contain"
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

            <div className="w-full flex justify-between text-white text-sm">
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
              <textarea placeholder="Add a remark.." className="focus:outline-none w-full py-2 px-3 focus:border-transparent text-white min-h-10 md:min-h-20 rounded-md bg-GlobalGray" name="remark" id="remark"></textarea>

              <p className="w-full text-[10px] text-white md:text-sm text-start">Refarel: Hasi09</p>

              {item?.transactionType === 'deposite' ? (
                <div className="w-full flex justify-between gap-1 md:gap-5">
                  <button type="submit" name="statusApproved" value="Approved" className="bg-green-700 md:px-8 md:py-3 px-1 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Approved</button>
                  <button type="submit" name="statusverify" value="verify" className="bg-yellow-400 md:px-8 md:py-3 px-1 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Verify</button>
                  <button type="submit" name="statusRejected" value="Rejected" className="bg-red-500 md:px-8 md:py-3 px-1 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Rejected</button>
                </div>
              ) : (
                <div className="w-full">
                  <input className="w-full mb-4 py-2 px-3 text-white rounded bg-GlobalGray focus:outline-none" name="tnxid" type="text" placeholder="Transaction number" />
                  <button className="bg-green-600 hover:bg-green-700 transition duration-200 px-8 py-3 text-white rounded-md w-full" type="submit" name="statusConfirm" value="Confirm">Confirm</button>
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
