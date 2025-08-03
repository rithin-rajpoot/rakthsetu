import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { createBloodRequestThunk } from "../../store/slice/request/requestThunk";
import { getUserProfileThunk } from "../../store/slice/user/userThunk";
import { User, MapPin, Droplet, AlertTriangle, Clock, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    location: "",
    bloodType: "",
    urgency: "Normal",
  });
  const [step, setStep] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { buttonLoading } = useSelector((state) => state.requestReducer);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRequestForm = async () => {
    const response = await dispatch(createBloodRequestThunk(formData));
    if (response?.payload?.success) {
      // Fetch updated user profile after creating request
      await dispatch(getUserProfileThunk());
      navigate("/");
      toast.success("Blood request created successfully")
    }
  };

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const urgencyLevels = [
    { value: "Low", label: "Low Priority", color: "green", desc: "Can wait 24-48 hours" },
    { value: "Medium", label: "Medium Priority", color: "yellow", desc: "Needed within 12-24 hours" },
    { value: "Normal", label: "Normal Priority", color: "blue", desc: "Standard urgency level" },
    { value: "Urgent", label: "Urgent/Emergency", color: "red", desc: "Needed immediately" },
  ];

  const isStep1Valid = formData.fullName && formData.location;
  const isStep2Valid = formData.bloodType && formData.urgency;

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg mb-4 animate-float">
            <Droplet className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">Create Blood Request</h1>
          <p className="text-gray-600">Help us connect you with the right donors</p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  i <= step 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {i}
                </div>
                {i < 2 && (
                  <div className={`w-16 h-1 mx-4 ${
                    i < step ? 'bg-red-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 max-w-xs mx-auto">
            <span>Personal Info</span>
            <span>Medical Details</span>
          </div>
        </div>

        {/* Form Card */}
        <div className="modern-card p-8 space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">Personal Information</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="modern-input pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Current Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="modern-input pl-10"
                    placeholder="Enter your current location"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">This helps us find donors near you</p>
              </div>
            </div>
          )}

          {/* Step 2: Medical Information */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">Medical Details</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Required Blood Type</label>
                <div className="grid grid-cols-4 gap-3">
                  {bloodTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, bloodType: type }))}
                      className={`p-3 rounded-xl border-2 text-center font-semibold transition-all duration-200 ${
                        formData.bloodType === type
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Urgency Level</label>
                <div className="space-y-3">
                  {urgencyLevels.map((level) => (
                    <label
                      key={level.value}
                      className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        formData.urgency === level.value
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={level.value}
                        checked={formData.urgency === level.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={`w-3 h-3 rounded-full ${
                          level.color === 'green' ? 'bg-green-500' :
                          level.color === 'yellow' ? 'bg-yellow-500' :
                          level.color === 'orange' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}></div>
                        <div>
                          <p className="font-semibold text-gray-900">{level.label}</p>
                          <p className="text-xs text-gray-600">{level.desc}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex space-x-4 pt-6">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 modern-button-secondary"
              >
                Previous
              </button>
            )}
            
            {step < 2 ? (
              <button
                onClick={nextStep}
                disabled={!isStep1Valid}
                className="flex-1 modern-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleRequestForm}
                disabled={buttonLoading || !isStep2Valid}
                className="flex-1 modern-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {buttonLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Request...
                  </div>
                ) : (
                  "Submit Request"
                )}
              </button>
            )}
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="mt-6 p-4 bg-red-100 rounded-xl border border-red-200">
          <div className="flex items-center justify-center space-x-2 text-red-700">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-semibold">For life-threatening emergencies, call 911 immediately</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
