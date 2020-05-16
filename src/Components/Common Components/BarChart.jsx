import React, { useState, useEffect } from 'react';
import ReactApexChart from "react-apexcharts";
import barChartThemeHelper from '../Theme/BarChartThemeHelper';
import useWindowDimensions from '../../Helpers/WindowDimensionHelper';

const BarChart = (props) => {
    const { height, width } = useWindowDimensions();
    const [chartData, setChartData] = useState({
        series: props.seriesData,
        options: barChartThemeHelper({
            categories: props.categories,
            distributed: props.distributed,
            theme: props.theme,
            hideLegend:props.hideLegend,
            horizontal: props.horizontal
        })
    });

    useEffect(() => {
        console.log("[BarChart] useEffect called");
        setChartData({
            series: props.seriesData,
            options: barChartThemeHelper({
                categories: props.categories,
                distributed: props.distributed,
                theme: props.theme,
                hideLegend:props.hideLegend,
                horizontal: props.horizontal
            })
        });
    }, [props]);

    return <ReactApexChart style={{ marginTop: "9px", marginLeft: "-5px" }} width={getRealWidth(width)}
        height={0.65 * height} options={chartData.options} series={chartData.series} type="bar" />
}
const getRealWidth = (width) => {
    if (width > 650 && width < 960) {
        return width - 80;
    } else if (width >= 960) {
        return width - 320;
    } else {
        return width - 80;
    }
}
export default BarChart;