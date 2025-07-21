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
} from 'lucide-react';
import { getUserProfileThunk, logoutUserThunk } from '../../store/slice/user/userThunk';
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
   const {userProfile, userLocation} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [locationName, setLocationName] = useState("Hyderabad, Telangana");
  const navigate = useNavigate();

  // Blood type colors
  const bloodTypeColors = {
    'A+': 'bg-red-500', 'A-': 'bg-red-600',
    'B+': 'bg-blue-500', 'B-': 'bg-blue-600',
    'AB+': 'bg-purple-500', 'AB-': 'bg-purple-600',
    'O+': 'bg-green-500', 'O-': 'bg-green-600'
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="relative">
            {/* Cover Background */}
            <div className="h-32 bg-gradient-to-r from-red-500 to-red-600 rounded-t-lg"></div>
            
            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex items-end space-x-5 -mt-12">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0 ">
                  <div className="flex items-center justify-between ">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{userProfile?.fullName}</h1>
                      <p className="text-sm text-gray-500">@{userProfile?.username}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${bloodTypeColors[userProfile?.bloodType]}`}>
                       <button onClick={handleLogout}>Logout</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          
          {/* Personal Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>{userProfile?.fullName}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <span>@{userProfile?.username}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{userProfile?.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{userProfile?.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${bloodTypeColors[userProfile?.bloodType]}`}></div>
                      <span className="font-medium">{userProfile?.bloodType}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{locationName}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{formatDate(userProfile?.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;