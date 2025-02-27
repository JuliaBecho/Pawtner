import React, { useState } from "react";
import "../styles/create.css"
import DogComputer from "../assets/corgicomputer.gif"
import axios from "axios";


export default function Create(){
   const [formData, setFormData] = useState({
    email:"",
    password:"",
    confirmpassword:""
   });

   const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
   };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if(formData.password !== formData.confirmpassword){
        alert("passwords do not match!");
        return;
    }
    try{
        const response = await axios.post ("http://localhost:3000/signup", {
            email: formData.email,
            password:formData.password
        });

        alert("Account created successfully!");
        console.log("User Data:", response.data);


        setFormData({
            email:"",
            password:"",
            confirmPassword:"",
        });
    }catch (error){
        alert("Failed to crate account. Please try again.");
        console.error("Singup Error:", error);
    }
   };
    return(
       <div className="create-container">
        <h2 className="create-title">Create Account</h2>

        <div className="create-content">
            <form className="create-form" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" value={formData.password} onChange={handleChange}  placeholder="Enter your password" required />

                 <label>Confirm your password:</label>
                <input type="password" value={formData.confirmpassword} onChange={handleChange}  placeholder="Confirm your password" required />

                <button type="submit" className="create-button">CREATE</button>
            </form>

            <div className="create-image">
                <img src={DogComputer} alt="DOGGIF" className="dogcomputer"  />
                 
            </div>
        </div>
       </div>
    )
}