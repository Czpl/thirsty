import { ReactElement } from "react";
export interface IPlant {
    id: string;
    name: string;
    wateringInterval: number;
    lastWateredTimestamp: number;
    uid: string;
}

export interface ITabsProps {
    tabs: string[];
    children: Array<ReactElement>;
}