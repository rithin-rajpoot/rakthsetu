import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWJoaXNoZWsyMDA0IiwiYSI6ImNtOHBpNmZkaTBhbzEya3NjbWF2dzF3bWcifQ.ukNkcVOMcWMLdOvrcp_RfQ";

const LiveTracker = () => {
  const mapContainerRef = useRef(null);
  const pickupRef = useRef(null);
  const destinationRef = useRef(null);
  const mapRef = useRef(null);
  const [etaInfo, setEtaInfo] = useState({ eta: "--", distance: "--" });
  const pickupCoordinatesRef = useRef(null);
  const destinationCoordinatesRef = useRef(null);
  const routeLayerAddedRef = useRef(false);
  const pickupMarkerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [78.486961, 17.596222],
      zoom: 15,
    });

    mapRef.current = map;

    // Track user location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        ({ coords }) => {
          map.setCenter([coords.longitude, coords.latitude]);
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
      );
    }

    // Create and mount geocoder for pickup
    const pickupGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Pickup Location",
      types: "poi,address",
      bbox: [77.0, 16.0, 81.0, 19.5],
    });

    pickupRef.current.appendChild(pickupGeocoder.onAdd(map));
    pickupGeocoder.on("result", (e) => {
      pickupCoordinatesRef.current = e.result.geometry.coordinates;
    });

    // Create and mount geocoder for destination
    const destinationGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Destination",
      types: "poi,address",
    });

    destinationRef.current.appendChild(destinationGeocoder.onAdd(map));
    destinationGeocoder.on("result", (e) => {
      destinationCoordinatesRef.current = e.result.geometry.coordinates;
    });

    return () => map.remove();
  }, []);

  const handleStart = () => {
    const pickup = pickupCoordinatesRef.current;
    const destination = destinationCoordinatesRef.current;
    const map = mapRef.current;

    if (!pickup || !destination) {
      alert("Please enter both pickup and destination points.");
      return;
    }

    map.flyTo({ center: pickup, zoom: 16 });

    // Remove previous marker
    if (pickupMarkerRef.current) {
      pickupMarkerRef.current.remove();
    }

    const icon = document.createElement("img");
    icon.src = "/images/arrow.jpg"; // Ensure this path is correct in your public folder
    icon.style.width = "40px";
    icon.style.height = "40px";
    icon.style.borderRadius = "50%";
    icon.style.objectFit = "cover";

    pickupMarkerRef.current = new mapboxgl.Marker({ element: icon })
      .setLngLat(pickup)
      .addTo(map);

    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickup[0]},${pickup[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        const route = data.routes[0].geometry;
        const eta = Math.round(data.routes[0].duration / 60);
        const distance = (data.routes[0].distance / 1000).toFixed(2);
        setEtaInfo({ eta, distance });

        if (routeLayerAddedRef.current) {
          map.getSource("route").setData({ type: "Feature", geometry: route });
        } else {
          map.addLayer({
            id: "route",
            type: "line",
            source: {
              type: "geojson",
              data: { type: "Feature", geometry: route },
            },
            layout: { "line-join": "round", "line-cap": "round" },
            paint: { "line-color": "#007bff", "line-width": 5 },
          });
          routeLayerAddedRef.current = true;
        }
      })
      .catch((err) => console.error("Error fetching directions:", err));
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        id="controls"
        style={{
          position: "absolute",
          top: 10,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff",
          padding: 10,
          borderRadius: 8,
          zIndex: 1,
          display: "flex",
          gap: 10,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        <div ref={pickupRef}></div>
        <div ref={destinationRef}></div>
        <button
          onClick={handleStart}
          style={{
            padding: "8px 12px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Start
        </button>
      </div>

      <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }} />

      <div
        id="eta"
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#fff",
          padding: 10,
          borderRadius: 8,
          zIndex: 1,
          boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        ETA: {etaInfo.eta} min, Distance: {etaInfo.distance} km
      </div>
    </div>
  );
};

export default LiveTracker;
