import { ReactElement, useState } from "react"
import { ITabsProps } from "../../interfaces/appInterfaces";

import './tabs.scss';

function Tabs(props:ITabsProps) {
  const [value, setValue] = useState(0);

  const tabs: ReactElement[] = [...props.children];
  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className='tabPane'>
        {props.tabs.map((tab:string, index: number) => <div key={tab} className={value === index ? 'active' : ''} onClick={() => handleChange(index)}>{tab}</div>)}
      </div>
      {tabs[value]}
    </>

  )
}


export default Tabs