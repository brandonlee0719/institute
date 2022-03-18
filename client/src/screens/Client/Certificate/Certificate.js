/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CertificateImg from "../../../assets/img/Cert.svg";
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
    paddingTop: "1em",
  },
}));

const certificateTxt = `When you have completed most of the classes, and understand the material, you may display the completion 
    certificate on your website by using the following code:`;

const certificateLink = `<a href='https://www.avoninstitute.com' target='_blank'><img src='Cert.svg'></a>`;


export default function Certificate() {
  const classes = useStyles();

  const [selectedProvider, setSelectedProvider] = useState({});


  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item md={7} xs={7} className={classes.headerWrap}>
          <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
            Certificate
            {" "}
            {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
          </Typography>
        </Grid>
      </Grid>


      <Grid container spacing={1}>
        <Grid item md={9} xs={9}>
          <Grid container spacing={4}>
            <Grid item md={8} xs={8}>
              <p className={classes.pageDescription}>{certificateTxt}</p>
              <p className={classes.pageDescription}>{certificateLink}</p>
            </Grid>
          </Grid>

          <Grid container className={classes.certLogo}>
            <Grid item md={10} xs={10}>
              <img src={CertificateImg} alt="Certificate Img" className={classes.Logo} />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
}
