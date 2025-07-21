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


const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header/>
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
        <Route path="/request-form" element={<ProtectedRoute> <RequestForm /> </ProtectedRoute>} />
        <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/matched-donors" element={<ProtectedRoute><MatchedDonors /></ProtectedRoute>} />
        <Route path="/map" element={<ProtectedRoute><UFBRouteMap /></ProtectedRoute>}/>
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
