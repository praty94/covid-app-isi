import React, { useState } from 'react';
import ConcentrationData from "../../Data/Concentration.json";
import StateSelector from '../Common Components/StateSelector';
import WeeklyBarChart from '../Common Components/BarChart';

const getFormattedData = () => {
    let stateMap = {}, concentrationArray = [], allStates = [],defaultStates=[], currentStates = [], currentSeriesData = [];
    const { stateData } = { ...ConcentrationData.data }
    stateData.forEach((item) => {
        allStates.push(item.stateName);
        concentrationArray.push(item.concentration);
        stateMap[item.stateName] = item.concentration;
    });
    
    //extracting first 5 states
    currentSeriesData = [{ name: "Concentration", data: [...concentrationArray].slice(0, 5) }];
    currentStates = defaultStates = [...allStates].slice(0, 5);

    return { stateNames: allStates.sort(), stateMap, currentSeriesData, currentStates,defaultStates };
}

const { stateNames, stateMap, currentSeriesData, currentStates,defaultStates } = getFormattedData();

const ConcentrationGraph = (props) => {
    const [chartData, setChartData] = useState({ currentSeriesData,currentStates });
    
    const filterChartData = (selectedStateArray) => {
        let filteredData = [],currentStates=[];
        for (let i = 0; i < selectedStateArray.length; i++) {
            if (stateMap[selectedStateArray[i]]) {
                filteredData.push(stateMap[selectedStateArray[i]]);
                currentStates.push(selectedStateArray[i]);
            }
        }
        return {seriesData : [{ name: "Concentration", data: filteredData}],currentStates};
    }
    
    const handleStateChange = (selectedStateArray) => {
        const {seriesData,currentStates} = filterChartData(selectedStateArray);
        console.log(currentStates);
        setChartData({ currentSeriesData:seriesData,currentStates});
    }

    return (
        <div>
            <StateSelector defaultStates={defaultStates} states={stateNames} handleStateChange={(selectedStateArray) => handleStateChange(selectedStateArray)}></StateSelector>
            <WeeklyBarChart distributed={true} horizontal={true} legend={false} theme={props.theme} seriesData={chartData.currentSeriesData} categories={chartData.currentStates}></WeeklyBarChart>
        </div>
    );
}



export default ConcentrationGraph;