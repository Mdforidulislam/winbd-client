
const ModalInfoShow = ({ historyModal }) => {

    const { amount, date, requestStatus, time, transactionType,stutusNote ,number,paymentMethod } = historyModal;
    
    return (
        <div className="mt-6">
            {/* tile the transaction info */}
            <div className="flex justify-between">
                <h1 className="text-white">Transaction Record Details</h1>
                <p className="text-white bg-[#595959] p-1 rounded-sm text-[12px]">{requestStatus}</p>
            </div>
            {/* transaction info */}
            <div className="bg-[#4D4D4D] py-2 rounded-sm mt-4">
                {/*  */}
                <div className="flex justify-between text-white text-sm py-2 px-2">
                    <p className=" text-white text-[12px] capitalize ">No.</p>
                    <p className=" text-white text-[12px]">{number}</p>
                </div>
                {/*  */}
                <div className="flex justify-between text-white text-sm py-2 bg-[#595959] px-2">
                    <p className=" text-white text-[12px] capitalize">Type</p>
                    <p className=" text-white text-[12px] capitalize">{transactionType } Payment Gateway</p>
                </div>
                {/* payment Teyp */}
                <div className="flex justify-between text-white py-2 bg-[#595959] px-2">
                    <p className=" text-white text-[12px] capitalize">Bank Name</p>
                    <p className=" text-white text-[12px]">{ paymentMethod}</p>
                </div>
                {/*  */}
                <div className="flex justify-between text-white text-sm py-2 px-2">
                    <p className=" text-white text-[12px] capitalize">amount</p>
                    <p className=" text-white text-[12px] "><span className="text-xl">৳</span>{amount}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalInfoShow;