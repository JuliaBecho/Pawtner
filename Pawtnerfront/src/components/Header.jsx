
import "../styles/header.css";
import PawtnerLogo from '../assets/logopawtner.png';
import {FaCog, FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import { userFirebase } from "../context/FirebaseContext";


export default function Header({ setAnimal }){
    const {user,logout} = userFirebase();

    return  (
    <div className='Header'>
        <div className="header-left">
            <img src= {PawtnerLogo} alt="Pawtner Logo" />
        <h1>Pawtner</h1>
        </div>
         

        <div className='header-right'>
            <button className='settings-button'>
                <FaCog />
            </button>

            <button className="logout-button" onClick={logout}>Logout <FaSignOutAlt/> </button>


            <button className='login-button' onClick={() => setAnimal("login")}>
                Login <FaSignInAlt />
                
            </button>
        </div>
       
    </div>
    );
}