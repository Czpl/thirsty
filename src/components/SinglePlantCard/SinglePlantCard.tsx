import pot from '../../assets/PottedPlant7.svg';
import { PlantUpdateActions } from '../../enums/appEnums';
import { IPlant } from '../../interfaces/appInterfaces';
import WaterProgress from '../WaterProgress/WaterProgress';

import './singlePlantCard.scss'


interface IPlantProps {
    plant: IPlant;
    plantUpdateCb: (id: string, action: PlantUpdateActions) => void;
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
                <button onClick={() => props.plantUpdateCb(props.plant.id, PlantUpdateActions.water)}>watered</button>
                <button onClick={() => props.plantUpdateCb(props.plant.id, PlantUpdateActions.remove)}>X</button>
            </div>
        </div>
    )
}

export default SinglePlantCard
