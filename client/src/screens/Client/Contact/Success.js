import React, { useCallback, useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import ReactPlayer from "react-player";

import Clinios from "../../../assets/img/Clinios.png";
import Help from "../../../assets/img/Help.png";
import useAuth from "../../../hooks/useAuth";
import { statusToColorCode, isEmpty } from "../../../utils/helpers";
import { TextField, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import EmailService from "../../../services/email.service";
import AccountService from "../../../services/account.service";


// components


const useStyles = makeStyles((theme) => ({
    pageTitle: {
        marginBottom: theme.spacing(2),
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
        subject
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

            <Grid container >
                <Grid item md={9} xs={9} >
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12} >
                            <Typography><strong>From:</strong> {userInfo.username}</Typography>

                        </Grid>

                        <Grid item md={12} xs={12} >
                            <Typography><strong>Email:</strong> {userInfo.email}</Typography>
                        </Grid>

                        <Grid item md={12} xs={12} >
                            <Typography><strong>Subject:</strong> {subject}</Typography>
                        </Grid>


                        <Grid item md={12} xs={12} >
                            <Typography><strong>Message:</strong> {message}</Typography>
                        </Grid>

                    </Grid>

                    <Grid container style={{ paddingTop: "15px" }}>
                        <Grid item md={12} xs={12} >
                            <Typography><strong>The message was successfully sent</strong></Typography>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item md={3} xs={3}>
                    <Grid item md={6} xs={12}>
                        <img src={Clinios} alt="Clinos software ad" className={classes.Logo} />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <img src={Help} alt="Help ad" className={classes.Logo} />
                    </Grid>
                </Grid>
            </Grid>

        </div>
    );
}
