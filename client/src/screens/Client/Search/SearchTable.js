/* eslint-disable react/prop-types */
import React from "react";


import { makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { NavLink as RouterLink } from "react-router-dom";


// components


const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(2),
    color: "#808080",
  },
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "60px",
    marginTop: "5px",
    fontSize: "15px",
  },
  headerWrap: {
    display: "flex",
    justifyContent: "space-between",
  },
  Logo: {
    // maxWidth: "180px",
    width: 240,
    height: 240,
    // objectFit: "contain",
  },

}));


export default function SearchTable(props) {
  const {
    searchedData,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="searched-table">
        <TableHead>
          <TableRow>
            <TableCell><h3><strong>Module</strong></h3></TableCell>
            <TableCell><h3><strong>Class</strong></h3></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchedData.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">

                <RouterLink to={`/client/class/${row.id}`}>
                  {row.name}
                </RouterLink>

              </TableCell>
              <TableCell component="th" scope="row">
                <RouterLink to={`/client/class/${row.id}`}>
                  {row.title}
                </RouterLink>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
