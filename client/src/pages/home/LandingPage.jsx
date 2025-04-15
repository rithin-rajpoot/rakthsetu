import React, { useEffect } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import GetContent from "./GetContent";
import RoleSwitcher from "./RoleSwitcher";
import StatsOverview from "./StatsOverview";
import { getUserProfileThunk } from "../../store/slice/user/userThunk";
import CreateBloodRequest from "../request/CreateBloodRequest";
import { useDispatch } from "react-redux";

const LandingPage = () => {

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
        <RoleSwitcher />
        <CreateBloodRequest />
        <StatsOverview />
        <Tabs />
        <GetContent />
      </main>
    </div>
  );
};

export default LandingPage;
