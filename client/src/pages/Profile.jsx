import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client"; // Import Apollo hooks
import { GET_ADDRESSES } from "../utils/queries"; // Import the query to get addresses
import { ADD_ADDRESS } from "../utils/mutations"; // Corrected import

const Profile = () => {
  const [addresses, setAddresses] = useState([]); // Address state
  const [newAddress, setNewAddress] = useState({
    nickname: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Modal state
  const [deleteIndex, setDeleteIndex] = useState(null); // Index to track address deletion
  const userId = localStorage.getItem("userId"); // Get user ID from localStorage (or another method)

  // Query to fetch addresses
  const { loading, error, data } = useQuery(GET_ADDRESSES);

  // Mutation to add a new address
  const [addAddress] = useMutation(ADD_ADDRESS); // Changed from ADD_ADDRESSES to ADD_ADDRESS

  // Effect to load addresses from the backend
  useEffect(() => {
    if (data && data.getAddresses) {
      setAddresses(data.getAddresses);
    }
  }, [data]);

  // Handle change for new address input
  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Add new address to the server
  const handleAddAddress = async (e) => {
    e.preventDefault();
    const { nickname, street, city, state, zip, country } = newAddress;
    if (!nickname || !street || !city || !state || !zip || !country) {
      console.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await addAddress({
        variables: {
          nickname,
          address_line_1: street,
          city,
          state,
          zip,
          country,
        },
      });

      setAddresses([...addresses, data.addAddress]);
      // Reset the form
      setNewAddress({
        nickname: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      });
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };
  // Confirm delete address (rest of the delete logic remains unchanged)
  const confirmDelete = (index) => {
    setDeleteIndex(index);
  };

  // Handle delete address (rest of the delete logic remains unchanged)
  const handleDeleteAddress = () => {
    const updatedAddresses = addresses.filter(
      (_, index) => index !== deleteIndex
    );
    setAddresses(updatedAddresses);
    setDeleteIndex(null);
  };

  if (loading) return <p>Loading addresses...</p>;
  if (error) return <p>Error loading addresses</p>;

  return (
    <div className="profile-container">
      <h1 className="title">User Profile</h1>
      <button
        className="button is-primary mb-4"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add Address
      </button>

      {/* Display the submitted addresses */}
      <div className="columns is-multiline">
        {addresses.map((address, index) => (
          <div key={address._id} className="column is-one-third">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">{address.nickname}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{address.address_line_1}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.country}</p>
                </div>
              </div>
              <footer className="card-footer">
                <button
                  className="card-footer-item button is-danger"
                  onClick={() => confirmDelete(index)}
                >
                  Delete
                </button>
              </footer>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {isAddModalOpen && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setIsAddModalOpen(false)}
          ></div>
          <div className="modal-content">
            <div className="box">
              <h2 className="title">Add a New Address</h2>
              <form className="form" onSubmit={handleAddAddress}>
                {/* Nickname */}
                <div className="field">
                  <label className="label">Nickname</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="nickname"
                      value={newAddress.nickname}
                      onChange={handleNewAddressChange}
                      placeholder="e.g. Home"
                      required
                    />
                  </div>
                </div>
                {/* Street */}
                <div className="field">
                  <label className="label">Street Address</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="street"
                      value={newAddress.street}
                      onChange={handleNewAddressChange}
                      placeholder="123 Main St"
                      required
                    />
                  </div>
                </div>
                {/* City */}
                <div className="field">
                  <label className="label">City</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleNewAddressChange}
                      placeholder="City"
                      required
                    />
                  </div>
                </div>
                {/* State */}
                <div className="field">
                  <label className="label">State</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleNewAddressChange}
                      placeholder="State"
                      required
                    />
                  </div>
                </div>
                {/* Zip */}
                <div className="field">
                  <label className="label">Zip Code</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="zip"
                      value={newAddress.zip}
                      onChange={handleNewAddressChange}
                      placeholder="Zip Code"
                      required
                    />
                  </div>
                </div>
                {/* Country */}
                <div className="field">
                  <label className="label">Country</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="country"
                      value={newAddress.country}
                      onChange={handleNewAddressChange}
                      placeholder="Country"
                    />
                  </div>
                </div>
                {/* Submit Button */}
                <div className="field">
                  <div className="control">
                    <button className="button is-primary" type="submit">
                      Add Address
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setIsAddModalOpen(false)}
          ></button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteIndex !== null && (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => setDeleteIndex(null)}
          ></div>
          <div className="modal-content">
            <div className="box">
              <h2 className="title">
                Are you sure you want to delete this address?
              </h2>
              <button
                className="button is-danger"
                onClick={handleDeleteAddress}
              >
                Yes, Delete
              </button>
              <button className="button" onClick={() => setDeleteIndex(null)}>
                Cancel
              </button>
            </div>
          </div>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => setDeleteIndex(null)}
          ></button>
        </div>
      )}
    </div>
  );
};

export default Profile;
