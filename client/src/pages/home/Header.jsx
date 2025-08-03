import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { Home, Menu, X } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, userProfile } = useSelector(state => state.userReducer);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="bg-gradient-to-r from-red-600 via-red-600 to-red-700 shadow-2xl sticky top-0 z-50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl p-2 backdrop-blur-md border border-white/30 shadow-lg">
                <img 
                  className="w-full h-full object-contain filter drop-shadow-sm" 
                  src="/images/Logo.png" 
                  alt="Blood Donation Logo" 
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                  UberForBlood
                </h1>
                <p className="text-white/90 text-sm font-medium">Save Lives Together</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-3">
                <button 
                  onClick={() => navigate("/")} 
                  className="group bg-white/15 hover:bg-white/25 text-white px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all duration-300 backdrop-blur-md border border-white/30 hover:border-white/50 hover:shadow-lg hover:scale-105"
                >
                  <Home size={18} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold">Home</span>
                </button>
                
                <Link to="/user-profile">
                  <button className="group bg-white/15 hover:bg-white/25 p-3 rounded-xl transition-all duration-300 backdrop-blur-md border border-white/30 hover:border-white/50 hover:shadow-lg hover:scale-105">
                    <CiUser className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isAuthenticated && (
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="bg-white/15 hover:bg-white/25 p-2.5 rounded-xl transition-all duration-300 border border-white/30"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                    <Menu className="w-6 h-6 text-white" />
                  )}
                </button>
              </div>
            )}

            {/* User Greeting (Desktop only) */}
            {isAuthenticated && userProfile?.fullName && (
              <div className="hidden lg:block">
                <div className="text-right bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
                  <p className="text-white/90 text-sm font-medium">Welcome back,</p>
                  <p className="text-white font-bold text-lg">{userProfile.fullName}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isAuthenticated && (
        <div className={`md:hidden bg-gradient-to-r from-red-600 to-red-700 border-t border-white/20 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-80 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-4 space-y-3">
            {userProfile?.fullName && (
              <div className="pb-3 border-b border-white/30">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                  <p className="text-white/90 text-sm font-medium">Welcome back,</p>
                  <p className="text-white font-bold text-lg">{userProfile.fullName}</p>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }} 
              className="w-full bg-white/15 hover:bg-white/25 text-white px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 backdrop-blur-md border border-white/30 hover:scale-105"
            >
              <Home size={20} />
              <span className="font-semibold">Home</span>
            </button>
            
            <Link 
              to="/user-profile" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block"
            >
              <button className="w-full bg-white/15 hover:bg-white/25 text-white px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 backdrop-blur-md border border-white/30 hover:scale-105">
                <CiUser className="w-5 h-5" />
                <span className="font-semibold">Profile</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;