import pot from '../../assets/PottedPlant7.svg';
import WaterProgress from './WaterProgress';

import './singlePlantCard.scss'

export interface IPlant {
    id: string;
    name: string;
    wateringInterval: number;
    lastWateredTimestamp: number;
}
interface IPlantProps {
    plant: IPlant;
    removePlantCb: (id: string) => void;
}

function SinglePlantCard(props: IPlantProps)  {
    return (
        <div className="plantContainer">
            <img src={pot} className="plantIcon" alt="plant icon" />
            <WaterProgress intervalToWater={props.plant.wateringInterval} wateredTimestamp={props.plant.lastWateredTimestamp}/>
            <h3 className="plantName">{props.plant.name}</h3>
            <button>watered</button>
            <button onClick={() => props.removePlantCb(props.plant.id)}>X</button>
        </div>
    )
}

export default SinglePlantCard
