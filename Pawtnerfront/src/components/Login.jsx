import React from "react";
import "../styles/login.css";
import InloveCatgif from "../assets/gatoapaixonado.gif";


export default function Login({setAnimal}){
    return(
        <div className="login-container">
            <h2 className="login-title">Login Form</h2>
            <div className="login-content">
                <form className="login-form">
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" required />

                    <label>Password:</label>
                    <input type="password" placeholder="Enter your password" required />

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