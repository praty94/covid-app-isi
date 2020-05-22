import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import DeathRateData from "../../Data/DeathRate.json";

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

export default function DeathRateDataTable() {
  
  const { countryData, stateData } = { ...DeathRateData.data };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Recovery Rate Data table">
        <TableHead>
          <TableRow>
            <StyledTableCell>State / UT</StyledTableCell>
            {stateData[0].deathRate.map((item, index) => (
              <StyledTableCell style={{whiteSpace:"nowrap"}} align="center" key={index}>{item.date}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {countryData.countryName ? 
          <StyledTableRow key="countryRow">
            <StyledTableCell component="th" scope="row">
              {countryData.countryName}
            </StyledTableCell>
            {countryData.deathRate.map((item,index) => (
              <StyledTableCell align="center" key={index}> {item.rate} </StyledTableCell>
            ))}
          </StyledTableRow> : null}
          {stateData.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.stateName}
              </StyledTableCell>
              {item.deathRate.map((deathItem, index) => (
                    <StyledTableCell align="center" key={index}>
                      {deathItem.rate ? deathItem.rate : "N/A"}
                    </StyledTableCell>                  
                ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
