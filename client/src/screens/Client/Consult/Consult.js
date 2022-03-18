/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { isEmpty } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    marginBottom: theme.spacing(2),
    color: "#808080",
  },
  pageDescription: {
    marginTop: theme.spacing(2),
    color: "#808080",
    fontWeight: "200",
    fontSize: "large",
  },
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    marginTop: "5px",
    fontSize: "15px",
    width: 200,
  },
  headerWrap: {
    display: "flex",
    justifyContent: "space-between",
  },
  Logo: {
    width: 240,
    height: 240,
  },
  certLogo: {
    paddingTop: "5em",
  },
}));

const consultTxt = `Do you need help solving complex patient cases?  Our licensed physicians can help diagnose your patients, and create a custom treatment plan for them.`;
const consultTxt2 = `Membership in AvonEHR is required so our physicians can efficiently review patient information.  Contact us to make further arrangements.`;


export default function Certificate() {
  const classes = useStyles();

  const [selectedProvider, setSelectedProvider] = useState({});


  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={7} xs={7} className={classes.headerWrap}>
          <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
            Consultations
            {" "}
            {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
          </Typography>
        </Grid>
      </Grid>


      <Grid container spacing={1}>
        <Grid item md={9} xs={9}>
          <Grid container spacing={4}>
            <Grid item md={10} xs={10}>

              <p className={classes.pageDescription}>{consultTxt}</p>
              <p className={classes.pageDescription}>{consultTxt2}</p>

            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
}
