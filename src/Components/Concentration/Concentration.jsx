import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, Typography, LinearProgress } from '@material-ui/core';
import ConcentrationDataTable from './ConcentrationDataTable';
import ConcentrationGraph from './ConcentrationGraph';
import { fetchConcentrationData } from '../../Api/ISI_StatisticalData';
import parse from 'html-react-parser';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`concentration-tabpanel-${index}`}
            aria-labelledby={`concentration-tab-${index}`}
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
        id: `concentration-tab-${index}`,
        'aria-controls': `concentration-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop: 20
    },
}));

export default function Concentration(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [concentrationData, setConcentrationData] = useState(null);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        (async () => {
            const responseData = await fetchConcentrationData();
            if (!responseData || !responseData.data)
                return;

            setConcentrationData(responseData.data);

        })();
        return () => {
            console.log("[Concentration] unmounted");
        };
    }, []);
    return (
        concentrationData ?
            <React.Fragment>
                <Typography color="textPrimary">{parse(concentrationData.heading)}</Typography>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs centered value={value} onChange={handleChange} aria-label="concentration tabs" variant="fullWidth">
                            <Tab label="Graph" {...a11yProps(0)} />
                            <Tab label="Data" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <ConcentrationGraph data={concentrationData} theme={props.theme}></ConcentrationGraph>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ConcentrationDataTable data={concentrationData.data}></ConcentrationDataTable>
                    </TabPanel>
                </div>
            </React.Fragment> : <LinearProgress color="secondary" />
    );
}