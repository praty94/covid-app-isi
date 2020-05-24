import React, { useState } from 'react';
import StateSelector from '../Common Components/StateSelector';
import TrafficIntensityChart from '../Common Components/BarChart';

const getFormattedData = (TestedPositiveData) => {
    let stateNameArray = [], seriesData = [], categories = [], defaultStates = [], currentSeriesData = [];
    let index = 0;
    const {stateData} = {...TestedPositiveData.data}
    stateData.forEach((item) => {
        stateNameArray.push(item.stateName);
        let testDataArray = [];
        item.testData.forEach((item) => {
            testDataArray.push(item.percPositive);
            if (index === 0)
                categories.push(item.startDate);
        });

        //Only 1st 5 states are used for showing default data
        if (index < 5) {
            defaultStates.push(item.stateName);
            currentSeriesData.push({ name: item.stateName, data: testDataArray });
        }

        index += 1;
        //mapping data wih state name so that it can be retrieved in O(1)
        seriesData[item.stateName] = { name: item.stateName, data: testDataArray };
    });
    
    return { stateNames: stateNameArray.sort(), seriesData, currentSeriesData, categories, defaultStates };
}

const TrafficIntensityGraph = (props) => {
    const { stateNames, seriesData, currentSeriesData, categories, defaultStates } = getFormattedData(props.data);
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