
const ModalInfoShow = ({ historyModal }) => {

    const { amount, date, requestStatus, time, transactionType, stutusNote, number, paymentMethod, transactionId } = historyModal;

    return (
        <div className="mt-6 text-white">
            {/* tile the transaction info */}
            <div className="flex justify-between mb-3">
                <h1 className="">Transaction Record Details</h1>
                <p className={`px-2 py-[2px] capitalize rounded-md text-[12px] ${
                    requestStatus === 'success' ? 'bg-green-600' :
                    requestStatus === 'Approved' ? 'bg-green-600' :
                    requestStatus === 'Processing' ? 'bg-yellow-500' : 
                    requestStatus === 'Rejected' ? 'bg-red-600' : ''}`}>
                    {requestStatus}
                </p>

            </div>
            <div className="flex justify-between text-sm py-2 px-2 bg-[#4D4D4D]">
                <p className="text-[12px] capitalize ">No.</p>
                <p className="text-[12px]">{number}</p>
            </div>
            <div className="flex justify-between text-sm py-2 px-2 bg-[#595959]">
                <p className="text-[12px] capitalize">Type</p>
                <p className="text-[12px] capitalize">{transactionType} Payment Gateway</p>
            </div>
            <div className="flex justify-between py-2 px-2 bg-[#4D4D4D]">
                <p className="text-[12px] capitalize">Bank Name</p>
                <p className="text-[12px]">{paymentMethod}</p>
            </div>
            <div className="flex h-9 justify-between text-sm py-2 px-2 bg-[#595959] relative">
                <p className="text-[12px] capitalize">amount</p>
                <p className="text-[12px] capitalize absolute top-0 right-2"><span className="text-xl">৳</span>{amount}</p>
            </div>
            <div className="flex justify-between  text-sm py-2 px-2 bg-[#4D4D4D]">
                <p className="text-[12px] capitalize">TransactionId</p>
                <p className="text-[12px] text-end">{transactionId}</p>
            </div>
        </div>
    );
};

export default ModalInfoShow;