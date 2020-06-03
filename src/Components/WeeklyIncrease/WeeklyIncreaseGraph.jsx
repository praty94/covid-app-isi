import React, { useState } from 'react';
import StateSelector from '../Common Components/StateSelector';
import WeeklyBarChart from '../Common Components/BarChart';
import WeekFooter from './WeekFooter';

const getFormattedData = (WeeklyData) => {
    let stateNameArray = [], seriesData = [], categories = [], defaultStates = [], currentSeriesData = [];
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
        if (index < 5) {
            defaultStates.push(item.stateName);
            currentSeriesData.push({ name: item.stateName, data: ratioArray });
        }

        index += 1;
        //mapping data wih state name so that it can be retrieved in O(1)
        seriesData[item.stateName] = { name: item.stateName, data: ratioArray };
    });
    return { stateNames: stateNameArray.sort(), seriesData, currentSeriesData, categories, defaultStates };
}

const WeeklyGraph = (props) => {
    const { stateNames, seriesData, currentSeriesData, categories, defaultStates } = getFormattedData(props.data);
    const { footers } = { ...props.data.data };
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
            <WeeklyBarChart theme={props.theme} seriesData={chartData.currentSeriesData} categories={categories}></WeeklyBarChart>
            {footers ?<WeekFooter data={footers}/> : null}
        </div>
    );
}



export default WeeklyGraph;