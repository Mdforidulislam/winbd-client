import axios from "axios";
import { useEffect, useState } from "react";
import bkash from '../../../../../public/bkash.png';
import nagad from '../../../../../public/nagad.png';
import rocket from '../../../../../public/rocket.jpg';
import { MdOutlineDoubleArrow } from "react-icons/md";
import ModalTransaction from "./Modal/ModalTransaction";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Components/Loader/Loader";
// import { Pagination } from "../../../../Components/Shared/Pagination";



const Verify = () => {
    const [openModal, setOpenModal] = useState(false);
    const [dataList, setData] = useState(null);
    const [authoreId, setauthoreId] = useState(); // set author id here ;
    const activeTab = 'verify';
    useEffect(() => {
        const authurId = JSON.parse(localStorage.getItem("userData"))?.uniqueId;
        setauthoreId(authurId);
    }, [])

    const { isLoading, data, refetch } = useQuery({

        queryKey: ['QueryDataDeposite', authoreId],
        queryFn: () =>
            fetch(`https://sever.win-pay.xyz/getingVerifydata?authoreId=${authoreId}`).then((res) =>
                res.json(),
            ),
        refetchInterval: 2000, // Refresh every 5 seconds
    });




    const handleModal = (item) => {
        setData(item);
        setOpenModal(true);
    };



    return (
        <div className="">
            <div className="md:flex md:justify-center md:items-center overflow-x-auto">
                <table className="w-full md:w-[1200px] text-white shadow-md border-LightGreen ">
                    <thead>
                        <tr className="bg-DarkGreen text-white">
                            <th className="md:py-3 md:rounded-tl-md py-1 px-2 md:pl-6 md:px-6 text-[12px] md:text-lg text-left border-b border-LightGreen">Type</th>
                            <th className="md:py-3 py-1 px-2 md:pl-5 md:pr-5 text-[12px] md:text-lg text-left border-b border-LightGreen">Name</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 pl-5 md:pl-7 text-[12px] md:text-lg text-left border-b border-LightGreen">Time</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-LightGreen">Amount</th>
                            <th className="py-3 md:rounded-tr-md text-left border-b border-LightGreen pl-6 hidden md:table-cell">Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan="5">
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            data?.queryVerifyData?.map((item, i) => (
                                <tr key={i} onClick={() => handleModal(item)} className={`${i % 2 === 0 ? 'bg-[#2f2f2f]' : 'bg-[#393939]'} hover:bg-black/20 cursor-pointer transition duration-300`}>
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
                                    <td className="py-2 text-[12px] md:text-sm pl-8 cursor-pointer px-6 border-b border-gray-700 text-LightGreen hidden md:table-cell ">Action</td>
                                </tr>
                            ))
                        )
                        }
                    </tbody>
                </table>
            </div>
            {/* <Pagination storeData={storeData} setPageNumbers={setPageNumbers} /> */}
            {openModal && <ModalTransaction setOpenModal={setOpenModal} activeTab={activeTab} openModal={openModal} item={dataList} />}
        </div>
    );
};

export default Verify;
