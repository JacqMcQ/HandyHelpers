import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@apollo/client";
import { GET_ADDRESSES } from "../utils/queries";

const CleaningServices = () => {
  const [services, setServices] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [location, setLocation] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch user addresses with Apollo's useQuery
  const {
    loading: addressesLoading,
    error: addressesError,
    data,
  } = useQuery(GET_ADDRESSES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getAddresses) setAddresses(data.getAddresses);
  }, [data]);

  const handleZipCodeChange = (event) => setZipCode(event.target.value);

  const fetchCoordinatesFromZipCode = async (zip) => {
    try {
      const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
      if (!apiKey) throw new Error("API key not set.");

      const {
        data: { results },
      } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: { address: zip, key: apiKey },
      });

      const location = results[0]?.geometry?.location;
      if (location) {
        setLocation(`${location.lat},${location.lng}`);
        setErrorMessage("");
      } else {
        throw new Error("No results found for this ZIP code.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const fetchCleaningServices = async (locationString) => {
    if (!locationString) return;
    try {
      const [lat, lng] = locationString.split(",");
      const { data } = await axios.get(
        "https://handyhelpers.onrender.com/api/google-places", // Updated URL
        {
          params: {
            location: `${lat},${lng}`,
            radius: 5000,
            keyword: "cleaning",
          },
        }
      );
      setServices(
        data?.map((service) => ({
          id: uuidv4(),
          name: service.name,
          description: service.description || "No description available",
          price: service.price || "N/A",
          address: service.vicinity,
          lat: service.geometry?.location?.lat,
          lng: service.geometry?.location?.lng,
        })) || []
      );

      if (data.length === 0)
        throw new Error("No services found for this location.");
    } catch {
      setErrorMessage("Failed to fetch cleaning services. Please try again.");
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const saveServiceToAddress = async (addressId, serviceId) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/api/addresses/${addressId}/services`,
        {
          serviceId,
        }
      );
      console.log("Service saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving service to address:", error);
      // Log error response to gain insights
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };
  const handleSearch = (event) => {
    event.preventDefault();
    if (!zipCode.trim()) {
      setErrorMessage("Please enter a valid ZIP code.");
    } else {
      fetchCoordinatesFromZipCode(zipCode);
    }
  };

  useEffect(() => {
    if (location) fetchCleaningServices(location);
  }, [location]);
  return (
    <div className="container box">
      <h1 className="title has-text-centered">
        Find Cleaning Services in Your Area
      </h1>
      <form onSubmit={handleSearch} className="field has-addons">
        <input
          className="input control is-expanded"
          type="text"
          placeholder="Enter ZIP code"
          value={zipCode}
          onChange={handleZipCodeChange}
        />
        <button className="button is-primary control" type="submit">
          Search
        </button>
      </form>
      {errorMessage && <p className="notification is-danger">{errorMessage}</p>}
      {Array.isArray(services) && services.length > 0 ? (
        <ul className="service-list">
          {services.map((service) => (
            <li key={service.id} className="box">
              <h2 className="title is-4">{service.name}</h2>
              <p className="subtitle is-6">Address: {service.address}</p>
              <p>Description: {service.description}</p>
              <p>Price: {service.price}</p>
              <button
                className="button is-primary"
                onClick={() => handleServiceSelect(service)}
                aria-label={`Select ${service.name} for address`}
              >
                Select Address
              </button>{" "}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cleaning services found for this location.</p>
      )}
      {/* Address Selection Modal */}
      {isModalOpen && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="modal-content box">
            <h3 className="title">
              Select Address for {selectedService?.name}
            </h3>
            <div className="select is-fullwidth">
              <select
                onChange={(e) => setSelectedAddress(e.target.value)}
                value={selectedAddress}
              >
                <option value="">Select an address</option>
                {addressesLoading ? (
                  <option>Loading addresses...</option>
                ) : addressesError ? (
                  <option>Error loading addresses</option>
                ) : (
                  data.getAddresses?.map((address) => (
                    <option key={address._id} value={address._id}>
                      {address.nickname} - {address.address_line_1},{" "}
                      {address.city}
                    </option>
                  ))
                )}
              </select>
            </div>
            <div className="buttons">
              <button
                className="button is-primary"
                onClick={saveServiceToAddress}
              >
                Confirm Address
              </button>
              <button className="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default CleaningServices;
