
import "../styles/header.css";
import PawtnerLogo from '../assets/logopawtner.png';
import {FaCog, FaSignInAlt, FaSignOutAlt} from "react-icons/fa";
import { userFirebase } from "../context/FirebaseContext";


export default function Header({ setAnimal }){
    const {user,logout} = userFirebase();

    function handleLogout(){
        logout();
        alert("Logout")
    }

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


            {user?(
                 <button className="logout-button" onClick={handleLogout}>Logout <FaSignOutAlt/> </button>

            ) : (
                <button className='login-button' onClick={() => setAnimal("login")}>
                Login <FaSignInAlt />
                
            </button>
            )}

           
        </div>
       
    </div>
    );
}