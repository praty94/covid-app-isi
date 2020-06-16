import React, { useEffect, useState } from 'react';
import LineChart from '../Common Components/LineChart';
import { fetchTimeSeriesData } from '../../Api/Covid19India';
import StateSelector from '../Common Components/SingleStateSelector';
import StateMap from '../../Data/StateMap.json';
import {LinearProgress} from '@material-ui/core';

const formatChartsData = (timeSeriesMap, state) => {
    const data = timeSeriesMap[state];

    let totalConfirmedArray = [], totalDeceasedArray = [], totalRecoveredArray = [], totalActiveArray = [], dateArray = [], totalTestedArray = [];

    if (data) {
        dateArray = Object.keys(data);
        if (dateArray && dateArray.length) {
            dateArray.forEach((item) => {
                const curData = data[item];
                if (curData && curData.total) {
                    const confirmed = curData.total.confirmed ? curData.total.confirmed : 0;
                    const deceased = curData.total.deceased ? curData.total.deceased : 0;
                    const recovered = curData.total.recovered ? curData.total.recovered : 0;
                    const active = confirmed - (deceased + recovered);
                    const tested = curData.total.tested ? curData.total.tested : 0;
                    totalConfirmedArray.push(confirmed);
                    totalDeceasedArray.push(deceased);
                    totalRecoveredArray.push(recovered);
                    totalActiveArray.push(active);
                    totalTestedArray.push(tested);
                }
            });
        }
    }
    return { init: true, totalConfirmedArray, totalDeceasedArray, totalRecoveredArray, totalActiveArray, totalTestedArray, dateArray };
}

const TimeSeriesGraph = (props) => {
    const [chartsData, setChartsData] = useState({});
    const [timeSeriesData, setTimeSeriesData] = useState(null);
    const defaultSelection = "TT";
    useEffect(() => {
        (async () => {
            const responseData = await fetchTimeSeriesData();
            if (!responseData || !responseData.data)
                return;

            setTimeSeriesData(responseData.data);
            setChartsData(formatChartsData(responseData.data, defaultSelection));
        })();
    }, []);
    const handleChange = (selectedState) => {
        setChartsData(formatChartsData(timeSeriesData, StateMap[selectedState]));
    }
    const options = Object.keys(StateMap);
    return (
        chartsData && chartsData.init ?
            <React.Fragment>
                <StateSelector
                    style={{ marginTop: 10 }}
                    defaultState={options[0]}
                    states={options}
                    singleSelect={true}
                    handleStateChange={(selectedState) => handleChange(selectedState)}></StateSelector>
                <LineChart data={chartsData} theme={props.theme}></LineChart>
            </React.Fragment> : <LinearProgress style={{marginBottom:20}} color="secondary" />
    );
}

export default TimeSeriesGraph;