
import "../styles/container.css";
import catpointing from '../assets/catpointing.png';
import React, {useRef} from "react";
import Text from "./Text";

export default function Title(){

const backendURl = import.meta.env.VITE_PAWTNERBACKEND
console.log(backendURl)

const textSectionRef = useRef(null);
const scrollToText = () => {
    textSectionRef.current?.scrollIntoView({behavior: "smooth"});
};
    
    return ( 
        
    <div className="hero-section">
            
            <div className="image-container">
            <img src={catpointing} alt="img" className='cat-image' />
            
            </div>

        <div className="title-container">
            <h1>Welcome to Pawtner</h1>
            <h2>A Plataform for Animal Welfare</h2>
            <p>Empowering Communities to Protect Animals Report Abuse, Reunite Lost Pets, and Give Strays a Second Chance.</p>
            <button className="learn-more" onClick={scrollToText}>Learn More</button>

        </div>

        <Text textSectionRef={textSectionRef} />

        
   
        

    </div>

        
        
    );
}
