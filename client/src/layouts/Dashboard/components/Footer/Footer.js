/* eslint-disable no-unused-vars */
import React from "react";

import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import useAuth from "../../../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  footer: {
    // flex: 0,
    backgroundColor: "#ffffff",
    color: "#ffffff",
    clear: "both",
    position: "relative",
    // marginTop: theme.spacing(1),
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
    // [theme.breakpoints.up("sm")]: {
    //   paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: `calc(100% - 240px)`,
    marginLeft: "240px",
  },
  footerText: {
    // marginLeft: "240px",
    color: "#AEAEAE",
    // marginTop: 0,
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
    "& p": {
      color: "#AEAEAE",
    },
    fontSize: "11px !important",
  },
}));

const CustomTypography = withStyles(() => ({
  root: {
    fontSize: "11px",
    // lineHeight: "4px",
    letterSpacing: ".65px",
  },
}))(Typography);

export default function Footer() {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <Container component="footer" maxWidth={false} className={classes.footer}>

      <CustomTypography variant="body1" color="textPrimary" align="center" className={classes.footerText}>
        {"Copyright © "}
        {" "}
        {new Date().getFullYear()}
        {` ${process.env.REACT_APP_SITE_TITLE}`}
      </CustomTypography>

    </Container>
  );
}
