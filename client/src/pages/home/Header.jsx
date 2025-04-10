import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-red-500 w-full h-full min-h-[5rem] flex justify-between sticky top-0">
      <div className="max-h-[5rem] mx-12 md:mx-24 w-[5.4rem] flex items-center justify-center">
        <img className='w-full' src="/images/Logo.png" alt="" />
      </div>
      <div className="h-full min-h-[5rem] mx-12 md:mx-20 flex items-center justify-center">
        <Link to='/user-profile'> <img src="/images/profileLogo.jpg" alt="User Avatar" className="w-10 h-10 rounded-full cursor-pointer"></img>
        </Link>
      </div>
    </div>
  );
};

export default Header;
