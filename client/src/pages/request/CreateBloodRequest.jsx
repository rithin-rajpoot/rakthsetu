import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const CreateBloodRequest = () => {

    const { activeUserRole } = useSelector(state=> state.userReducer);
    const navigate = useNavigate();
    const handleCreateBloodRequest = () => {
      navigate("/request-form");
    };

  return (
    <>
      <div className={`${activeUserRole === "donor" ? "hidden" : "block"} mb-6 bg-white rounded-lg shadow flex justify-center items-center`}>
          <button onClick={handleCreateBloodRequest} className="text-white w-full px-3 py-2 bg-red-500 hover:bg-red-600 text-sm font-semibold rounded-lg cursor-pointer transition-colors">
            Create a blood request
          </button>
        </div>
    </>
  )
}

export default CreateBloodRequest
