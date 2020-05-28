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
        disableClearable
        id="single-state-selector"
        options={props.states}
        getOptionLabel={(option) => option}
        onChange={(e, value) => props.handleStateChange(value)}
        defaultValue={props.defaultState}
        renderInput={(params) => (
          <TextField {...params} color="secondary" variant="outlined" placeholder="Select State.." />
        )}
      />
    </div>
  );
}