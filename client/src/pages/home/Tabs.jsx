import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../store/slice/user/userSlice";
import { Heart, List, Gift, FileText } from "lucide-react";

const Tabs = () => {
  const { activeUserRole, activeTab } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();

  // Get appropriate tabs based on user role
  const getTabs = () => {
    if (activeUserRole === "donor") {
      return [
        { 
          id: "requests", 
          label: "Blood Requests",
          icon: <Heart className="w-4 h-4" />,
          description: "View urgent blood requests"
        },
        { 
          id: "donations", 
          label: "Your Donations",
          icon: <Gift className="w-4 h-4" />,
          description: "Track your donation history"
        },
      ];
    } else {
      return [
        { 
          id: "myrequests", 
          label: "My Requests",
          icon: <FileText className="w-4 h-4" />,
          description: "Manage your blood requests"
        },
        { 
          id: "offers", 
          label: "Donor Offers",
          icon: <List className="w-4 h-4" />,
          description: "View available donors"
        },
      ];
    }
  };

  return (
    <div className="mb-8">
      <div className="modern-card p-2">
        <div className="flex flex-col sm:flex-row gap-2">
          {getTabs().map((tab) => (
            <button
              key={tab.id}
              onClick={() => dispatch(setActiveTab(tab.id))}
              className={`flex-1 group relative p-4 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white/20"
                    : "bg-gray-100 group-hover:bg-gray-200"
                }`}>
                  {tab.icon}
                </div>
                <div className="text-left">
                  <p className={`font-semibold text-sm sm:text-base ${
                    activeTab === tab.id ? "text-white" : "text-gray-900"
                  }`}>
                    {tab.label}
                  </p>
                  <p className={`text-xs hidden sm:block ${
                    activeTab === tab.id ? "text-white/80" : "text-gray-500"
                  }`}>
                    {tab.description}
                  </p>
                </div>
              </div>

              {/* Active Tab Indicator */}
              {activeTab === tab.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl border-2 border-red-400/50 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Description */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          {activeUserRole === "donor" 
            ? "Help save lives by responding to blood donation requests in your area"
            : "Find blood donors or track your requests for blood donations"
          }
        </p>
      </div>
    </div>
  );
};

export default Tabs;
