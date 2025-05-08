import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBloodTypeColor, getUrgencyColor } from "./utils/utilityMethods";
import { deleteRequestThunk, getUserProfileThunk } from "../../store/slice/user/userThunk";
import { useNavigate } from "react-router-dom";
import { setMatchedDonors } from "../../store/slice/request/requestSlice";

const UserBloodRequests = () => {
  const dispatch = useDispatch();
  const { userProfile, loading } = useSelector((state) => state.userReducer);
  const myRequests = userProfile?.userBloodRequests;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile data to ensure we have the latest
    dispatch(getUserProfileThunk());
  }, []);

  useEffect(() => {
    // When component mounts, update matched donors if any request has them
    if (myRequests?.length > 0) {
      const requestWithMatchedDonors = myRequests.find(
        (request) => request.matchedDonorsId?.length > 0
      );
      if (requestWithMatchedDonors) {
        dispatch(setMatchedDonors(requestWithMatchedDonors.matchedDonorsId));
      }
    }
  }, [myRequests]);

  const handleDelete = (requestId) => {
    dispatch(deleteRequestThunk({ requestId }));
    dispatch(setMatchedDonors([]))
  };

  // Show loading state
  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden p-6 text-center">
        <p>Loading your blood requests...</p>
      </div>
    );
  }

  // Show when no requests exist
  if (!myRequests || !Array.isArray(myRequests) || myRequests.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden p-6 text-center">
        <p>You don't have any blood requests yet.</p>
        <button 
          onClick={() => navigate("/request-form")}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Create a Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed divide-y divide-gray-200 border-2">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-1/4 px-16 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Type
              </th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Urgency
              </th>
              <th className="w-1/4 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="w-1/4 px-20 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {myRequests.map((request) => (
              <tr key={request?._id}>
                <td className="pl-20 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getBloodTypeColor(
                      request?.bloodType
                    )}`}
                  >
                    {request?.bloodType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(
                      request?.urgency
                    )}`}
                  >
                    {request?.urgency}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                    {request?.status}
                  </span>
                </td>
                <td className="px-[4.3rem] py-4">
                  <button
                    onClick={() => handleDelete(request?._id)}
                    className="px-5 py-1.5 text-xs bg-red-500 rounded-lg text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBloodRequests;
