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

export default function Home() {
  const classes = useStyles();

  const [selectedProvider, setSelectedProvider] = useState({});


  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={7} xs={12} className={classes.headerWrap}>
          <Typography component="h1" variant="h2" color="textPrimary" className={classes.pageTitle}>
            Home
            {" "}
            {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
          </Typography>

          {/* <FormControl component="div" className={classes.formControl}>
            <p className={classes.formHelperText}>Show Declined</p>
            <Switch
              checked={isCancelEventsVisible}
              size="small"
              name="active"
              color="primary"
              inputProps={{ "aria-label": "primary checkbox" }}
              onChange={handleEventsType}
            />
          </FormControl> */}

        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item md={8} xs={12}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=KoIBI2rbdHA"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid item md={6} xs={12}>
            <img src={Clinios} alt="Clinos software ad" className={classes.Logo} />
          </Grid>
          <Grid item md={6} xs={12}>
            <img src={Help} alt="Help ad" className={classes.Logo} />
          </Grid>


        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <h3>Welcome to the Avon Institute functional medicine training program.  </h3>
          <h3>To start learning, click on the menu links on the left.</h3>
          <h3>To change your email or password, click Account on the upper right.</h3>
          <h3>To give us feedback on our program, click Contact on the upper right.</h3>
          <h3>To learn more about AvonEHR software, visit www.AvonEHR.com</h3>
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <img src={Help} alt="Help ad" className={classes.Logo} />
        </Grid> */}
      </Grid>

    </div>
  );
}
