// client/src/pages/CleaningServices.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const CleaningServices = () => {
  const [services, setServices] = useState([]);
  const [location, setLocation] = useState("40.730610,-73.935242"); // Default location (latitude,longitude)

  useEffect(() => {
    // Function to get the user's location dynamically
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude},${longitude}`); // Set the location dynamically
      },
      (error) => {
        console.error("Error getting location:", error);
        // Keep default location or handle error here
      }
    );

    const fetchCleaningServices = async () => {
      try {
        const response = await axios.get(`/api/google-places`, {
          params: { location },
        });
        setServices(response.data); // This was missing in the previous code
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchCleaningServices();
  }, [location]);

  return (
    <div>
      <h1>Available Cleaning Services</h1>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>Price: {service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CleaningServices;
