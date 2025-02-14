import axios from "axios";
import Swal from "sweetalert2";
import { IoCloseSharp } from "react-icons/io5";
import bkash from '/payment_logo/bkash.png';
import nagad from '/payment_logo/nagad.png';
import rocket from '/payment_logo/rocket.png';
import React, { useContext, useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { AuthContext } from "../../../../../Authentication/Authentication";

const ModalTransaction = ({ item, setOpenModal, openModal, activeTab ,data}) => {
  const [status, setStatus] = useState(null);
  const [isCopiedUsername, setIsCopiedUsername] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [isCopiedNumber, setIsCopiedNumber] = useState(false);
  const [isCopiedAmount, setIsCopiedAmount] = useState(false);
  const [isCopiedTrx, setIsCopiedTrx] = useState(false);
  const [showTransactionImageModal, setShowTransactionImageModal] = useState(false); // State to manage the visibility of the Transaction Image modal

  const { setRequestFilterId } = useContext(AuthContext);


  const handleChange = (event) => {
    const uppercaseValue = event.target.value.toUpperCase();
    setTransactionId(uppercaseValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const note = form.remark.value;

    try {
      let response;
      const transactionFeedbackUrl = `https://server.win-pay.xyz/transactionFeedback?id=${item?._id}`;
      const params = new URLSearchParams();
      params.append('note', note);
      params.append('tnxtype', item?.transactionType);
      params.append('userName', item?.userName);


      if (item?.transactionType === 'deposite') {
        params.append('status', status);
        response = await axios.put(transactionFeedbackUrl, null, { params });
      } else if (item?.transactionType === 'withdraw') {
        params.append('status', status);
        params.append('transactionId', transactionId);
        response = await axios.put(transactionFeedbackUrl, null, { params });
      }

      const data = response.data;


      if (data.message === 'Request status updated successfully' || data.message === 'Transaction ID updated successfully') {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Transaction ${status || 'Successful'}`,
          showConfirmButton: false,
          timer: 1500
        });
        setOpenModal(false);
        setRequestFilterId(item?._id)
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

  const handleCopy = (text, setState) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setState(true);
        toast.success('Copied successfully');
        setTimeout(() => {
          setState(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast.error('Failed to copy text.');
      });
  };

  const toggleTransactionImageModal = () => {
    setShowTransactionImageModal(!showTransactionImageModal);
  };

  // deleted turnover here
  const handleActionDeletedTurnover = async (id) => {
    const deletedResponse = await axios.delete(`https://server.win-pay.xyz/turnoverdeleted?id=${id}`);

    if (deletedResponse.data.message === "Successfully deleted the turnover") {
      toast.success(deletedResponse.data.message);
    } else {
      toast.success(deletedResponse.data.message);
    }
  }


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
          <div className="relative px-4 md:px-8 flex flex-col items-center justify-center space-y-4 w-full md:py-8 py-4">
            <div className="">
              <span onClick={() => setOpenModal(false)} className="absolute right-0 top-0 md:top-1 md:right-2 rounded-md text-white cursor-pointer text-2xl bg-red-600"><IoCloseSharp /></span>
            </div>

      

            <div className="w-full pr-5 flex justify-between text-[10px] text-white md:text-sm border border-x-transparent border-t-transparent pb-2 border-b border-gray-200/30">
              <div className="flex items-center gap-4">
                <img src={`${item?.paymentMethod === 'bkash' ? bkash :
                  item?.paymentMethod === 'nogod' ? nagad :
                    item?.paymentMethod === 'rocket' ? rocket : ''}`}
                  alt=""
                  className="h-8 w-8 md:h-12 md:w-12 object-contain"
                />
                <div className="flex flex-col gap-[2px] text-[10px] md:text-sm items-start">
                  {/* user name here */}
                  {item?.userName && (
                    <div className="flex justify-center items-center gap-2 mb-[2px] relative">
                      <p onClick={() => handleCopy(item?.userName, setIsCopiedUsername)} className="text-white text-[12px] md:text-[16px]">{item?.userName}</p>
                      <div
                        className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                        onClick={() => handleCopy(item?.userName, setIsCopiedUsername)}
                      >
                        {isCopiedUsername ? <FaCheck /> : <FaRegCopy />}
                      </div>
                    </div>
                  )}

                  {/* user number here */}

                  {item?.userNumber && (
                    <div className="flex justify-center items-center gap-2 mb-[2px] relative">
                      <p onClick={() => handleCopy(item?.userNumber, setIsCopiedNumber)} className="text-white">{item?.userNumber} </p>
                      <div
                        className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                        onClick={() => handleCopy(item?.userNumber, setIsCopiedNumber)}
                      >
                        {isCopiedNumber ? <FaCheck /> : <FaRegCopy />}
                      </div>
                    </div>
                  )}
                </div>
              </div>


              <div className="flex flex-col items-end justify-end pb-0.5">
                {item?.amount && (
                  <div className="flex justify-center items-center gap-2 mb-[2px] relative">
                    <p className="text-white md:text-sm">
                      {item?.amount ? (item?.offerAmount ? item?.amount + item?.offerAmount : item?.amount) : ''} TK
                    </p>
                    <div
                      className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                      onClick={() => handleCopy(item?.offerAmount ? item?.amount + item?.offerAmount : item?.amount, setIsCopiedAmount)}
                    >
                      {isCopiedAmount ? <FaCheck /> : <FaRegCopy />}
                    </div>
                  </div>
                )
                }

                {item?.transactionId ? (
                  <div className="flex justify-center items-center gap-2 relative">
                    <p onClick={() => handleCopy(item?.transactionId, setIsCopiedTrx)} className="text-white md:text-sm">{item?.transactionId}</p>
                    <div
                      className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                      onClick={() => handleCopy(item?.transactionId, setIsCopiedTrx)}
                    >
                      {isCopiedTrx ? <FaCheck /> : <FaRegCopy />}
                    </div>
                  </div>
                ) : item ? (
                  <div className="flex justify-center items-center gap-2 relative">
                    <p onClick={() => handleCopy( data?.totalTurnover , setIsCopiedTrx)} className="text-white md:text-sm">{data?.totalTurnover} Txn</p>
                    <div
                      className="absolute top-0 -right-5 flex justify-center items-center gap-1 text-[12px] text-LightGreen cursor-pointer"
                      onClick={() => handleCopy(data?.totalTurnover, setIsCopiedTrx)}
                    >
                      {isCopiedTrx ? <FaCheck /> : <FaRegCopy />}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center mt-[18px] items-center gap-2 relative">

                  </div>
                )}

              </div>
            </div>
            {
              (item?.transactionType === 'deposite' || item?.requestStatus === 'verify') && (
                <div className="w-full relative bg-GlobalGray p-2 rounded-sm flex justify-between text-[10px] text-white md:text-sm">
                  <div className="absolute left-0 top-[65%] w-full h-[1px] bg-DarkGreen bg-opacity-40"></div>
                  <div className="flex flex-col gap-1 items-start">
                    <p>Main Amount</p>
                    <p>Offer Amount</p>
                    <p>Total Amount</p>
                  </div>
                  <div className="flex flex-col text-DarkGreen gap-1 items-end">
                    <p>{item?.amount}</p>
                    <p>+ {item?.offerAmount ? item?.offerAmount : 0}</p>
                    <p>{item?.amount + (item?.offerAmount ? item.offerAmount : 0)}</p>
                  </div>

                </div>
              )
            }


        {/* icon of auto pay */}
          <div className="w-full h-full ml-0 mt-0 ">
           {
            item?.autoPay && (
              <div className="text-xl text-white mt-0 ml-0 ">
                <h1>Auto Payment</h1>
               
              </div>
            )
           }
        </div>


            {/* number show here authore and user */}
            <div className="flex justify-between w-full text-white">
              <div>
                <p>From  { item?.authoreNumber} </p>
              </div>
              <div>
                <p>{ item?.userNumber} To </p>
              </div>
            </div>

            {/* turnover ttitle here*/}

            <div className="w-full flex justify-between text-[10px] p-2 text-white md:text-sm">
              {item?.transactionType === 'deposite' ? (
                <div className="flex flex-col items-start">
    {
                      data?.oldTurnover && data?.oldTurnover.map((item, index) => (
                        <div key={item._id}>
                          <span>{ item.title}</span>
                        </div>
                      ))
                  }
                </div>
              ) : (
                <div className="flex flex-col items-start">
                  {
                      data?.turnoverList && data?.turnoverList.map((item, index) => (
                        <div key={item._id}>
                          <span>{ item.title}</span>
                        </div>
                      ))
                  }
                </div>
              )}

              {/* turnover amount here  */}

              {item?.transactionType === 'deposite' ? (
                <div>
                     <div className="">
                  {data?.oldTurnover && data?.oldTurnover.length > 0 ? (
                    data?.oldTurnover && data.oldTurnover.map((item, index) => (
                      <div key={item?._id} className="">
                              <p className="flex items-center gap-1">{item?.turnover}<span onClick={()=>handleActionDeletedTurnover(item?._id)}><AiOutlineDelete className="text-2xl cursor-pointer"/> </span></p>
                        </div>
                        ))
                      ) : (
                    <div>No data available</div>
                  )}
                </div>
               </div>
              ) : (
                <div className="flex flex-col items-end">
                  {
                      data?.turnoverList && data?.turnoverList.map((item, index) => (
                        <div key={item._id}>
                          <span>{ item?.turnover}</span>
                        </div>
                      ))
                  }
                </div>
              )}
            </div>



            <form onSubmit={handleSubmit} className="space-y-3 w-full">
              <div className="flex items-center gap-2 mb-4">
                <img onClick={toggleTransactionImageModal} src={item?.transactionImage}
                  alt=""
                  className={`${item?.transactionType === 'deposite' || item?.transactionType === 'verify' ? ' h-8 w-8 cursor-pointer md:h-12 rounded-md md:w-12 object-cover' : 'hidden'}`}
                />
                <textarea placeholder="Remark: Your deposit is in progress, please wait.." className="text-[12px] w-full py-2 px-3 text-white rounded bg-GlobalGray focus:outline-none" name="remark" id="remark"></textarea>
              </div>
              {!item?.requestStatus && item?.transactionType === 'deposite' ? (
                <div className="w-full flex justify-between gap-5 px-1">
                  <button type="submit" onClick={() => setStatus("Approved")} className="bg-green-500 md:py-3 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Approved</button>
                  <button type="submit" onClick={() => setStatus("verify")} className="bg-orange-500 md:py-3 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Verify</button>
                  <button type="submit" onClick={() => setStatus("Rejected")} className="bg-red-500 md:py-3 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Rejected</button>
                </div>
              ) : null
              }
              {!item.requestStatus && item.transactionType === 'withdraw' ? (
                <div className="w-full">
                  <input
                    className="w-full mb-4 py-2 px-3 text-white rounded bg-GlobalGray focus:outline-none text-[12px]"
                    name="tnxid"
                    type="text"
                    placeholder="Transaction id"
                    value={transactionId}
                    onChange={handleChange}
                  />
                  <div className="flex gap-3">
                    <button className="bg-green-600 hover:bg-green-700 transition duration-200 md:px-8 pb-0.5 md:py-3 text-white rounded-md w-full" type="submit" onClick={() => setStatus("success")}>Confirm</button>
                    <button className="bg-orange-500 hover:bg-red-600 transition duration-200 md:px-8 pb-0.5 md:py-3 text-white rounded-md w-full" type="submit" onClick={() => setStatus("verify")}>Verify</button>
                    <button className="bg-red-600 hover:bg-red-700 transition duration-200 md:px-8 pb-0.5 md:py-3 text-white rounded-md w-full" type="submit" onClick={() => setStatus("Rejected")}>Reject</button>
                  </div>
                </div>
              ) : null
              }
              {item.requestStatus === 'verify' ? (
                <div className="w-full">
                    <input
                    className="w-full mb-4 py-2 px-3 text-white rounded bg-GlobalGray focus:outline-none text-[12px]"
                    name="tnxid"
                    type="text"
                    placeholder="Transaction id"
                    value={transactionId}
                    onChange={handleChange}
                  />
                  <div className="w-full flex justify-between gap-5 px-1">
                    <button type="submit" onClick={() => setStatus("Approved")} className="bg-green-500 md:py-3 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Approved</button>
                    <button type="submit" onClick={() => setStatus("Rejected")} className="bg-red-500 md:py-3 py-[2px] text-[10px] text-white tracking-wider font-medium md:text-sm rounded-sm md:rounded-md w-full">Rejected</button>
                 </div>
                </div>
              ) : null
              }

            </form>
          </div>
        </div>
       
      </div >

      {/* Transaction Image Modal */}
      {showTransactionImageModal && item?.transactionImage && (
        <div
          onClick={toggleTransactionImageModal}
          className="fixed z-[100] flex items-center text-white justify-center inset-0 bg-black/20 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-[90%] md:w-1/4 max--h-96 rounded-lg bg-GlobalGray p-4 text-center drop-shadow-2xl">
            <button onClick={toggleTransactionImageModal} className="absolute top-2 right-2 text-2xl" ><IoCloseSharp /> </button>
            <h2 className="text-lg font-semibold mb-4">Transaction Image</h2>
            <img src={item?.transactionImage} alt="Transaction" className="w-full h-full rounded-md object-contain" />
          </div>
        </div>
      )}
    </div >
  );
};

export default ModalTransaction;


