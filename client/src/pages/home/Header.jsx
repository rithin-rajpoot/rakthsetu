import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { Home } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state=>state.userReducer)
  return (
    <div className="bg-red-500 w-full h-full min-h-[5rem] flex justify-between sticky top-0 z-50">
      <div className="max-h-[5rem] mx-12 md:mx-24 w-[5.4rem] flex items-center justify-center">
        <img className="w-full" src="/images/Logo.png" alt="" />
      </div>
      
      {isAuthenticated && (<div className="h-full min-h-[5rem] mx-12 md:mx-20 flex items-center justify-center gap-10">
        <button onClick={()=>navigate("/")} className="bg-white/10 hover:bg-white/20 px-3 py-1 h-fit my-auto rounded-md flex gap-2 items-center">
        <Home size={18}/> home
      </button>
        <Link to="/user-profile">
          {" "}
          <button className="rounded-full bg-white/10 hover:bg-white/20">
            <CiUser className="h-[2.5rem] w-[2.6rem] p-[0.5rem]" />
          </button>
        </Link>
      </div>)}
      
    </div>
  );
};

export default Header;