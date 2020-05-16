import React, { useState } from 'react';
import TrafficIntensityData from "../../Data/TrafficIntensity.json";
import StateSelector from '../Common Components/StateSelector';
import TrafficIntensityChart from '../Common Components/BarChart';

const getFormattedData = () => {
    let stateNameArray = [], seriesData = [], categories = [], defaultStates = [], currentSeriesData = [];
    let index = 0;
    const {stateData,countryData} = {...TrafficIntensityData.data}
    stateData.forEach((item) => {
        stateNameArray.push(item.stateName);
        let intensityArray = [];
        item.trafficIntensity.forEach((item) => {
            intensityArray.push(item.value);
            if (index === 0)
                categories.push(item.name);
        });

        //Only 1st 5 states are used for showing default data
        if (index < 5) {
            defaultStates.push(item.stateName);
            currentSeriesData.push({ name: item.stateName, data: intensityArray });
        }

        index += 1;
        //mapping data wih state name so that it can be retrieved in O(1)
        seriesData[item.stateName] = { name: item.stateName, data: intensityArray };
    });
    //Mapping data for india
    let countryIntensityArray = [];
    countryData.trafficIntensity.forEach((item) => {
        countryIntensityArray.push(item.value);
    });
    //mapping data wih state name so that it can be retrieved in O(1)
    seriesData[countryData.countryName] = { name: countryData.countryName, data: countryIntensityArray };
    return { stateNames: [countryData.countryName,...stateNameArray.sort()], seriesData, currentSeriesData, categories, defaultStates };
}

const { stateNames, seriesData, currentSeriesData, categories, defaultStates } = getFormattedData();

const TrafficIntensityGraph = (props) => {
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
            <TrafficIntensityChart theme={props.theme} seriesData={chartData.currentSeriesData} categories={categories}></TrafficIntensityChart>
        </div>
    );
}



export default TrafficIntensityGraph;