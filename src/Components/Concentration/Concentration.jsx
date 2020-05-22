import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab, Box, Typography } from '@material-ui/core';
import ConcentrationDataTable from './ConcentrationDataTable';
import ConcentrationGraph from './ConcentrationGraph';
import ConcentrationData from '../../Data/Concentration.json';
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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Typography color="textSecondary">{ConcentrationData.heading}</Typography>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs centered value={value} onChange={handleChange} aria-label="concentration tabs" variant="fullWidth">
                        <Tab label="Graph" {...a11yProps(0)} />
                        <Tab label="Analysis" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <ConcentrationGraph theme={props.theme}></ConcentrationGraph>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ConcentrationDataTable></ConcentrationDataTable>
                </TabPanel>
            </div>
        </React.Fragment>
    );
}