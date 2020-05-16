import React from 'react';
import { WeeklyIncrease, RecoveryRate, TrafficIntensity,Concentration,DeathRate } from '../index';
const PageSwitchHelper = (props) => {
    switch (props.pageId) {
        case 2:
            return <WeeklyIncrease theme={props.theme}></WeeklyIncrease>;
        case 3:
            return <RecoveryRate theme={props.theme}></RecoveryRate>;
        case 4:
            return <TrafficIntensity theme={props.theme}></TrafficIntensity>;
        case 5:
            return <Concentration theme={props.theme}></Concentration>;
        case 8:
            return <DeathRate theme={props.theme}></DeathRate>;
        default:
            return <h1>Not configured</h1>
    }
}

export default PageSwitchHelper;