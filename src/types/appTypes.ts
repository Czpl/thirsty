import { ReactElement } from "react";
export type TPlant = {
    id: string;
    name: string;
    wateringInterval: number;
    lastWateredTimestamp: number;
    uid: string;
}

export type TTabsProps = {
    tabs: string[];
    children: Array<ReactElement>;
}

export type TTabs = 'My Plants' | 'Wiki';