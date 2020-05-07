import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import {getIcon} from '../../Helpers/IconHelper';

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar
}));

const DrawerContent = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {props.options.map((item, index) => (
                    item.id === props.currentPage ?
                    <ListItem selected button key={item.id} onClick={()=>props.optionSelectedHandler(item.id)}>
                        <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                    :
                    <ListItem button key={item.id} onClick={()=>props.optionSelectedHandler(item.id)}>
                        <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                    
                ))}
            </List>
            <Divider />
            
        </div>
    );
}

export default DrawerContent;