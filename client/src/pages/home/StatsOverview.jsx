import React from "react";
import { useSelector } from "react-redux";
import { Users, Activity, Droplet, Heart } from "lucide-react";

const StatsOverview = () => {
  const { activeUserRole } = useSelector((state) => state.userReducer);

  // Get stats based on user role
  const getStats = () => {
    if (activeUserRole === "donor") {
      return [
        {
          icon: <Droplet className="h-6 w-6 text-blue-600" />,
          bgIconColor: "bg-blue-200",
          bgColor: "bg-gradient-to-br from-blue-50 to-blue-200",
          title: "Available to Donate",
          value: "O+, AB-, B+",
        },
        {
          icon: <Activity className="h-6 w-6 text-green-600" />,
          bgIconColor: "bg-green-200",
          bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-200",
          title: "Active Requests",
          value: "24 in your area",
        },
        {
          icon: <Users className="h-6 w-6 text-purple-600" />,
          bgIconColor: "bg-purple-200",
          bgColor: "bg-gradient-to-br from-purple-50 to-purple-200",
          title: "Your Donations",
          value: "0 lives saved",
        },
      ];
    } else {
      return [
        {
          icon: <Heart className="h-6 w-6 text-red-600" />,
          bgIconColor: "bg-red-200",
          bgColor: "bg-gradient-to-br from-red-50 to-red-200",
          title: "Your Blood Type",
          value: "AB-",
        },
        {
          icon: <Users className="h-6 w-6 text-green-600" />,
          bgIconColor: "bg-green-200",
          bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-200",
          title: "Potential Donors",
          value: "7 matching donors",
        },
        {
          icon: <Activity className="h-6 w-6 text-purple-600" />,
          bgIconColor: "bg-purple-200",
          bgColor: "bg-gradient-to-br from-purple-50 to-purple-200",
          title: "Active Requests",
          value: "2 pending",
        },
      ];
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {getStats().map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-lg shadow p-6`}>
          <div className="flex items-center">
            <div className={`flex-shrink-0 rounded-md p-3 ${stat.bgIconColor}`}>
              {stat.icon}
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
