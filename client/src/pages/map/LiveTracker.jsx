import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Icons
const seekerIcon = new L.Icon({
  iconUrl: '/icons/blood-drop.png',
  iconSize: [30, 30],
  iconAnchor: [20, 30],
});

const donorIcon = new L.Icon({
  iconUrl: '/icons/donor-hand.png',
  iconSize: [30, 40],
  iconAnchor: [10, 30],
});

const LiveTracker = () => {
  const [routeCoords, setRouteCoords] = useState([]); 

  useEffect(() => {
    if (!donorLocation || !seekerLocation) return;

    const fetchRoute = async () => {
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624860d27c25d9ac40bda404d2d2a5ca7078&start=${donorLocation.lng},${donorLocation.lat}&end=${seekerLocation.lng},${seekerLocation.lat}`
      );
      const data = await res.json();
      const coords = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
      setRouteCoords(coords);
    };

    fetchRoute();
  }, [donorLocation, seekerLocation]);

  return (
    <MapContainer center={seekerLocation} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={seekerLocation} icon={seekerIcon} />
      <Marker position={donorLocation} icon={donorIcon} />
      {routeCoords.length > 0 && <Polyline positions={routeCoords} color="red" />}
    </MapContainer>
  );
};

export default LiveTracker;
