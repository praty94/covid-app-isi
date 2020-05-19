import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '../Card/Card';
import { fetchSummary } from '../../Api/Covid19India';
import LineChart from '../Common Components/LineChart';
import { Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
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
export default function Dashboard(props) {
    const classes = useStyles();
    const [cardsData, setCardsData] = useState({});
    const [chartsData, setChartsData] = useState({});
    useEffect(() => {
        (async () => {
            const response = await fetchSummary();
            if (!response || !response.data)
                return;
            const { statewise, cases_time_series } = { ...response.data };
            
            setCardsData({
                confirmedProps: { cardType: "confirmed", title: "Confirmed", value: statewise[0].confirmed, valueChange: statewise[0].deltaconfirmed},
                activeProps: { cardType: "active", title: "Active", value: statewise[0].active },
                recoveredProps: { cardType: "recovered", title: "Recovered", value: statewise[0].recovered, valueChange: statewise[0].deltarecovered },
                deathProps: { cardType: "death", title: "Deceased", value: statewise[0].deaths, valueChange: statewise[0].deltadeaths},                
            });
            setChartsData(formatChartsData(cases_time_series));

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
                
                <Grid container direction="row" alignItems="center" justify="center">
                {chartsData.init ?
                <Paper className="mapContainer" item md={6}>
                    <LineChart theme={props.theme} data={chartsData}></LineChart> </Paper>: null}
                </Grid>

            </Grid>
        </div>
    );
}
