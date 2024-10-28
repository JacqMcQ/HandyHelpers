import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ADDRESSES } from "../utils/queries";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css"; // Ensure you import your App.css

const JobCenter = () => {
  const {
    data: addressData,
    loading: addressLoading,
    error: addressError,
  } = useQuery(GET_ADDRESSES);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState("");
  const [bookedServices, setBookedServices] = useState([]); // State to hold booked services

  useEffect(() => {
    if (addressData && addressData.getAddresses) {
      const clientAddresses = addressData.getAddresses.map((address) => ({
        fullAddress: `${address.street}, ${address.city}, ${address.state} ${address.zip}`,
        nickname: address.nickname,
      }));
      setAddresses(clientAddresses.length > 0 ? clientAddresses : []);
    } else {
      setAddresses([]);
    }
  }, [addressData]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleServiceInputChange = (event) => {
    setServices(event.target.value);
  };

  const handleBooking = () => {
    if (services) {
      // Add booked service with date to the bookedServices state
      const newBooking = {
        date: date.toDateString(), // Store date as string
        services,
      };
      setBookedServices([...bookedServices, newBooking]); // Update booked services
      setServices(""); // Clear input field
    }
  };

  const tileContent = ({ date, view }) => {
    const serviceForDate = bookedServices.find(
      (booking) => booking.date === date.toDateString()
    );

    return serviceForDate ? <span>{serviceForDate.services}</span> : null;
  };

  return (
    <div className="box">
      <h1 className="title is-2">Welcome to the Job Center</h1>

      {/* Address List */}
      <div className="content">
        <h2 className="subtitle">Select an Address</h2>
        <ul>
          {addressLoading && <li>Loading addresses...</li>}
          {addressError && <li>Error loading addresses.</li>}
          {addresses.length > 0 ? (
            addresses.map((address, index) => (
              <li
                key={index}
                onClick={() => setSelectedAddress(address)}
                className={`is-clickable ${
                  selectedAddress?.fullAddress === address.fullAddress
                    ? "has-text-link"
                    : ""
                }`}
              >
                {address.nickname
                  ? `${address.nickname} (${address.fullAddress})`
                  : address.fullAddress}
              </li>
            ))
          ) : (
            <li>No addresses available.</li>
          )}
        </ul>
      </div>

      {/* Selected Address Display */}
      {selectedAddress && (
        <div className="content">
          <h2 className="subtitle">Selected Address:</h2>
          <p className="has-text-weight-semibold">
            {selectedAddress.fullAddress}
          </p>
        </div>
      )}

      {/* Calendar */}
      <div className="content">
        <h2 className="subtitle">Book a Service</h2>
        <Calendar
          onChange={handleDateChange}
          value={date}
          tileContent={tileContent} // Custom tile content
        />
        <div className="field mt-3">
          <label className="label">Services</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Enter services here"
              value={services}
              onChange={handleServiceInputChange}
            />
          </div>
        </div>
        <button className="button is-primary" onClick={handleBooking}>
          Book Service
        </button>
      </div>
    </div>
  );
};

export default JobCenter;
