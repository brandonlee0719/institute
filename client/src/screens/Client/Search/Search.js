/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { makeStyles, TextField, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import useAuth from "../../../hooks/useAuth";
import SearchService from "../../../services/search.service";
import { isEmpty, dateTimeFormat } from "../../../utils/helpers";
import SearchTable from "./SearchTable";


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


export default function Search() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user, logout } = useAuth();

  const [selectedProvider, setSelectedProvider] = useState({});
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState([]);

  const [noDataFound, setNoDataFound] = useState("");


  const handleTextChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const data = {
        term: search,
      };

      if (search !== "") {
        const searchResp = await SearchService.searchModule(data);

        if (searchResp !== "") {
          setNoDataFound("");
          setSearchData(searchResp);
        } else {
          setNoDataFound("No data found");
        }
      } else {
        setSearchData([]);
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
      <form>
        <Grid container>
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
              <Grid item md={5} xs={5}>
                <TextField
                  id="search"
                  label="Search"
                  variant="outlined"
                  fullWidth
                  name="search"
                  value={search}
                  onChange={handleTextChange}
                  autoFocus
                />
              </Grid>


            </Grid>

            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <Button
                  style={{ backgroundColor: "#2979ff", marginTop: "20px" }}
                  variant="contained"
                  color="secondary"
                  onClick={handleSearch}
                  type="submit"
                >
                  Search
                </Button>
              </Grid>

            </Grid>

            {
              searchData.length !== 0
                ? (
                  <Grid container spacing={1} style={{ height: "60vh", paddingTop: "15px", overflow: "auto" }}>
                    <Grid item md={12} xs={12} style={{ overflow: "auto" }}>
                      <SearchTable
                        searchedData={searchData}
                      />
                    </Grid>
                  </Grid>
                )
                : (
                  <Grid container spacing={1} style={{ paddingTop: "15px" }}>
                    <Grid item md={12} xs={12} className={classes.headerWrap}>

                      <p style={{ color: "gray" }}>{noDataFound}</p>

                    </Grid>
                  </Grid>
                )
            }
          </Grid>

        </Grid>

      </form>
    </div>
  );
}
