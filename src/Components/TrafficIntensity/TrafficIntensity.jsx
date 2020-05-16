import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Box} from '@material-ui/core';
import DataTable from '../Common Components/DataTable';
import TrafficIntensityData from '../../Data/TrafficIntensity.json';
import TrafficIntensityGraph from './TrafficIntensityGraph';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`trafficIntensity-tabpanel-${index}`}
            aria-labelledby={`trafficIntensity-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `trafficIntensity-tab-${index}`,
        'aria-controls': `trafficIntensity-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TrafficIntensity(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (        
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs centered value={value} onChange={handleChange} aria-label="trafficIntensity tabs" variant="fullWidth">
                    <Tab label="Graph" {...a11yProps(0)} />
                    <Tab label="Analysis" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
               <TrafficIntensityGraph theme={props.theme}></TrafficIntensityGraph>
            </TabPanel>
            <TabPanel value={value} index={1}>                
               <DataTable data={TrafficIntensityData.data} category="trafficIntensity" headerCategory="name" itemCategory="value"></DataTable>
            </TabPanel>
        </div>
    );
}