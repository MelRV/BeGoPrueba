// import React from "react";
import { AiOutlineBell } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md"

const Header = () => {
  return (
    <>
      <div className="flex justify-start items-start">
        <p className="font-bold mx-auto mt-4 text-center">Upcoming</p>
        <AiOutlineBell className="text-yellow-500 text-2xl mt-4 mr-3" />
        <div className="absolute">
          <MdKeyboardArrowLeft className="text-2xl text-white absolute mt-4 ml-3" />
        </div>
      </div>
    </>
  );
};

export default Header;