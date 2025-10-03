import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { setDonorPopup, setIsDonorAccepted } from "../../store/slice/request/requestSlice";
import { useDispatch, useSelector } from 'react-redux';


const donorInfo = [ 
    "Name",
    "Location",
    "Blood Group",
    "Contact Number",
    "Email Address"
]

const DonorPopup = () => {
  
  const dispatch = useDispatch();
  const { donorPopup } = useSelector((state) => state.requestReducer);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
      />
      
      {/* Popup */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        {/* Close button */}
        <button onClick={() => dispatch(setDonorPopup({isOpen:false, seekerName:""}))}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
          <AlertCircle className="text-blue-600" size={24} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Share Your Information?
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-4">
          To help {donorPopup?.seekerName || "seeker"}, the following information will be shared:
        </p>

        {/* Info list */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <ul className="space-y-2">
            {donorInfo.map((info, index) => (
              <li key={index} className="flex items-center text-sm text-gray-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                {info}
              </li>
            ))}
          </ul>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-500 mb-6">
          The seeker will be able to contact you using this information. You can choose to accept or decline the request.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button onClick={()=> dispatch(setDonorPopup({isOpen:false, seekerName:""}))}
            className="flex-1 px-4 py-2 border border-gray-300 text-[#fff] hover:bg-red-700 transition-colors font-medium bg-red-600 rounded-md"
          >
            Decline
          </button>
          <button onClick={()=>{dispatch(setIsDonorAccepted(true))} }
            className="flex-1 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors font-medium rounded-md"
          >
            Accept & Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorPopup;