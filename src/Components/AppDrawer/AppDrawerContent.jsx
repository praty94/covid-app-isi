import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { getIcon } from '../../Helpers/IconHelper';
import { green } from '@material-ui/core/colors';
import { logo } from '../../Assets';
const useStyles = makeStyles((theme) => ({
    mainIcon: {
        height: '13rem',
        padding: '2rem'
    },
    toolbar: {
        textAlign: 'center'
    }
}));
const getListItem = (props, item) => {
    if (item.id === props.currentPage.id) {
        return (
            <ListItem selected button key={item.id} onClick={() => props.optionSelectedHandler(item)}>
                <ListItemIcon >{getIcon(item.icon)}</ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItem>);
    } else {
        return (
            <ListItem button key={item.id} onClick={() => props.optionSelectedHandler(item)}>
                <ListItemIcon style={{ color: green[300] }}>{getIcon(item.icon)}</ListItemIcon>
                <ListItemText primary={item.name} />
            </ListItem>);
    }
}
const DrawerContent = (props) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.toolbar}>               
                    <img className={classes.mainIcon} src={logo} alt="mainIcon"></img> 
            </div>
            <Divider />
            <List>
                {props.options.map((item, index) => (
                    index === props.options.length - 1 ?
                        <React.Fragment key="fragment">
                            <Divider key="divider"/>
                            {getListItem(props, item)}
                        </React.Fragment>
                        :
                        getListItem(props, item)

                ))}
            </List>

        </div>
    );
}

export default DrawerContent;