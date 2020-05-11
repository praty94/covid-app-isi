import React, { useState } from 'react';
import WeeklyData from "../../../Data/WeeklyRateOfIncrease.json";
import StateSelector from './StateSelector';
import WeeklyBarChart from './WeeklyBarChart';

const WeeklyGraph = (props) => {
    const {names,seriesData,categories} = getFormattedData();
    const [chartData] = useState({names,seriesData,categories});    
    const handleStateChange = (selectedStateArray) => {
        console.log(selectedStateArray);
    }
    
    return (
    <div>
        <StateSelector states={chartData.names} handleStateChange={(selectedStateArray)=>handleStateChange(selectedStateArray)}></StateSelector>
        <WeeklyBarChart theme={props.theme} seriesData={chartData.seriesData} categories={chartData.categories}></WeeklyBarChart>
    </div>
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
            if(index === 0)
                categories.push(ratio.name);
        });
        index+=1;
        seriesData.push({name:item.stateName,data:ratioArray});
    });
    stateNameArray = stateNameArray.splice(0,5);
    return {names : stateNameArray.sort(),seriesData:seriesData.splice(0,5),categories:categories};
}

export default WeeklyGraph;