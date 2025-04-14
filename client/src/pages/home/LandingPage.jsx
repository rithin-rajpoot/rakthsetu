import React, { useEffect } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs";
import { useDispatch, useSelector } from "react-redux";
import GetContent from "./GetContent";
import RoleSwitcher from "./RoleSwitcher";
import StatsOverview from "./StatsOverview";
import { getUserProfileThunk } from "../../store/slice/user/userThunk";

const LandingPage = () => {
  const { activeUserRole } = useSelector((state) => state.userReducer); // 'donor' or 'seeker'

  const navigate = useNavigate();
  const handleCreateBloodRequest = () => {
    navigate("/request-form");
  };

  const dispatch = useDispatch();

  useEffect(() =>{
    ( async () =>{
       await dispatch(getUserProfileThunk());
    })()
  }, [])


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 sm:px-6">
        {/* Role Switcher */}
        <RoleSwitcher />

        <div
          className={`${
            activeUserRole === "donor" ? "hidden" : "block"
          } mb-6 bg-white rounded-lg shadow flex justify-center items-center`}
        >
          <button
            onClick={handleCreateBloodRequest}
            className="text-white w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-sm font-semibold rounded-lg cursor-pointer transition-colors"
          >
            Create a blood request
          </button>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Tabs */}
        <Tabs />

        {/* GetContent */}
        <GetContent />
      </main>
    </div>
  );
};

export default LandingPage;
