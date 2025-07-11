import React, { useEffect, useState } from "react";
import Header from "./Header";
import Tabs from "./Tabs";
import GetContent from "./GetContent";
import RoleSwitcher from "./RoleSwitcher";
import StatsOverview from "./StatsOverview";
import CreateBloodRequest from "../request/CreateBloodRequest";
import { useDispatch, useSelector } from "react-redux";
import { initializeSocket } from "../../store/slice/socket/socketSlice";
import { removeRequestFromList, updateRequests } from "../../store/slice/request/requestSlice";
import toast from "react-hot-toast";
import { setDonorCoords, setSeekerCoords } from "../../store/slice/coordinates/coordinateSlice";
import FloatingCard from "./FloatingCard";

const LandingPage = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, userProfile} = useSelector(state=> state.userReducer);
  const { socket } = useSelector(state=> state.socketReducer);
  const [isOpen, setIsOpen] = useState(false);
  console.log("Initializing socket for user:", userProfile?._id);
  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(initializeSocket(userProfile?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newBloodRequest", (newBloodRequest) => { 
      dispatch(updateRequests(newBloodRequest));
      toast.success("New Blood Request Created")
    });

    socket.on("removeRequest", (requestIdToRemove) => { 
      dispatch(removeRequestFromList(requestIdToRemove));
    });

    socket.on("show-map", (donorLocation, seekerLocation) => { 
        dispatch(setSeekerCoords(seekerLocation));
        dispatch(setDonorCoords(donorLocation));
        setIsOpen(true);
    });

    return () =>{
      socket.off("newBloodRequest");
      socket.off("removeRequest");
      socket.off("show-map");

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
        {isOpen && (<FloatingCard isOpen={isOpen} onClose={()=>{setIsOpen(!isOpen)}}/>)}
      </main>
      {/* <footer className="text-black">@all rights reserved</footer> */}
    </div>
  );
};

export default LandingPage;
