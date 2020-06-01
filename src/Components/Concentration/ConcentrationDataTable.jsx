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

export default function ConcentrationDataTable(props) {
 
  const { stateData,headers } = { ...props.data };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="Concentration Data table">
        <TableHead>
          <TableRow>
            {headers.map((item,index)=>(
              index === 0 ? 
              <StyledTableCell>{item}</StyledTableCell>
              :<StyledTableCell align="center">{item}</StyledTableCell>
            ))}                     
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
