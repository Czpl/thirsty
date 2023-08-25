import { TPlant } from "../types/appTypes";
import { calculatePercentage } from "./calcPercentage";

export default function findActions(plants: TPlant[]){
  const actions = plants.reduce((acc, plant) => reducer(acc, plant), 0)
  return actions
}

function reducer(acc: number, plant: TPlant): number {
  if(calculatePercentage(plant.lastWateredTimestamp, plant.wateringInterval) < 50){
    return ++acc
  }
  return acc;
}
