const LineChartThemeHelper = (data) => {
    let options = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                tools: {
                    download: false
                }
            }
        },
        colors: ['#368bf6', '#81c784', '#eb5569'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            labels: {
                datetimeUTC: false
            },
            categories: data.categories
        },
        legend: {
            itemMargin: {
                vertical: 10
            }
        }
    }
    if (data.theme !== "light") {
        options.chart.foreColor = '#FFFFFF';
    } else {
        options.chart.foreColor = '#373d3f';
    }
    options.tooltip = { theme: data.theme };
    return options;
};

export default LineChartThemeHelper;
