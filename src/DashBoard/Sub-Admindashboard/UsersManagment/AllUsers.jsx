import { Pagination } from '../../../Components/Shared/Pagination';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import Loader from '../../../Components/Loader/Loader';
import { AllUserModal } from '../../../Components/Modals/AllUserModal';

const AllUsers = () => {
    const [pageNumber, setPageNumbers] = useState(0);
    const [searchData, setSearchData] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState(null);
    const [storeData, setStoreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const uniqueId = JSON.parse(localStorage.getItem('userData'))?.uniqueId;

    const handleActionSearchButton = async (event) => {
        event.preventDefault();
        const searchValue = event.target.search.value;
        setSearchData(searchValue);
    };
    //due
    //rejected updated code from foridul bhai so need to do it again
    const userDataget = async () => {
        try {
            const userSearch = await axios(`https://sever.win-pay.xyz/getinguse?uniqueId=${uniqueId}&searchValue=${searchData}&pageNumber=${pageNumber}`);
            const getuserData = userSearch?.data?.queryUserInfo;
            setStoreData(getuserData);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        userDataget();
    }, [pageNumber, uniqueId, searchData]);

    const handleModal = (item) => {
        setData(item);
        setOpenModal(true);
    };

    return (
        <div className='md:my-8'>
            <div className='flex justify-center'>
                <form onSubmit={handleActionSearchButton} className='flex justify-center'>
                    <input
                        type="text"
                        placeholder="Username or Number.."
                        name="search"
                        className="bg-GlobalGray focus:outline-none text-white px-3 py-3 rounded-l-md"
                    />
                    <button type="submit" className='bg-DarkGreen py-4 px-3 rounded-r-md text-white text-md font-bold'><FaSearch /></button>
                </form>
            </div>

            <div className="md:flex md:justify-center md:items-center overflow-x-auto max-w-[1000px] mx-auto my-4 md:my-10">
                <table className="w-full md:w-[1200px] text-white shadow-md border-gray-500">
                    <thead>
                        <tr className="bg-GlobalGray text-white">
                            <th className="md:py-3 py-1 px-2 md:px-6 text-[12px] md:text-lg text-left border-b border-gray-500 hidden md:table-cell">Image</th>
                            <th className="md:py-3 py-1 px-2 md:px-1 text-[12px] md:text-lg text-left border-b border-gray-500">Name</th>
                            <th className="py-3 text-left md:px-6 pl-5 text-[12px] md:text-lg border-b border-gray-500">Number</th>
                            <th className="md:py-3 py-1 px-2 md:px-6 md:pl-10 pl-10 text-[12px] md:text-lg text-left border-b border-gray-500">Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-8 text-center">
                                    <Loader />
                                </td>
                            </tr>
                        ) : (
                            storeData?.map((item, i) => (
                                <tr key={i} onClick={() => handleModal(item)} className={`${i % 2 === 0 ? 'bg-[#2f2f2f]' : 'bg-[#393939]'} cursor-pointer hover:bg-black/20 transition duration-300`}>
                                    <td className="py-3 md:py-4 md:px-6 pl-2 pr-10 md:pr-0 md:pl-10 border-b border-gray-500 hidden md:table-cell">
                                        <img
                                            src="https://source.unsplash.com/300x300/?profile"
                                            alt=""
                                            className="h-8 w-8 object-contain"
                                        />
                                    </td>
                                    <td className="py-3 md:py-4 pl-3 text-white border-gray-500 px-6 border-b text-sm font-medium">{item?.userName}</td>
                                    <td className="py-3 md:py-4 md:px-6 border-b border-gray-500 text-white">{item.phoneNumber}</td>
                                    <td className="py-3 md:py-4 px-6 md:pl-12  border-b border-gray-500 text-white"><span className='px-1 py-[1px] ml-5 md:ml-0 pb-[3px] text-[10px] md:text-sm bg-green-600 rounded-sm text-white'>update</span></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {openModal && <AllUserModal userDataget={userDataget} setOpenModal={setOpenModal} openModal={openModal} item={data} />}
            {/* <Pagination storeData={storeData} setPageNumbers={setPageNumbers} /> */}
        </div>
    );
};

export default AllUsers;
