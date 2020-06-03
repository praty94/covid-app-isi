import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const WeekFooter = (props) => (
    <Grid container justify="center" spacing={2}>
        {props.data.map((item, index) => (
            <Grid key={index} item style={{ display: 'inline-flex' }}>
                <ArrowRightIcon color="secondary"></ArrowRightIcon>
                <Typography color="textPrimary" style={{ fontSize: '0.85rem', lineHeight: '1.5rem' }}>{item}</Typography>
            </Grid>
        ))}
    </Grid>
);

export default WeekFooter;