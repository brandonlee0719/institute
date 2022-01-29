import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";

import Link from "@material-ui/core/Link";

import TextField from "@material-ui/core/TextField";

import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import AuthService from "../../../services/auth.service";

import TextFieldWithError from "./TextFieldWithError";

import CommonModal from "../../Modal";

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
  formControl: {
    marginTop: "5px",
    fontSize: "15px",
    width: 200
  },
  meta: {
    textAlign: "right",
    "& a": {
      color: theme.palette.text.secondary,
      fontSize: 12,
    },
  },
}));

const options = [
  { value: "", label: "License type:" },
  { value: "MD", label: "MD" },
  { value: "DO", label: "DO" },
  { value: "ND", label: "ND" },
  { value: "NMD", label: "NMD" },
  { value: "DNM", label: "DNM" },
  { value: "LAc", label: "LAc" },
  { value: "DC", label: "DC" },
  { value: "DDS", label: "DDS" },
  { value: "NP", label: "NP" },
  { value: "PA", label: "PA" },
  { value: "RN", label: "RN" },
  { value: "RD", label: "RD" },
  { value: "PT", label: "PT" },
  { value: "OT", label: "OT" },
  { value: "DPM", label: "DPM" },
  { value: "DPM", label: "DPM" },
  { value: "MFT", label: "MFT" },
  { value: "RPh", label: "RPh" },
  { value: "PharmD", label: "PharmD" },
  { value: "CNS", label: "CNS" },
  { value: "Other license", label: "Other license" },
  { value: "No active license", label: "No active license" }
]
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
  const [modalOpen, setModalOpen] = useState(false);
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
          if (response.data.status === 'success') {
            // Remove errors record with param
            const updatedErrors = fieldErrors.filter(
              (error) => error.param !== response.data.message.param,
            );
            setFieldErrors(updatedErrors);
          } else {
            console.log("In else part")
            const uniqueFieldErrors = _.uniqWith(
              [...fieldErrors, response.data.message],
              _.isEqual,
            );
            setFieldErrors(uniqueFieldErrors);
          }
        }
      )
      .catch((err) => {
        console.error("catch err", err);
      });
  };

  const handleChange = (event) => {
    setDropDownVal(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false)
  };

  const modalTitle = "Terms of Service";

  const modalBody = `These Terms of Service reflects the way our business works, the laws that apply to our company, and certain things we've always 
   believed to be true. As a result, these Terms of Service help define our relationship with you interact with our services. For example, these terms include the 
   following topic headings...`;

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

      {
        modalOpen ?
          <CommonModal title={modalTitle} body={modalBody} isModalOpen={true} isModalClose={handleModalClose} />
          : null
      }

      <TextField
        value={firstName}
        variant="outlined"
        margin="dense"
        fullWidth
        autoFocus
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
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">License</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={dropDownVal}
          onChange={handleChange}
          autoWidth={true}
          label="License"
        >
          {options.length
            ? options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
            : (
              <MenuItem value="">
                No Items available
              </MenuItem>
            )}
        </Select>
      </FormControl>

      <TextFieldWithError
        fieldName="email"
        label="Your Email Address"
        value={email}
        handleOnChange={(event) => setEmail(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "email")}
        inputProps={{ maxLength: 255 }}
        helperText={`${email.length >= 255
          ? "Enter an email between 255 charecter"
          : ""
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
              Check here to indicate that you have read and agree to the  <a style={{ color: "#2979ff" }} onClick={handleModalOpen}>
                Terms of Service
              </a>
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
