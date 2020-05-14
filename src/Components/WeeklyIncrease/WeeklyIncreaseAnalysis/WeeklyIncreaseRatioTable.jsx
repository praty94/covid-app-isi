import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import WeeklyData from "../../../Data/WeeklyRateOfIncrease.json";
import useWindowDimensions from '../../../Helpers/WindowDimensionHelper';

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
export default function WeeklyIncreaseRatioTable() {
  const { width } = useWindowDimensions();

  return (
    <TableContainer component={Paper}>
      <Table style={{ width: getTableWidth(width) }} aria-label="customized table">
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
                      {weeklyItem.value}
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
