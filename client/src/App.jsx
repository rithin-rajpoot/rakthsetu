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
import ScrollToTop from "../components/ScrollToTop";
import { Loader } from "lucide-react";
import DonorPopup from "./pages/request/DonorPopup";

const App = () => {
  const dispatch = useDispatch();
  const { donorPopup } = useSelector((state) => state.requestReducer);

  const LoadingSpinner = () => (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="mb-6">
          <Loader className="size-12 animate-spin text-slate-600 mx-auto" />
        </div>

        {/* Loading message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">
            Loading RakthSetu
          </h3>
          <p className="text-gray-600">
            Please wait while we connect to the server...
          </p>

          {/* Free tier notice */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg max-w-md">
            <p className="text-sm text-blue-700">
              ⏱️ <strong>First-time load:</strong> Initial connection may take
              up to 50 seconds due to free hosting service startup time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

  const { loading, isAuthenticated } = useSelector(
    (state) => state.userReducer
  );

  if (loading && !isAuthenticated) return <LoadingSpinner />;

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
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
      {donorPopup?.isOpen && <DonorPopup />} {/* Donor Popup Component */}
    </>
  );
};

export default App;
