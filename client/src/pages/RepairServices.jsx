import { useEffect, useState } from "react";
import axios from "axios";

const RepairServices = () => {
  const [services, setServices] = useState([]);
  const location = "40.730610,-73.935242"; // Replace with the desired location

  useEffect(() => {
    const fetchRepairServices = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/google-places/handyman?location=${location}`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching repair services:", error);
      }
    };

    fetchRepairServices();
  }, []);

  return (
    <div>
      <h1>Repair Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service.place_id}>
            <h3>{service.name}</h3>
            <p>{service.vicinity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepairServices;
