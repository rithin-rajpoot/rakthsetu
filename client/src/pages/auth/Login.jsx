import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaKey } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { loginUserThunk } from "../../store/slice/user/userThunk";
import { useDispatch, useSelector } from 'react-redux'

const Login = () => {

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { isAuthenticated } = useSelector(state=>state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-10 min-h-screen">
        <div className="h-full flex max-w-[40rem] w-full flex-col gap-6 bg-base-300 rounded-lg  p-6">
          <h2 className="text-2xl text-center font-semibold">Login</h2>

          <label className="input flex items-center gap-2 w-full">
            <FaUser />
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
              onChange={handleInputChange}
            />
          </label>
          <label className="input flex items-center gap-2 w-full">
            <FaKey />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="grow"
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleLogin} className="btn btn-neutral">Login</button>

          <p>
            Don't have an account?&nbsp;{" "}
            <Link className="text-blue-500 underline" to="/signup">
              Create a new account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
