import { useEffect, useState } from "react";
import axios from "axios";

const LandscapeServices = () => {
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

      console.log("Response Status:", response.status);
      console.log("API Response:", response.data);

      const results = response.data.results;
      console.log("Results Array:", results);

      if (results.length === 0) {
        console.error("No results found for this ZIP code.");
        setErrorMessage("No results found for this ZIP code.");
        return;
      }

      const location = results[0]?.geometry?.location;
      console.log("Location Data:", location);

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

  const fetchLandscapeServices = async (locationString) => {
    if (!locationString) return;

    try {
      const [lat, lng] = locationString.split(",");
      console.log("Fetching services with coordinates:", lat, lng);

      const response = await axios.get(
        "http://localhost:3001/api/google-places",
        {
          params: {
            location: `${lat},${lng}`,
            radius: 5000,
            keyword: "landscaping", // Change keyword to 'landscaping'
          },
        }
      );

      console.log("Landscape Services API Response:", response.data);

      if (response.data && response.data.length > 0) {
        const services = response.data.map((service) => ({
          name: service.name,
          description: service.description || "No description available", // Assuming description is part of the response
          price: service.price || "N/A", // Assuming price is part of the response
          address: service.vicinity, // Use vicinity for address
          lat: service.geometry?.location?.lat, // Access lat directly
          lng: service.geometry?.location?.lng, // Access lng directly
        }));
        setServices(services);
      } else {
        setErrorMessage("No services found for this location.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setErrorMessage(
        "Failed to fetch landscaping services. Please try again."
      );
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
      fetchLandscapeServices(location);
    }
  }, [location]);

  return (
    <div className="container">
      <h1 className="title has-text-centered">
        Find Landscaping Services in Your Area
      </h1>
      <form onSubmit={handleSearch} className="field has-addons">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Enter ZIP code"
            value={zipCode}
            onChange={handleZipCodeChange}
          />
        </div>
        <div className="control">
          <button className="button is-primary" type="submit">
            Search
          </button>
        </div>
      </form>

      {errorMessage && <p className="notification is-danger">{errorMessage}</p>}

      <ul className="service-list">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service, index) => (
            <li key={index} className="box">
              <h2 className="title is-4">{service.name}</h2>
              <p className="subtitle is-6">Address: {service.address}</p>
              <p>Description: {service.description}</p>
              <p>Price: {service.price}</p>
              <p>
                Location: Lat: {service.lat}, Lng: {service.lng}
              </p>
            </li>
          ))
        ) : (
          <p>No landscaping services found for this location.</p>
        )}
      </ul>
    </div>
  );
};

export default LandscapeServices;
