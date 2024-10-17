// client/src/pages/CleaningServices.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const CleaningServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchCleaningServices = async () => {
      try {
        const response = await axios.get("/api/tidy/cleaning-services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchCleaningServices();
  }, []);

  return (
    <div>
      <h1>Available Cleaning Services</h1>
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <h2>{service.name}</h2>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CleaningServices;
