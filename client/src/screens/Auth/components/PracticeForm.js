import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";

import Link from "@material-ui/core/Link";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import AuthService from "../../../services/auth.service";

import TextFieldWithError from "./TextFieldWithError";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formSectionTitle: {
    marginBottom: theme.spacing(1),
  },
  personalFormTitle: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  checkbox: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  meta: {
    textAlign: "right",
    "& a": {
      color: theme.palette.text.secondary,
      fontSize: 12,
    },
  },
}));

const PracticeForm = ({ onFormSubmit, ...props }) => {
  const { errors } = props;
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dropDownVal, setDropDownVal] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [fieldErrors, setFieldErrors] = useState([]);
  const { enqueueSnackbar } = useSnackbar();


  const handleFormSubmission = (e) => {
    e.preventDefault();

    const formData = {
      user: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        email: email.trim(),
        license: dropDownVal,
        password: password.trim(),
      },
    };

    if (firstName === "") {
      enqueueSnackbar(`First Name cannot be null`, {
        variant: "error",
      });
    } else if (lastName === "") {
      enqueueSnackbar(`Last Name cannot be null`, {
        variant: "error",
      });
    } else if (email === "") {
      enqueueSnackbar(`Email cannot be null`, {
        variant: "error",
      });
    } else if (dropDownVal === "") {
      enqueueSnackbar(`License cannot be null`, {
        variant: "error",
      });
    } else if (password === "") {
      enqueueSnackbar(`Password cannot be null`, {
        variant: "error",
      });
    } else {
      onFormSubmit(formData);
    }
  };

  const validatePassword = (event) => {
    if (event.target.value.length < 8) {
      setFieldErrors([
        ...fieldErrors,
        {
          value: event.target.value,
          msg: "Too Weak. Must be atleast 8 Characters",
          param: "users.password",
        },
      ]);
    } else {
      const updatedErrors = fieldErrors.filter(
        (error) => error.param !== "users.password",
      );
      setFieldErrors(updatedErrors);
    }
  };

  const practiceErrors = Array.isArray(errors) && errors.filter((err) => err?.param.includes("client"));


  const getFieldError = (target, fieldName) => {
    let value = `client.${fieldName}`;
    if (target) {
      value = `${target}.${fieldName}`;
    }
    return fieldErrors && fieldErrors.filter((err) => err?.param === value);
  };

  const handleAjaxValidation = (event, target) => {
    if (!event.target) {
      return;
    }

    AuthService.validate({
      fieldName: event.target.name,
      value: event.target.value,
      target: target || "client",
    })
      .then(
        (response) => {
          // Remove errors record with param
          const updatedErrors = fieldErrors.filter(
            (error) => error.param !== response.data.message.param,
          );
          setFieldErrors(updatedErrors);
        },
        (error) => {
          if (!error.response) {
            // network error
            console.error(error);
          } else {
            const uniqueFieldErrors = _.uniqWith(
              [...fieldErrors, error.response.data.message],
              _.isEqual,
            );
            setFieldErrors(uniqueFieldErrors);
          }
        },
      )
      .catch((err) => {
        console.error("catch err", err);
      });
  };

  const handleChange = (event) => {
    setDropDownVal(event.target.value);
  };

  return (
    <form className={classes.form} noValidate onSubmit={(event) => handleFormSubmission(event)}>
      {practiceErrors
        // eslint-disable-next-line react/no-array-index-key
        && practiceErrors.map((error, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Alert severity="error" key={index}>
            {error.msg}
          </Alert>
        ))}

      <TextField
        value={firstName}
        variant="outlined"
        margin="dense"
        fullWidth
        id="firstName"
        label="Your Firstname"
        name="firstName"
        autoComplete="firstName"
        onChange={(event) => setFirstName(event.target.value)}
        inputProps={{ maxLength: 35 }}
        helperText={`${firstName.length >= 35
          ? "Enter a first name between 35 charecter"
          : ""
          }`}
      />
      <TextField
        value={lastName}
        variant="outlined"
        margin="dense"
        fullWidth
        id="lastName"
        label="Your Lastname"
        name="lastName"
        autoComplete="lastName"
        onChange={(event) => setLastName(event.target.value)}
        inputProps={{ maxLength: 35 }}
        helperText={`${lastName.length >= 35 ? "Enter a last name between 35 charecter" : ""
          }`}
      />
      <FormControl className={classes.formControl}>
        {/* <InputLabel htmlFor="age-native-simple">License </InputLabel> */}
        <Select
          native
          value={dropDownVal}
          onChange={handleChange}

        >
          <option value="" defaultValue>License type: </option>
          <option value="MD">MD</option>
          <option value="DO">DO</option>
          <option value="ND">ND</option>
          <option value="NMD">NMD</option>
          <option value="DNM">DNM</option>
          <option value="LAc">LAc</option>
          <option value="DC">DC</option>
          <option value="DDS">DDS</option>
          <option value="NP">NP</option>
          <option value="PA">PA</option>
          <option value="RN">RN</option>
          <option value="RD">RD</option>
          <option value="PT">PT</option>
          <option value="OT">OT</option>
          <option value="DPM">DPM</option>
          <option value="MFT">MFT</option>
          <option value="RPh">RPh</option>
          <option value="PharmD">PharmD</option>
          <option value="CNS">CNS</option>
          <option value="Other">Other license</option>
          <option value="">No active license</option>
        </Select>
      </FormControl>

      <TextFieldWithError
        id="userEmail"
        fieldName="email"
        label="Your Email Address"
        value={email}
        handleOnChange={(event) => setEmail(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event, "users")}
        errors={getFieldError("users", "email")}
        inputProps={{ maxLength: 255 }}
        helperText={`${email.length >= 255 ? "Enter an email between 255 charecter" : ""
          }`}
      />

      <TextFieldWithError
        fieldName="password"
        label="Your Password"
        type="password"
        value={password}
        handleOnChange={(event) => setPassword(event.target.value)}
        handleOnBlur={(event) => validatePassword(event)}
        errors={getFieldError("users", "password")}
        inputProps={{ maxLength: 90 }}
        helperText={`${password.length >= 90 ? "Enter a password between 90 charecter" : ""
          }`}
      />

      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={(
          <div>
            <span>
              Check here to indicate that you have read and agree to the terms
              of the
              {" "}
              <Link href="/agreement">Customer Agreement</Link>
            </span>
          </div>
        )}
        className={classes.checkbox}
        onChange={() => setTermsAndConditions(!termsAndConditions)}
      />

      <Button
        disabled={fieldErrors.length > 0 || !termsAndConditions}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        type="submit"
      >
        Sign up
      </Button>

      <Grid container className={classes.meta}>
        <Grid item xs>
          <Link href="/login_client" variant="body2">
            Already a member? Login here
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

PracticeForm.defaultProps = {
  onFormSubmit: () => { },
  errors: null,
};

PracticeForm.propTypes = {
  onFormSubmit: PropTypes.func,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      msg: PropTypes.string.isRequired,
    }),
  ),
};
export default PracticeForm;
