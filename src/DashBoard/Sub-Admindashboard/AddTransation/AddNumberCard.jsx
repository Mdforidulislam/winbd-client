import { FaCalculator } from "react-icons/fa6";

const AddtransitionCard = () => {
  const paymenetLogo = [
    {
      bkash: "https://i.ibb.co/FW8WKcg/image.png",
      nogod: "https://i.ibb.co/sWWFpwC/image-removebg-preview-74.png",
      rocket: "https://i.ibb.co/D7b7vpq/image.png",
    },
  ];

  return (
    <div className="">
      <div className="">
        {/* ---------------- card number 1 ---------------------- */}

        <div className=" shadow-gray-700 ">
          <div className="group border">
            <img
              width={100}
              height={100}
              className="h-full w-full border-l scale-105 transform rounded-lg bg-[#101733] "
              src="https://i.ibb.co/FW8WKcg/image.png"
              alt="card navigate ui"
            />
          </div>
          <div className=" space-y-1  rounded-br-lg border-r rounded-tr-lg  bg-black/70  text-center shadow-[0px_7px_30px_2px_rgba(100,100,111,0.2)] dark:bg-[#18181B] md:w-[300px] dark:shadow-[0px_2px_8px_0px_rgba(0,0,0,0.8)]">
            <div className="space-y-1  w-full">
              <div className="flex justify-center items-center w-full h-full mb-7">
                <div className="w-full ">
                  <p className="text-white block w-full text-center text-md">
                    Personal : 01882239828
                  </p>
                  <p className="text-white block w-full text-center text-md">
                    Agent : 01882239828
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <button className="border-b-2  text-green-400 border-green-700 hover:text-green-100">
                Active
              </button>
              <button className="border-b-2  text-red-400 border-red-700  hover:text-red-100">
                Deactive
              </button>
              <button className="border-b-2  text-yellow-400 border-yellow-500 hover:text-yellow-100">
                Update{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddtransitionCard;
