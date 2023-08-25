import { calculatePercentage } from './../../helpers/calcPercentage';
import { useState, useEffect } from 'react'
import './waterProgress.scss'

interface IWaterProgressProps {
    wateredTimestamp: number;
    intervalToWater: number;
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
