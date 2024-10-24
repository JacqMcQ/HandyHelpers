import React, { useState } from "react";

const Profile = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    nickname: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Add Address modal state
  const [deleteIndex, setDeleteIndex] = useState(null); // To track the index of the address to be deleted

  // Handle change for new address input
  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  // Add new address to the list
  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
    setNewAddress({
      nickname: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    });
    setIsAddModalOpen(false); // Close modal after submitting
  };

  // Confirm delete address
  const confirmDelete = (index) => {
    setDeleteIndex(index); // Set the index of the address to be deleted
  };

  // Delete address after confirmation
  const handleDeleteAddress = () => {
    const updatedAddresses = addresses.filter(
      (_, index) => index !== deleteIndex
    );
    setAddresses(updatedAddresses);
    setDeleteIndex(null); // Reset delete index
  };

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
          <div key={index} className="column is-one-third">
            <div className="card">
              <header className="card-header">
                <p className="card-header-title">{address.nickname}</p>
              </header>
              <div className="card-content">
                <div className="content">
                  <p>{address.street}</p>
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
                <div className="field">
                  <label className="label">Nickname:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="nickname"
                      value={newAddress.nickname}
                      onChange={handleNewAddressChange}
                      placeholder="Enter a nickname for this address"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Street:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="street"
                      value={newAddress.street}
                      onChange={handleNewAddressChange}
                      placeholder="Enter street address"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">City:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="city"
                      value={newAddress.city}
                      onChange={handleNewAddressChange}
                      placeholder="Enter city"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">State:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="state"
                      value={newAddress.state}
                      onChange={handleNewAddressChange}
                      placeholder="Enter state"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Zip Code:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="zip"
                      value={newAddress.zip}
                      onChange={handleNewAddressChange}
                      placeholder="Enter zip code"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Country:</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="country"
                      value={newAddress.country}
                      onChange={handleNewAddressChange}
                      placeholder="Enter country"
                    />
                  </div>
                </div>
                <button className="button is-primary" type="submit">
                  Submit Address
                </button>
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
