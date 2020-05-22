import React from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import Contributors from './Contributors.json';
import AboutCard from './AboutCard';

const AboutPage = () => {
    const { contributors } = { ...Contributors };
    return (
        <div style={{ flexGrow: 1 }}>
            <div>
                <Typography variant="h6" color="textSecondary">Analytics Team</Typography>
                <Divider></Divider>
                <Grid container spacing={3} style={{ marginTop: 5 }}>
                    {contributors.analytics ?
                        contributors.analytics.map((item, index) => (
                            <AboutCard data={item} key={index}></AboutCard>
                        )) : null
                    }
                </Grid>
            </div>
            <div style={{marginTop:20}}>
                <Typography variant="h6" color="textSecondary">Development Team</Typography>
                <Divider></Divider>
                <Grid container spacing={3} style={{ marginTop: 5 }}>
                    {contributors.dev ?
                        contributors.dev.map((item, index) => (
                            <AboutCard data={item} key={index}></AboutCard>
                        )) : null
                    }
                </Grid>
            </div>
            
        </div>
    );
}

export default AboutPage;