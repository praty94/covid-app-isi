import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, Typography, LinearProgress } from '@material-ui/core';
import DeathRateDataTable from './DeathRateDataTable';
import DeathRateGraph from './DeathRateGraph';
import { fetchDeathRateData } from '../../Api/ISI_StatisticalData';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`DeathRate-tabpanel-${index}`}
            aria-labelledby={`DeathRate-tab-${index}`}
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
        id: `DeathRate-tab-${index}`,
        'aria-controls': `DeathRate-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop: 20
    },
}));

export default function DeathRate(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [deathRateData, setDeathRateData] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        (async () => {
            const responseData = await fetchDeathRateData();
            if (!responseData || !responseData.data)
                return;

            setDeathRateData(responseData.data);

        })();
        return () => {
            console.log("[Death Rate] unmounted");
        };
    }, []);
    return (
        deathRateData ?
            <React.Fragment>
                <Typography color="textSecondary">{deathRateData.heading}</Typography>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs centered value={value} onChange={handleChange} aria-label="deathRate tabs" variant="fullWidth">
                            <Tab label="Graph" {...a11yProps(0)} />
                            <Tab label="Analysis" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <DeathRateGraph data={deathRateData} theme={props.theme}></DeathRateGraph>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DeathRateDataTable data={deathRateData.data}></DeathRateDataTable>
                    </TabPanel>
                </div>
            </React.Fragment> : <LinearProgress color="secondary" />
    );
}