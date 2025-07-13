import { Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingCard = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const onAction = () => {
    navigate("/map");
    onClose(); // Close the card after action
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 relative transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-light transition-colors duration-200 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
        >
          ×
        </button>
        
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Smile className="text-yellow-500 w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Your request is accepted!
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              open the map to see donor location
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onAction}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Open Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCard;