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
import UserProfile from "./pages/home/UserProfile";
import MatchedDonors from "./pages/request/MatchedDonors";
import UFBRouteMap from "./pages/map/UFBRouteMap";
import Header from "./pages/home/Header";
import Footer from "./pages/home/Footer";
import { Loader } from "lucide-react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

  const { loading, isAuthenticated } = useSelector(
    (state) => state.userReducer
  );

  if (loading && !isAuthenticated)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <Loader className="size-10 animate-spin text-black" />
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
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
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/request-form"
          element={
            <ProtectedRoute>
              {" "}
              <RequestForm />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/matched-donors"
          element={
            <ProtectedRoute>
              <MatchedDonors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <UFBRouteMap />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
