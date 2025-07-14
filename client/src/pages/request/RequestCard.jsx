
import { getBloodTypeColor, getUrgencyColor } from "./utils/utilityMethods";
import { getDonorCoords } from "../map/methods/getDonorCoords";
import { useDispatch, useSelector } from "react-redux";
import { setDonorCoords, setSeekerCoords } from "../../store/slice/coordinates/coordinateSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfileByIdThunk } from "../../store/slice/user/userThunk";

const RequestCard = ({ request, locationName }) => {

  const { socket } = useSelector((state) => state.socketReducer);
  const {userProfile} = useSelector((state)=> state.userReducer);
  const userId = userProfile?._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  

  const handleRespond = async (seekerId, seekerLocation) => {
    const donorLocation = await getDonorCoords();
    // console.log(donorLocation) // Assume this function retrieves the donor's coordinates
    if (!donorLocation) {
      console.error("Could not retrieve donor location");
      return;
    }

    seekerLocation = {
      lat: seekerLocation?.coordinates[0],
      lng: seekerLocation?.coordinates[1]
    }

    console.log("request card: ",userId)
    socket.emit("donor-responded", { seekerId, donorLocation, seekerLocation, userId});
    dispatch(setSeekerCoords(seekerLocation));
    dispatch(setDonorCoords(donorLocation));
    await dispatch(getUserProfileByIdThunk({id: seekerId}));

    navigate("/map");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-5 flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-2xl font-bold ${getBloodTypeColor(
            request?.bloodType
          )}`}
        >
          {request?.bloodType}
        </h2>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${getUrgencyColor(
            request?.urgency
          )}`}
        >
          {request?.urgency}
        </span>
      </div>

      <div className="space-y-2 text-gray-600">
        <p>
          <span className="font-medium">Patient: </span> {request?.fullName}
        </p>
        <p>
          <span className="font-medium">Location: </span> {locationName || <span className="loading loading-infinity loading-md"></span>}
        </p>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={()=> handleRespond(request?.seekerId, request?.location)}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          Respond Now
        </button>
      </div>
    </div>
  );
};

export default RequestCard;