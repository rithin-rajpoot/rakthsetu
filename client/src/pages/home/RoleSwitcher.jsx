import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTab,
  setActiveUserRole,
} from "../../store/slice/user/userSlice";
import { Heart, Users, ArrowRightLeft } from "lucide-react";

const RoleSwitcher = () => {
  const { activeUserRole } = useSelector((state) => state.userReducer); // 'donor' or 'seeker'
  const dispatch = useDispatch();

  const isDonor = activeUserRole === "donor";

  return (
    <div className="mb-8">
      <div className="modern-card p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Current Role Display */}
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isDonor 
                ? 'bg-red-100 text-red-600' 
                : 'bg-blue-100 text-blue-600'
            }`}>
              {isDonor ? (
                <Heart className="w-6 h-6" fill="currentColor" />
              ) : (
                <Users className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Current Role</p>
              <p className="text-lg font-bold text-gray-900">
                {isDonor ? "Blood Donor" : "Blood Seeker"}
              </p>
              <p className="text-xs text-gray-400">
                {isDonor 
                  ? "Ready to save lives by donating blood" 
                  : "Looking for blood donors in your area"
                }
              </p>
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => {
                dispatch(
                  setActiveUserRole(isDonor ? "seeker" : "donor")
                );
                dispatch(
                  setActiveTab(isDonor ? "myrequests" : "requests")
                );
              }}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ArrowRightLeft className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Switch to {isDonor ? "Seeker" : "Donor"}</span>
            </button>
            <p className="text-xs text-gray-500 text-center">
              Switch between donor and seeker modes
            </p>
          </div>
        </div>

        {/* Role Description Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            isDonor 
              ? 'border-red-200 bg-red-50' 
              : 'border-gray-200 bg-gray-50 hover:border-red-200 hover:bg-red-50'
          }`}>
            <div className="flex items-center space-x-3">
              <Heart className="w-5 h-5 text-red-600" fill="currentColor" />
              <div>
                <h4 className="font-semibold text-gray-900">Donor Mode</h4>
                <p className="text-xs text-gray-600">Help save lives by donating blood</p>
              </div>
            </div>
          </div>
          
          <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            !isDonor 
              ? 'border-blue-200 bg-blue-50' 
              : 'border-gray-200 bg-gray-50 hover:border-blue-200 hover:bg-blue-50'
          }`}>
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Seeker Mode</h4>
                <p className="text-xs text-gray-600">Find blood donors in your area</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcher;
