import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiWallet } from "react-icons/gi";


const CardGobal = () => {
    return (
        <div className="mt-5">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 px-1 max-w-screen-xl mx-auto">
                {/* --------------------card 1 data  ---------------------- */}
                <div className="bg-GlobalGray h-[150px]  px-12 py-5 rounded-lg shadow-sm shadow-[#4e587f]">

                    <div className="flex justify-center items-center gap-4">
                        <div className="py-8">
                            <FaDollarSign className="text-3xl bg-black p-2 rounded-full w-12 h-12  text-blue-700" />
                        </div>
                        <div className="py-8 ">
                            <p className="text-white text-sm">Current Balance</p>
                            <p className="text-2xl font-bold text-white">$ 12.1211</p>

                        </div>
                    </div>
                </div>
                {/* --------------------card 2 data  ---------------------- */}
                <div className="bg-GlobalGray h-[150px] px-12 py-5 rounded-lg shadow-sm shadow-[#4e587f]">

                    <div className="flex justify-center items-center gap-4">
                        <div className="py-8">
                            <BsGraphUpArrow className="text-3xl bg-black p-2 rounded-full w-12 h-12  text-green-700" />
                        </div>
                        <div className="py-8 ">
                            <p className="text-white text-sm">Total Profit</p>
                            <p className="text-2xl font-bold text-white">$ 12.1211</p>

                        </div>
                    </div>
                </div>
                {/* --------------------card 3 data  ---------------------- */}
                <div className="bg-GlobalGray h-[150px] px-12 py-5 rounded-lg shadow-sm shadow-[#4e587f]">

                    <div className="flex justify-center items-center gap-4">
                        <div className="py-8">
                            <GiTakeMyMoney className="text-3xl bg-black p-2 rounded-full w-12 h-12  text-purple-500" />
                        </div>
                        <div className="py-8 ">
                            <p className="text-white text-sm">Total income</p>
                            <p className="text-2xl font-bold text-white">$ 12.1211</p>

                        </div>
                    </div>
                </div>
                {/* --------------------card 4 data  ---------------------- */}
                <div className="bg-GlobalGray h-[150px] px-12 py-5 rounded-lg shadow-sm shadow-[#4e587f]">

                    <div className="flex justify-center items-center gap-4">
                        <div className="py-8 ">
                            <GiWallet className="text-3xl bg-black p-2 rounded-full w-12 h-12  text-orange-700" />
                        </div>
                        <div className="py-8 ">
                            <p className="text-white text-sm">Current Balance</p>
                            <p className="text-2xl font-bold text-white">$ 12.1211</p>

                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
};

export default CardGobal;