import React from 'react';
import { Avatar, Paper, Grid, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({    
    paper: {
        padding: theme.spacing(2),
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
    }
}));

const openLink = (url) =>{
    window.open(url, "_blank");
}
const AboutCard = (props) => {
    const classes = useStyles();
    const {data} = {...props};
    return (<Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
            <Grid container style={{ flexWrap: 'noWrap' }}>
                <Grid item root className={classes.center}>
                    <Avatar className={classes.avatar} alt={data.name} src={data.avatar} />
                </Grid>
                <Grid item root className={classes.rightContent}>
                    <Typography variant="h6" color="textPrimary">{data.name}</Typography>
                    <Grid>
                        {data.github ?
                        <IconButton onClick={() => openLink(data.github)} aria-label="delete">
                            <GitHubIcon />
                        </IconButton>:null}
                        {data.linkedIn?
                        <IconButton onClick={() => openLink(data.linkedIn)} aria-label="delete">
                            <LinkedInIcon />
                        </IconButton>:null}
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    </Grid>);
}

export default AboutCard;