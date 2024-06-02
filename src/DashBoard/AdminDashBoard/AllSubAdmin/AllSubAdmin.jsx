import { useEffect, useState } from "react";
import GlobalTable from "../../../Components/Shared/GlobalTable";
import { ModalSub } from "./SubAdminModal/ModalSub";
import axios from "axios";

const AllSubAdmin = () => {
  const [search, setSearch] = useState(""); // set search data here
  const [pageNumber, setPageNumber] = useState(0); // set pagination
  const [dataSubAdmin, setDataSubAdmin] = useState([]); // store all the subAdmin data list
  const [subAdminCount, setSubAdminCount] = useState(0);

  console.log(dataSubAdmin);
  // add the  search page here
  const handleSubmitSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchValue = formData.get("search");
    console.log(searchValue);
    setSearch(searchValue); // set search value
  };

  // add the pagination page
  const page = subAdminCount || 0 ; // Adjust the page numbers the way you want
  const updatePageNumber = (num) => {
    if (num > page - 1 || 0 > num) {
      return setPageNumber(0);
    }
    setPageNumber(num);
  };

  // =============================== data face for see all subamin ===========================

  useEffect(() => {
    axios.get(`https://sever.win-pay.xyz/getingDataSubAdmin?search=${search}&pageNumber=${pageNumber}`
      )
      .then((res) => {
        setDataSubAdmin(res.data.subAdminUser);
        setSubAdminCount(res.data.exiteDataLength);
      });
  }, [search, pageNumber]);


  return (
    <div className="w-full px-8 py-5">
      <div className="w-full flex justify-between items-center  ">
        <div className="w-full  ">
          <ModalSub />
        </div>
        <div className="w-full flex justify-end  ">
          <form onSubmit={handleSubmitSearch} className="flex">
            <input
              className="py-2 px-4 w-full rounded-l-md focus:outline-none bg-neutral-900 text-white"
              type="text"
              name="search"
              placeholder="Search"
            />
            <button
              className="bg-[#333953] px-6 text-xl text-white py-2 rounded-r-md"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Table list here  */}
      <GlobalTable dataSubAdmin={dataSubAdmin} />
      {/* pagianation here  */}
      <div>
        <div className="flex select-none justify-center items-center gap-5 mb-5">
          {/* left arrow */}
          <div
            onClick={() => {
              updatePageNumber(pageNumber - 1);
            }}
            className=" hover:scale-110 scale-100 transition-all duration-200 cursor-pointer hover:bg-sky-200 px-1 py-1 rounded-full"
          >
            <svg
              className="w-10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M15 7L10 12L15 17"
                  stroke="#0284C7"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </div>
          <div className="flex justify-center items-center gap-2 ">
            {[...Array(page).keys()].map((item, ind) => (
              <div
                onClick={() => {
                  setPageNumber(item);
                }}
                className={`cursor-pointer hover:scale-110 scale-100 transition-all duration-200 px-5 ${
                  pageNumber === item
                    ? "bg-[#3f4f8e] text-white"
                    : "bg-[#1e284e]"
                } border-sky-300  font-semibold text-white   py-3 rounded-full`}
                key={item}
              >
                {item + 1}
              </div>
            ))}
          </div>
          {/* right arrow */}
          <div
            onClick={() => {
              updatePageNumber(pageNumber + 1);
            }}
            className="bg-gray-200 hover:scale-110 scale-100 transition-all duration-200 cursor-pointer hover:bg-sky-200 px-4 py-4 rounded-full"
          >
            <svg
              className="w-4"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z"
                  fill="#000000"
                />{" "}
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSubAdmin;
