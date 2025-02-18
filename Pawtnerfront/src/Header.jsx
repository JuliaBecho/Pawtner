
import PawtnerLogo from './assets/logopawtner.jpg';
import {FaCog, FaSignInAlt} from "react-icons/fa";
export default function Header(){
    return  (
    <div className='Header'>
         <img src= {PawtnerLogo} alt="" />
        <h1>Pawtner</h1>

        <div className='header-buttons'>
            <button className='settings-button'>
                <FaCog />
            </button>
            <button className='login-button'>
                Login <FaSignInAlt />
            </button>
        </div>
       
    </div>
    );
}