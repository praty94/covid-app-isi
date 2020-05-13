import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import WeeklyIncreaseDataTable from './WeeklyIncreaseDataTable';
import WeeklyGraph from './WeeklyIncreaseGraph/WeeklyIncreaseGraph';

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
    },
}));

export default function WeeklyIncrease(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
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
                <WeeklyIncreaseDataTable></WeeklyIncreaseDataTable>
            </TabPanel>
        </div>
    );
}