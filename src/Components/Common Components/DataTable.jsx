import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
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
export default function DataTable(props) {
  const { width } = useWindowDimensions();
  const { countryData, stateData } = { ...props.data };
  return (
    <TableContainer component={Paper}>
      <Table style={{ width: getTableWidth(width) }} aria-label="Custom Data table">
        <TableHead>
          <TableRow>
            <StyledTableCell>State / UT</StyledTableCell>
            {stateData[0][props.category].map((item, index) => {
              if (props.headerRange)//If headerRange is specified table expects 2 header categories "start" to "end"
                return (
                  <StyledTableCell align="center" key={index}>
                    {item[props.headerCategory1]}<br />to<br />{item[props.headerCategory2]}
                  </StyledTableCell>);
              else
                return <StyledTableCell align="center" key={index}>{item[props.headerCategory]}</StyledTableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {countryData && countryData.countryName ?
            <StyledTableRow key="countryRow">
              <StyledTableCell component="th" scope="row">
                {countryData.countryName}
              </StyledTableCell>
              {countryData[props.category].map((item) => (
                <StyledTableCell align="center"> {item[props.itemCategory]} </StyledTableCell>
              ))}
            </StyledTableRow> : null}
          {stateData.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.stateName}
              </StyledTableCell>
              {item[props.category].map((recoveryItem, index) => (
                <StyledTableCell align="center" key={index}>
                  {recoveryItem[props.itemCategory] ? recoveryItem[props.itemCategory] : "N/A"}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
