/* eslint-disable no-unused-vars */
import React from "react";

import { Drawer } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link, NavLink as RouterLink, useHistory } from "react-router-dom";

import Ad1 from "../../../../assets/img/ad1.png";
import Ad2 from "../../../../assets/img/ad2.png";
import useAuth from "../../../../hooks/useAuth";
import { client_pages } from "../../../../static/nav-pages";
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
    border: "none",
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
        variant="persistent"
      >
        <div className={classes.root}>
          <div container>

            <a
              target="_blank"
              className={classes.link}
              href="https://www.avonehr.com"
              rel="noreferrer"
            >
              <img src={Ad1} alt="Clinos software ad" className={classes.Logo} />
            </a>

          </div>
          <div container>
            <RouterLink to="/client/consult" className={classes.titleAsLogo}>
              <img src={Ad2} alt="Help ad" className={classes.Logo} />
            </RouterLink>

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
