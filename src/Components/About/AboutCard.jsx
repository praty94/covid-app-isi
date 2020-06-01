import React from 'react';
import { Avatar, Paper, Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {LinkedIn,GitHub,Email} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        maxWidth: 500
    },
    paper: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
    },
    center: {
        alignSelf: 'center'
    },
    avatar: {
        height: 60,
        width: 60
    },
    rightContent: {
        marginLeft: 15,
        textAlign: 'left'
    },
    buttonContainer: {
        marginLeft: -15
    }
}));

const openLink = (url, sameTab) => {
    sameTab ? window.location = url : window.open(url, "_blank");
}
const AboutCard = (props) => {
    const classes = useStyles();
    const { data } = { ...props };
    return (<Grid item xs={12} md={6} className={classes.container}>
        <Paper className={classes.paper}>
            <Grid container style={{ flexWrap: 'noWrap' }}>
                <Grid item className={classes.center}>
                    <Avatar className={classes.avatar} alt={data.name} src={data.avatar} />
                </Grid>
                <Grid item className={classes.rightContent}>
                    <Typography variant="h6" color="textPrimary">{data.name}</Typography>
                    <Typography color="textSecondary">{data.currentRole}</Typography>
                    <Grid className={classes.buttonContainer}>
                        {data.linkedIn ?
                            <IconButton onClick={() => openLink(data.linkedIn)} aria-label="delete">
                                <LinkedIn />
                            </IconButton> : null}
                        {data.github ?
                            <IconButton onClick={() => openLink(data.github)} aria-label="delete">
                                <GitHub />
                            </IconButton> : null}
                        {data.email ?
                            <IconButton onClick={() => openLink(data.email, true)} aria-label="delete">
                                <Email />
                            </IconButton> : null}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </Grid>);
}

export default AboutCard;