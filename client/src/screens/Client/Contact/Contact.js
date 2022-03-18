/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import { makeStyles, TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SaveIcon from "@material-ui/icons/Save";
import { useSnackbar } from "notistack";

import useAuth from "../../../hooks/useAuth";
import AccountService from "../../../services/account.service";
import EmailService from "../../../services/email.service";
import { isEmpty } from "../../../utils/helpers";
import Success from "./Success";


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


export default function Contact() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();

  const [selectedProvider, setSelectedProvider] = useState({});
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
  });
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleTxtChange = (e) => {
    if (e.target.name === "subject") {
      setSubject(e.target.value);
    } else if (e.target.name === "message") {
      setMessage(e.target.value);
    }
  };

  const handleSave = async () => {
    try {
      const data = {
        message,
        subject,
        from: userInfo.email,
      };

      const emailSendResponse = await EmailService.sendEmail(data);

      if (emailSendResponse) {
        setSuccess(true);
        enqueueSnackbar(`Successfully sent mail`, {
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(`${error.response.data.message}`, {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    setSuccess(false);
    AccountService.getAccountUser(user.id).then(
      (response) => {
        if (response) {
          setUserInfo({
            username: `${response.firstname} ${response.lastname}`,
            email: response.email,
          });
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

      {
        success
          ? <Success userInfo={userInfo} subject={subject} message={message} />
          : (
            <>
              <Grid container spacing={1}>
                <Grid item md={7} xs={12} className={classes.headerWrap}>
                  <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
                    Contact
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

                    <Grid item md={8} xs={12}>
                      <TextField
                        id="subject"
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        value={subject}
                        name="subject"
                        onChange={handleTxtChange}
                        autoFocus
                      />
                    </Grid>

                    <Grid item md={8} xs={12}>
                      <TextField
                        id="message"
                        label="Message"
                        placeholder="Message"
                        multiline
                        variant="outlined"
                        rows={8}
                        name="message"
                        fullWidth
                        value={message}
                        onChange={handleTxtChange}
                      />
                    </Grid>

                    <Grid item md={8} xs={12}>
                      <Button
                        style={{ backgroundColor: "#2979ff", marginTop: "20px" }}
                        variant="contained"
                        color="secondary"
                        onClick={handleSave}
                        startIcon={<SaveIcon />}
                      >
                        Send
                      </Button>
                    </Grid>
                  </Grid>

                </Grid>

              </Grid>
            </>
          )
      }

    </div>
  );
}
