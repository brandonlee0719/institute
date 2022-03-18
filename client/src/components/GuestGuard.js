import React from "react";

import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const GuestGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    switch (user.role) {
    case "PATIENT":
      return <Redirect to="/patient" />;
    case "CORPORATE":
      return <Redirect to="/corporate" />;
    default:
      return <Redirect to="/client/home" />;
    }
  }

  return (
    <>
      {children}
    </>
  );
};

GuestGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestGuard;
