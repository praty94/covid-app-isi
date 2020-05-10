import React,{useState} from 'react';
import ReactApexChart from "react-apexcharts";

const WeeklyBarChart = (props) => {
    
    const [chartData] = useState({
        series: props.seriesData,
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                   // endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: props.categories,
            },            
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            }
        },


    });
   
    return <ReactApexChart options={chartData.options} series={chartData.series} type="bar" />
    

}

export default WeeklyBarChart;