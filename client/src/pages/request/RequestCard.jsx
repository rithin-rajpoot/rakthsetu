
import { getBloodTypeColor, getUrgencyColor } from "./utils/utilityMethods";
import { getDonorCoords } from "../map/methods/getDonorCoords";
import { useDispatch, useSelector } from "react-redux";
import { setDonorCoords, setSeekerCoords } from "../../store/slice/coordinates/coordinateSlice";
import { useNavigate } from "react-router-dom";
import { getUserProfileByIdThunk } from "../../store/slice/user/userThunk";
import { getSocket } from "../../../components/utils/socketService";
import { MapPin, Clock, User, Heart } from "lucide-react";
import { setDonorPopup, setIsDonorAccepted } from "../../store/slice/request/requestSlice";
import { useEffect } from "react";

const RequestCard = ({ request, locationName }) => {
  const socket = getSocket();
  const {userProfile} = useSelector((state)=> state.userReducer);
  const { isDonorAccepted } = useSelector((state) => state.requestReducer);
  const userId = userProfile?._id;

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect( () => {
    // Close popup when donor accepts the request
    if (isDonorAccepted) {
      dispatch(setDonorPopup({isOpen:false, seekerName:""})); // close popup before navigating
      handleRespond(request?.seekerId, request?.location)
    }

    return () => {dispatch(setIsDonorAccepted(false))} // reset isDonorAccepted when component unmounts
  }, [isDonorAccepted]);

  const handleRespond = async (seekerId, seekerLocation) => {
    const donorLocation = await getDonorCoords();
    if (!donorLocation) {
      console.error("Could not retrieve donor location");
      return;
    }

    seekerLocation = {
      lat: seekerLocation?.coordinates[0],
      lng: seekerLocation?.coordinates[1]
    }

    socket.emit("donor-responded", { seekerId, donorLocation, seekerLocation, userId});
    dispatch(setSeekerCoords(seekerLocation));
    dispatch(setDonorCoords(donorLocation));
    await dispatch(getUserProfileByIdThunk({id: seekerId}));

    navigate("/map");
  };

  const urgencyConfig = {
    "Low": { color: "bg-green-100 text-green-800 border-green-200", icon: "🟢" },
    "Medium": { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: "🟡" },
    "Normal": { color: "bg-blue-100 text-blue-800 border-blue-200", icon: "�" },
    "Urgent": { color: "bg-red-100 text-red-800 border-red-200", icon: "🔴" }
  };

  const bloodTypeConfig = {
    "A+": "text-red-600", "A-": "text-red-700",
    "B+": "text-blue-600", "B-": "text-blue-700",
    "AB+": "text-purple-600", "AB-": "text-purple-700",
    "O+": "text-green-600", "O-": "text-green-700"
  };

  return (
    <div className="modern-card p-6 h-full flex flex-col justify-between hover:scale-105 transition-all duration-300 border-l-4 border-red-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
            <Heart className="w-7 h-7 text-red-600" fill="currentColor" />
          </div>
          <div>
            <h3 className={`text-2xl font-bold ${bloodTypeConfig[request?.bloodType] || 'text-gray-700'}`}>
              {request?.bloodType}
            </h3>
            <p className="text-sm text-gray-600">Blood Type Needed</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${urgencyConfig[request?.urgency]?.color || 'bg-gray-100 text-gray-800'}`}>
          <span className="mr-1">{urgencyConfig[request?.urgency]?.icon}</span>
          {request?.urgency}
        </div>
      </div>

      {/* Patient Info */}
      <div className="space-y-3 flex-1">
        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 text-gray-700">
            <User className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Patient:</span>
            <span className="font-semibold">{request?.fullName}</span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 text-gray-700">
            <MapPin className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Location:</span>
            {locationName ? (
              <span className="font-semibold text-sm">{locationName}</span>
            ) : (
              <div className="animate-pulse bg-gray-200 h-4 w-24 rounded"></div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-3">
          <div className="flex items-center space-x-2 text-gray-700">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm font-medium text-gray-600">Posted:</span>
            <span className="font-semibold text-sm">
              {new Date(request?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6">
        <button
          onClick={() => {dispatch(setDonorPopup({isOpen:true, seekerName:request?.fullName}))}}
          className="w-full modern-button flex items-center justify-center space-x-2 group"
        >
          <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
          <span>Respond to Help</span>
        </button>
      </div>

      {/* Emergency Notice */}
      {request?.urgency === "Critical" && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-700 text-center font-semibold">
            🚨 CRITICAL: Immediate response needed
          </p>
        </div>
      )}
    </div>
  );
};

export default RequestCard;