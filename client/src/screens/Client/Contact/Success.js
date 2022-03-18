/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { isEmpty, dateTimeFormat } from "../../../utils/helpers";

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

export default function Success(props) {
  const {
    userInfo,
    message,
    subject,
  } = props;

  const [selectedProvider, setSelectedProvider] = useState({});

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={7} xs={12} className={classes.headerWrap}>
          <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
            Contact Confirmation
            {" "}
            {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={9} xs={9}>
          <Grid container spacing={1}>
            <Grid item md={12} xs={12}>
              <Typography>
                <strong>From:</strong>
                {" "}
                {userInfo.username}
              </Typography>

            </Grid>

            <Grid item md={12} xs={12}>
              <Typography>
                <strong>Email:</strong>
                {" "}
                {userInfo.email}
              </Typography>
            </Grid>

            <Grid item md={12} xs={12}>
              <Typography>
                <strong>Subject:</strong>
                {" "}
                {subject}
              </Typography>
            </Grid>


            <Grid item md={12} xs={12}>
              <Typography>
                <strong>Message:</strong>
                {" "}
                {message}
              </Typography>
            </Grid>

          </Grid>

          <Grid container style={{ paddingTop: "15px" }}>
            <Grid item md={12} xs={12}>
              <Typography><strong>The message was successfully sent</strong></Typography>
            </Grid>
          </Grid>

        </Grid>


      </Grid>

    </div>
  );
}
