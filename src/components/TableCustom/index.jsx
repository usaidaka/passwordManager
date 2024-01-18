import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import PopUp from "../PopUp";
import classes from "./style.module.scss";
import { Link } from "react-router-dom";
import DetailCard from "../DetailCard";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableCustom({ head, data, action }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {head?.map((item, idx) => (
              <StyledTableCell key={idx}>{item}</StyledTableCell>
            ))}
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item, idx) => (
            <StyledTableRow key={idx}>
              <StyledTableCell component="th" scope="row">
                {item.provider}
              </StyledTableCell>
              <StyledTableCell>{item.email}</StyledTableCell>
              <StyledTableCell>{item.category}</StyledTableCell>
              <StyledTableCell>
                <Box className={classes["action-wrapper"]}>
                  <Link to={`/user-detail/${item.id}`}>
                    <Button size="small" variant="outlined">
                      Detail
                    </Button>
                  </Link>
                  <PopUp title="delete">
                    <Typography variant="body1" color="initial">
                      Are you sure wanna delete this account?
                    </Typography>
                    <DetailCard user={item} />
                    <Button
                      onClick={() => action(item.id)}
                      variant="contained"
                      color="error"
                    >
                      Yes I'm sure
                    </Button>
                  </PopUp>
                </Box>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
