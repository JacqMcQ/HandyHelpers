import { useEffect, useState } from "react";
import axios from "axios";

const RepairServices = () => {
  const [services, setServices] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const fetchCoordinatesFromZipCode = async (zip) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
      console.log("Using Google Places API Key:", apiKey);
      if (!apiKey) {
        console.error("Google Places API key is not set.");
        setErrorMessage("API key not set.");
        return;
      }

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: zip,
            key: apiKey,
          },
        }
      );

      const results = response.data.results;
      if (results.length === 0) {
        console.error("No results found for this ZIP code.");
        setErrorMessage("No results found for this ZIP code.");
        return;
      }

      const location = results[0]?.geometry?.location;
      if (location) {
        setLocation(`${location.lat},${location.lng}`);
        setErrorMessage("");
      } else {
        setErrorMessage("No valid coordinates found.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      setErrorMessage("Failed to get coordinates. Please try again.");
    }
  };

  const fetchRepairServices = async (locationString) => {
    if (!locationString) return;

    try {
      const [lat, lng] = locationString.split(",");
      console.log("Fetching repair services with coordinates:", lat, lng);

      const response = await axios.get(
        `http://localhost:3001/api/google-places/handyman`,
        {
          params: {
            location: `${lat},${lng}`,
            radius: 5000,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        setServices(response.data);
      } else {
        setErrorMessage("No services found for this location.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setErrorMessage("Failed to fetch repair services. Please try again.");
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (zipCode.trim() === "") {
      setErrorMessage("Please enter a valid ZIP code.");
      return;
    }
    fetchCoordinatesFromZipCode(zipCode);
  };

  useEffect(() => {
    if (location) {
      fetchRepairServices(location);
    }
  }, [location]);

  return (
    <div className="container box">
      <h1 className="title has-text-centered">Repair Services</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={handleZipCodeChange}
          className="input"
        />
        <button type="submit" className="button is-primary">
          Search
        </button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <ul className="service-list">
        {services.length > 0 ? (
          services.map((service, index) => (
            <li key={`${service.place_id}-${index}`} className="box">
              <h3 className="title is-4">{service.name}</h3>
              <p className="subtitle is-6">{service.vicinity}</p>
              <p className="address">
                {service.description || "No description available."}
              </p>{" "}
              {/* Displaying the description */}
            </li>
          ))
        ) : (
          <p>No repair services found for this location.</p>
        )}
      </ul>{" "}
      <div className="box">
        <h1 className="title">Fix it!</h1>
        <p>Explore the best options for your repair needs.</p>
      </div>
    </div>
  );
};

export default RepairServices;
