import React, { useState } from "react";

const Profile = () => {
  const [addresses, setAddresses] = useState([
    { nickname: "", street: "", city: "", state: "", zip: "", country: "" },
  ]);

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedAddresses = [...addresses];
    updatedAddresses[index][name] = value;
    setAddresses(updatedAddresses);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      { nickname: "", street: "", city: "", state: "", zip: "", country: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log("Submitted addresses:", addresses);
  };

  return (
    <div className="box">
      <h1 className="title">User Profile</h1>
      <form className="form" onSubmit={handleSubmit}>
        {addresses.map((address, index) => (
          <div key={index} className="address-form">
            <h2 className="subtitle">Address {index + 1}</h2>
            <label>
              Nickname:
              <input
                className="input"
                type="text"
                name="nickname"
                value={address.nickname}
                onChange={(e) => handleAddressChange(index, e)}
                placeholder="Enter a nickname for this address"
              />
            </label>
            <label>
              Street:
              <input
                className="input"
                type="text"
                name="street"
                value={address.street}
                onChange={(e) => handleAddressChange(index, e)}
                placeholder="Enter street address"
              />
            </label>
            <label>
              City:
              <input
                className="input"
                type="text"
                name="city"
                value={address.city}
                onChange={(e) => handleAddressChange(index, e)}
                placeholder="Enter city"
              />
            </label>
            <label>
              State:
              <input
                className="input"
                type="text"
                name="state"
                value={address.state}
                onChange={(e) => handleAddressChange(index, e)}
                placeholder="Enter state"
              />
            </label>
            <label>
              Zip Code:
              <input
                className="input"
                type="text"
                name="zip"
                value={address.zip}
                onChange={(e) => handleAddressChange(index, e)}
                placeholder="Enter zip code"
              />
            </label>
            <label>
              Country:
              <input
                className="input"
                type="text"
                name="country"
                value={address.country}
                onChange={(e) => handleAddressChange(index, e)}
                placeholder="Enter country"
              />
            </label>
          </div>
        ))}
        <button className="button" type="button" onClick={addAddress}>
          Add Another Address
        </button>
        <button className="button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Profile;
