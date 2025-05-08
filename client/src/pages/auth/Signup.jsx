import React, { useEffect, useState } from "react";
import { FaKey, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaMobile } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { signupUserThunk } from "../../store/slice/user/userThunk";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    location: "",
    bloodType: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSignupData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = async () => {
    const response = await dispatch(signupUserThunk(signupData));
    if(response?.payload?.success){
      navigate('/');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex justify-center items-center p-10 min-h-screen">
        <div className="h-full flex max-w-[40rem] w-full flex-col gap-6 bg-base-300 rounded-lg  p-6">
          <h2 className="text-2xl text-center font-semibold">Signup</h2>

          <label className="input flex items-center gap-2 w-full">
            <FaUser />
            <input
              type="text"
              name="fullName"
              className="grow"
              placeholder="Full Name"
              onChange={handleInputChange}
            />
          </label>
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
          <label className="input input-bordered flex items-center gap-2 w-full">
            <SiGmail />
            <input
              type="text"
              name="email"
              className="grow"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </label>
          <label className="input flex items-center gap-2 w-full">
            <FaMobile />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="grow"
              onChange={handleInputChange}
            />
          </label>

          <label className="input flex items-center gap-2 w-full">
            <FaLocationDot />
            <input
              type="text"
              name="location"
              className="grow"
              placeholder="Enter your location"
              onChange={handleInputChange}
            />
          </label>
          <select
            name="bloodType"
            onChange={handleInputChange}
            defaultValue=""
            className="select select-neutral w-full flex items-center gap-2"
          >
            <option disabled value="">
              Select your blood type
            </option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <button onClick={handleSignup} className="btn btn-neutral">
            Signup
          </button>
          <p>
            Already have an account?&nbsp;{" "}
            <Link className="text-blue-500 underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
