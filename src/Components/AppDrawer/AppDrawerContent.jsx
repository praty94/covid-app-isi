import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import {getIcon} from '../../Helpers/IconHelper';
import { green } from '@material-ui/core/colors';
import {MainIconWhite,MainIconBlack} from '../../Assets';
const useStyles = makeStyles((theme) => ({    
    mainIcon:{
        height:'15rem',
        padding:'2rem'
    },
    toolbar:{
        textAlign:'center'
    }
}));

const DrawerContent = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbar}>
                {props.curTheme !== "light" ? 
                <img className={classes.mainIcon} src={MainIconWhite} alt="mainIcon"></img>:
                <img className={classes.mainIcon} src={MainIconBlack} alt="mainIcon"></img>}
            </div>
            <Divider />
            <List>
                {props.options.map((item, index) => (
                    item.id === props.currentPage ?
                    <ListItem selected button key={item.id} onClick={()=>props.optionSelectedHandler(item.id)}>
                        <ListItemIcon >{getIcon(item.icon)}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                    :
                    <ListItem button key={item.id} onClick={()=>props.optionSelectedHandler(item.id)}>
                        <ListItemIcon style={{ color: green[300] }}>{getIcon(item.icon)}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                    
                ))}
            </List>
            <Divider />
            
        </div>
    );
}

export default DrawerContent;