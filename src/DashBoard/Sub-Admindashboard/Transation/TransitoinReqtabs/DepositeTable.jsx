import { useContext, useEffect, useState } from "react";    
import ModalTransaction from "./Modal/ModalTransaction";
import Loader from "../../../../Components/Loader/Loader";
import { AuthContext } from "../../../../Authentication/Authentication";
import axios from "axios";

const DepositeTable = ({uniqueValue,tab}) => {
    const [openModal, setOpenModal] = useState(false);
    const [uniqueId, setUniqueId] = useState();
    const [loading, setLoading] = useState(true);
    const [userReqData, setUserReqData] = useState([]);
    const [dataList, setDataList] = useState(null);
    const { requestFilterId } = useContext(AuthContext);

    const activeTab = 'deposit';

    // Retrieve userId from localStorage and set it in the context
    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
        setUniqueId(authurId);
        
    }, []);

    //  geting users Transaction request

    useEffect(() => {
        if (!uniqueId) return
        const getingUserResquestInfo = async () => {
            const response = await axios.get(`https://server.winpay.online/transactionReqDopsite?authurId=${uniqueId}`);
            setUserReqData(response?.data);
            setLoading(false)

        }
        getingUserResquestInfo()
 
    }, [uniqueId, tab , uniqueValue]);


    //   filter data here
    
    const dataFilter = Array.isArray(userReqData?.queryDepositeData) ? userReqData?.queryDepositeData?.filter(item => item._id !== requestFilterId) : userReqData?.queryDepositeData;



    const handleModal = (item) => {
        setDataList(item);
        setOpenModal(true);
    };


    return (
        <div className="">
            <div className="md:flex md:justify-center md:items-center overflow-x-auto">
                <table className="w-full md:w-[1200px] text-white shadow-md border-LightGreen ">
                    <thead>
                        <tr className="bg-DarkGreen text-white">
                            <th className="md:py-3 md:rounded-tl-md py-1 px-2 md:pl-6 md:px-6 text-[12px] md:text-lg text-left border-b border-LightGreen">Type</th>
                            <th className="md:py-3 py-1 px-2 md:pl-5 pl-3 md:pr-5 text-[12px] md:text-lg text-left border-b border-LightGreen">Name</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 pl-5 md:pl-7 text-[12px] md:text-lg text-left border-b border-LightGreen">Time</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-LightGreen">Amount</th>
                            <th className="py-3 md:rounded-tr-md text-left border-b border-LightGreen pl-6 hidden md:table-cell">Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5">
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            dataFilter?.map((item, i) => (
                                <tr key={i} onClick={() => handleModal(item)} className={`${i % 2 === 0 ? 'bg-[#2f2f2f]' : 'bg-[#393939]'} hover:bg-black/20 cursor-pointer transition duration-300`}>
                                    <td className="py-2 md:px-6 px-3 md:pl-7 border-b border-gray-700">
                                        <img
                                            src={
                                                item?.paymentMethod === 'bkash' ? 'https://i.ibb.co/C0mhx9D/bkash.png' :
                                                    item?.paymentMethod === 'nogod' ? 'https://i.ibb.co/qxbhZVX/nagad.png' :
                                                        item?.paymentMethod === 'rocket' ? 'https://i.ibb.co/q0t3nTP/rocket.jpg' : ''
                                            }
                                            alt={item?.paymentMethod}
                                            className="h-6 md:h-8 w-6 md:w-8 object-contain"
                                        />
                                    </td>
                                    <td className="py-2 text-[12px] md:text-sm px-3 md:px-6 md:pl-7 pl-4 border-b border-gray-700">{item?.userName}</td>
                                    <td className="py-2 text-[12px] md:text-sm px-3 md:px-6 md:pl-7 border-b border-gray-700">{item?.TimeDay}</td>
                                    <td className="py-2 text-[12px] md:text-sm px-3 md:px-6 md:pl-12 pl-5 border-b border-gray-700">{item?.amount}</td>
                                    <td className="py-2 text-[12px] md:text-sm pl-8 cursor-pointer px-6 border-b border-gray-700 text-LightGreen hidden md:table-cell ">Action</td>
                                </tr>
                            ))
                        )
                        }
                    </tbody>
                </table>
            </div>
            {openModal && <ModalTransaction setOpenModal={setOpenModal} activeTab={activeTab} openModal={openModal} item={dataList} data={userReqData} />}
        </div>
    );
};

export default DepositeTable;
