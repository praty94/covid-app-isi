import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import DataTable from '../Common Components/DataTable';
import TestedPositiveData from '../../Data/TestingStateData.json';
import TestedPositiveGraph from './TestedPostiveGraph';
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`TestedPositive-tabpanel-${index}`}
            aria-labelledby={`TestedPositive-tab-${index}`}
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
        id: `TestedPositive-tab-${index}`,
        'aria-controls': `TestedPositive-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        marginTop:20
    },
}));

export default function TestedPositive(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Typography color="textSecondary">{TestedPositiveData.heading}</Typography>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs centered value={value} onChange={handleChange} aria-label="TestedPositive tabs" variant="fullWidth">
                        <Tab label="Graph" {...a11yProps(0)} />
                        <Tab label="Analysis" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <TestedPositiveGraph theme={props.theme}></TestedPositiveGraph>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataTable data={TestedPositiveData.data} category="testData" headerRange={true}
                        headerCategory1="startDate" headerCategory2="endDate" itemCategory="percPositive"></DataTable>
                </TabPanel>
            </div>
        </React.Fragment>
    );
}