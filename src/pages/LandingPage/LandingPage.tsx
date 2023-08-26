import { useState, useEffect } from 'react'
import './LandingPage.scss'
import Tabs from '../../components/Tabs/Tabs';
import { NavLink } from 'react-router-dom'
import useUserData from '../../hooks/useUserData';
import PlantCards from '../../components/PlantCards/PlantCards';
import PlantContextProvider from '../../contexts/plantContextProvider';
import { TabNames } from '../../enums/appEnums';

function App() {  
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useUserData();
  
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
