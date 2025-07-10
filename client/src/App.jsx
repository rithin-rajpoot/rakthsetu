import React, { useDebugValue, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUserProfileThunk } from "./store/slice/user/userThunk";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/home/LandingPage";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RequestForm from "./pages/request/RequestForm";
import UserProfile from "./pages/home/userProfile/UserProfile";
import MatchedDonors from "./pages/request/MatchedDonors";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

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
      </Routes>
    </>
  );
};

export default App;
