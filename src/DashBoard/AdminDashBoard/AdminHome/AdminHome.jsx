import { MdNotificationsActive } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import DashboardCard from './../../../Components/DashboardCard/DashboardCard';
import GlobalChart from './../../../Components/Shared/GlobalChart';
import GlobalPichart from './../../../Components/Shared/GlobalPichart';


const AdminHome = () => {


    return (
        <div className="w-full h-full px-8 ">
            {/* header option */}
            <div className=" flex justify-between items-center  text-white">
                <div>
                    <h1 className="text-xl font-bold pb-4">Hello, Admin</h1>
                    <data className=" text-base font-medium ">Welcome Back !</data>
                </div>
                <div>
                    <input className="border-2  hidden md:flex w-[400px] border-slate-700 text-xl font-semibold py-2 rounded-full text-center" type="text " placeholder="Search" />
                </div>
                <div className="space-x-4 flex justify-center items-center  gap-5">
                    <MdNotificationsActive className="text-3xl " />
                    <FaUserCircle className="text-5xl md:text-7xl" />
                </div>
            </div>
            {/* all the card here  */}
            <div className=" md:grid  md:grid-cols-4 gap-5  mt-6">
                {[1, 2, 3, 4].map((item, index) => (<div key={index}> <DashboardCard CurrentStatus={"Current Balance"} total={450} Icon={<FaMoneyBillWave />} /> </div >))}

            </div>

            {/* here the graph chart */}
            <div className="block lg:flex gap-4" >
                {/* <GlobalChart />
                <GlobalPichart /> */}
            </div>
        </div>
    );
};

export default AdminHome;