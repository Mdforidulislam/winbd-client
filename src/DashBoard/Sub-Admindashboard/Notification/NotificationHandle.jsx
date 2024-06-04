import { FaDeleteLeft, FaTrash } from "react-icons/fa6";


const NotificationHandle = () => {
  return (
    <div className="grid md:grid-cols-3 my-10 grid-cols-1 gap-10 md:gap-20 items-center justify-center px-2">
      <div className="relative pt-4 mx-auto rounded-md h-[180px] bg-GlobalGray border-2 border-gray-300/15">
        <h1 className="text-white text-xl text-center uppercase py-1">Our Offer Prize</h1>
        <p className="text-white text-center text-sm px-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur  Nobis, eaque similique! Unde a pariatur necessitatibus ipsa porro eaque!</p>
        <FaTrash className="text-red-500 text-xl cursor-pointer absolute bottom-2 right-2" />
      </div>
      <div className="relative pt-4  mx-auto rounded-md h-[180px] bg-GlobalGray border-2 border-gray-300/15">
        <h1 className="text-white text-xl text-center uppercase py-1">Our Offer Prize</h1>
        <p className="text-white text-center text-sm px-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur  Nobis, eaque similique! Unde a pariatur necessitatibus ipsa porro eaque!</p>
        <FaTrash className="text-red-500 text-xl cursor-pointer absolute bottom-2 right-2" />
      </div>
      <div className="relative pt-4  mx-auto rounded-md h-[180px] bg-GlobalGray border-2 border-gray-300/15">
        <h1 className="text-white text-xl text-center uppercase py-1">Our Offer Prize</h1>
        <p className="text-white text-center text-sm px-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur  Nobis, eaque similique! Unde a pariatur necessitatibus ipsa porro eaque!</p>
        <FaTrash className="text-red-500 text-xl cursor-pointer absolute bottom-2 right-2" />
      </div>

    </div>
  );
};

export default NotificationHandle;