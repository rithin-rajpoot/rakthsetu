import React, { useDebugValue, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "./store/slice/user/userThunk";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/home/LandingPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RequestForm from "./pages/request/RequestForm";
import UserProfile from "./pages/home/userProfile/UserProfile";
import MatchedDonors from "./pages/request/MatchedDonors";
import UFBRouteMap from "./pages/map/UFBRouteMap";
import { Loader } from "lucide-react";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

  if(loading && !isAuthenticated) return (
      <div className="flex flex-col justify-center items-center h-screen">
         <Loader className="size-10 animate-spin text-black"/>
         <p>Loading...</p>
      </div>
     )

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LandingPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup /> } />
        <Route path="/request-form" element={<RequestForm />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/matched-donors" element={<MatchedDonors />} />
        <Route path="/map" element={<UFBRouteMap />}/>
      </Routes>
    </>
  );
};

export default App;
