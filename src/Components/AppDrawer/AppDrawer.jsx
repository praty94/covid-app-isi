import React from 'react';
import { AppBar, Drawer, Hidden, Toolbar, IconButton, Grid } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Light from '@material-ui/icons/Brightness7';
import Dark from '@material-ui/icons/Brightness4';
import Content from './AppDrawerContent';
import { getIcon } from '../../Helpers/IconHelper';
import { green } from '@material-ui/core/colors';

const drawerWidth = 242;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  textMargin: {
    marginTop: 7
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    zIndex: 1101
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
  },
  drawerPaperDark:{
    backgroundColor:'#333',
    width: drawerWidth,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  headerIcon:{
    marginRight:10,
    color: green[300] 
  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  //user triggered events
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleOptionSelectedMobile = (item) =>{
    handleDrawerToggle();
    props.optionSelectedHandler(item);
  };  

  //Props to be sent to app drawer
  const appDrawerProps = {
    currentPage: props.currentPage, options: props.options,
    optionSelectedHandler: props.optionSelectedHandler, curTheme: props.curTheme
  };
  const appDrawerPropsMobile = {
    ...appDrawerProps,
    optionSelectedHandler:handleOptionSelectedMobile
  };

  const container = window !== undefined ? () => window().document.body : undefined;
  const navBarClasses = props.curTheme === "light" ? classes.drawerPaper:classes.drawerPaperDark;

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start"
            onClick={handleDrawerToggle} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          {getIcon(props.currentPage.icon,{className:classes.headerIcon,fontSize:"large"})}
          <Grid justify="space-between" container >            
            <Grid item >
              <Typography variant="h6" noWrap className={classes.textMargin}>
                {props.currentPage.name}
              </Typography>
            </Grid>
            <Grid item>
              <div>
                <IconButton edge="end" color="inherit" aria-label="Toggle Dark and Light mode"
                  onClick={() => props.themeToggleHandler()}>
                  {props.curTheme === "light" ? <Light /> : <Dark />}
                </IconButton>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: navBarClasses,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Content {...appDrawerPropsMobile}></Content>
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: navBarClasses,
            }}            
            variant="permanent"
            open
          >
            <Content {...appDrawerProps}></Content>
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
}

export default ResponsiveDrawer;
