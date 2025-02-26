import React from "react";
import "../styles/login.css";
import InloveCatgif from "../assets/gatoapaixonado.gif";
import axios from "axios";


export default function Login({setAnimal}){
    const [formData,setFormData] = useState({
        email: "",
        password:""
    });

    const handleChange = (e) => {
        const {name,value}= e.target;
        setFormData({
            ...formData,
            [name]:value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/login", formData);
            alert("Login successful!");
            console.log("User Data:", response.data);
        }catch (error){
            alert("Login failed.Please check your credentials");
            console.error("Login Error", error);
        }

    };



    return(
        <div className="login-container">
            <h2 className="login-title">Login Form</h2>
            <div className="login-content">
                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />

                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} required />

                    <button type="submit" className="Login-button">LOGIN</button>
                    <button type="button" className="create-account" onClick={()=> setAnimal("create")}>CREATE ACCOUNT</button>
                </form>

                <div className="login-image">
                    <img src={InloveCatgif} alt="CATGIF"  />
                </div>

            </div>
        </div>
    );
}