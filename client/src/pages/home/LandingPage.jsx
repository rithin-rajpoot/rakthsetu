import React, { useEffect, useState } from "react";
import Tabs from "./Tabs";
import GetContent from "./GetContent";
import RoleSwitcher from "./RoleSwitcher";
import StatsOverview from "./StatsOverview";
import CreateBloodRequest from "../request/CreateBloodRequest";
import { useDispatch, useSelector } from "react-redux";
// import { initializeSocket } from "../../store/slice/socket/socketSlice";
import { removeRequestFromList, updateRequests } from "../../store/slice/request/requestSlice";
import toast from "react-hot-toast";
import { setDonorCoords, setSeekerCoords, setSeekerId } from "../../store/slice/coordinates/coordinateSlice";
import FloatingCard from "./FloatingCard";
import { filterEmittedRequests } from "../../../components/utils/filterEmittedRequests";
import { getUserProfileByIdThunk } from "../../store/slice/user/userThunk";
import { disconnectSocket, initializeSocket } from "../../../components/utils/socketService";
import { setSocketConnected } from "../../store/slice/socket/socketSlice";


const LandingPage = () => {
  const dispatch = useDispatch();
  const {isAuthenticated, userProfile} = useSelector(state=> state.userReducer);
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
     if (!isAuthenticated || !userProfile?._id) return;

    const socket = initializeSocket(userProfile._id);

    socket.on("connect", () => {
      dispatch(setSocketConnected(true));
    });

    socket.on("disconnect", () => {
      dispatch(setSocketConnected(false));
    });

    socket.on("newBloodRequest", (newBloodRequest) => { 
      const userLocation = userProfile?.location?.coordinates;
      const recievedRequestLocation = newBloodRequest?.location?.coordinates;
      if(!filterEmittedRequests(userLocation[0], userLocation[1], recievedRequestLocation[0], recievedRequestLocation[1])) return;
      dispatch(updateRequests(newBloodRequest));
      toast.success("New Blood Request Created")
    });

    socket.on("removeRequest", (requestIdToRemove) => { 
      dispatch(removeRequestFromList(requestIdToRemove));
    });

    socket.on("show-map", async ({donorLocation, seekerLocation, seekerId, donorId}) => { 
      dispatch(setDonorCoords(donorLocation));
      dispatch(setSeekerCoords(seekerLocation));
      dispatch(setSeekerId(seekerId));
      await dispatch(getUserProfileByIdThunk({id:donorId}));
      setIsOpen(true);
    });

    return () =>{
      socket.off("connect");
      socket.off("disconnect");
      socket.off("newBloodRequest");
      socket.off("removeRequest");
      socket.off("show-map");
      disconnectSocket();
    };
  }, [isAuthenticated, userProfile?._id, dispatch]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Main Content */}
      <main className="relative flex-grow max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <RoleSwitcher />
          <CreateBloodRequest />
          <StatsOverview />
          <Tabs />
          <GetContent />
        </div>
        
        {/* Floating Card Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <FloatingCard isOpen={isOpen} onClose={() => setIsOpen(false)} />
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
