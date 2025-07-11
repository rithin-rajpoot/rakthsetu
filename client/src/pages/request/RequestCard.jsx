
import { getBloodTypeColor, getUrgencyColor } from "./utils/utilityMethods";
import { getDonorCoords } from "../map/methods/getDonorCoords";
import { useDispatch, useSelector } from "react-redux";
import { setDonorCoords, setSeekerCoords } from "../../store/slice/coordinates/coordinateSlice";

const RequestCard = ({ request, locationName }) => {

  const { socket } = useSelector((state) => state.socketReducer);
  const dispatch = useDispatch();
  

  const handleRespond = async (seekerId, seekerLocation) => {
    const donorLocation = await getDonorCoords(); // Assume this function retrieves the donor's coordinates
    if (!donorLocation) {
      console.error("Could not retrieve donor location");
      return;
    }


    socket.emit("donor-responded", { seekerId, donorLocation, seekerLocation });
    dispatch(setSeekerCoords(seekerLocation));
    dispatch(setDonorCoords(donorLocation));
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
