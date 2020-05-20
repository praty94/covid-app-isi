import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import ConcentrationData from "../../Data/Concentration.json";

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

export default function ConcentrationDataTable() {
 
  const { stateData } = { ...ConcentrationData.data };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Concentration Data table">
        <TableHead>
          <TableRow>
            <StyledTableCell>State / UT</StyledTableCell>            
            <StyledTableCell align="center">Concentration</StyledTableCell>            
          </TableRow>
        </TableHead>
        <TableBody>          
          {stateData.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.stateName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row" align="center">
                {item.concentration}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
