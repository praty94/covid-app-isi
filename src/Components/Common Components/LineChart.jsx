import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import LineChartThemeHelper from '../Theme/LineChartThemeHelper';
import useWindowDimensions from '../../Helpers/WindowDimensionHelper';

const LineChart = (props) => {
    const { height, width } = useWindowDimensions();
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Confirmed',
            data: props.data.totalConfirmedArray
        },
        {
            name: 'Active',
            data: props.data.totalActiveArray
        },
        {
            name: 'Recovery',
            data: props.data.totalRecoveredArray
        },
        {
            name: 'Deceased',
            data: props.data.totalDeceasedArray
        }],
        options: LineChartThemeHelper({
            categories: props.data.dateArray,            
            theme: props.theme
        })
    });

    useEffect(() => {
        console.log("[BarChart] useEffect called");
        setChartData({ 
            series: [{
                name: 'Confirmed',
                data: props.data.totalConfirmedArray
            },
            {
                name: 'Active',
                data: props.data.totalActiveArray
            },
            {
                name: 'Recovery',
                data: props.data.totalRecoveredArray
            },
            {
                name: 'Deceased',
                data: props.data.totalDeceasedArray
            }],           
            options: LineChartThemeHelper({
                categories: props.data.dateArray,            
                theme: props.theme
            })
        });
    }, [props]);
    

    return <ReactApexChart style={{ marginTop: "9px", marginLeft: "-5px" }} width={getRealWidth(width)}
        height={0.65 * height} options={chartData.options} series={chartData.series} type="line" />
}
const getRealWidth = (width) => {
    if (width > 650 && width < 960) {
        return width - 80;
    } else if (width >= 960) {
        return width - 320;
    } else {
        return width - 50;
    }
}
export default LineChart;