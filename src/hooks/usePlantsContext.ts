import { useContext } from "react";
import { PlantsContext } from "../contexts/plantContextProvider";

export function usePlantsContext() {
  const context = useContext(PlantsContext);
  if(!context){
    throw new Error('context used outside of provider');
  }
  return context;
}