import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 242;
const appBarHeight = 64;
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        marginTop:appBarHeight
      },
    background:theme.palette.primary.main
  },  
  content: {
    flexGrow: 1,
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
