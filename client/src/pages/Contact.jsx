import React from "react";

const Contact = () => {
  return (
    <div className="resource-container">
      <h1>Contact Us</h1>
      <p>
        For any questions or assistance, please reach out to our support team.
      </p>
      <p>
        Email us:{" "}
        <a href="mailto:handyhelpers-support@gmail.com" className="email-link">
          handyhelpers-support@gmail.com
        </a>
      </p>
    </div>
  );
};

export default Contact;
