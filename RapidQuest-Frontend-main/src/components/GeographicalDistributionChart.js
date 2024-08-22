

// export default GeographicalDistributionChart;
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const GeographicalDistributionChart = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    axios.get('https://rapidquest-xv5p.onrender.com/geographical-distribution')
      .then(response => {
        const cityData = response.data.map(city => {
          // Manually add coordinates for a few cities
          const coordinates = getCoordinates(city._id);
          return {
            city: city._id,
            customerCount: city.customerCount,
            lat: coordinates.lat,
            lng: coordinates.lng,
          };
        });
        setLocations(cityData);
      })
      .catch(error => console.error('Error fetching geographical distribution data:', error));
  }, []);

  const getCoordinates = (cityName) => {
    // Manually looked-up coordinates for a few cities
    const cityCoordinates = {
      "New York": { lat: 40.7128, lng: -74.0060 },
      "Los Angeles": { lat: 34.0522, lng: -118.2437 },
      "Chicago": { lat: 41.8781, lng: -87.6298 },
      // Add more cities as needed
      "Miami": { lat: 25.7617, lng: -80.1918 },
      "Dallas": { lat: 32.7767, lng: -96.7970 },
      // Fallback coordinates
      "default": { lat: 37.7749, lng: -122.4194 } // San Francisco
    };
    return cityCoordinates[cityName] || cityCoordinates["default"];
  };

  return (
    <MapContainer center={[37.7749, -122.4194]} zoom={3} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location, index) => (
        <Marker key={index} position={[location.lat, location.lng]}>
          <Popup>
            {location.city}: {location.customerCount} customers
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GeographicalDistributionChart;
