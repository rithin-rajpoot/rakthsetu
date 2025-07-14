import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import BloodSeekerInfo from './BloodSeekerInfo';
import BloodDonorInfo from './BloodDonorInfo';

const UFBRouteMap = () => {
  const { seekerCoords, donorCoords } = useSelector((state) => state.coordinatesReducer);
  const mapRef = useRef(null);
  const infoRef = useRef(null);

  const [pickupPlace, setPickupPlace] = useState(null);
  const [destPlace, setDestPlace] = useState(null);

  const [pickupCoords, setPickupCoords] = useState(null);
  const [pickupCoordsArray, setPickupCoordsArray] = useState([null, null]);
  
  const [destCoords, setDestCoords] = useState(null);
  const [coordinatesArray, setCoordinatesArray] = useState([]);

  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [pickupMarker, setPickupMarker] = useState(null);
  const [destMarker, setDestMarker] = useState(null);

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const { seekerId } = useSelector(state=> state.coordinatesReducer);
  const { userProfile } = useSelector(state=> state.userReducer);

  

  // Define initMap function before useEffect
  const initMap = () => {
    const google = window.google;
    const _map = new google.maps.Map(mapRef.current, {
      center: { lat: 17.385044, lng: 78.486671 },
      zoom: 13,
      disableDefaultUI: false,
    });

    setMap(_map);

    const service = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer({ map: _map });
    setDirectionsService(service);
    setDirectionsRenderer(renderer);
  };

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google || !window.google.maps) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initGoogleMap`;
        script.async = true;
        script.defer = true;
        // Set up global callback function
        window.initGoogleMap = initMap;
        document.body.appendChild(script);
      } else {
        initMap();
      }
    };
    loadGoogleMaps();
  }, []);

  const setPickupLocation = (location) => {
    const google = window.google;
    
    setPickupPlace(location);
    const coords = {
      lat: location.lat(),
      lng: location.lng()
    };
    setPickupCoords(coords);
    setPickupCoordsArray([coords.lat, coords.lng]);
    setCoordinatesArray(prev => [coords, prev[1] || null]);

    // Remove existing pickup marker
    if (pickupMarker) pickupMarker.setMap(null);
    
    // Add new pickup marker
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Seeker Location",
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    });
    setPickupMarker(marker);
    
    // Center map on pickup location
    map.setCenter(location);
  };

  const setDestLocation = (location) => {
    const google = window.google;
    
    setDestPlace(location);
    const coords = {
      lat: location.lat(),
      lng: location.lng()
    };
    setDestCoords(coords);
    setCoordinatesArray(prev => [prev[0] || null, coords]);

    // Remove existing destination marker
    if (destMarker) destMarker.setMap(null);
    
    // Add new destination marker
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Donor Location",
      icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    });
    setDestMarker(marker);
  };

  // Handle seeker location (pickup)
  useEffect(() => {
    if (seekerCoords && map) {
      const google = window.google;
      
      let location;
      if (seekerCoords?.lat && seekerCoords?.lng) {
        // If coordinates are provided directly
        location = new google.maps.LatLng(seekerCoords?.lat, seekerCoords?.lng);
      } else if (seekerCoords?.address) {
        // If address is provided, use Geocoding API
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: seekerCoords?.address }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;
            setPickupLocation(location);
          }
        });
        return;
      }

      if (location) {
        setPickupLocation(location);
      }
    }
  }, [seekerCoords, map]);

  // Handle donor location (destination)
  useEffect(() => {
    if (donorCoords && map) {
      const google = window.google;
      
      let location;
      if (donorCoords?.lat && donorCoords?.lng) {
        // If coordinates are provided directly
        location = new google.maps.LatLng(donorCoords?.lat, donorCoords?.lng);
      } else if (donorCoords?.address) {
        // If address is provided, use Geocoding API
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: donorCoords?.address }, (results, status) => {
          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location;
            setDestLocation(location);
          }
        });
        return;
      }

      if (location) {
        setDestLocation(location);
      }
    }
  }, [donorCoords, map]);

  // Auto-calculate route when both locations are available
  useEffect(() => {
    if (pickupPlace && destPlace && directionsService && directionsRenderer) {
      calculateRoute();
    }
  }, [pickupPlace, destPlace, directionsService, directionsRenderer]);

  const calculateRoute = () => {
    if (!pickupPlace || !destPlace || !directionsService || !directionsRenderer) {
      return;
    }

    directionsService.route(
      {
        origin: pickupPlace,
        destination: destPlace,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(result);
          const route = result.routes[0].legs[0];
          const distance = route.distance.text;
          const duration = route.duration.text;
          const straight = haversineDistance(
            pickupPlace.lat(),
            pickupPlace.lng(),
            destPlace.lat(),
            destPlace.lng()
          );

          if (infoRef.current) {
            infoRef.current.innerHTML =
              `🚗 <b>Driving Distance:</b> ${distance}<br/>` +
              `⏱ <b>Estimated Time:</b> ${duration}<br/>` +
              `📏 <b>Straight Line:</b> ${straight.toFixed(2)} km`;
            infoRef.current.classList.remove('opacity-0', 'translate-y-2');
            infoRef.current.classList.add('opacity-100', 'translate-y-0');
          }
        } else {
          console.error("Route calculation failed: " + status);
        }
      }
    );
  };

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // // Debug logs
  // useEffect(() => {
  //   console.log("Seeker Latitude:", pickupCoordsArray[0]);
  //   console.log("Seeker Longitude:", pickupCoordsArray[1]);
  // }, [pickupCoordsArray]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Map Container */}
      <div className="relative mx-auto mb-6" style={{ width: '80%', height: '60vh' }}>
        <div ref={mapRef} id="map" className="w-full h-full rounded-lg shadow-lg" />
        
        {/* Location status display */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-2">
          <div className="backdrop-blur-md bg-white/90 border border-blue-100 shadow-xl rounded-lg p-3">
            <div className="text-center">
              <div className="flex justify-between items-center mb-2 text-sm">
                <span className="text-green-600 font-medium">
                  🟢 Seeker: {pickupPlace ? 'Located' : 'Loading...'}
                </span>
                <span className="text-red-600 font-medium">
                  🔴 Donor: {destPlace ? 'Located' : 'Loading...'}
                </span>
              </div>
              {pickupPlace && destPlace && (
                <div className="text-blue-600 font-medium text-sm">
                  🛣️ Route calculated automatically
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Route information display */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-2">
          <div
            ref={infoRef}
            className="text-center bg-white/90 rounded-lg shadow p-3 text-sm text-gray-700 transition-all duration-500 opacity-0 translate-y-2"
            id="info"
          ></div>
        </div>
      </div>

      {/* Seeker Information Section */}
      {seekerId !== userProfile?._id ? <BloodSeekerInfo /> : <BloodDonorInfo/> }
      
    </div>
  );
};

export default UFBRouteMap;