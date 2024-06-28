import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/AuthContext";
import PropTypes from "prop-types";

const Protected = ({ children }) => {
  const { user } = useContext(Context);

  if (!user) {
    return <Navigate to="/login" replace />;
  } else {
    return children;
  }
};

Protected.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protected;
