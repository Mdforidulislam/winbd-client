
import GlobalModal from "./Globalmodal/GlobalModal";



const GlobalTable = ({ dataSubAdmin }) => {

    return (
        <div className="">
            <div className="overflow-x-auto ">
                <table className="min-w-full  bg-GlobalGray  mx-auto shadow-sm shadow-gray-500 rounded-md border-gray-100 my-6">
                    <thead>
                        <tr className="bg-[#272e4b]  text-white">
                            <th className="py-4 px-6 text-lg text-left boeder-1 border-b border-gray-400">Image</th>
                            <th className="py-4 px-6 text-lg text-left boeder-1 border-b border-gray-400">Name</th>
                            <th className="py-4 px-6 text-lg text-left boeder-1 border-b border-gray-400">UserId</th>
                            <th className="py-4 px-6 text-lg  text-left boeder-1 border-b border-gray-400 ">Number</th>
                            <th className="py-4 px-6 text-lg  text-left boeder-1 border-b border-gray-400 ">View</th>
                            <th className={`${dataSubAdmin?.includes('amount') ? 'py-4 px-6 text-lg border-b border-gray-400 text-left' : 'hidden'}`}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* show table in here  */}
                        {
                            dataSubAdmin?.map((item, index) => (
                                <tr key={item._id} className="hover:bg-gray-500 border-b border-gray-500 transition duration-300">
                                    <td className="py-4 px-4 flex  justify-start">
                                        <div className="relative group">
                                            <img className="size-[50px] bg-slate-500 object-cover rounded-full" src="https://source.unsplash.com/300x300/?profile" alt="avatar navigate ui" />
                                            <span className="size-3 bg-DarkGreen absolute rounded-full bottom-2 right-0 border-[3px] border-white"></span>
                                            <span className="size-3 bg-DarkGreen absolute rounded-full bottom-2 right-0 animate-ping"></span>
                                        </div>                            </td>
                                    <td className="py-4 text-white border-gray-500 px-6 border-b text-sm font-medium">{item.subAdmin}</td>
                                    <td className="py-4 text-white border-gray-500 px-6 border-b text-sm font-medium">{item.uniqueId}</td>

                                    <td className="py-4 px-6 border-b border-gray-500 text-white">
                                        {item.phoneNumber}
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-500 text-white">
                                        <GlobalModal item={item} />
                                    </td>
                                    <td className={`${dataSubAdmin?.includes('amount') ? 'py-4 px-6 border-b border-gray-500 text-white' : 'hidden'}`}>
                                        &120.2
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default GlobalTable;