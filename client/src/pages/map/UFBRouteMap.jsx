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

  // Define initMap function before useEffect
  const initMap = () => {
    const google = window.google;
    const _map = new google.maps.Map(mapRef.current, {
      center: { lat: 17.385044, lng: 78.486671 },
      zoom: 13,
      disableDefaultUI: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      zoomControl: true,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    setMap(_map);

    const service = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer({ 
      map: _map,
      suppressMarkers: false,
      polylineOptions: {
        strokeColor: '#2563eb',
        strokeWeight: 4,
        strokeOpacity: 0.8
      }
    });
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

    if (pickupMarker) pickupMarker.setMap(null);
    
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Blood Seeker Location",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new google.maps.Size(40, 40)
      },
    });
    setPickupMarker(marker);
    
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

    if (destMarker) destMarker.setMap(null);
    
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: "Blood Donor Location",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new google.maps.Size(40, 40)
      },
    });
    setDestMarker(marker);
  };

  useEffect(() => {
    if (seekerCoords && map) {
      const google = window.google;
      
      let location;
      if (seekerCoords?.lat && seekerCoords?.lng) {
        location = new google.maps.LatLng(seekerCoords?.lat, seekerCoords?.lng);
      } else if (seekerCoords?.address) {
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

  useEffect(() => {
    if (donorCoords && map) {
      const google = window.google;
      
      let location;
      if (donorCoords?.lat && donorCoords?.lng) {
        location = new google.maps.LatLng(donorCoords?.lat, donorCoords?.lng);
      } else if (donorCoords?.address) {
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
              `<div class="flex flex-col space-y-1">
                <div class="flex items-center justify-center space-x-2">
                  <span class="text-blue-600">🚗</span>
                  <span class="font-medium">${distance}</span>
                </div>
                <div class="flex items-center justify-center space-x-2">
                  <span class="text-green-600">⏱</span>
                  <span class="font-medium">${duration}</span>
                </div>
                <div class="flex items-center justify-center space-x-2">
                  <span class="text-purple-600">📏</span>
                  <span class="font-medium">${straight.toFixed(2)} km direct</span>
                </div>
              </div>`;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🗺️</span>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Blood Donation Route
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Map Container */}
        <div className="relative mb-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            {/* Status Bar */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${pickupPlace ? 'bg-green-500' : 'bg-gray-300'} animate-pulse`}></div>
                    <span className="text-sm font-medium text-gray-700">
                      Seeker {pickupPlace ? 'Located' : 'Locating...'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${destPlace ? 'bg-red-500' : 'bg-gray-300'} animate-pulse`}></div>
                    <span className="text-sm font-medium text-gray-700">
                      Donor {destPlace ? 'Located' : 'Locating...'}
                    </span>
                  </div>
                </div>
                {pickupPlace && destPlace && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                    <span className="text-sm font-medium">Route Active</span>
                  </div>
                )}
              </div>
            </div>

            {/* Map */}
            <div className="relative">
              <div 
                ref={mapRef} 
                className="w-full h-[65vh] sm:h-80 md:h-96 lg:h-[500px]"
              />
              
              {/* Route Info Overlay */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-xs px-4">
                <div
                  ref={infoRef}
                  className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-4 text-sm text-gray-800 transition-all duration-500 opacity-0 translate-y-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-6">
          {seekerId !== userProfile?._id ? (
            <BloodSeekerInfo />
          ) : (
            <BloodDonorInfo />
          )}
        </div>
      </div>
    </div>
  );
};

export default UFBRouteMap;