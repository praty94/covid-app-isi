import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../Card/Card';
import cx from 'classnames';
import { fetchSummary,fetchStateDistrictData } from '../../Api/Covid19India';
import IndiaCovidMap from '../IndiaCovidMap/IndiaCovidMap';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary,
    MenuItem, FormControl, Select, Grid,Typography, Divider
} from '@material-ui/core';
import LineChart from '../Common Components/LineChart';
import DashboardStatTable from './DashboardStatTable';
import ExpandableTable from '../Common Components/ExpandableTable';
import {fetchDashboardData} from '../../Api/ISI_StatisticalData';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:-10,
        [theme.breakpoints.down('xs')]: {
            marginTop:0
        }
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    dynamicMargin:{
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1)
          }
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
        marginLeft:20
    },
    marginT20:{
        marginTop:20
    },
    marginB20:{
        marginBottom:20
    }
}));
const formatChartsData = (timeSeriesArray) => {
    let totalConfirmedArray = [], totalDeceasedArray = [], totalRecoveredArray = [],totalActiveArray=[], dateArray = [];
    if (timeSeriesArray && timeSeriesArray.length) {
        timeSeriesArray.forEach((item) => {
            const confirmed = +item.totalconfirmed;
            const deceased = +item.totaldeceased;
            const recovered = +item.totalrecovered;
            const active = confirmed - (deceased+recovered);
            totalConfirmedArray.push(confirmed);
            totalDeceasedArray.push(deceased);
            totalRecoveredArray.push(recovered);            
            totalActiveArray.push(active)
            dateArray.push(item.date + " 2020");
        });        
    }
    return { init: true, totalConfirmedArray, totalDeceasedArray, totalRecoveredArray,totalActiveArray, dateArray };
}
const formatHeatMapData = (statewiseArray) => {
    let activeHeatMapData = [], confirmedHeatMapData = [], deathsHeatMapData = [];
    let maxActive = 0, maxConfirmed = 0, maxDeaths = 0;
    //starting mapping from index 1 since the first index is always the overall country status
    for (let i = 1; i < statewiseArray.length; i++) {
        activeHeatMapData.push({ id: statewiseArray[i].statecode, state: statewiseArray[i].state, value: statewiseArray[i].active });
        confirmedHeatMapData.push({ id: statewiseArray[i].statecode, state: statewiseArray[i].state, value: statewiseArray[i].confirmed });
        deathsHeatMapData.push({ id: statewiseArray[i].statecode, state: statewiseArray[i].state, value: statewiseArray[i].deaths });

        maxActive = Math.max(maxActive, statewiseArray[i].active);
        maxConfirmed = Math.max(maxConfirmed, statewiseArray[i].confirmed);
        maxDeaths = Math.max(maxDeaths, statewiseArray[i].deaths);
    }
    return {
        activeData: { heatMapData : activeHeatMapData, max : maxActive },
        confirmedData: { heatMapData : confirmedHeatMapData, max : maxConfirmed },
        deathsActive: { heatMapData : deathsHeatMapData, max : maxDeaths }, init: true
    };
}
export default function Dashboard(props) {
    const classes = useStyles();
    const heatMapOptions = ['confirmedData','activeData','deathsActive'];
    const [cardsData, setCardsData] = useState({});
    const [chartsData, setChartsData] = useState({});
    const [dashboardData, setDashboardData] = useState({});
    const [heatMapData, setHeatMapData] = useState({});
    const [expanded, setExpanded] = useState(false);
    const [mapOption, setMapOption] = useState(heatMapOptions[0]);
    const [stateTableData,setStateTableData] = useState(null);
    const [districtTableData,setDistrictTableData] = useState(null);


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
                confirmedProps: { cardType: "confirmed", pageId:1, title: "Confirmed", value: statewise[0].confirmed, valueChange: statewise[0].deltaconfirmed },
                activeProps: { cardType: "active", pageId:4, title: "Active", value: statewise[0].active },
                recoveredProps: { cardType: "recovered",pageId:2, title: "Recovered", value: statewise[0].recovered, valueChange: statewise[0].deltarecovered },
                deathProps: { cardType: "death",pageId:6, title: "Deceased", value: statewise[0].deaths, valueChange: statewise[0].deltadeaths },
            });
            setChartsData(formatChartsData(cases_time_series));
            setHeatMapData(formatHeatMapData(statewise));
            setStateTableData(statewise);
        })();
        (async () => {
            const responseData = await fetchDashboardData();
            if (!responseData || !responseData.data)
                return;
            
            setDashboardData(responseData.data);
            
        })();
        (async () => {
            const districtData = await fetchStateDistrictData();
            if (!districtData || !districtData.data)
              return;
      
              setDistrictTableData(districtData.data);
          }
          )();
        return () => {
            console.log("[Dashboard] unmounted");
        };
    }, []);    
    return (
        <div className={classes.root}>
            <Typography variant="h6" color="textPrimary">Dashboard to Facilitate Process of Unlocking</Typography>
            <Divider></Divider>
            <Typography variant="h6" color="textPrimary" style={{marginTop:10}}>Covid-19 Summary</Typography>
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
            <div className={classes.marginT20}>
                {chartsData && chartsData.init ?
                    <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel1'} onChange={handleChangeExpanded('panel1')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header">
                            <Typography className={classes.heading}>Covid-19 Time Series Graph</Typography>
                            {expanded === 'panel1' ? null : <Typography className={classes.secondaryHeading}>Tap to expand
                                        </Typography>}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.customPanel}>
                            <LineChart data={chartsData} theme={props.theme}></LineChart>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    : null}
            </div>
            <div className={classes.marginT20}>
                {heatMapData.init ?
                    <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel2'} onChange={handleChangeExpanded('panel2')}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header">
                            <Typography className={classes.heading}>Covid-19 Heat Map </Typography>
                            {expanded === 'panel2' ? null : <Typography className={classes.secondaryHeading}>Tap to expand
                                                    </Typography>}
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.customPanel}>
                            <FormControl style={{ width: 250 }} variant="outlined">
                                <Select
                                    labelId="heatmap-select-labelId"
                                    id="heatmap-select-id"
                                    value={mapOption}
                                    onChange={handleChange}>
                                    <MenuItem value={heatMapOptions[0]}>Confirmed</MenuItem>
                                    <MenuItem value={heatMapOptions[1]}>Active</MenuItem>
                                    <MenuItem value={heatMapOptions[2]}>Deceased</MenuItem>
                                </Select>
                            </FormControl>
                            <IndiaCovidMap data={heatMapData[mapOption]}></IndiaCovidMap>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    : null}
            </div>
            <div className={classes.marginT20}>
                {stateTableData && districtTableData?
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel3'}
                    onChange={handleChangeExpanded('panel3')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header">
                        <Typography className={classes.heading}>State and District level Data</Typography>
                        {expanded === 'panel3' ? null : <Typography className={classes.secondaryHeading}>Tap to expand
                                                    </Typography>}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={cx(classes.customPanel,classes.dynamicMargin)}>
                        <ExpandableTable stateData={stateTableData} districtData={districtTableData}></ExpandableTable>
                    </ExpansionPanelDetails>
                </ExpansionPanel>:null}
            </div>
            <Typography className={classes.marginT20} variant="h6" color="textPrimary">Analysis</Typography>            
            <Divider></Divider>
            <div className={classes.marginT20}>
                {dashboardData && dashboardData.data?
                <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === 'panel4'}
                    onChange={handleChangeExpanded('panel4')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header">
                        <Typography className={classes.heading}>Risk Summary - India</Typography>
                        {expanded === 'panel4' ? null : <Typography className={classes.secondaryHeading}>Tap to expand
                                                    </Typography>}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.customPanel}>
                        <Typography className={classes.marginB20} color="textSecondary">{dashboardData.heading}</Typography>
                        <DashboardStatTable data={dashboardData.data}></DashboardStatTable>
                    </ExpansionPanelDetails>
                </ExpansionPanel>:null}
            </div>           
        </div>
    );
}
