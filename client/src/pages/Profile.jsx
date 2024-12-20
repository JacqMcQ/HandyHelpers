import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ADDRESSES } from "../utils/queries";
import { DELETE_ADDRESS, ADD_ADDRESS } from "../utils/mutations";

const Profile = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    nickname: "",
    address_line_1: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const { loading, error, data } = useQuery(GET_ADDRESSES, {
    fetchPolicy: "network-only",
  });

  const [addAddress] = useMutation(ADD_ADDRESS);
  const [deleteAddress] = useMutation(DELETE_ADDRESS, {
    refetchQueries: [{ query: GET_ADDRESSES }],
  });

  useEffect(() => {
    if (data && data.getAddresses) {
      setAddresses(data.getAddresses);
    }
  }, [data]);

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const { nickname, address_line_1, city, state, zip, country } = newAddress;
    if (!nickname || !address_line_1 || !city || !state || !zip || !country) {
      console.error("Please fill in all fields");
      return;
    }
    try {
      const { data } = await addAddress({
        variables: {
          nickname,
          address_line_1,
          city,
          state,
          zip,
          country,
        },
      });

      setAddresses([...addresses, data.addAddress]);
      setNewAddress({
        nickname: "",
        address_line_1: "",
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

  const confirmDelete = (index) => {
    setDeleteIndex(index);
  };

  const handleDeleteAddress = async () => {
    if (deleteIndex !== null) {
      const addressId = addresses[deleteIndex]._id;
      try {
        await deleteAddress({ variables: { addressId } });
        setDeleteIndex(null);
      } catch (err) {
        console.error("Error deleting address:", err);
      }
    }
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
                      name="address_line_1"
                      value={newAddress.address_line_1}
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
