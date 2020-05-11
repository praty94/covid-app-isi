import React from 'react';
import { WeeklyIncrease } from '../index';
const PageSwitchHelper = (props) => {
    switch(props.pageId){
        case 2:
            return <WeeklyIncrease theme={props.theme}></WeeklyIncrease>;
        default:
            return <h1>Not configured</h1>
    }
}

export default PageSwitchHelper;