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
            <div className="iconContainer">
                <img src={pot} className="plantIcon" alt="plant icon" />
                <WaterProgress intervalToWater={props.plant.wateringInterval} wateredTimestamp={props.plant.lastWateredTimestamp}/>
            </div>
            <h3 className="plantName">{props.plant.name}</h3>
            <div className="buttonsContainer">
                <button>watered</button>
                <button onClick={() => props.removePlantCb(props.plant.id)}>X</button>
            </div>
        </div>
    )
}

export default SinglePlantCard
