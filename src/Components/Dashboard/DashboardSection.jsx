import React from 'react';
import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography
} from '@material-ui/core';
import cx from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const useStyles = makeStyles((theme) => ({
    customPanel: {
        display: 'block'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        [theme.breakpoints.down('sm')]: {
            flexBasis: '90%',
        },
        flexBasis: '45%',
        flexShrink: 0,
    },
    secondaryHeading: {
        [theme.breakpoints.down('sm')]: {
            display:'none'
        },
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        marginLeft: 20
    },
    dynamicMargin: {
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1)
        }
    }
}));
const DashboardSection = (props) => {
    const classes = useStyles();
    const expansionPanelDetailsProps = props.panelname === 'panel3' ? 
    { className: cx(classes.customPanel, classes.dynamicMargin) } : 
    { className: classes.customPanel };
    return (
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={props.expanded}
            onChange={props.handleChangeExpanded(props.panelName)}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${props.panelName}bh-content`}
                id={`${props.panelName}bh-header`}>
                <Typography className={classes.heading}>{props.heading}</Typography>
                {props.expanded ? null : <Typography className={classes.secondaryHeading}>Tap to expand</Typography>}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails {...expansionPanelDetailsProps}>
                {props.children}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

export default DashboardSection;