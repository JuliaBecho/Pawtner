import "../styles/header.css";
import PawtnerLogo from "../assets/logopawtner.png";
import { FaCog, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { userFirebase } from "../context/FirebaseContext";

export default function Header({ setAnimal }) {
  const { user, logout } = userFirebase(); //Get user state and logout function from firebase context

  //Handle logout and show alert
  function handleLogout() {
    logout();
    alert("You have been successfully logged out.");
  }

  return (
    <div className="Header">
      <div className="header-left">
        <img src={PawtnerLogo} alt="Pawtner Logo" />
        <h1>Pawtner</h1>
      </div>

      <div className="header-right">
        {user ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout <FaSignOutAlt />{" "}
          </button>
        ) : (
          <button className="login-button" onClick={() => setAnimal("login")}>
            Login <FaSignInAlt />
          </button>
        )}
      </div>
    </div>
  );
}
