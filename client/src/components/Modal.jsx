import React from "react";

const Modal = ({ isOpen, onClose, addresses, onSelect }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Select an Address</h2>
        <button onClick={onClose} className="close-button">
          X
        </button>
        <ul>
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <li key={address._id} onClick={() => onSelect(address._id)}>
                {address.nickname} - {address.address_line_1}, {address.city}
              </li>
            ))
          ) : (
            <li>No addresses available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
