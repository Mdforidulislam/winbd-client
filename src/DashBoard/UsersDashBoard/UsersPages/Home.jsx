import Tabs from "../../../Components/Shared/Table/GlobalTabs";
import Nav from "./Navbar/Nav";

const UserHome = () => {
  return (
 <div className="min-h-screen h-full flex flex-col sticky top-0">
            {/* Sticky section */}
            <div className="w-full">
                <div className="bg-[#34AF83] h-[50px] w-full z-20">
                    <Nav />
                </div>
    
              <div className="z-20">
                   <Tabs />
              </div>
            </div>
        </div>
  );
};

export default UserHome;
