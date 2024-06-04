/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import "./DashBoardCard.css"



const DashboardCard = ({ CurrentStatus, Icon, total, Style, IconBg }) => {
    return (
        <div className={`px-1 max-w-screen-xl mx-auto  ${Style} `}>
            <div className="bg-GlobalGray h-[150px]  px-10 py-5 rounded-lg shadow-sm shadow-[#4e587f]">

                <div className="flex justify-center items-center gap-4">
                    <div className={`py-7 ${IconBg} rounded-full px-5 `} >
                        <p className="text-4xl pl-1  rounded-full w-10 h-10  text-green-700">{Icon}</p>
                    </div>
                    <div className="py-8 ">
                        <p className="text-2xl font-bold text-white">{total}</p>
                        <p className="text-gray-400 text-sm">{CurrentStatus}</p>

                    </div>
                </div>
            </div>

        </div >
    );
};

export default DashboardCard;