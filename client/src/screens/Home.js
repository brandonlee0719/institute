/* eslint-disable no-unused-vars */
import React from "react";

import { Redirect } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return <Redirect to="/login_client" />;
};

export default Home;
