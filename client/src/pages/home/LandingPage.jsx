import React, { useState } from "react";
import Header from "./Header";
import RequestList from "../request/RequestList";
import { Bell, Calendar, ChevronDown, Filter, Users, Search, Activity, Droplet, Heart, PlusCircle, Map, MessageSquare, RefreshCw } from 'lucide-react';
import { useNavigate } from "react-router-dom";



const LandingPage = () => {

  const [userRole, setUserRole] = useState('donor'); // 'donor' or 'seeker'
  const [activeTab, setActiveTab] = useState('requests');


  const getContent = () => {
    if (userRole === 'donor') {
      if (activeTab === 'requests') {
        return (
          <RequestList />
        );
      } else {
        return (
          <h1>No Donations Yet</h1>
        );
      }
    } else {
      // Seeker role
      if (activeTab === 'myrequests') {
        return (
          <h1>Your blood requests will be displayed here..</h1>
        );
      } else {
        return (
          <h1> matched donors will be displayed here</h1>
        );
      }
    }
  };

   // Get appropriate tabs based on user role
   const getTabs = () => {
    if (userRole === 'donor') {
      return [
        { id: 'requests', label: 'Blood Requests' },
        { id: 'donations', label: 'Your Donations' }
      ];
    } else {
      return [
        { id: 'myrequests', label: 'My Requests' },
        { id: 'offers', label: 'Donor Offers' }
      ];
    }
  };

  // Get stats based on user role
  const getStats = () => {
    if (userRole === 'donor') {
      return [
        { 
          icon: <Droplet className="h-6 w-6 text-blue-600" />,
          bgIconColor:"bg-blue-200", 
          bgColor: "bg-gradient-to-br from-blue-50 to-blue-200",
          title: "Available to Donate",
          value: "O+, AB-, B+"
        },
        { 
          icon: <Activity className="h-6 w-6 text-green-600" />,
          bgIconColor:"bg-green-200", 
          bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-200",
          title: "Active Requests",
          value: "24 in your area"
        },
        { 
          icon: <Users className="h-6 w-6 text-purple-600" />,
          bgIconColor:"bg-purple-200", 
          bgColor: "bg-gradient-to-br from-purple-50 to-purple-200",
          title: "Your Donations",
          value: "0 lives saved"
        }
      ];
    } else {
      return [
        { 
          icon: <Heart className="h-6 w-6 text-red-600" />, 
          bgIconColor: "bg-red-200",
          bgColor: "bg-gradient-to-br from-red-50 to-red-200",
          title: "Your Blood Type",
          value: "AB-"
        },
        { 
          icon: <Users className="h-6 w-6 text-green-600" />,
          bgIconColor:"bg-green-200", 
          bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-200",
          title: "Potential Donors",
          value: "7 matching donors"
        },
        { 
          icon: <Activity className="h-6 w-6 text-purple-600" />,
          bgIconColor:"bg-purple-200", 
          bgColor: "bg-gradient-to-br from-purple-50 to-purple-200",
          title: "Active Requests",
          value: "2 pending"
        }
      ];
    }
  };
  const navigate = useNavigate();
  const handleCreateBloodRequest = () =>{
  
    navigate('/request-form');
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-6 sm:px-6">
        {/* Role Switcher */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <div className="px-[3rem] md:px-[8rem] text-center flex items-center justify-between">
            <p className="text-sm text-gray-500">You're currently in <span className="font-medium text-red-400">{userRole === 'donor' ? 'Donor' : 'Blood Seeker'}</span> mode</p>
            <button 
              onClick={() => {
                setUserRole(userRole === 'donor' ? 'seeker' : 'donor');
                setActiveTab(userRole === 'donor' ? 'myrequests' : 'requests');
              }}
              className="mt-2 inline-flex items-center px-3 py-1 border border-red-300 text-xs leading-5 font-medium rounded-md text-red-600 bg-red-50 hover:text-red-500 focus:outline-none focus:border-red-800 focus:shadow-outline-red active:text-red-500"
            >
              Switch to {userRole === 'donor' ? 'Seeker' : 'Donor'} Mode
            </button>
          </div>
        </div>

        <div className={`${userRole === 'donor'? 'hidden': 'block'} mb-6 bg-white rounded-lg shadow flex justify-center items-center`}>
          <button onClick={handleCreateBloodRequest} className="text-white w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-sm font-semibold rounded-lg cursor-pointer transition-colors">Create a blood request</button>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {getStats().map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-lg shadow p-6`}>
              <div className="flex items-center">
                <div className={`flex-shrink-0 rounded-md p-3 ${stat.bgIconColor}`}>
                  {stat.icon}
                </div>
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {getTabs().map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`${activeTab === tab.id ? 'border-red-500 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Content */}
        {getContent()}
      </main>
    </div>
  );
};

export default LandingPage;
