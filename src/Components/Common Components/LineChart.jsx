import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import barChartThemeHelper from '../Theme/BarChartThemeHelper';
import useWindowDimensions from '../../Helpers/WindowDimensionHelper';

const LineChart = (props) => {
    const { height, width } = useWindowDimensions();
    const [chartData, setChartData] = useState({
        series: [{
            name: 'Confirmed',
            data: props.data.totalConfirmedArray
        }, {
            name: 'Deceased',
            data: props.data.totalDeceasedArray
        },
        {
            name: 'Recovery',
            data: props.data.totalRecoveredArray
        }],
        options: barChartThemeHelper({
            categories: props.data.dateArray,            
            theme: props.theme
        })
    });

    // useEffect(() => {
    //     console.log("[BarChart] useEffect called");
    //     setChartData({
    //         series: props.seriesData,
    //         options: barChartThemeHelper({
    //             categories: props.categories,
    //             distributed: props.distributed,
    //             theme: props.theme,
    //             hideLegend:props.hideLegend,
    //             horizontal: props.horizontal
    //         })
    //     });
    // }, [props]);
    const states = {
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },           
            xaxis: {
                type: 'datetime',
                categories: props.data.dateArray
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy'
                },
            },
        }
    };

    return <ReactApexChart style={{ marginTop: "9px", marginLeft: "-5px" }} width={getRealWidth(width)}
        height={0.65 * height} options={states.options} series={chartData.series} type="area" />
}
const getRealWidth = (width) => {
    if (width > 650 && width < 960) {
        return width - 50;
    } else if (width >= 960) {
        return width - 280;
    } else {
        return width - 20;
    }
}
export default LineChart;