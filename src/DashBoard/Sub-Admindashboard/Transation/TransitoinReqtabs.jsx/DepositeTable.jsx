import axios from "axios";
import { useEffect, useState } from "react";
import bkash from '../../../../../public/bkash.png';
import nagad from '../../../../../public/nagad.png';
import rocket from '../../../../../public/rocket.jpg';
import ModalTransaction from "./Modal/ModalTransaction";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Pagination } from "../../../../Components/Shared/Pagination";
import Loader from "../../../../Components/Loader/Loader";

const DepositeTable = () => {
    const [storeData, setStoreData] = useState([]);
    const [localData, setLocalData] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [pageNumber, setPageNumbers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
        setLocalData(authurId);
    }, []);

    useEffect(() => {
        const trnasctionDeposite = async () => {
            if (localData) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://pay-winbd-server.vercel.app/transactionReqDopsite?authurId=${localData}`);
                    setStoreData(response.data?.queryDepositeData);
                } catch (error) {
                    console.error('Error fetching deposit data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        trnasctionDeposite();
    }, [localData]);

    const handleModal = (item) => {
        setData(item);
        setOpenModal(true);
    };

    return (
        <div className="">
            <div className="md:flex md:justify-center md:items-center overflow-x-auto">
                <table className="w-full md:w-[1200px] text-white shadow-md border-gray-500 ">
                    <thead>
                        <tr className="bg-GlobalGray text-white">
                            <th className="md:py-3 py-1 px-2 md:pl-6 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500">Type</th>
                            <th className="md:py-3 py-1 px-2 md:pl-5 md:pr-5 text-[12px] md:text-lg text-left border-b border-gray-500">Name</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 pl-5 md:pl-7 text-[12px] md:text-lg text-left border-b border-gray-500">Time</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500">Amount</th>
                            <th className="py-3 text-left border-b border-gray-500 pl-6 hidden md:table-cell">Submit</th>
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
                            storeData?.map((item, i) => (
                                <tr key={i} onClick={() => handleModal(item)} className={`${i % 2 === 0 ? 'bg-[#2f2f2f]' : 'bg-[#393939]'} cursor-pointer transition duration-300`}>
                                    <td className="py-2 md:px-6 px-3 md:pl-7 border-b border-gray-700">
                                        <img
                                            src={
                                                item?.paymentMethod === 'bkash' ? bkash :
                                                    item?.paymentMethod === 'nogod' ? nagad :
                                                        item?.paymentMethod === 'rocket' ? rocket : ''
                                            }
                                            alt={item?.paymentMethod}
                                            className="h-6 md:h-8 w-6 md:w-8 object-contain"
                                        />
                                    </td>
                                    <td className="py-2 text-[12px] md:text-sm px-3 md:px-6 md:pl-7 pl-4 border-b border-gray-700">{item?.userName}</td>
                                    <td className="py-2 text-[12px] md:text-sm px-3 md:px-6 md:pl-7 border-b border-gray-700">{item?.TimeDay}</td>
                                    <td className="py-2 text-[12px] md:text-sm px-3 md:px-6 md:pl-12 pl-5 border-b border-gray-700">{item?.amount}</td>
                                    <td className="py-2 text-[12px] md:text-sm pl-12 cursor-pointer px-6 border-b border-gray-700 hidden md:table-cell"><MdOutlineDoubleArrow className="cursor-pointer" /></td>
                                </tr>
                            ))
                        )
                        }
                    </tbody>
                </table>
            </div>
            <Pagination storeData={storeData} setPageNumbers={setPageNumbers} />
            {openModal && <ModalTransaction setOpenModal={setOpenModal} openModal={openModal} item={data} />}
        </div>
    );
};

export default DepositeTable;
