import React from "react";

const DonorCard = ({ donor }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-2xl font-bold text-red-600">{donor.fullName}</h2>
      <p className="text-gray-500 text-sm mb-2">@{donor.username}</p>

      <div className="text-gray-700 space-y-1 text-sm">
        <p>
          <span className="font-medium text-gray-800">Phone:</span> {donor.phone}
        </p>
        <p>
          <span className="font-medium text-gray-800">Blood Type:</span>{" "}
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md font-semibold">
            {donor.bloodType}
          </span>
        </p>
        {/* <p>
          <span className="font-medium text-gray-800">Location:</span>{" "}
          {donor.location}
        </p> */}
      </div>
    </div>
  );
};

export default DonorCard;
