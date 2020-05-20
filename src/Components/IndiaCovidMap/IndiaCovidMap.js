import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { scaleQuantile } from 'd3-scale';
import ReactTooltip from 'react-tooltip';
import useWindowDimensions from '../../Helpers/WindowDimensionHelper';
import './App.css';

/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
*/
const INDIA_TOPO_JSON = require('./india.topo.json');
const PROJECTION_CONFIG = {
  scale: 900,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

const getProjectConfig = (width) => {
  return PROJECTION_CONFIG;
}
// Red Variants
const COLOR_RANGE = [
  "#FFE6E6", "#FFCCCC", "#FFB3B3", "#FF9999", "#FF8080",
  "#FF6666", "#FF4D4D", "#FF3333", "#FF1A1A", "#FF0000",
  "#E60000", "#CC0000", "#B30000", "#990000", "#800000", "#660000",
  "#4C0000", "#330000", "#190000", "#000000"
];

const DEFAULT_COLOR = '#EEE';

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};


function IndiaCovidMap(props) {
  const { width } = useWindowDimensions();
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(props.data);

  const colorScale = scaleQuantile()
    .domain(data.map(d => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };
  useEffect(() => {
    setData(props.data);
  },[props.data]);
  return (
    <React.Fragment>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={getProjectConfig(width)}
        projection="geoMercator"
        width={600}
        height={500}
        data-tip=""
      >
        <Geographies geography={INDIA_TOPO_JSON}>
          {({ geographies }) =>
            geographies.map(geo => {
              //console.log(geo.id);
              const current = data.find(s => s.id === geo.id);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={current ? colorScale(current.value) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </React.Fragment>
  );
}

export default IndiaCovidMap;
