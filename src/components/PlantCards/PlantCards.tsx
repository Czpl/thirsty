import { useState } from "react";
import { IPlant } from "../../interfaces/appInterfaces";
import SinglePlantCard from "../SinglePlantCard/SinglePlantCard";
import { PlantUpdateActions } from "../../enums/appEnums";
import {  deleteDoc, updateDoc } from "firebase/firestore";
import './PlantCards.scss'
import AddPlantSection from "../AddPlantSection/AddPlantSection";
import Modal from "../Modal/Modal";
import { usePlantsContext } from "../../hooks/usePlantsContext";

function PlantCards() {
  // const [plants, setPlants] = useState<IPlant[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const {plants , fetchPlants, getSnapshot} = usePlantsContext();

  const plantUpdateCb = async (plantid: string, action: string) => {
    const data = await getSnapshot();
    if( action === PlantUpdateActions.remove ) {
      const plantToRemove = data.docs.find((doc) => (doc.data().id == plantid));
      plantToRemove && deleteDoc(plantToRemove.ref);
    }
    if (action === PlantUpdateActions.water ) {
      const plantToUpdate = data.docs.find((doc) => (doc.data().id == plantid))
      plantToUpdate && updateDoc(plantToUpdate.ref, {lastWateredTimestamp: Date.now()});
    }
    //todo: use local state for updated plants
  }

  if(!plants) return null
  return (
    <>
      <button onClick={() => setModalOpen(true)}> add Plant </button>
      <Modal isOpen={modalOpen} setIsOpen={setModalOpen}><AddPlantSection fetchPlants={fetchPlants}/></Modal>
      <h2>My plants:</h2>
      <div className="plantsContainer">
        {plants.map((item:IPlant) => <SinglePlantCard key={`${item.id}`} plant={item} plantUpdateCb={plantUpdateCb}/>)}
      </div>
    </>
  )
}

export default PlantCards