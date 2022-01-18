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
import ClassService from "../../../services/class.service";
import Alert from "../../../components/Alert";
import { useParams, useLocation } from 'react-router-dom';
import parse from 'html-react-parser';



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


export default function Class() {

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
    const [completed, setCompleted] = useState(false);
    const [classData, setClassData] = useState([]);
    const [classId, setClassId] = useState();
    const [clientId, setClientId] = useState();

    const loc = useLocation();

    const id = loc.pathname.split('/')[2];

    const handleSwitchChange = async (event) => {
        const data = {
            clientId: clientId,
            classId: classId,
            classUpdate: event.target.checked
        };
        try {

            const updateClass = await ClassService.updateClassCompletion(data);
            if (updateClass === '') {
                enqueueSnackbar(`Could not find your class details.`, {
                    variant: "warning",
                });
            } else {
                setCompleted(event.target.checked);
                enqueueSnackbar(`Successfully updated the class details.`, {
                    variant: "success",
                });

            }


        } catch (error) {
            setErrors(error.response.data.message);
            enqueueSnackbar(`${error.response.data.message}`, {
                variant: "error",
            });
        }
    };


    useEffect(() => {
        setClassId(id);
        setClientId(user.id);
        ClassService.getClass(id).then(
            (response) => {
                if (response) {
                    setCompleted(response[0].completion_dt === null ? false : true)
                    setClassData(response[0]);
                }
            },
            (error) => {
                if (error.response) {
                    setErrors(error.response.data.message);
                }
            },
        );
    }, [])

    const highlightsVal = classData.length === 0 ? '' : parse(classData.highlight);

    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item md={7} xs={12} className={classes.headerWrap}>
                    <Typography color="textPrimary" className={classes.pageTitle}>
                        {classData.title}
                        {" "}
                        {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
                    </Typography>
                </Grid>
            </Grid>


            <Grid container spacing={1}>
                <Grid item md={9} xs={9}>
                    <Grid container spacing={1}>
                        {
                            classData.type === 'v' ?
                                <Grid item md={8} xs={8} >
                                    <ReactPlayer
                                        url={classData.url}
                                        width={500}
                                    />
                                </Grid>
                                :
                                <Grid item md={8} xs={8} >
                                    <ReactPlayer
                                        url={classData.url}
                                        width={550}
                                    />
                                </Grid>
                        }

                        <Grid item md={4} xs={4} >
                            <Grid item md={12} xs={12} >
                                <FormControlLabel
                                    label="Completed: "
                                    labelPlacement="start"
                                    style={{ marginLeft: "0px" }}
                                    control={
                                        <Switch
                                            checked={completed}
                                            onChange={handleSwitchChange}
                                            name="completed"
                                            color="primary"

                                        />
                                    }
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <label>Completion Date: {classData.completion_dt === null ? 'N/A' : classData.completion_dt}</label>
                            </Grid>

                            <Grid item md={12} xs={12}>
                                <Button
                                    style={{ backgroundColor: '#2979ff', marginTop: '20px' }}
                                    variant="contained"
                                    color="secondary"
                                //onClick={handleUpdateAccount}
                                >
                                    Previous
                                </Button>
                                <Button
                                    style={{ backgroundColor: '#2979ff', marginTop: '20px', marginLeft: '15px' }}
                                    variant="contained"
                                    color="secondary"
                                //onClick={handleUpdateAccount}
                                >
                                    Next
                                </Button>
                            </Grid>

                        </Grid>

                    </Grid>

                    <Grid container spacing={1} style={{ marginTop: "30px" }}>
                        <Grid item md={12} xs={12}>
                            <Typography> Highlights</Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            {highlightsVal}
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
