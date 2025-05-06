import React from "react";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";

const Header = () => {
  return (
    <div className="bg-red-500 w-full h-full min-h-[5rem] flex justify-between sticky top-0">
      <div className="max-h-[5rem] mx-12 md:mx-24 w-[5.4rem] flex items-center justify-center">
        <img className="w-full" src="/images/Logo.png" alt="" />
      </div>
      <div className="h-full min-h-[5rem] mx-12 md:mx-20 flex items-center justify-center">
        <Link to="/user-profile">
          {" "}
          <button className="rounded-full bg-white/10 hover:bg-white/20">
            <CiUser className="h-[2.5rem] w-[2.6rem] p-[0.5rem]" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;