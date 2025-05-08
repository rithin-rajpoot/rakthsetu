import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../../store/slice/user/userThunk";
import { useNavigate } from "react-router-dom";
import { resetRequestState } from "../../../store/slice/request/requestSlice";

const ProfileBar = ({ logo, fullName, username }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state=> state.userReducer);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUserThunk());
    dispatch(resetRequestState());
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="w-full min-h-[7rem] md:min-h-[8rem] bg-purple-600 flex flex-row flex-wrap justify-between items-center px-6 my-5 md:px-10 rounded-lg">
      <div className="min-w-[250px] h-full md:h-full text-white p-2 flex justify-center items-center gap-2.5">
        <span className="h-[4rem] w-[4rem] rounded-full bg-purple-400 border-2 flex justify-center items-center">
          {logo}
        </span>
        <div className="pt-2">
          <h1 className="text-xl md:text-3xl font-bold">{fullName}</h1>
          <span>@{username}</span>
        </div>
      </div>
      <div className="flex gap-2 justify-center items-center p-2 min-w-[12rem]">
        <button className="bg-white/30 px-2 py-1 rounded-lg text-white cursor-pointer">
          Edit Profile
        </button>
        <button onClick={handleLogout} className="bg-red-600 px-2 py-1 rounded-lg text-white cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileBar;
