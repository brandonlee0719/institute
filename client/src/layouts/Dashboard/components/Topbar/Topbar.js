/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/MenuOutlined";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link, NavLink as RouterLink, useHistory } from "react-router-dom";

import Logo from "../../../../assets/img/Logo.svg";
import useAuth from "../../../../hooks/useAuth";
import useDebounce from "../../../../hooks/useDebounce";
import { client_pages } from "../../../../static/nav-pages";
import * as API from "../../../../utils/API";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#ffffff",
  },
  Logo: {
    maxWidth: "180px",
    width: 170,
    height: 65,
    objectFit: "contain",
  },
  flexGrow: {
    flexGrow: 1,
  },
  toolbar: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  headerWithNav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    display: "none",
    color: "#AEAEAE",
    letterSpacing: "0.1em",
    fontWeight: 700,
    fontSize: "18px",
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& a": {
      color: "#AEAEAE",
      textDecoration: "none",
    },
  },
  navs: {
    display: "block",
  },
  link: {
    color: "#AEAEAE",
    padding: "10px 10px",
    textDecoration: "none",
    fontWeight: "600",
  },
  patientLink: {
    color: "#AEAEAE",
    padding: "10px 10px",
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  grow: {
    flexGrow: 0,
  },
  headerWithSearchBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  name: {
    marginRight: theme.spacing(2),
    fontSize: 14,
    color: theme.palette.primary.contrastText,
  },
  date: {
    fontSize: 14,
    color: theme.palette.primary.contrastText,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));


const Topbar = (props) => {
  const {
    className, onSidebarOpen, ...rest
  } = props;

  const classes = useStyles();
  const history = useHistory();
  const {
    user, logout,
  } = useAuth();


  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [nothingFound, setNothingFound] = useState(false);


  const navPages = client_pages;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (debouncedSearchTerm) {
        // Fire off our API call
        API.search(debouncedSearchTerm).then(
          (response) => {
            const { data } = response;
            setResults(data);
            if (data.length < 1) {
              setNothingFound(true);
            }
          },
          (error) => {
            console.error("search error", error);
          },
        );
      } else {
        setResults([]);
        setNothingFound(false);
      }
    },
    [debouncedSearchTerm],
  );
  const handleLogout = async () => {
    try {
      await logout();
      history.push(user.login_url || "/login_client");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar variant="dense" className={classes.toolbar}>
        <div className={classes.headerWithNav}>
          <Typography className={classes.title} variant="h6" noWrap>
            <RouterLink to="/client/home" className={classes.titleAsLogo}>
              <img src={Logo} alt="Logo" className={classes.Logo} />
            </RouterLink>
          </Typography>
          <Hidden mdDown>
            <div className={classes.navs}>
              {
                navPages.map((page) => (
                  (

                    <Button key={page.id}>
                      {
                        page.title === "AvonEHR" ? (
                          <a
                            target="_blank"
                            className={classes.link}
                            href="https://www.avonehr.com"
                            rel="noreferrer"
                          >
                            {page.title}
                          </a>
                        )
                          : (
                            <RouterLink
                              to={page.href}
                              className={classes.link}
                              onClick={page.logout && handleLogout}
                            >
                              {page.title}
                            </RouterLink>
                          )
                      }

                    </Button>
                  )
                ))
              }
            </div>
          </Hidden>
        </div>
        <Hidden mdDown>
          <div className={classes.grow} />
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.defaultProps = {
  className: null,
  onSidebarOpen: () => { },
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
