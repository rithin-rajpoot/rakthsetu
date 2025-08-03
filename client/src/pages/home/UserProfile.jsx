import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Droplets, 
  Calendar, 
  Shield, 
  Edit3,
  LogOut,
  Heart,
  Activity,
  Award,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { getUserProfileThunk, logoutUserThunk } from '../../store/slice/user/userThunk';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const {userProfile, userLocation} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [locationName, setLocationName] = useState("Hyderabad, Telangana");
  const navigate = useNavigate();

  // Blood type colors with better contrast
  const bloodTypeColors = {
    'A+': 'bg-red-500 text-white', 'A-': 'bg-red-600 text-white',
    'B+': 'bg-blue-500 text-white', 'B-': 'bg-blue-600 text-white',
    'AB+': 'bg-purple-500 text-white', 'AB-': 'bg-purple-600 text-white',
    'O+': 'bg-green-500 text-white', 'O-': 'bg-green-600 text-white'
  };
  
  useEffect(()=>{
     (async () => {
           await dispatch(getUserProfileThunk());
         })();
  },[]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLogout = async ()=> {
    await dispatch(logoutUserThunk());
    navigate('/login');
  }

  const stats = [
    {
      icon: <Heart className="w-6 h-6 text-red-600" fill="currentColor" />,
      label: "Blood Donations",
      value: "0",
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    },
    {
      icon: <Activity className="w-6 h-6 text-blue-600" />,
      label: "Active Requests",
      value: userProfile?.userBloodRequests?.length || "0",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      label: "Lives Saved",
      value: "0",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Profile Header */}
        <div className="modern-card mb-8 overflow-hidden">
          {/* Cover Background */}
          <div className="h-40 bg-gradient-to-r from-red-500 via-red-600 to-red-700 relative">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-4 right-4">
              <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-200 border border-white/30">
                <Edit3 className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
          
          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-white rounded-2xl border-4 border-white shadow-xl flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-600" />
                </div>
              </div>
              
              {/* User Info */}
              <div className="flex-1 min-w-0 mt-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{userProfile?.fullName}</h1>
                    <p className="text-lg text-gray-600 mt-1">@{userProfile?.username}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${bloodTypeColors[userProfile?.bloodType]}`}>
                        {userProfile?.bloodType}
                      </div>
                      <span className="text-sm text-gray-500">Blood Type</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="modern-button-secondary flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="modern-card p-6 hover:scale-105 transition-all duration-300">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
              <Edit3 className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-900 font-medium">{userProfile?.fullName}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-gray-900 font-medium">@{userProfile?.username}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${bloodTypeColors[userProfile?.bloodType]}`}>
                        {userProfile?.bloodType}
                      </span>
                      <span className="text-gray-600">• Available for donation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="modern-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
              <Edit3 className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="text-gray-900 font-medium">{userProfile?.email}</span>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-orange-600" />
                  </div>
                  <span className="text-gray-900 font-medium">{userProfile?.phone}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="text-gray-900 font-medium">{locationName}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Member Since</label>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-pink-600" />
                  </div>
                  <span className="text-gray-900 font-medium">{formatDate(userProfile?.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="mt-8 modern-card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-900 font-medium">Active Account</span>
              <span className="text-sm text-gray-500">• Verified</span>
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {formatDate(userProfile?.updatedAt || userProfile?.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;