import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import * as API from "../utils/API";

const useStyles = makeStyles((theme) => ({
  root: { paddingTop: theme.spacing(3), minHeight: 500 },
  pageTitle: {
    marginBottom: theme.spacing(1),
  },
}));
const Agreement = () => {
  const classes = useStyles();
  const [agreement, setAgreement] = useState("");

  useEffect(() => {
    API.fetchClientAgreement().then((res) => {
      setAgreement(res.data);
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.pageTitle}
        >
          Client Agreement
        </Typography>
        <p>{agreement.contract}</p>
      </Container>
    </>
  );
};

export default Agreement;
