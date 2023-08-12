import { useState, useEffect } from 'react'
import './waterProgress.scss'

interface IWaterProgressProps {
    wateredTimestamp: number;
    intervalToWater: number;
}

function calculatePercentage(watered: number, interval: number) {
    const now = Date.now();
    const startTime = watered;
    const endTime = watered + interval;
    const q = Math.abs(now-startTime);
    const d = Math.abs(endTime-startTime);
    const percent = 100 - Math.round((q/d)*100);
    if (percent < 0) return 0;
    if (percent > 100) return 100;
    return percent;
}

function WaterProgress(props: IWaterProgressProps)  {
    const [progress, setProgress] = useState(calculatePercentage(props.wateredTimestamp, props.intervalToWater));

    useEffect(() => {
        const newValue =  calculatePercentage(props.wateredTimestamp, props.intervalToWater);
        setProgress(newValue);
      }, [progress, props.intervalToWater, props.wateredTimestamp]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const newValue =  calculatePercentage(props.wateredTimestamp, props.intervalToWater);
            setProgress(newValue);
            return () => clearTimeout(timeout);
        }, 1000);
      }, [progress, props.intervalToWater, props.wateredTimestamp]);
    
    return (
        <div className="barContainer">
            <div className="barFill" style={{height: `${progress}%`}} data-testid={'barFill'}/>
        </div>
    )
}

export default WaterProgress
