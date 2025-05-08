import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/slice/user/userSlice";

const Tabs = () => {
  const { activeUserRole, activeTab } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  // Get appropriate tabs based on user role
  const getTabs = () => {
    if (activeUserRole === "donor") {
      return [
        { id: "requests", label: "Blood Requests" },
        { id: "donations", label: "Your Donations" },
      ];
    } else {
      return [
        { id: "myrequests", label: "My Requests" },
        { id: "offers", label: "Donor Offers" },
      ];
    }
  };

  return (
    <>
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {getTabs().map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`${
                activeTab === tab.id
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Tabs;
