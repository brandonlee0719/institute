import React from "react";

import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

import useAuth from "../../../../hooks/useAuth";
import { client_pages } from "../../../../static/nav-pages";

import Clinios from "../../../../assets/img/Clinios.png";
import Help from "../../../../assets/img/help.png";
import Grid from "@material-ui/core/Grid";
import AccordionSideBar from "./components/Accordion/Accordion";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 300,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
    },
  },
  sideDrawer: {
    width: 350,
    [theme.breakpoints.up("lg")]: {
      marginTop: 150,
      height: "calc(100% - 64px)",
    },
    border: "none"
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    // padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const {
    open,
    variant,
    onClose,
    className,

  } = props;
  const classes = useStyles();

  const navPages = client_pages;

  return (
    <>
      <Drawer
        anchor="left"
        classes={{ paper: classes.drawer }}
        onClose={onClose}
        open
        variant={variant}
      >
        <div className={classes.root}>
          <AccordionSideBar />
        </div>
      </Drawer>

      <Drawer
        anchor="right"
        classes={{ paper: classes.sideDrawer }}
        onClose={onClose}
        open
        variant='persistent'
      >
        <div className={classes.root}>
          <div>
            <img src={Clinios} alt="Clinos software ad" className={classes.Logo} />
          </div>
          <div>
            <img src={Help} alt="Help ad" className={classes.Logo} />
          </div>
        </div>
      </Drawer>

    </>
  );
};

Sidebar.defaultProps = {
  className: null,
  onClose: () => { },
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
