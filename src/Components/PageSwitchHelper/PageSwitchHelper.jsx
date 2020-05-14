import React from 'react';
import { WeeklyIncrease,RecoveryRate } from '../index';
const PageSwitchHelper = (props) => {
    switch(props.pageId){
        case 2:
            return <WeeklyIncrease theme={props.theme}></WeeklyIncrease>;   
            case 3:
                return <RecoveryRate theme={props.theme}></RecoveryRate>         
        default:
            return <h1>Not configured</h1>
    }
}

export default PageSwitchHelper;