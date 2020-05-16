import React, { useState } from 'react';
import ConcentrationData from "../../Data/Concentration.json";
import StateSelector from '../Common Components/StateSelector';
import WeeklyBarChart from '../Common Components/BarChart';

const getFormattedData = () => {
    let seriesData = [],concentrationArray=[], categories = [], defaultStates = [], currentSeriesData = [];   
    const {stateData} = {...ConcentrationData.data}
    stateData.forEach((item) => {
        categories.push(item.stateName);
        concentrationArray.push(item.concentration);
    });
    currentSeriesData.push({name:"Concentration",data:concentrationArray});
    
    return { stateNames: categories.sort(), seriesData, currentSeriesData, categories, defaultStates };
}

const { stateNames, seriesData, currentSeriesData, categories, defaultStates } = getFormattedData();

const ConcentrationGraph = (props) => {
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
            <WeeklyBarChart distributed={true} horizontal={true} theme={props.theme} seriesData={chartData.currentSeriesData} categories={categories}></WeeklyBarChart>
        </div>
    );
}



export default ConcentrationGraph;