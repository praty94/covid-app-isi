import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import DeathRateData from "../../Data/DeathRate.json";
import useWindowDimensions from '../../Helpers/WindowDimensionHelper';

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
const getTableWidth = (width) => {
  if (width > 650 && width < 960) {
    return width - 80;
  } else if (width >= 960) {
    return width - 320;
  } else {
    return width - 80;
  }
}
export default function DeathRateDataTable() {
  const { width } = useWindowDimensions();
  const { countryData, stateData } = { ...DeathRateData.data };
  return (
    <TableContainer component={Paper}>
      <Table style={{ width: getTableWidth(width) }} aria-label="Recovery Rate Data table">
        <TableHead>
          <TableRow>
            <StyledTableCell>State / UT</StyledTableCell>
            {stateData[0].deathRate.map((item, index) => (
              <StyledTableCell align="center" key={index}>{item.date}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
        {countryData.countryName ? 
          <StyledTableRow key="countryRow">
            <StyledTableCell component="th" scope="row">
              {countryData.countryName}
            </StyledTableCell>
            {countryData.deathRate.map((item) => (
              <StyledTableCell align="center"> {item.rate} </StyledTableCell>
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
