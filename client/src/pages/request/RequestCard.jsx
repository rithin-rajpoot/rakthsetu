import React, { useEffect, useState } from "react";
import { getBloodTypeColor, getUrgencyColor } from "./utils/utilityMethods";
import { useNavigate } from "react-router-dom";

const RequestCard = ({ request, locationName }) => {
  const navigate = useNavigate();

  const handleRespond = () => {
    navigate("/live-tracker");
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
          onClick={handleRespond}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          Respond Now
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
