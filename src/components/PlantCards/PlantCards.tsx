import { useEffect, useState } from "react";
import { IPlant } from "../../interfaces/appInterfaces";
import SinglePlantCard from "../SinglePlantCard/SinglePlantCard";
import { PlantUpdateActions } from "../../enums/appEnums";
import { addDoc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { v1 as uuidv1 } from 'uuid';
import './PlantCards.scss'

function PlantCards() {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [newPlantName, setNewPlantName] = useState('');
  const [newWateringInterval, setNewWateringInterval] = useState('');
  
  const fetchPlants = async () => {
    await getDocs(collection(db, "plants"))
      .then((querySnapshot)=>{     
        const newData = querySnapshot.docs
          .map((doc) => ({...doc.data() as IPlant}));
        setPlants([...newData]);     
      })
  }
  const plantUpdateCb = async (plantid: string, action: string) => {
    if( action === PlantUpdateActions.remove ) {
      await getDocs(collection(db, "plants"))
        .then((querySnapshot)=>{
          const plantToRemove = querySnapshot.docs
            .find((doc) => (doc.data().id == plantid));
          plantToRemove && deleteDoc(plantToRemove.ref);
        }).then(() => fetchPlants());
    }
    if (action === PlantUpdateActions.water ) {
      await getDocs(collection(db, "plants"))
        .then((querySnapshot)=>{
          const plantToUpdate = querySnapshot.docs
            .find((doc) => (doc.data().id == plantid))
          plantToUpdate && updateDoc(plantToUpdate.ref, {lastWateredTimestamp: Date.now()});
        }).then(() => fetchPlants());
    }
  }

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
  useEffect(()=>{
    fetchPlants();
  }, [])

  if(!plants) return null
  return (
    <>
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
        {plants.map((item:IPlant) => <SinglePlantCard key={`${item.id}`} plant={item} plantUpdateCb={plantUpdateCb}/>)}
      </div>
    </>
  )
}

export default PlantCards