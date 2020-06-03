import React from 'react';
import { Grid, Typography, Divider, Button, Paper,Link } from '@material-ui/core';
import Contributors from './Contributors.json';
import AboutCard from './AboutCard';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: 0
        },
        padding: theme.spacing(1)
    },
    subHeading: {
        marginTop: 10
    },
    detailsContainer: {
        padding: theme.spacing(2),
        marginTop: 10
    }

}));
const handleGithubRedirect = () =>{
    window.open("https://github.com/praty94/covid-app-isi", "_blank");
}
const AboutPage = () => {
    const classes = useStyles();
    const { contributors } = { ...Contributors };
    return (
        <div className={classes.container}>
            <div style={{ marginTop: -10 }}>
                <Typography variant="h6" color="textPrimary">Analytics Team</Typography>
                <Divider></Divider>
                <div>
                    {contributors.analytics && contributors.analytics.head ?
                        <div>
                            <Typography color="textSecondary" className={classes.subHeading} gutterBottom>Head</Typography>
                            <Grid container spacing={3}>
                                <AboutCard data={contributors.analytics.head}></AboutCard>
                            </Grid>
                        </div> : null}
                    {contributors.analytics && contributors.analytics.team ?
                        <React.Fragment>
                            <Typography color="textSecondary" className={classes.subHeading} gutterBottom>Team</Typography>
                            <Grid container spacing={3}>
                                {contributors.analytics.team.map((item, index) => (
                                    <AboutCard data={item} key={index}></AboutCard>
                                ))}
                            </Grid>
                        </React.Fragment>
                        : null}
                </div>
            </div>
            <div style={{ marginTop: 10 }}>
                <Typography variant="h6" color="textPrimary">Development Team</Typography>
                <Divider></Divider>
                <Grid container spacing={3} style={{ marginTop: 5 }}>
                    {contributors.dev ?
                        contributors.dev.map((item, index) => (
                            <AboutCard data={item} key={index}></AboutCard>
                        )) : null
                    }
                </Grid>
            </div>
            <div style={{ marginTop: 20 }}>
                <Typography variant="h6" color="textPrimary">Project Details</Typography>
                <Divider></Divider>
                <Paper className={classes.detailsContainer}>
                    <Typography color="textPrimary" gutterBottom>Our project is available on Github.</Typography>
                    <Button variant="outlined" size="large" startIcon={<GitHubIcon />} onClick={()=>handleGithubRedirect()}>Github Repository</Button>
                </Paper>
                <Paper className={classes.detailsContainer}>
                    <Typography color="textPrimary" gutterBottom>API -&nbsp;
                    <Link href="https://api.covid19india.org/" target='_blank' color="secondary">
                        <strong>api.covid19india.org</strong>
                    </Link>
                    </Typography>
                    <Typography color="textPrimary" gutterBottom>Our team uses the data to provide more in depth analysis that we show in different parts of the application.</Typography>
                </Paper>                
            </div>
            <div style={{ marginTop: 20 }}>
                <Typography variant="h6" color="textPrimary">Disclaimer</Typography>
                <Divider></Divider>
                <Paper className={classes.detailsContainer}>
                    <Typography color="textPrimary" gutterBottom>This webpage reports information about COVID-19 related work being done by ISI researchers as provided by them. The purpose is quick dissemination of results obtained and capabilities available. The experimentation and validation for all these works are in progress and the results and inferences may change subsequently. For specific questions/issues, the respective scientist may be contacted.</Typography>                    
                </Paper>                               
            </div>
        </div>
    );
}

export default AboutPage;