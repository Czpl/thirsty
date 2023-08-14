import { useState, useEffect, createContext } from 'react'
import './LandingPage.scss'
import Tabs from '../../components/Tabs/Tabs';
import { NavLink, useNavigate } from 'react-router-dom'
import useUserData from '../../hooks/useUserData';
import { signOut } from "firebase/auth";
import { auth } from '../../services/firebase';
import PlantCards from '../../components/PlantCards/PlantCards';

export const PlantsContext = createContext([]);

function App() {  
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = useUserData();

  const handleLogout = () => {               
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch(() => {
      // An error happened.
    });
  }
  
  useEffect(()=>{
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user])

  if(!loggedIn) { 
    return (
      <>
        <NavLink to="/login">
          Log in to continue
        </NavLink>
      </>
      
    )
  }

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <Tabs tabs={['My Plants','Plant Wiki']}>
        <PlantCards />
        <div>wiki</div>
      </Tabs>
    </>
  )
}

export default App
