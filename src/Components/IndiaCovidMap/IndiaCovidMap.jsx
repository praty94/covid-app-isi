import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import Gradient from './Gradient';
/**
* Courtesy: https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json
*/
const INDIA_TOPO_JSON = require('./india.topo.json');
const PROJECTION_CONFIG = {
  scale: 900,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  "#FFE6E6", "#FFCCCC", "#FFB3B3", "#FF9999", "#FF8080",
  "#FF6666", "#FF4D4D", "#FF3333", "#FF1A1A", "#FF0000",
  "#E60000", "#CC0000", "#B30000", "#990000", "#800000", 
  "#660000","#4C0000", "#330000", "#190000", "#000000"
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

let colorMap = {};
function IndiaCovidMap(props) {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(props.data.heatMapData);

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };
  
  const getColor=(value,maxCount)=>{
    //console.log(colorMap[value]);
    if(colorMap[value]){
      //if color is already calculated once , no need to recalculate
      return colorMap[value];
    }
    const perColorRange = maxCount/COLOR_RANGE.length;    
    const finalColor = COLOR_RANGE[Math.trunc(value/perColorRange)];
    colorMap[value] = finalColor;
    //console.log("Value : "+value+" Max : "+maxCount+"final Color:"+finalColor);
    return finalColor;
  }
  const onMouseLeave = () => {
    setTooltipContent('');
  };
  useEffect(() => {
    colorMap = {};
    setData(props.data.heatMapData);
  },[props.data]);

  return (
    <React.Fragment>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
      <ComposableMap
        projectionConfig={PROJECTION_CONFIG}
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
                  fill={current ? getColor(current.value,props.data.max) : DEFAULT_COLOR}
                  style={geographyStyle}
                  onMouseEnter={onMouseEnter(geo, current)}
                  onMouseLeave={onMouseLeave}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <Gradient colors={COLOR_RANGE} min={0} max={props.data.max} ></Gradient>
    </React.Fragment>
  );
}

export default IndiaCovidMap;
