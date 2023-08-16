import { useEffect, useState } from "react";
import { IPlant } from "../../interfaces/appInterfaces";
import SinglePlantCard from "../SinglePlantCard/SinglePlantCard";
import { PlantUpdateActions } from "../../enums/appEnums";
import { collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import './PlantCards.scss'
import AddPlantSection from "../AddPlantSection/AddPlantSection";
import Modal from "../Modal/Modal";

function PlantCards() {
  const [plants, setPlants] = useState<IPlant[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

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
  useEffect(()=>{
    fetchPlants();
  }, [])

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