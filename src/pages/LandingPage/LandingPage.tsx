import { useState, useEffect, createContext, useCallback } from 'react'
import './LandingPage.scss'
import Tabs from '../../components/Tabs/Tabs';
import { NavLink, useNavigate } from 'react-router-dom'
import useUserData from '../../hooks/useUserData';
import { signOut } from "firebase/auth";
import { auth, db } from '../../services/firebase';
import PlantCards from '../../components/PlantCards/PlantCards';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { IPlant } from '../../interfaces/appInterfaces';

export const PlantsContext = createContext([]);

function App() {  
  const [loggedIn, setLoggedIn] = useState(false);
  const [plants, setPlants] = useState<IPlant[]>();
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
  
  // todo move to separate dir
  const getSnapshot = useCallback(async () => {
    const plantsRef = collection(db, "plants");
    const q = query(plantsRef, where("uid", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot;
  }, [user?.uid])

  const fetchPlants = useCallback(async () => {
    console.log('fetching plants')
    const data = await getSnapshot();
    const newData = data.docs
      .map((doc) => ({...doc.data() as IPlant}));
    setPlants([...newData]);     
  }, [getSnapshot])

  useEffect(()=>{
    if (user) {
      setLoggedIn(true);
      fetchPlants();
    } else {
      setLoggedIn(false);
    }
  }, [user, fetchPlants])

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
        <PlantCards plants={plants} functions={{fetchPlants,getSnapshot}}/>
        <div>wiki</div>
      </Tabs>
    </>
  )
}

export default App
