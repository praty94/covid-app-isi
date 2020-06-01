import React, { useState } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import cx from 'classnames';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    }
  },
  clickableRow:{
    '&:hover':{
      backgroundColor: theme.palette.action.hover,
      cursor:'pointer'
    }
  },
  dynamicPadding:{
    [theme.breakpoints.down('sm')]: {
      padding:theme.spacing(1)
    },
    [theme.breakpoints.down('xs')]: {
      padding:theme.spacing(0.75)
    }
  },
  expandIcon:{
    marginLeft:-10,
    marginRight:5,
    [theme.breakpoints.down('xs')]: {
      display:'none'
    }
  }
}));
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    [theme.breakpoints.down('sm')]: {
      padding:theme.spacing(1)
    },
    [theme.breakpoints.down('xs')]: {
      padding:theme.spacing(0.75)
    }
  }
}))(TableCell);
const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

function Row(props) {
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();
  const { stateData } = { ...props };
  const { districtData } = { ...props.districtData };
  const districts = Object.keys(districtData);

  return (
    <React.Fragment>
      <TableRow className={cx(classes.root,classes.clickableRow)} onClick={() => setOpen(!open)} >        
        <TableCell align="left" className={classes.dynamicPadding}>
        <IconButton className={classes.expandIcon} aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>          
          {stateData.state}
        </TableCell>
        <TableCell align="center" className={classes.dynamicPadding}>{stateData.confirmed}</TableCell>
        <TableCell align="center" className={classes.dynamicPadding}>{stateData.active}</TableCell>
        <TableCell align="center" className={classes.dynamicPadding}>{stateData.recovered}</TableCell>
        <TableCell align="center" className={classes.dynamicPadding}>{stateData.deaths}</TableCell>
      </TableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Paper elevation={1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="purchases">
              <TableHead>
                <TableRow>                  
                  <StyledTableCell align="left">District</StyledTableCell>
                  <StyledTableCell align="center">Confirmed</StyledTableCell>
                  <StyledTableCell align="center">Active</StyledTableCell>
                  <StyledTableCell align="center">Recovered</StyledTableCell>
                  <StyledTableCell align="center">Deceased</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {districts.map((district, index) => (
                  <StyledTableRow className={classes.root} key={index}>                   
                    <TableCell align="left" className={classes.dynamicPadding}>{district}</TableCell>
                    <TableCell align="center" className={classes.dynamicPadding}>{districtData[district].confirmed}</TableCell>
                    <TableCell align="center" className={classes.dynamicPadding}>{districtData[district].active}</TableCell>
                    <TableCell align="center" className={classes.dynamicPadding}>{districtData[district].recovered}</TableCell>
                    <TableCell align="center" className={classes.dynamicPadding}>{districtData[district].deceased}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
          </Paper>
        </TableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  const { stateData, districtData } = { ...props };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <StyledTableRow>           
            <StyledTableCell align="left">State/UT</StyledTableCell>
            <StyledTableCell align="center">Confirmed</StyledTableCell>
            <StyledTableCell align="center">Active</StyledTableCell>
            <StyledTableCell align="center">Recovered</StyledTableCell>
            <StyledTableCell align="center">Deceased</StyledTableCell>            
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {stateData.map((item) => (
            item.statecode !== "TT" ?
              <Row key={item.statecode} stateData={item} districtData={districtData[item.state]}></Row> : null
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
