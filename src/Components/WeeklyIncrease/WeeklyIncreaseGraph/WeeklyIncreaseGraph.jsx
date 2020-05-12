import React, { useState } from 'react';
import WeeklyData from "../../../Data/WeeklyRateOfIncrease.json";
import StateSelector from './StateSelector';
import WeeklyBarChart from './WeeklyBarChart';

const getFormattedData = () => {
    let stateNameArray = [], seriesData = [], categories = [],defaultStates=[],currentSeriesData=[];
    let index = 0;
    WeeklyData.data.stateData.forEach((item) => {
        stateNameArray.push(item.stateName);
        let ratioArray = [];
        item.ratios.forEach((ratio) => {
            ratioArray.push(ratio.value);
            if (index === 0)
                categories.push(ratio.name);
        });

        //Only 1st 5 states are used for showing default data
        if(index<5){
            defaultStates.push(item.stateName);
            currentSeriesData.push({name: item.stateName, data: ratioArray});
        }

        index += 1;
        //mapping data wih state name so that it can be retrieved in O(1)
        seriesData[item.stateName] = { name: item.stateName, data: ratioArray };
    });
    return { stateNames: stateNameArray.sort(),seriesData,currentSeriesData, categories,defaultStates };
}

const { stateNames, seriesData,currentSeriesData, categories,defaultStates } = getFormattedData();

const WeeklyGraph = (props) => {
    const [chartData,setChartData] = useState({currentSeriesData});
    const filterChartData = (selectedStateArray)=>{        
        let filteredData = [];        
        for(let i=0;i<selectedStateArray.length;i++){
            if(seriesData[selectedStateArray[i]]){
                filteredData.push(seriesData[selectedStateArray[i]]);
            }
        }
        return filteredData;
    }
    const handleStateChange = (selectedStateArray) => {        
        console.log(selectedStateArray);
        setChartData({currentSeriesData : filterChartData(selectedStateArray)});
    }

    return (
        <div>
            <StateSelector defaultStates={defaultStates} states={stateNames} handleStateChange={(selectedStateArray) => handleStateChange(selectedStateArray)}></StateSelector>
            <WeeklyBarChart theme={props.theme} seriesData={chartData.currentSeriesData} categories={categories}></WeeklyBarChart>
        </div>
    );
}



export default WeeklyGraph;