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

export default function SimpleDataTable(props) {  
  const { headers, content } = { ...props.data };
  return (
    <TableContainer component={Paper}>
      <Table  aria-label="Custom Data table">
        <TableHead>
          <TableRow>
            {headers.map((item, index) => {              
                return <StyledTableCell align="center" key={index}>{item}</StyledTableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>        
          {content.countryData.map((item, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {item.name}
              </StyledTableCell>
              {item.values.map((item, index) => (
                <StyledTableCell align="center" key={index}>
                  {item ? item : "N/A"}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
