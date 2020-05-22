import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Typography, Tabs, Tab, Box } from '@material-ui/core';
import WeeklyIncreaseAnalysis from './WeeklyIncreaseAnalysis/WeeklyIncreaseAnalysis';
import WeeklyGraph from './WeeklyIncreaseGraph';
import WeeklyData from "../../Data/WeeklyRateOfIncrease.json";

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
        id: `weeklyIncrease-tab-${index}`,
        'aria-controls': `weeklyIncrease-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop:20
    },
}));

export default function WeeklyIncrease(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Typography color="textSecondary">{WeeklyData.heading}</Typography>            
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs centered value={value} onChange={handleChange} aria-label="weeklyIncrease tabs" variant="fullWidth">
                        <Tab label="Graph" {...a11yProps(0)} />
                        <Tab label="Analysis" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <WeeklyGraph theme={props.theme}></WeeklyGraph>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <WeeklyIncreaseAnalysis></WeeklyIncreaseAnalysis>
                </TabPanel>
            </div>
        </React.Fragment>
    );
}