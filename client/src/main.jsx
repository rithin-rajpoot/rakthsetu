import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LandingPage from './pages/home/LandingPage.jsx';
import Login from './pages/auth/Login.jsx';
import Signup from './pages/auth/Signup.jsx';
import RequestForm from './pages/request/RequestForm.jsx';
import { store } from "./store/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserProfile from './pages/home/UserProfile.jsx';

const router = createBrowserRouter ([
    {
      path: "/",
      element: (<LandingPage /> ),
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
      path:'/request-form',
      element: <RequestForm />,
    },
    {
      path: "/user-profile",
      element: <UserProfile />
    }
  ]);

createRoot(document.getElementById('root')).render(
   <>
   <Provider store={store}>
    <App />
    <RouterProvider router={router} />
    </Provider>
   </>
)
