import React from 'react';
import WeeklyData from "../../../Data/WeeklyRateOfIncrease.json";
import StateSelector from './StateSelector';
import WeeklyBarChart from './WeeklyBarChart';

const WeeklyGraph = (props) => {
    const {names,seriesData,categories} = getFormattedData();
    return (
    <React.Fragment>
        <StateSelector states={names}></StateSelector>
        <WeeklyBarChart seriesData={seriesData} categories={categories}></WeeklyBarChart>
    </React.Fragment>
    );
}
const getFormattedData = () =>{
    let stateNameArray = [],seriesData=[],categories=[];
    let index = 0;
    WeeklyData.data.stateData.forEach((item)=>{
        stateNameArray.push(item.stateName);
        let ratioArray = [];        
        item.ratios.forEach((ratio)=>{
            ratioArray.push(ratio.value);
            if(index == 0)
                categories.push(ratio.name);
        });
        index+=1;
        seriesData.push({name:item.stateName,data:ratioArray});
    });
    return {names : stateNameArray.sort(),seriesData:seriesData,categories:categories};
}

export default WeeklyGraph;