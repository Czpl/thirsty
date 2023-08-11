import { useState, useEffect } from 'react'
import './singlePlantCard.scss'

interface IWaterProgressProps {
    wateredTimestamp: number;
    intervalToWater: number;
}

function calculatePercentage(watered: number, interval: number) {
    const now = Date.now();
    const whenToWater = watered + interval;
    const percent = Math.round(now / whenToWater * 100);
    return percent;
}

function WaterProgress(props: IWaterProgressProps)  {
    const [progress, setProgress] = useState(100);
    const [displayProgress, setDisplayProgress] = useState(false);

    useEffect(() => {
        const newValue =  calculatePercentage(props.wateredTimestamp, props.intervalToWater);
        setProgress(newValue);
        setDisplayProgress(true);
      }, [progress, props.intervalToWater, props.wateredTimestamp]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newValue =  calculatePercentage(props.wateredTimestamp, props.intervalToWater);
            setProgress(newValue);
            setDisplayProgress(true);
            return () => clearTimeout(timeout);
        }, 3600000);
        if(progress <= 0) {
            setProgress(0);
            setDisplayProgress(false);
            clearTimeout(timeout);
        }
      }, [progress, props.intervalToWater, props.wateredTimestamp]);
    
    if(!displayProgress) return null;

    return (
        <div className="barContainer">
            <div className="barFill" style={{height: `${progress}%`}}/>
        </div>
    )
}

export default WaterProgress
