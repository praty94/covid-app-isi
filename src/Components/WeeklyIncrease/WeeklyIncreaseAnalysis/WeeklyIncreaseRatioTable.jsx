import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";

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

export default function WeeklyIncreaseRatioTable(props) {
  const WeeklyData = props.data;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Weekly increase ratio table">
        <TableHead>
          <TableRow>
            <StyledTableCell>State / UT</StyledTableCell>
            {WeeklyData.data.stateData[0].ratios.map((item, index) => (
              <StyledTableCell align="center" key={index}>{item.name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {WeeklyData.data.stateData.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.stateName}
              </StyledTableCell>
              {item.ratios.map((weeklyItem, index) => {
                return (
                  <React.Fragment key={index}>
                    <StyledTableCell align="center">
                      {weeklyItem.value ? weeklyItem.value : "N/A"}
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
