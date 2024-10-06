"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar";

const containerStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1,
};

interface LocationData {
  lat: number;
  lng: number;
  radius: number; 
  title: string;
  description: string;
  type: string; 
}

const CombinedComponent: React.FC = () => {
  const [locationError, setLocationError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [locationInput, setLocationInput] = useState<string>(""); 
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  
  const darkModeStyle = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "administrative.country",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9e9e9e" }],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#bdbdbd" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#181818" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#1b1b1b" }],
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [{ color: "#2c2c2c" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#8a8a8a" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#373737" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#3c3c3c" }],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "geometry",
      stylers: [{ color: "#4e4e4e" }],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [{ color: "#616161" }],
    },
    {
      featureType: "transit",
      elementType: "labels.text.fill",
      stylers: [{ color: "#757575" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#000000" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#3d3d3d" }],
    },
  ];
  
  const loadGoogleMapsScript = () => {
    return new Promise<void>((resolve, reject) => {
      if (document.getElementById("google-maps-script")) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB_s0Aevjfq3QudUvvpxpNTxeJWcJTX_cA`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Google Maps script"));
      document.head.appendChild(script);
    });
  };


  useEffect(() => {
    const initializeMap = async () => {
      try {
        await loadGoogleMapsScript();
        if (mapContainerRef.current && typeof google !== "undefined") {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;

                if (mapContainerRef.current) {
                  map.current = new google.maps.Map(mapContainerRef.current, {
                    center: { lat: latitude, lng: longitude },
                    zoom: 12,
                    styles: darkModeStyle, 
                  });
                  

                  new google.maps.Marker({
                    position: { lat: latitude, lng: longitude },
                    map: map.current,
                    title: "You are here",
                  });

                  setMapLoaded(true);
                }
              },
              (error) => {
                setLocationError("Failed to retrieve your location");
                console.error(error);
              }
            );
          } else {
            setLocationError("Geolocation is not supported by this browser.");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    initializeMap();
  }, []);


  const updateMapLocation = async (location: string) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyB_s0Aevjfq3QudUvvpxpNTxeJWcJTX_cA`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;

        if (map.current) {
          map.current.setCenter({ lat, lng });
          map.current.setZoom(14);

        
          markersRef.current.forEach((marker) => marker.setMap(null));
          markersRef.current = [];

         
          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map.current,
            title: location,
          });

          markersRef.current.push(marker);
        }
      } else {
        setLocationError("Location not found");
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setLocationError("Failed to find location");
    }
  };


  const handleLocationInput = (location: string) => {
    setLocationInput(location);
    updateMapLocation(location); 
  };

  return (
    <div className="relative flex flex-col justify-center items-center h-screen">
      <div ref={mapContainerRef} style={containerStyle} className="absolute inset-0" />
      <Sidebar onLocationSubmit={handleLocationInput} />
      {locationError && <p>{locationError}</p>}
    </div>
  );
};

export default CombinedComponent;
