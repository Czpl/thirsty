import { useState, useEffect } from 'react'
import pot from './assets/PottedPlant7.svg';
import SinglePlantCard, { IPlant } from './components/SinglePlantCard/SinglePlantCard';
import './App.scss'
import { v1 as uuidv1 } from 'uuid';

function App() {
  const [plants, setPlants] = useState(() => {
      const savedPlants = localStorage.getItem("plants");
      if(!savedPlants) return [];
      return JSON.parse(savedPlants);
  });
  const [newPlantName, setNewPlantName] = useState('');
  const [newWateringInterval, setNewWateringInterval] = useState('');

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

  const removePlantCb = (plantid: string) => {
    setPlants(plants.filter((plant: IPlant) => plant.id !== plantid));
  }

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);
  
  return (
    <>
      <div>
        <img src={pot} className="plant" alt="plant icon" />
      </div>
      <h1>Thirsty</h1>
      <div className="card">
           <span>plant name</span>
           <input value={newPlantName} onChange={(e) => setNewPlantName(e.target.value)}></input>
           <span>watering interval (days)</span>
          <input value={newWateringInterval} onChange={(e) => setNewWateringInterval(e.target.value.replace(/\D/,''))}></input>
        <button onClick={handleNewPlant}>
          add plant
        </button>
      </div>  
      <h2>My plants:</h2>
      <div className="plantsContainer">
        {plants.map((item:IPlant) => <SinglePlantCard key={`${item.id}`} plant={item} removePlantCb={removePlantCb}/>)}
      </div>
    </>
  )
}

export default App
