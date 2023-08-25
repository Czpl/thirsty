import { useState, useEffect } from 'react'
import './LandingPage.scss'
import Tabs from '../../components/Tabs/Tabs';
import { NavLink, useNavigate } from 'react-router-dom'
import useUserData from '../../hooks/useUserData';
import { signOut } from "firebase/auth";
import { auth } from '../../services/firebase';
import PlantCards from '../../components/PlantCards/PlantCards';
import PlantContextProvider from '../../contexts/plantContextProvider';
import { TabNames } from '../../enums/appEnums';

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
      <PlantContextProvider user={user}>
        <Tabs tabs={[TabNames.HOME,TabNames.WIKI]}>
          <PlantCards/>
          <div>wiki</div>
        </Tabs>
      </PlantContextProvider>

    </>
  )
}

export default App
