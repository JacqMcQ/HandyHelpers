import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ADDRESSES } from '../utils/queries';

const JobCenter = () => {
  const { data: addressData, loading: addressLoading, error: addressError } = useQuery(GET_ADDRESSES);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Update the addresses once the data is fetched
  useEffect(() => {
    if (addressData && addressData.getAddresses) {
      const clientAddresses = addressData.getAddresses.map(address => ({
        fullAddress: `${address.address_line_1}, ${address.city}, ${address.state} ${address.zip}`,
        nickname: address.nickname,
      }));
      setAddresses(clientAddresses.length > 0 ? clientAddresses : []); // Set empty array if no addresses
    } else {
      setAddresses([]); // In case addressData is empty or undefined
    }
  }, [addressData]);

  if (addressLoading) return <p>Loading addresses...</p>;
  if (addressError) return <p>Error loading addresses.</p>;

  return (
    <div className="box">
      <h1 className="title">Welcome to the Job Center</h1>

      {/* Address List */}
      <ul>
        {addresses.length > 0 ? (
          addresses.map((address, index) => (
            <li 
              key={index} 
              onClick={() => setSelectedAddress(address)} 
              style={{ cursor: "pointer", color: selectedAddress?.fullAddress === address.fullAddress ? 'blue' : 'black' }}
            >
              {address.nickname ? `${address.nickname} (${address.fullAddress})` : address.fullAddress} {/* Display nickname if available */}
            </li>
          ))
        ) : (
          <li>No addresses available.</li> // This will now show if addresses is empty
        )}
      </ul>

      {/* Selected Address Display */}
      {selectedAddress && (
        <div>
          <h2>Selected Address: {selectedAddress.fullAddress}</h2>
        </div>
      )}
    </div>
  );
};

export default JobCenter;
