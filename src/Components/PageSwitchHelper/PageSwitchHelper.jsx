import React from 'react';
import { WeeklyIncrease } from '../index';
const PageSwitchHelper = (props) => {
    switch(props.pageId){
        case 2:
            return <WeeklyIncrease></WeeklyIncrease>;
        default:
            return <h1>Not configured</h1>
    }
}

export default PageSwitchHelper;