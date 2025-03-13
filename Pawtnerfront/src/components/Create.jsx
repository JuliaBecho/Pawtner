import React, { useState } from "react";
import "../styles/create.css";
import DogComputer from "../assets/corgicomputer.gif";
import axios from "axios";
import { userFirebase } from "../context/FirebaseContext";

export default function Create() {
  const { signup } = userFirebase(); //Extract singup function from Firebase context

  //State to store form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  //Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check if passwords match before submitting
    if (formData.password !== formData.confirmpassword) {
      alert("passwords do not match!");
      return;
    }
    try {
      await signup(formData.email, formData.password); //Call Firebase signup function

      alert("Account created successfully!");

      //Reset form fields after successful signup
      setFormData({
        email: "",
        password: "",
        confirmpassword: "",
      });
    } catch (error) {
      alert("Failed to crate account. Please try again.");
      console.error("Singup Error:", error);
    }
  };
  return (
    <div className="create-container">
      <h2 className="create-title">Create Account</h2>

      <div className="create-content">
        <form className="create-form" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />

          <label>Confirm your password:</label>
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />

          <button type="submit" className="create-button">
            CREATE
          </button>
        </form>

        <div className="create-image">
          <img src={DogComputer} alt="DOGGIF" className="dogcomputer" />
        </div>
      </div>
    </div>
  );
}
