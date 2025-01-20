import SubadminCard from "../../Components/Shared/CardGobal";
import SubadminChart from "../../Components/Shared/GlobalChart";
import SubadminPiechart from "../../Components/Shared/GlobalPichart";

const SubadminHome = () => {
    return (
        <div className="px-5 max-w-screen-xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="md:px-5 text-white font-bold md:text-2xl">Hello Sub-Admin, Welcome back!</h1>
                </div>
            </div>
            <SubadminCard />
            <div className="block md:flex gap-4 mt-5 mb-10">
                {/* <SubadminChart />
                <SubadminPiechart /> */}
            </div>
        </div>
    );
};

export default SubadminHome;