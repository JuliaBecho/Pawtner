
import "../styles/header.css";
import PawtnerLogo from '../assets/logopawtner.png';
import {FaCog, FaSignInAlt} from "react-icons/fa";


export default function Header({ setAnimal }){
    return  (
    <div className='Header'>
        <div className="header-left">
            <img src= {PawtnerLogo} alt="" />
        <h1>Pawtner</h1>
        </div>
         

        <div className='header-right'>
            <button className='settings-button'>
                <FaCog />
            </button>
            <button className='login-button' onClick={() => setAnimal("login")}>
                Login <FaSignInAlt />
                
            </button>
        </div>
       
    </div>
    );
}