import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar,Tabs,Tab,Box} from '@material-ui/core';
import RecoveryRateDataTable from './RecoveryRateDataTable';
import RecoveryRateGraph from './RecoveryRateGraph';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`recoveryRate-tabpanel-${index}`}
            aria-labelledby={`recoveryRate-tab-${index}`}
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
        id: `recoveryRate-tab-${index}`,
        'aria-controls': `recoveryRate-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function RecoveryRate(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs centered value={value} onChange={handleChange} aria-label="weeklyIncrease tabs" variant="fullWidth">
                    <Tab label="Graph" {...a11yProps(0)} />
                    <Tab label="Analysis" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <RecoveryRateGraph theme={props.theme}></RecoveryRateGraph>
            </TabPanel>
            <TabPanel value={value} index={1}>                
               <RecoveryRateDataTable></RecoveryRateDataTable>
            </TabPanel>
        </div>
        </React.Fragment>
    );
}