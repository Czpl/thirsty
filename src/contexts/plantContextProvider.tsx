import React, { createContext, useCallback, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { QuerySnapshot, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { IPlant } from "../interfaces/appInterfaces";

type PlantContextProviderProps = {
  user: User | null;
  children: React.ReactNode;
}

type PlantContext = {
  plants: IPlant[],
  setPlants: React.Dispatch<React.SetStateAction<IPlant[]>>,
  fetchPlants: () => Promise<void>;
  getSnapshot: () => Promise<QuerySnapshot>;
}

export const PlantsContext = createContext<PlantContext | null>(null);

export default function PlantContextProvider( props: PlantContextProviderProps) {
  const [plants, setPlants] = useState<IPlant[]>([]);

  const getSnapshot = useCallback(async () => {
    const plantsRef = collection(db, "plants");
    const q = query(plantsRef, where("uid", "==", props.user?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot;    
  }, [props.user?.uid])

  const fetchPlants = useCallback(async () => {
    console.log('fetching plants')
    const data = await getSnapshot();
    const newData = data.docs
      .map((doc) => ({...doc.data() as IPlant}));
    setPlants([...newData]);
  }, [getSnapshot])

  useEffect(() => {
    fetchPlants();
  }
  ,[fetchPlants])

  return (
    <PlantsContext.Provider
      value={{
        plants,
        setPlants,
        fetchPlants,
        getSnapshot,
      }}
    >
      {props.children}
    </PlantsContext.Provider>
  )
}
