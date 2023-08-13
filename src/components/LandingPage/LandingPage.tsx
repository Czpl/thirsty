import { useState, useEffect } from 'react'
import SinglePlantCard from '../SinglePlantCard/SinglePlantCard';
import './LandingPage.scss'
import { v1 as uuidv1 } from 'uuid';
import { PlantUpdateActions } from '../../enums/appEnums';
import { IPlant } from '../../interfaces/appInterfaces';
import Tabs from '../Tabs/Tabs';
import { NavLink, useNavigate } from 'react-router-dom'
import useUserData from '../../hooks/useUserData';
import { signOut } from "firebase/auth";
import { auth } from '../../services/firebase';

function App() {
  const [plants, setPlants] = useState(() => {
    const savedPlants = localStorage.getItem("plants");
    if(!savedPlants) return [];
    return JSON.parse(savedPlants);
  });
  const [newPlantName, setNewPlantName] = useState('');
  const [newWateringInterval, setNewWateringInterval] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const user = useUserData();

  const handleNewPlant = () => {
    const id = uuidv1();
    const plantObj: IPlant = {
      id: id,
      name: newPlantName,
      wateringInterval: Number(newWateringInterval)*24*60*60*1000,
      lastWateredTimestamp: Date.now()
    }
    setPlants([...plants, plantObj])
  }
  

  const plantUpdateCb = (plantid: string, action: string) => {
    if( action === PlantUpdateActions.remove ) {
      setPlants(plants.filter((plant: IPlant) => plant.id !== plantid));
    }
    if (action === PlantUpdateActions.water ) {
      const plantIdx = plants.findIndex((plant: IPlant) => plant.id === plantid);
      const plantList = [...plants];
      plantList[plantIdx].lastWateredTimestamp = Date.now();
      setPlants(plantList);
    }
  }

 
  const handleLogout = () => {               
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch(() => {
      // An error happened.
    });
  }

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);
  
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
      <div className="card">
        <span>plant name</span>
        <input value={newPlantName} onChange={(e) => setNewPlantName(e.target.value)}></input>
        <span>watering interval (days)</span>
        <input value={newWateringInterval} onChange={(e) => setNewWateringInterval(e.target.value.replace(/\D/,''))}></input>
        <button onClick={handleNewPlant}>
          add plant
        </button>
      </div>
      <Tabs tabs={['My Plants','Plant Wiki']}>
        <>
          <h2>My plants:</h2>
          <div className="plantsContainer">
            {plants.map((item:IPlant) => <SinglePlantCard key={`${item.id}`} plant={item} plantUpdateCb={plantUpdateCb}/>)}
          </div>
        </>
        <div>wiki</div>
      </Tabs>
    </>
  )
}

export default App
