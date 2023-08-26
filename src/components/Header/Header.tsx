import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import pot from '../../assets/PottedPlant7.svg';

import './header.scss';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {               
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch(() => {
      // An error happened.
    });
  }
  
  return (
    <>
      <nav className="topNav">
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <header>
        <div>
          <img src={pot} className="plant" alt="plant icon" />
          <h1>Thirsty</h1>
        </div>
      </header>
    </>
  )
}

export default Header;