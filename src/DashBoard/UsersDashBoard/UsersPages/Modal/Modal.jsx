import { useState } from "react";
import NewProfile from "../Profile/NewProfile";

const Modal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [animation, setAnimation] = useState("slide-in-bottom");

  const handleClose = () => {
    setAnimation("slide-out-bottom");
    setTimeout(() => {
      setOpenModal(false);
      setAnimation("slide-in-bottom");
    }, 500); // Match this to the animation duration
  };

  return (
    <div className="items-center justify-center">
      <button
        onClick={() => setOpenModal(true)}
        className={` justify-center py-2 "bg-[#0D6152]"  text-white `}
      >
        <div
          className="flex items-center flex-wrap justify-around border-4 rounded-full"
          id="_ActiveAvatar_NavigateUI"
        >
          <div className="relative group">
            <img
              className="size-[40px] bg-slate-500 object-cover rounded-full w-[33px] h-[33px]"
              src="https://static.vecteezy.com/system/resources/previews/024/183/502/non_2x/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
              alt="avatar navigate ui"
            />
            {/* <span className="size-2 bg-DarkGreen absolute rounded-full bottom-2 right-0 border-[3px]"></span>
            <span className="size-2 bg-DarkGreen absolute rounded-full bottom-2 right-0 animate-ping"></span> */}
          </div>
        </div>

      </button>

      {openModal && (<NewProfile setOpenModal={setOpenModal} handleClose={handleClose} animation={animation} />)}
    </div>
  );
};

export default Modal;