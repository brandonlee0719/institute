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
import Select from "@material-ui/core/Select";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import AccountService from "../../../services/account.service";
import Alert from "../../../components/Alert";


const useStyles = makeStyles((theme) => ({
    pageTitle: {
        marginBottom: theme.spacing(2),
        color: "#808080"
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
        width: 200
    },
    headerWrap: {
        display: "flex",
        justifyContent: "space-between",
    },
    Logo: {
        width: 240,
        height: 240,
    }
}));


export default function Account() {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { user, logout } = useAuth();

    const [selectedProvider, setSelectedProvider] = useState({});
    const [dropDownVal, setDropDownVal] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isDeleteUser, setIsDeleteUser] = useState(false);

    const deleteMessage = "Your account will be deleted forever from our system and you won't be able to access it anymore.";

    const handleDropDown = (event) => {
        setDropDownVal(event.target.value);
    };

    const handleUpdateAccount = async () => {
        try {

            const data = {
                firstname: firstName,
                lastname: lastName,
                license: dropDownVal,
                email: email,
                password: password,
                id: user.id
            }
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

            history.push(user.login_url || "/login_client");

        } catch (error) {
            setErrors(error.response.data.message);
            enqueueSnackbar(`${error.response.data.message}`, {
                variant: "error",
            });
        }

    }

    const handleDeleteModal = (val) => {
        setIsDeleteUser(val);
    };

    const handleTextChange = (e) => {

        if (e.target.name === 'firstName') {
            setFirstName(e.target.value)
        } else if (e.target.name === 'lastName') {
            setLastName(e.target.value)
        } else if (e.target.name === 'email') {
            setEmail(e.target.value)
        } else if (e.target.name === 'password') {
            setPassword(e.target.value)
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
    }, [])


    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item md={7} xs={12} className={classes.headerWrap}>
                    <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
                        Account
                        {" "}
                        {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
                    </Typography>
                </Grid>
            </Grid>

            {
                isDeleteUser ?
                    <Alert
                        open={isDeleteUser}
                        title="Are you certain you want to delete your account and delete all your data?"
                        message={deleteMessage}
                        applyButtonText="Delete"
                        cancelButtonText="Cancel"
                        applyForm={handleDeleteAccount}
                        cancelForm={() => { handleDeleteModal(false) }}
                    />
                    : null
            }

            <Grid container spacing={1}>
                <Grid item md={9} xs={9}>
                    <Grid container spacing={2}>
                        <Grid item md={5} xs={5} >
                            <TextField
                                id="first_name"
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                name="firstName"
                                value={firstName}
                                onChange={handleTextChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item md={5} xs={5} >
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

                        <Grid item md={5} xs={5} >
                            <FormControl className={classes.formControl}>

                                <Select
                                    value={dropDownVal}
                                    onChange={handleDropDown}
                                    style={{ width: '100%' }}
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
                        </Grid>

                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item md={5} xs={5} >
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

                        <Grid item md={5} xs={5} >
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
                                style={{ backgroundColor: '#2979ff', marginTop: '20px' }}
                                variant="contained"
                                color="secondary"
                                startIcon={<SaveIcon />}
                                onClick={handleUpdateAccount}
                            >
                                Save
                            </Button>
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

            <Grid container>
                <Typography>Delete my information and delete my account</Typography>
                <Grid item md={12} xs={12}>
                    <Button
                        style={{ backgroundColor: '#FFA500', marginTop: '20px' }}
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={() => { handleDeleteModal(true) }}
                    >
                        Delete
                    </Button>
                </Grid>
            </Grid>

        </div>
    );
}
