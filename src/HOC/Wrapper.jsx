import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 242;
const appBarHeight = 64;
const appBarHeightMobile=56;
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
        marginTop:appBarHeight
      },
      [theme.breakpoints.up('xs')]:{
        marginTop:appBarHeightMobile
      },
    background:theme.palette.primary.main
  },  
  content: {
    padding: theme.spacing(3),
  },
}));

function Wrapper(props) {  
  const classes = useStyles();  
  return (
    <div className={classes.root}>      
      <main className={classes.content}>        
        {props.children}
      </main>
    </div>
  );
}

export default Wrapper;
