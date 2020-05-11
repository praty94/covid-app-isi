import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function StateSelector(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple        
        id="multiple-state-selector"
        options={props.states}
        getOptionLabel={(option) => option}        
        onChange={(e,value)=>props.handleStateChange(value)}
        renderInput={(params) => (
          <TextField {...params} color="secondary" variant="outlined" label="States" placeholder="Select States.." />
        )}
      />
    </div>
  );
}