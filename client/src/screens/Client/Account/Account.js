/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";


import {
  TextField, Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { useSnackbar } from "notistack";
import { NavLink as RouterLink, useHistory, useLocation } from "react-router-dom";

import Alert from "../../../components/Alert";
import useAuth from "../../../hooks/useAuth";
import AccountService from "../../../services/account.service";
import { isEmpty } from "../../../utils/helpers";


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
}));


export default function Account() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user, logout } = useAuth();
  const history = useHistory();

  const [selectedProvider, setSelectedProvider] = useState({});
  const [dropDownVal, setDropDownVal] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDeleteUser, setIsDeleteUser] = useState(false);

  const deleteMessage = "Your account will be deleted forever from our system and you won't be able to access it anymore.";

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
    { value: "No active license", label: "No active license" },
  ];

  const handleDropDown = (event) => {
    setDropDownVal(event);
  };

  const handleUpdateAccount = async (event) => {
    event.preventDefault();
    try {
      const data = {
        firstname: firstName,
        lastname: lastName,
        license: dropDownVal,
        email,
        password,
        id: user.id,
      };
      const result = await AccountService.updateUser(data);

      enqueueSnackbar(`${result.data}`, {
        variant: "success",
      });
    } catch (error) {
      setErrors(error.response.data.message);
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
      });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await AccountService.deleteUser(user.id);

      console.log("User Delete........", result);

      setIsDeleteUser(false);

      enqueueSnackbar(`${result.data}`, {
        variant: "success",
      });

      await logout();
      history.push("/login_client");
    } catch (error) {
      setErrors(error.response.data.message);
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
      });
    }
  };

  const handleDeleteModal = (val) => {
    setIsDeleteUser(val);
  };

  const handleTextChange = (e) => {
    if (e.target.name === "firstName") {
      setFirstName(e.target.value);
    } else if (e.target.name === "lastName") {
      setLastName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  useEffect(() => {
    AccountService.getAccountUser(user.id).then(
      (response) => {
        if (response) {
          setFirstName(response.firstname);
          setLastName(response.lastname);
          setEmail(response.email);
          setDropDownVal(response.license);
        }
      },
      (error) => {
        if (error.response) {
          setErrors(error.response.data.message);
        }
      },
    );
  }, []);


  return (
    <div className={classes.root}>
      <form>
        <Grid container>
          <Grid item md={7} xs={12} className={classes.headerWrap}>
            <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
              Account
              {" "}
              {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
            </Typography>
          </Grid>
        </Grid>

        {
          isDeleteUser
            ? (
              <Alert
                open={isDeleteUser}
                title="Are you certain you want to delete your account and delete all your data?"
                message={deleteMessage}
                applyButtonText="Delete"
                cancelButtonText="Cancel"
                applyForm={handleDeleteAccount}
                cancelForm={() => { handleDeleteModal(false); }}
              />
            )
            : null
        }

        <Grid container spacing={1}>
          <Grid item md={9} xs={9}>
            <Grid container spacing={2}>
              <Grid item md={5} xs={5}>
                <TextField
                  id="first_name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  value={firstName}
                  onChange={handleTextChange}
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={5} xs={5}>
                <TextField
                  id="last_name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  name="lastName"
                  onChange={handleTextChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>

              <Grid item md={5} xs={5}>

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">License</InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={dropDownVal}
                    onChange={handleDropDown}
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
              </Grid>

            </Grid>

            <Grid container spacing={2}>
              <Grid item md={5} xs={5}>
                <TextField
                  id="email_address"
                  label="Email address"
                  variant="outlined"
                  fullWidth
                  value={email}
                  name="email"
                  onChange={handleTextChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>

              <Grid item md={5} xs={5}>
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  value={password}
                  name="password"
                  onChange={handleTextChange}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <Button
                  style={{ backgroundColor: "#2979ff", marginTop: "20px" }}
                  variant="contained"
                  color="secondary"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdateAccount}
                  type="submit"
                >
                  Save
                </Button>
              </Grid>

            </Grid>

          </Grid>

        </Grid>

        <Grid container style={{ marginTop: "10em" }}>
          <Typography>Delete my information and delete my account</Typography>
          <Grid item md={12} xs={12}>
            <Button
              style={{ backgroundColor: "#FFA500", marginTop: "5px" }}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => { handleDeleteModal(true); }}
            >
              Delete
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
