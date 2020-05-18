import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
  content: {
    textAlign: 'center',
    color:"red"
  },
  customCard: {
    transition: 'box-shadow .3s',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
    }
  },
  iconStyle: {
    fontSize: '1rem',
    top: '.125em',
    position: 'relative'
  }
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <Card className={classes.customCard}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} variant="h5" color="textSecondary" gutterBottom>
          Recovered
        </Typography>
        <Typography variant="h4" component="h2">
          35,582
        </Typography>

        <Typography color="inherit">
          <ArrowUpwardIcon className={classes.iconStyle}></ArrowUpwardIcon>1311
        </Typography>

      </CardContent>

    </Card>
  );
}