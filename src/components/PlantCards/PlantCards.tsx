import { useState } from "react";
import { TPlant } from "../../types/appTypes";
import SinglePlantCard from "../SinglePlantCard/SinglePlantCard";
import { PlantUpdateActions } from "../../enums/appEnums";
import {  deleteDoc, updateDoc } from "firebase/firestore";
import './PlantCards.scss'
import AddPlantSection from "../AddPlantSection/AddPlantSection";
import Modal from "../Modal/Modal";
import { usePlantsContext } from "../../hooks/usePlantsContext";

function PlantCards() {
  const [modalOpen, setModalOpen] = useState(false);
  const {plants, setPlants, fetchPlants, getSnapshot} = usePlantsContext();

  // todo extract to actions, refactor
  const plantUpdateCb = async (plantid: string, action: string) => {
    const data = await getSnapshot();
    const localPlants = [...plants];
    if( action === PlantUpdateActions.remove ) {
      const plantToRemove = data.docs.find((doc) => (doc.data().id == plantid));
      plantToRemove && deleteDoc(plantToRemove.ref);
      const filtered = localPlants.filter(plant => plant.id !== plantid);
      setPlants(filtered);
    }
    if (action === PlantUpdateActions.water ) {
      const timestamp = Date.now();
      const plantToUpdate = data.docs.find((doc) => (doc.data().id == plantid))
      plantToUpdate && updateDoc(plantToUpdate.ref, {lastWateredTimestamp: timestamp});
      const updateIndex = localPlants.findIndex(plant => plant.id === plantid);
      localPlants[updateIndex].lastWateredTimestamp = timestamp;
      setPlants(localPlants);
    }
  }

  if(!plants) return null
  return (
    <>
      <button onClick={() => setModalOpen(true)}> add Plant </button>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}><AddPlantSection fetchPlants={fetchPlants}/></Modal>
      <h2>My plants:</h2>
      <div className="plantsContainer">
        {plants.map((item:TPlant) => <SinglePlantCard key={`${item.id}`} plant={item} plantUpdateCb={plantUpdateCb}/>)}
      </div>
    </>
  )
}

export default PlantCards