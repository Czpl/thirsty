import { IPlant } from "../interfaces/appInterfaces";
import { calculatePercentage } from "./calcPercentage";

export default function findActions(plants: IPlant[]){
  const actions = plants.reduce((acc, plant) => reducer(acc, plant), 0)
  return actions
}

function reducer(acc: number, plant: IPlant): number {
  if(calculatePercentage(plant.lastWateredTimestamp, plant.wateringInterval) < 50){
    return ++acc
  }
  return acc;
}
