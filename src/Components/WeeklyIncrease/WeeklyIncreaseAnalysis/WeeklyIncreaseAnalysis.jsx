import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import WeeklyIncreaseDataTable from './WeeklyIncreaseDataTable';
import WeeklyIncreaseRatioTable from './WeeklyIncreaseRatioTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`weeklyIncrease-tabpanel-${index}`}
            aria-labelledby={`weeklyIncrease-tab-${index}`}
            {...other}
        >
            {value === index && (
               <div style={{marginTop:10}}>
                    {children}
                </div>
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
        id: `weeklyIncreaseAnalysis-tab-${index}`,
        'aria-controls': `weeklyIncreaseAnalysis-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function WeeklyIncreaseAnalysis(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs centered value={value} onChange={handleChange} aria-label="weeklyIncreaseAnalysis tabs" variant="fullWidth">
                    <Tab label="Count" {...a11yProps(0)} />
                    <Tab label="Ratio" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <WeeklyIncreaseDataTable></WeeklyIncreaseDataTable>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <WeeklyIncreaseRatioTable></WeeklyIncreaseRatioTable>
            </TabPanel>
        </div>
    );
}