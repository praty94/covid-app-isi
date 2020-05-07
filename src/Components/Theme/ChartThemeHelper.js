const chartThemeHelper = (data) => {
  let options = {
    chart: {
      id: "basic-bar",
      toolbar: {
        tools: {
          download: false
        }
      }
    },
    legend: {
      show: true,
      labels: {
        colors: ['#368bf6', '#eb5569'],
        useSeriesColors: false
      }, itemMargin: {
        vertical: 10
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    colors: ['#368bf6', '#eb5569'],
    xaxis: {
      categories: data.dates
    },
    yaxis: {}
  };
  if (data.theme !== "light") {
    options.xaxis.labels = {
      style: {
        colors: '#FFFFFF'
      }
    };
    options.yaxis.labels = {
      style: {
        colors: '#FFFFFF'
      }
    };

  } else {
    options.xaxis.labels = {
      style: {
        colors: '#373d3f'
      }
    };
    options.yaxis.labels = {
      style: {
        colors: '#373d3f'
      }
    };

  }
  options.tooltip = { theme: data.theme };
  return options;
}
export default chartThemeHelper;