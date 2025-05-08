import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LandingPage from "./pages/home/LandingPage.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import RequestForm from "./pages/request/RequestForm.jsx";
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import UserProfile from "./pages/home/userProfile/UserProfile.jsx";
import LiveTracker from "./pages/map/LiveTracker.jsx";
import MatchedDonors from "./pages/request/MatchedDonors.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <LandingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/request-form",
    element: <RequestForm />,
  },
  {
    path: "/user-profile",
    element: <UserProfile />,
  },
  {
    path: "/live-tracker",
    element: <LiveTracker/>,
  },
  {
    path: "/matched-donors",
    element: <MatchedDonors/>,
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <App />
      <RouterProvider router={router} />
    </Provider>
  </>
);
