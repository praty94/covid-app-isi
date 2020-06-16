import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '../Card/Card';
import { fetchSummary, fetchStateDistrictData } from '../../Api/Covid19India';
import IndiaCovidMap from '../IndiaCovidMap/IndiaCovidMap';
import { MenuItem, FormControl, Select, Grid, Typography, Divider, Button } from '@material-ui/core';
import DashboardSection from './DashboardSection';
import TimeSeriesGraph from './TimeSeriesGraph';
import DashboardStatTable from './DashboardStatTable';
import ExpandableTable from '../Common Components/ExpandableTable';
import { fetchDashboardData, fetchDownloadableReports } from '../../Api/ISI_StatisticalData';
import parse from 'html-react-parser';
import DescriptionIcon from '@material-ui/icons/Description';
import messages from '../../Messages/DashboardMessages.json';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: -10,
        [theme.breakpoints.down('xs')]: {
            marginTop: 0
        }
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
        marginLeft: 20
    },
    marginT20: {
        marginTop: 20
    },
    marginB20: {
        marginBottom: 20
    }
}));

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
        activeData: { heatMapData: activeHeatMapData, max: maxActive },
        confirmedData: { heatMapData: confirmedHeatMapData, max: maxConfirmed },
        deathsActive: { heatMapData: deathsHeatMapData, max: maxDeaths }, init: true
    };
}
export default function Dashboard(props) {
    const classes = useStyles();
    const heatMapOptions = ['confirmedData', 'activeData', 'deathsActive'];
    const [cardsData, setCardsData] = useState({});

    const [dashboardData, setDashboardData] = useState({});
    const [heatMapData, setHeatMapData] = useState({});
    const [expanded, setExpanded] = useState(false);
    const [mapOption, setMapOption] = useState(heatMapOptions[0]);
    const [stateTableData, setStateTableData] = useState(null);
    const [districtTableData, setDistrictTableData] = useState(null);
    const [downloadableReportsData, setDownloadableReportsData] = useState(null);

    const handleChangeExpanded = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChange = (event) => {
        setMapOption(event.target.value);
    };
    const handleFileRedirect = (url) => {
        window.open(url, "_blank");
    }
    useEffect(() => {
        (async () => {
            const response = await fetchSummary();
            if (!response || !response.data)
                return;
            const { statewise } = { ...response.data };

            setCardsData({
                confirmedProps: { cardType: "confirmed", pageId: 1, title: "Confirmed", value: statewise[0].confirmed, valueChange: statewise[0].deltaconfirmed },
                activeProps: { cardType: "active", pageId: 4, title: "Active", value: statewise[0].active },
                recoveredProps: { cardType: "recovered", pageId: 2, title: "Recovered", value: statewise[0].recovered, valueChange: statewise[0].deltarecovered },
                deathProps: { cardType: "death", pageId: 6, title: "Deceased", value: statewise[0].deaths, valueChange: statewise[0].deltadeaths },
            });
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
        (async () => {
            const response = await fetchDownloadableReports();
            if (!response || !response.data)
                return;

            setDownloadableReportsData(response.data);
        }
        )();
        return () => {
            console.log("[Dashboard] unmounted");
        };
    }, []);
    return (
        <div className={classes.root}>
            <Typography variant="h6" color="textPrimary">{messages.mainHeading}</Typography>
            <Divider></Divider>
            <Typography variant="h6" color="textPrimary" style={{ marginTop: 10 }}>{messages.subHeading}</Typography>
            <Typography color="textSecondary">{messages.India}</Typography>
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
                <DashboardSection expanded={expanded === 'panel1'}
                    panelName='panel1' heading={messages.timeSeriesGraph}
                    handleChangeExpanded={handleChangeExpanded}>
                    <TimeSeriesGraph theme={props.theme}></TimeSeriesGraph>
                    <Typography>{messages.chartSubText}</Typography>
                </DashboardSection>
            </div>
            <div className={classes.marginT20}>
                {heatMapData.init ?
                    <DashboardSection expanded={expanded === 'panel2'}
                        panelName='panel2' heading={messages.heatMap}
                        handleChangeExpanded={handleChangeExpanded}>
                        <FormControl style={{ width: 250 }} variant="outlined">
                            <Select
                                labelId="heatmap-select-labelId"
                                id="heatmap-select-id"
                                value={mapOption}
                                onChange={handleChange}>
                                <MenuItem value={heatMapOptions[0]}>{messages.confirmed}</MenuItem>
                                <MenuItem value={heatMapOptions[1]}>{messages.active}</MenuItem>
                                <MenuItem value={heatMapOptions[2]}>{messages.deceased}</MenuItem>
                            </Select>
                        </FormControl>
                        <IndiaCovidMap data={heatMapData[mapOption]}></IndiaCovidMap>
                    </DashboardSection>
                    : null}
            </div>
            <div className={classes.marginT20}>
                {stateTableData && districtTableData ?
                    <DashboardSection expanded={expanded === 'panel3'}
                        panelName='panel3' heading={messages.stateDistrictData}
                        handleChangeExpanded={handleChangeExpanded}>
                        <ExpandableTable stateData={stateTableData} districtData={districtTableData}></ExpandableTable>
                    </DashboardSection> : null}
            </div>
            <Typography className={classes.marginT20} variant="h6" color="textPrimary">{messages.analysis}</Typography>
            <Divider></Divider>
            <div className={classes.marginT20}>
                {dashboardData && dashboardData.data ?
                    <DashboardSection expanded={expanded === 'panel4'}
                        panelName='panel4' heading={messages.riskSummary}
                        handleChangeExpanded={handleChangeExpanded}>
                        <Typography className={classes.marginB20} color="textPrimary">{parse(dashboardData.heading)}</Typography>
                        <DashboardStatTable data={dashboardData.data}></DashboardStatTable>
                    </DashboardSection> : null}
            </div>
            <div className={classes.marginT20}>
                {downloadableReportsData && downloadableReportsData.data ?
                    <DashboardSection expanded={expanded === 'panel5'}
                        panelName='panel5' heading={messages.riskReport}
                        handleChangeExpanded={handleChangeExpanded}>
                        <Grid container spacing={2}>
                            {downloadableReportsData.data.map((item, index) => (
                                <Grid item key={index}>
                                    <Button variant="outlined" size="large"
                                        startIcon={<DescriptionIcon />} onClick={() => handleFileRedirect(item.fileURL)}>
                                        {item.fileName}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </DashboardSection> : null}
            </div>
        </div>
    );
}
