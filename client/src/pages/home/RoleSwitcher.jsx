import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveTab,
  setActiveUserRole,
} from "../../store/slice/user/userSlice";

const RoleSwitcher = () => {
  const { activeUserRole } = useSelector((state) => state.userReducer); // 'donor' or 'seeker'
  const dispatch = useDispatch();

  return (
    <>
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="px-[3rem] md:px-[8rem] text-center flex items-center justify-between">
          <p className="text-sm text-gray-500">
            You're currently in{" "}
            <span className="font-medium text-red-400">
              {activeUserRole === "donor" ? "Donor" : "Blood Seeker"}
            </span>{" "}
            mode
          </p>
          <button
            onClick={() => {
              dispatch(
                setActiveUserRole(
                  activeUserRole === "donor" ? "seeker" : "donor"
                )
              );
              dispatch(
                setActiveTab(
                  activeUserRole === "donor" ? "myrequests" : "requests"
                )
              );
            }}
            className="mt-2 inline-flex items-center px-3 py-1 border border-red-300 text-xs leading-5 font-medium rounded-md text-red-600 bg-red-50 hover:text-red-500 focus:outline-none focus:border-red-800 focus:shadow-outline-red active:text-red-500"
          >
            Switch to {activeUserRole === "donor" ? "Seeker" : "Donor"} Mode
          </button>
        </div>
      </div>
    </>
  );
};

export default RoleSwitcher;
