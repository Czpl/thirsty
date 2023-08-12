import { ReactElement } from "react";
export interface IPlant {
    id: string;
    name: string;
    wateringInterval: number;
    lastWateredTimestamp: number;
}

export interface ITabsProps {
    tabs: string[];
    children: Array<ReactElement>;
}