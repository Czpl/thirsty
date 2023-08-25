import { ReactElement, useEffect, useState } from "react"
import { ITabsProps } from "../../interfaces/appInterfaces";

import './tabs.scss';
import { usePlantsContext } from "../../hooks/usePlantsContext";
import findActions from "../../helpers/findActions";

type TabProps = {
  tab: string;
  value: number;
  index: number;
  handleChange: (index: number) => void;
}

function Tab({tab, value, index, handleChange}:TabProps) {
  const [showBadge, setShowBadge] = useState(false);
  const className = `tab ${value === index ? 'active' : ''}`;
  const {plants} = usePlantsContext();

  useEffect(() => {
    setShowBadge(tab === 'My Plants' && findActions(plants) !== 0);
  }, [plants, tab])

  return (
    <div
      key={tab}
      className={className}
      onClick={() => handleChange(index)}
    >
      {showBadge ? <span className="cta">{tab}</span> : <span>{tab}</span>}
    </div>
  );
}

function Tabs(props:ITabsProps) {
  const [value, setValue] = useState(0);

  const tabs: ReactElement[] = [...props.children];
  const handleChange = (newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className='tabPane'>
        {props.tabs.map((tab:string, index: number) => <Tab key={tab} tab={tab} value={value} index={index} handleChange={handleChange}  />)}
      </div>
      {tabs[value]}
    </>

  )
}

export default Tabs