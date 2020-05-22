import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import cx from 'classnames';
import CountUp from 'react-countup';
import { getIcon } from '../../Helpers/IconHelper';
import { green } from '@material-ui/core/colors';
import { sidebarOptions } from '../../Data/AppElements';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  content: {
    textAlign: 'center'
  },
  customCard: {
    transition: 'box-shadow .3s',
    margin: '0.5em',
    [theme.breakpoints.down('sm')]: {
      width: '46%',
      minWidth: '46%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '95%',
      minWidth: '95%'
    },
    width: '23%',
    minWidth: '23%',
    cursor: 'default',
    '&:hover': {
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.3),0px 4px 5px 0px rgba(0,0,0,0.24),0px 1px 10px 0px rgba(0,0,0,0.22)'
    }
  },
  confirmed: {
    borderBottom: '10px solid #368bf6'
  },
  active: {
    borderBottom: '10px solid #f2a365'
  },
  recovered: {
    borderBottom: '10px solid #81c784'
  },
  death: {
    borderBottom: '10px solid #eb5569'
  },
  iconStyle: {
    fontSize: '1rem',
    top: '.125em',
    position: 'relative'
  },

}));

const CustomCard = (props) => {
  const classes = useStyles();
  const [appState, setAppState] = useContext(AppContext);
  const displayPage = () => {
    setAppState({ theme: appState.theme, currentPage: sidebarOptions[props.pageId] });
  };

  return (
    <Card className={cx(classes.customCard, classes[props.cardType])}>
      <CardContent className={classes.content}>
        <Typography color="textSecondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h4">
          <CountUp start={0} end={+props.value} duration={1} separator="," />
        </Typography>
        <Typography color="inherit">
          {props.valueChange > 0 ?
            <ArrowUpwardIcon className={classes.iconStyle}></ArrowUpwardIcon> :
            props.valueChange < 0 ?
              <ArrowDownwardIcon className={classes.iconStyle}></ArrowDownwardIcon> : null}
          {props.valueChange ? Math.abs(props.valueChange) : null}
        </Typography>
        {/*div for padding*/}
        {props.valueChange ? null : <div style={{ height: "24px" }}></div>}
      </CardContent>
      {sidebarOptions[props.pageId] ?
        <CardActions disableSpacing>
          <Button size="small"
            onClick={() => displayPage()} startIcon={getIcon(sidebarOptions[props.pageId].icon, { style: { color: green[300] } })}>
            {sidebarOptions[props.pageId].name}
          </Button>
        </CardActions> : null}
    </Card>
  );
}

CustomCard.propTypes = {
  pageId: PropTypes.number.isRequired
};

export default CustomCard;