import { Outlet } from "react-router-dom";
import DashNav from "../../Components/Shared/DashNav/DashNav";

const AdminDashboard = () => {
    return (
        <div className="relative w-full md:min-h-screen  bg-GlobalDarkGray">
            <div className=" md:flex justify-center items-center  ">
                <DashNav className="" />
                <div className="w-full md:px-8 flex-grow h-screen py-4 overflow-y-auto">
                    <Outlet></Outlet>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;