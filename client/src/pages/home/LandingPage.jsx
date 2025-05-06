import React, { useEffect } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import GetContent from "./GetContent";
import RoleSwitcher from "./RoleSwitcher";
import StatsOverview from "./StatsOverview";
import { getUserProfileThunk } from "../../store/slice/user/userThunk";
import CreateBloodRequest from "../request/CreateBloodRequest";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket } from "../../store/slice/socket/socketSlice";
import { updateRequests } from "../../store/slice/request/requestSlice";
import toast from "react-hot-toast";

const LandingPage = () => {
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector(state=> state.userReducer);
  const { socket } = useSelector(state=> state.socketReducer);

  useEffect(() =>{
    ( async () =>{
       await dispatch(getUserProfileThunk());
    })()
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(initializeSocket());
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newBloodRequest", (newBloodRequest) => { 
      // console.log(newBloodRequest)
      dispatch(updateRequests(newBloodRequest));
      toast.success("New Blood Request Created")
    });

    return () =>{
      socket.off("newBloodRequest")
    }

  }, [socket]);

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
      {/* <footer className="text-black">@all rights reserved</footer> */}
    </div>
  );
};

export default LandingPage;
