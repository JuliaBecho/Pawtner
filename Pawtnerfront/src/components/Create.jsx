import React from "react";
import "../styles/create.css"
import DogComputer from "../assets/corgicomputer.gif"

export default function Create(){
    return(
       <div className="create-container">
        <h2 className="create-title">Create Account</h2>

        <div className="create-content">
            <form className="create-form">
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" required />

                <label>Password:</label>
                <input type="password" placeholder="Enter your password" required />

                 <label>Confirm your password:</label>
                <input type="password" placeholder="Confirm your password" required />

                <button type="submit" className="create-button">CREATE</button>
            </form>

            <div className="create-image">
                <img src={DogComputer} alt="DOGGIF" className="dogcomputer"  />
                 
            </div>
        </div>
       </div>
    )
}