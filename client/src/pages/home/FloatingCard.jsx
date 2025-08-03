import { CheckCircle, MapPin, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingCard = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const onAction = () => {
    navigate("/map");
    onClose(); // Close the card after action
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4 animate-fade-in">
      <div className="modern-card p-8 max-w-md w-full relative transform transition-all duration-300 ease-in-out scale-100 hover:scale-105 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-float">
              <CheckCircle className="text-green-600 w-12 h-12" fill="currentColor" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              🎉 Great News!
            </h3>
            <p className="text-gray-600 leading-relaxed">
              A donor has responded to your request! You can now view their location on the map and coordinate the meetup.
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-blue-700">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">Ready to view donor location</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onClose}
              className="modern-button-secondary flex-1"
            >
              Later
            </button>
            <button
              onClick={onAction}
              className="modern-button flex-1 flex items-center justify-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Open Map</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCard;