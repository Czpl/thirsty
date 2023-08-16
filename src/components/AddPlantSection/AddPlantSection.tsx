import { useState } from "react";
import { v1 as uuidv1 } from 'uuid';
import { IPlant } from "../../interfaces/appInterfaces";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase";
import './AddPlantSection.scss';

interface IAddPlantSectionProps {
  fetchPlants: () => Promise<void>;
}

function AddPlantSection(props: IAddPlantSectionProps) {
  const { fetchPlants } = props;
  const [newPlantName, setNewPlantName] = useState('');
  const [newWateringInterval, setNewWateringInterval] = useState('');

  const handleNewPlant = async () => {
    const id = uuidv1();
    const plantObj: IPlant = {
      id: id,
      name: newPlantName,
      wateringInterval: Number(newWateringInterval)*24*60*60*1000,
      lastWateredTimestamp: Date.now()
    }
    try {
      const docRef = await addDoc(collection(db, "plants"), {
        ...plantObj,    
      });
      console.log("Document written with ID: ", docRef.id);
      fetchPlants();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return (
    <div className="card">
      <span>plant name</span>
      <input value={newPlantName} onChange={(e) => setNewPlantName(e.target.value)}></input>
      <span>watering interval (days)</span>
      <input value={newWateringInterval} onChange={(e) => setNewWateringInterval(e.target.value.replace(/\D/,''))}></input>
      <button onClick={handleNewPlant}>
        add plant
      </button>
    </div> 
  )
}

export default AddPlantSection;