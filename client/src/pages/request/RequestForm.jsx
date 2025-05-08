import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { createBloodRequestThunk } from "../../store/slice/request/requestThunk";
import { getUserProfileThunk } from "../../store/slice/user/userThunk";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    bloodType: "",
    urgency: "Normal",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRequestForm = async () => {
    const response = await dispatch(createBloodRequestThunk(formData));
    if (response?.payload?.success) {
      // Fetch updated user profile after creating request
      await dispatch(getUserProfileThunk());
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-10 min-h-screen">
        <div className="h-full flex max-w-[40rem] w-full flex-col gap-6 bg-base-300 rounded-lg  p-6">
          <h2 className="text-2xl text-center font-semibold">
            Make a Blood Request
          </h2>

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
            <FaLocationDot />
            <input
              type="text"
              name="location"
              className="grow"
              placeholder="Enter your Current location"
              onChange={handleInputChange}
            />
          </label>
          <label className="input flex items-center gap-2 w-full">
            <FaLocationDot />
            <input
              type="text"
              name="urgency"
              className="grow"
              placeholder="Urgency.."
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
              Select the blood type you are looking for..
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

          <button onClick={handleRequestForm} className="btn btn-neutral">
            Submit Request
          </button>
        </div>
      </div>
    </>
  );
};

export default RequestForm;
