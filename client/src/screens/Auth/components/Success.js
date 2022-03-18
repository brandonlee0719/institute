/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

import Dimmer from "../../../components/common/Dimmer";


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    textAlign: "center",
    "& p": {
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
}));

const Success = ({ user }) => {
  const classes = useStyles();
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {errors && (
          <Alert severity={errors.status || "error"}>{errors.message}</Alert>
        )}
        <p>Thank you for signing up. </p>
      </CardContent>
      <Dimmer isOpen={isLoading} />
    </Card>
  );
};

Success.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Success;
