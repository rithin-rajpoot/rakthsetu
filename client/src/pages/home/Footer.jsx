import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-red-500 w-full h-full min-h-[5rem] flex justify-between">
      <div className="max-h-[5rem] mx-12 md:mx-24 w-[5.4rem] flex items-center justify-center">
        <img className="w-full" src="/images/Logo.png" alt="" />
      </div>
      
      <div className="h-full min-h-[5rem] mx-12 md:mx-20 flex items-center justify-center">
        <div className="flex gap-6 text-white">
          <Link to="/about" className="hover:text-white/80 transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-white/80 transition-colors">
            Contact
          </Link>
          <Link to="/help" className="hover:text-white/80 transition-colors">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;