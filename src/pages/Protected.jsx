import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/AuthContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const Protected = ({ children }) => {
  const { user } = useContext(Context);

  if (!user) {
    // If user is not authenticated, redirect to login and show toast message
    // toast.error("You need to log in to access this page.");
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
