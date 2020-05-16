import {colors} from './ChartColors';
const barChartThemeHelper = (data) => {    
    let options = {
        chart: {
            type: 'bar',
            height: 350
        },        
        colors:colors,
        plotOptions: {
            bar: {
                horizontal: !!data.horizontal,
                columnWidth: '55%',
                endingShape: 'rounded',
                distributed: !!data.distributed
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
            categories: data.categories,
        },
        yaxis:{},
        fill: {
            opacity: 1
        },
        legend: {
            show:!!data.legend,
            itemMargin: {
              vertical: 5
            }
        },
    }

    if (data.theme !== "light") {
        options.chart.foreColor = '#FFFFFF';
    } else {
        options.chart.foreColor = '#373d3f'; 
    }
    
    options.tooltip = { theme: data.theme };
    return options;
}
export default barChartThemeHelper;