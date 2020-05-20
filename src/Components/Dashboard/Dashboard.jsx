import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '../Card/Card';
import { fetchSummary } from '../../Api/Covid19India';
import { Typography, Divider } from '@material-ui/core';
import IndiaCovidMap from '../IndiaCovidMap/IndiaCovidMap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import LineChart from '../Common Components/LineChart';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    customPanel: {
        display: 'block'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));
const formatChartsData = (timeSeriesArray) => {
    let totalConfirmedArray = [], totalDeceasedArray = [], totalRecoveredArray = [], dateArray = [];
    if (timeSeriesArray && timeSeriesArray.length) {
        timeSeriesArray.forEach((item) => {
            totalConfirmedArray.push(+item.totalconfirmed);
            totalDeceasedArray.push(+item.totaldeceased);
            totalRecoveredArray.push(+item.totalrecovered);
            dateArray.push(item.date + " 2020");
        });
    }
    return { init: true, totalConfirmedArray, totalDeceasedArray, totalRecoveredArray, dateArray };
}
const formatHeatMapData = (statewiseArray) => {
    let activeHeatMapData = [], confirmedHeatMapData = [], deathsHeatMapData = [];
    //starting mapping from index 1 since the first index is always the overall country status
    for (let i = 1; i < statewiseArray.length; i++) {
        activeHeatMapData.push({ id: statewiseArray[i].statecode, state: statewiseArray[i].state, value: statewiseArray[i].active });
        confirmedHeatMapData.push({ id: statewiseArray[i].statecode, state: statewiseArray[i].state, value: statewiseArray[i].confirmed });
        deathsHeatMapData.push({ id: statewiseArray[i].statecode, state: statewiseArray[i].state, value: statewiseArray[i].deaths });
    }
    return { activeHeatMapData, confirmedHeatMapData, deathsHeatMapData, init: true };
}
export default function Dashboard(props) {
    const classes = useStyles();
    const [cardsData, setCardsData] = useState({});
    const [chartsData, setChartsData] = useState({});
    const [heatMapData, setHeatMapData] = useState({});
    const [expanded, setExpanded] = useState(false);
    const [mapOption, setMapOption] = useState('confirmedHeatMapData');
    const handleChangeExpanded = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChange = (event) => {
        setMapOption(event.target.value);
    };
    useEffect(() => {
        (async () => {
            const response = await fetchSummary();
            if (!response || !response.data)
                return;
            const { statewise, cases_time_series } = { ...response.data };

            setCardsData({
                confirmedProps: { cardType: "confirmed", title: "Confirmed", icon: "increase", value: statewise[0].confirmed, valueChange: statewise[0].deltaconfirmed },
                activeProps: { cardType: "active", icon: "concentration", title: "Active", value: statewise[0].active },
                recoveredProps: { cardType: "recovered", icon: "recovery", title: "Recovered", value: statewise[0].recovered, valueChange: statewise[0].deltarecovered },
                deathProps: { cardType: "death", icon: "death", title: "Deceased", value: statewise[0].deaths, valueChange: statewise[0].deltadeaths },
            });
            setChartsData(formatChartsData(cases_time_series));

            setHeatMapData(formatHeatMapData(statewise));
        })();
        return () => {
            console.log("[Dashboard] unmounted");
        };
    }, []);
    return (
        <div className={classes.root}>
            <Typography variant="h6" color="textPrimary">Covid 19 Summary</Typography>
            <Typography color="textSecondary">India</Typography>
            <Divider></Divider>
            <Grid container direction="column">
                <Grid container direction="row" alignItems="center" justify="center">
                    {cardsData.confirmedProps ?
                        <React.Fragment>
                            <Card item sm={6} md={3} {...cardsData.confirmedProps}></Card>
                            <Card item sm={6} md={3} {...cardsData.activeProps}></Card>
                            <Card item sm={6} md={3} {...cardsData.recoveredProps}></Card>
                            <Card item sm={6} md={3} {...cardsData.deathProps}></Card>
                        </React.Fragment> : null}
                </Grid>

            </Grid>
            <div style={{ marginTop: 20 }}>
                {chartsData && chartsData.init ?
                    <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel1'} onChange={handleChangeExpanded('panel1')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header">
                            <Typography className={classes.heading}>Covid 19 Graph [TBD]</Typography>
                            {expanded === 'panel1' ? null : <Typography className={classes.secondaryHeading}>Tap to expand
                                        </Typography>}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.customPanel}>
                            <LineChart data={chartsData} theme={props.theme}></LineChart>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    : null}
            </div>
            <div style={{ marginTop: 20 }}>
                {heatMapData.init ?
                    <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel2'} onChange={handleChangeExpanded('panel2')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header">
                            <Typography className={classes.heading}>Covid 19 Map - India [TBD]</Typography>
                            {expanded === 'panel2' ? null : <Typography className={classes.secondaryHeading}>Tap to expand
                                                    </Typography>}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.customPanel}>
                            <FormControl style={{ width: 250 }} variant="outlined" className={classes.formControl}>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={mapOption}
                                    onChange={handleChange}>
                                    <MenuItem value={'confirmedHeatMapData'}>Confirmed</MenuItem>
                                    <MenuItem value={'activeHeatMapData'}>Active</MenuItem>
                                    <MenuItem value={'deathsHeatMapData'}>Deceased</MenuItem>
                                </Select>
                            </FormControl>
                            <IndiaCovidMap data={heatMapData[mapOption]}></IndiaCovidMap>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    : null}
            </div>

        </div>
    );
}
