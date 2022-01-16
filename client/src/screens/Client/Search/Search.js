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
import SearchService from "../../../services/search.service";
import Alert from "../../../components/Alert";
import SearchTable from "./SearchTable";



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


export default function Search() {

    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { user, logout } = useAuth();

    const [selectedProvider, setSelectedProvider] = useState({});
    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);


    const handleTextChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const data = {
                term: search
            }
            const searchResp = await SearchService.searchModule(data);

            if (searchResp) {
                setSearchData(searchResp);
            }

        } catch (error) {
            console.log(error);
            enqueueSnackbar(`${error.response.data.message}`, {
                variant: "error",
            });
        }

    };

    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item md={7} xs={7} className={classes.headerWrap}>
                    <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
                        Search
                        {" "}
                        {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
                    </Typography>
                </Grid>
            </Grid>


            <Grid container spacing={1}>
                <Grid item md={9} xs={9}>
                    <Grid container spacing={2}>
                        <Grid item md={5} xs={5} >
                            <TextField
                                id="search"
                                label="search"
                                variant="outlined"
                                fullWidth
                                name="search"
                                value={search}
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
                                onClick={handleSearch}
                            >
                                Search
                            </Button>
                        </Grid>

                    </Grid>

                    {
                        searchData.length !== 0 ?
                            <Grid container spacing={1} style={{ paddingTop: '15px' }}>
                                <Grid item md={6} xs={6} >
                                    <SearchTable
                                        searchedData={searchData} />
                                </Grid>
                            </Grid>
                            :
                            <Grid container spacing={1} style={{ paddingTop: '15px' }}>
                                <Grid item md={12} xs={12} className={classes.headerWrap}>
                                    <h2>No Data to Show</h2>
                                </Grid>
                            </Grid>
                    }
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
