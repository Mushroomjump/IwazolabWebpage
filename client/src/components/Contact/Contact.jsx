// Contact.jsx
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to an API
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="form">
      <h2 className="">Contact Us</h2>
      <form className="contact-container" onSubmit={handleSubmit}>
        <div className="form-name form-space">
          <label className="labels">Name</label>
          <input
            type="text"
            name="name"
            className="input"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-email form-space">
          <label className="labels">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-subject form-space">
          <label className="labels">Subject</label>
          <input
            type="text"
            name="subject"
            className="input"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>
        <div className="form-message form-space">
          <label className="labels">Message</label>
          <textarea
            name="message"
            className="input"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="form-button">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
