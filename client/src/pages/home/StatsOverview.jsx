import React from "react";
import { useSelector } from "react-redux";
import { Users, Activity, Droplet, Heart, TrendingUp, Shield } from "lucide-react";

const StatsOverview = () => {
  const { activeUserRole, userProfile } = useSelector((state) => state.userReducer);
  const { allRequests, matchedDonors } = useSelector((state) => state.requestReducer);

  // Get stats based on user role
  const getStats = () => {
    if (activeUserRole === "donor") {
      return [
        {
          icon: <Droplet className="h-7 w-7 text-blue-600" fill="currentColor" />,
          bgIconColor: "bg-blue-100",
          bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
          borderColor: "border-blue-200",
          title: "Blood Type",
          value: `${userProfile?.bloodType || 'Not Set'}`,
          subtitle: "Ready to donate",
          trend: "+5% this month"
        },
        {
          icon: <Activity className="h-7 w-7 text-green-600" />,
          bgIconColor: "bg-green-100",
          bgColor: "bg-gradient-to-br from-green-50 to-green-100",
          borderColor: "border-green-200",
          title: "Active Requests",
          value: `${allRequests?.length || 0}`,
          subtitle: "In your area",
          trend: "Real-time"
        },
        {
          icon: <Heart className="h-7 w-7 text-red-600" fill="currentColor" />,
          bgIconColor: "bg-red-100",
          bgColor: "bg-gradient-to-br from-red-50 to-red-100",
          borderColor: "border-red-200",
          title: "Lives Impacted",
          value: "0",
          subtitle: "Donations made",
          trend: "Start helping!"
        },
      ];
    } else {
      return [
        {
          icon: <Heart className="h-7 w-7 text-red-600" fill="currentColor" />,
          bgIconColor: "bg-red-100",
          bgColor: "bg-gradient-to-br from-red-50 to-red-100",
          borderColor: "border-red-200",
          title: "Blood Type",
          value: `${userProfile?.bloodType || 'Not Set'}`,
          subtitle: "Seeking donors",
          trend: "Urgent need"
        },
        {
          icon: <Users className="h-7 w-7 text-blue-600" />,
          bgIconColor: "bg-blue-100",
          bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
          borderColor: "border-blue-200",
          title: "Matched Donors",
          value: `${matchedDonors?.length || 0}`,
          subtitle: "Available nearby",
          trend: "Live matching"
        },
        {
          icon: <Activity className="h-7 w-7 text-purple-600" />,
          bgIconColor: "bg-purple-100",
          bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
          borderColor: "border-purple-200",
          title: "Your Requests",
          value: `${userProfile?.userBloodRequests?.length || 0}`,
          subtitle: "Active requests",
          trend: "Pending"
        },
      ];
    }
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {getStats().map((stat, index) => (
          <div 
            key={index} 
            className={`modern-card p-6 border-l-4 ${stat.borderColor} hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-white/20 to-white/5 rounded-full"></div>
            
            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`flex-shrink-0 rounded-xl p-3 ${stat.bgIconColor} group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">{stat.subtitle}</p>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs font-medium text-green-600">{stat.trend}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bar indicator */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full bg-gradient-to-r ${
                      index === 0 ? 'from-blue-400 to-blue-600 w-3/4' :
                      index === 1 ? 'from-green-400 to-green-600 w-2/3' :
                      'from-red-400 to-red-600 w-1/2'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 modern-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-semibold text-gray-900">Safety First</p>
              <p className="text-xs text-gray-600">All donors are verified and screened</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">24/7 Support</p>
            <p className="text-sm font-semibold text-gray-900">Emergency Ready</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
