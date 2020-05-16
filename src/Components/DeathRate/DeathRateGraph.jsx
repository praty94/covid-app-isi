import React, { useState } from 'react';
import DeathRateData from "../../Data/DeathRate.json";
import StateSelector from '../Common Components/StateSelector';
import BarChart from '../Common Components/BarChart';

const getFormattedData = () => {
    let stateNameArray = [], seriesData = [], categories = [], defaultStates = [], currentSeriesData = [];
    let index = 0;
    const { stateData } = { ...DeathRateData.data }
    stateData.forEach((item) => {
        stateNameArray.push(item.stateName);
        let rateArray = [];
        item.deathRate.forEach((item) => {
            rateArray.push(item.rate);
            if (index === 0)
                categories.push(item.date);
        });

        //Only 1st 5 states are used for showing default data
        if (index < 5) {
            defaultStates.push(item.stateName);
            currentSeriesData.push({ name: item.stateName, data: rateArray });
        }

        index += 1;
        //mapping data wih state name so that it can be retrieved in O(1)
        seriesData[item.stateName] = { name: item.stateName, data: rateArray };
    });
    
    return { stateNames: stateNameArray.sort(), seriesData, currentSeriesData, categories, defaultStates };
}

const { stateNames, seriesData, currentSeriesData, categories, defaultStates } = getFormattedData();

const DeathRateGraph = (props) => {
    const [chartData, setChartData] = useState({ currentSeriesData });
    const filterChartData = (selectedStateArray) => {
        let filteredData = [];
        for (let i = 0; i < selectedStateArray.length; i++) {
            if (seriesData[selectedStateArray[i]]) {
                filteredData.push(seriesData[selectedStateArray[i]]);
            }
        }
        return filteredData;
    }
    const handleStateChange = (selectedStateArray) => {
        console.log(selectedStateArray);
        setChartData({ currentSeriesData: filterChartData(selectedStateArray) });
    }

    return (
        <div>
            <StateSelector defaultStates={defaultStates} states={stateNames} handleStateChange={(selectedStateArray) => handleStateChange(selectedStateArray)}></StateSelector>
            <BarChart theme={props.theme} seriesData={chartData.currentSeriesData} categories={categories}></BarChart>
        </div>
    );
}



export default DeathRateGraph;