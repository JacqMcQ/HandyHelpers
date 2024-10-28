import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@apollo/client";
import { GET_ADDRESSES } from "../utils/queries"; // Adjust the import path accordingly

const CleaningServices = () => {
  const [services, setServices] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]); // State for addresses
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Use the useQuery hook to fetch user addresses
  const {
    loading: addressesLoading,
    error: addressesError,
    data,
  } = useQuery(GET_ADDRESSES, {
    fetchPolicy: "network-only",
  });

  // Set addresses from the fetched data
  useEffect(() => {
    if (data && data.getAddresses) {
      console.log("Fetched addresses:", data.getAddresses); // Debugging line
      setAddresses(data.getAddresses);
    }
  }, [data]);

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const fetchCoordinatesFromZipCode = async (zip) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
      if (!apiKey) {
        setErrorMessage("API key not set.");
        return;
      }

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        { params: { address: zip, key: apiKey } }
      );

      const results = response.data.results;

      if (results.length === 0) {
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
      setErrorMessage("Failed to get coordinates. Please try again.");
    }
  };

  const fetchCleaningServices = async (locationString) => {
    if (!locationString) return;

    setLoading(true); // Set loading state
    try {
      const [lat, lng] = locationString.split(",");
      const response = await axios.get(
        "http://localhost:3001/api/google-places",
        {
          params: {
            location: `${lat},${lng}`,
            radius: 5000,
            keyword: "cleaning",
          },
        }
      );

      if (response.data && response.data.length > 0) {
        const services = response.data.map((service) => ({
          id: service.id || uuidv4(),
          name: service.name,
          description: service.description || "No description available",
          price: service.price || "N/A",
          address: service.vicinity,
          lat: service.geometry?.location?.lat,
          lng: service.geometry?.location?.lng,
        }));

        setServices(services);
        setErrorMessage(""); // Clear error message on successful fetch
      } else {
        setErrorMessage("No services found for this location.");
      }
    } catch (error) {
      setErrorMessage("Failed to fetch cleaning services. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedAddress(""); // Reset address selection
    setIsModalOpen(true); // Open the modal
    console.log("Selected service:", service); // Debugging line
  };

  const saveServiceToAddress = async () => {
    if (!selectedAddress) {
      setErrorMessage("Please select an address.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/api/addresses/${selectedAddress}/services`,
        {
          serviceId: selectedService.id,
        }
      );

      console.log("Service saved to address:", response.data);
      setErrorMessage("Service successfully saved to address!");
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error saving service to address:", error);
      setErrorMessage("Failed to save service to address.");
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
      fetchCleaningServices(location);
    }
  }, [location]);

  return (
    <div className="container box">
      <h1 className="title has-text-centered">
        Find Cleaning Services in Your Area
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
      {loading && <p>Loading services...</p>}
      <ul className="service-list">
        {Array.isArray(services) && services.length > 0 ? (
          services.map((service) => (
            <li key={service.id} className="box">
              <h2 className="title is-4">{service.name}</h2>
              <p className="subtitle is-6">Address: {service.address}</p>
              <p>Description: {service.description}</p>
              <p>Price: {service.price}</p>
              <p>
                Location: Lat: {service.lat}, Lng: {service.lng}
              </p>
              <button onClick={() => handleServiceSelect(service)}>
                Select
              </button>
            </li>
          ))
        ) : (
          <p>No cleaning services found for this location.</p>
        )}
      </ul>

      {/* Modal for Address Selection */}
      {isModalOpen && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="modal-content">
            <div className="box">
              <h3 className="title">
                Select Address for {selectedService?.name}
              </h3>
              <select
                onChange={(e) => setSelectedAddress(e.target.value)}
                value={selectedAddress}
              >
                <option value="">Select an address</option>
                {addressesLoading ? (
                  <option value="">Loading addresses...</option>
                ) : addressesError ? (
                  <option value="">Error loading addresses</option>
                ) : addresses && addresses.length > 0 ? (
                  addresses.map((address) => (
                    <option key={address._id} value={address._id}>
                      {address.nickname} - {address.address_line_1},{" "}
                      {address.city}
                    </option>
                  ))
                ) : (
                  <option value="">No addresses available</option>
                )}
              </select>
              <div className="buttons">
                <button
                  className="button is-primary"
                  onClick={saveServiceToAddress}
                >
                  Confirm Address
                </button>
                <button
                  className="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default CleaningServices;
