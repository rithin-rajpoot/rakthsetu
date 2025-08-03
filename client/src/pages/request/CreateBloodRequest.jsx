import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Plus, Droplet, Clock, MapPin } from 'lucide-react';

const CreateBloodRequest = () => {
    const { activeUserRole } = useSelector(state=> state.userReducer);
    const navigate = useNavigate();
    
    const handleCreateBloodRequest = () => {
      navigate("/request-form");
    };

    if (activeUserRole === "donor") return null;

    return (
      <div className="mb-8">
        <div className="modern-card p-6 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-3 mb-3">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Need Blood?</h3>
                  <p className="text-sm text-gray-600">Create a request to find donors</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 max-w-lg">
                Create a blood donation request and connect with verified donors in your area. 
                Our platform helps you find the right blood type quickly and safely.
              </p>

              {/* Features */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  <span>Real-time matching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span>Location-based search</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Droplet className="w-4 h-4 text-red-500" />
                  <span>Verified donors</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <button 
                onClick={handleCreateBloodRequest} 
                className="group modern-button flex items-center space-x-3 px-8 py-4 text-lg"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span>Create Blood Request</span>
              </button>
            </div>
          </div>

          {/* Emergency Banner */}
          <div className="mt-6 p-4 bg-red-100 rounded-xl border border-red-200">
            <div className="flex items-center justify-center space-x-2 text-red-700">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Emergency? Call 911 immediately</span>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CreateBloodRequest
