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
      <header className="bg-gradient-to-r from-red-600 to-red-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl p-2 backdrop-blur-sm">
                <img 
                  className="w-full h-full object-contain" 
                  src="/images/Logo.png" 
                  alt="Blood Donation Logo" 
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-white text-lg sm:text-xl font-bold">
                  UberForBlood
                </h1>
                <p className="text-white/80 text-xs">Save Lives Together</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center space-x-4">
                <button 
                  onClick={() => navigate("/")} 
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30"
                >
                  <Home size={18} />
                  <span className="font-medium">Home</span>
                </button>
                
                <Link to="/user-profile">
                  <button className="bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 group">
                    <CiUser className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isAuthenticated && (
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
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
            {isAuthenticated && userProfile?.name && (
              <div className="hidden lg:block">
                <div className="text-right">
                  <p className="text-white/90 text-sm">Welcome back,</p>
                  <p className="text-white font-semibold">{userProfile.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isAuthenticated && (
        <div className={`md:hidden bg-gradient-to-r from-red-600 to-red-500 border-t border-white/20 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-4 space-y-3">
            {userProfile?.name && (
              <div className="pb-3 border-b border-white/20">
                <p className="text-white/80 text-sm">Welcome back,</p>
                <p className="text-white font-semibold text-lg">{userProfile.name}</p>
              </div>
            )}
            
            <button 
              onClick={() => {
                navigate("/");
                setIsMobileMenuOpen(false);
              }} 
              className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-200 backdrop-blur-sm border border-white/20"
            >
              <Home size={20} />
              <span className="font-medium">Home</span>
            </button>
            
            <Link 
              to="/user-profile" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block"
            >
              <button className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl flex items-center space-x-3 transition-all duration-200 backdrop-blur-sm border border-white/20">
                <CiUser className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;