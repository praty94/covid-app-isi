import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import WeeklyData from "../../../Data/WeeklyRateOfIncrease.json";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

export default function WeeklyIncreaseDataTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell></StyledTableCell>
          {WeeklyData.data.stateData[0].weeklyData.map((item,index)=>(
              <StyledTableCell align="center" colSpan={2} key={index}>{item.startDate} <br/>to<br/> {item.endDate}</StyledTableCell>
          ))}         
          </TableRow>
          <TableRow>           
            {WeeklyData.data.headers.map((item, index) => {
              return (                
                <StyledTableCell align="center" key={index}>
                  {item}
                </StyledTableCell>                
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {WeeklyData.data.stateData.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.stateName}
              </StyledTableCell>
              {item.weeklyData.map((weeklyItem, index) => {
                return (
                  <React.Fragment key={index}>
                    <StyledTableCell align="center">
                      {weeklyItem.value}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {weeklyItem.rank}
                    </StyledTableCell>
                  </React.Fragment>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
