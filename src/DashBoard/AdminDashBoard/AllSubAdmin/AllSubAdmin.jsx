import { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Loader from "../../../Components/Loader/Loader";
import { ModalSub } from "./SubAdminModal/ModalSub";
import { Pagination } from "../../../Components/Shared/Pagination";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { AllUserModal } from "../../../Components/Modals/AllUserModal";

const AllSubAdmin = () => {
  const [search, setSearch] = useState(""); // set search data here
  const [pageNumber, setPageNumber] = useState(0); // set pagination
  const [dataSubAdmin, setDataSubAdmin] = useState([]); // store all the subAdmin data list
  const [loading, setLoading] = useState(false); // set loading state
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://server.win-pay.xyz/getingDataSubAdmin", {
          params: {
            search: search,
            pageNumber: pageNumber
          }
        });
        setDataSubAdmin(res.data.subAdminUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, pageNumber]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPageNumber(0); // Reset page number when search changes
  };

  const handleUpdateModal = (item) => {
    setData(item);
    setOpenUpdateModal(true);
  };



  return (
    <div className="w-full max-w-[1000px] mx-auto">
      <div className="w-full flex flex-col-reverse gap-4 md:flex-row justify-between items-center">
        <button
          onClick={() => setOpenModal(true)}
          type="button"
          className="bg-green-600 md:max-w-36 text-sm text-white/80 font-bold py-3 px-3 rounded-md hover:bg-DarkGreen transition duration-200"
        >
          Add Sub-Admin
        </button>

        <form onSubmit={(e) => e.preventDefault()} className="flex">
          <input
            type="text"
            placeholder="Search Sub-Admins.."
            value={search}
            onChange={handleSearchChange}
            className="bg-GlobalGray focus:outline-none text-white px-3 py-3 rounded-l-md"
          />
          <button type="button" className="bg-DarkGreen py-4 px-3 rounded-r-md text-white text-md font-bold">
            <FaSearch />
          </button>
        </form>
      </div>

      <div className="md:flex md:justify-center md:items-center overflow-x-auto my-10">
        <table className="w-full md:w-[1200px] text-white shadow-md border-gray-500">
          <thead>
            <tr className="bg-GlobalGray text-white">
              <th className="md:py-3 py-1 px-2 md:px-6 pl-3 text-[12px] md:text-lg text-left border-b border-gray-500">Name</th>
              <th className="md:py-3 py-1 px-2 md:px-6 pl-2 text-[12px] md:text-lg text-left border-b border-gray-500">Number</th>
              <th className="md:py-3 py-1 px-2 md:px-6 pl-3 text-[12px] md:text-lg text-left border-b border-gray-500">Password</th>
              <th className="md:py-3 py-1 px-2 md:px-6 pl-3 text-[12px] md:text-lg text-left border-b border-gray-500">Update</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="py-8 text-center">
                  <Loader />
                </td>
              </tr>
            ) : (
              dataSubAdmin?.map((item, i) => (
                <tr key={i} onClick={() => handleUpdateModal(item)} className={`${i % 2 === 0 ? 'bg-[#2f2f2f]' : 'bg-[#393939]'} hover:bg-black/20 cursor-pointer transition duration-300`}>
                  <td className="py-3 md:py-4 px-3 text-[13px] md:px-6 md:pl-8 border-b border-gray-500 text-white">{item?.subAdmin}</td>
                  <td className="py-3 md:py-4 px-3 text-[13px] md:px-6 md:pl-8 border-b border-gray-500 text-white">{item?.phoneNumber}</td>
                  <td className="py-3 md:py-4 px-3 text-[13px] md:px-6 md:pl-8 border-b border-gray-500 text-white">{item?.password}</td>
                  <td className="py-3 md:py-4 px-6 md:pl-12 border-b border-gray-500 text-white"><MdOutlineDoubleArrow className="cursor-pointer" /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination storeData={dataSubAdmin} setPageNumbers={setPageNumber} />
      {openModal && <ModalSub openModal={openModal} setOpenModal={setOpenModal} />}
      {openUpdateModal && <AllUserModal setOpenModal={setOpenUpdateModal} openModal={openUpdateModal} item={data}/>}
     
    </div>
  );
};

export default AllSubAdmin;
