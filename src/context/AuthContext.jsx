import { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";

export const Context = createContext();

const AuthContext = ({ children }) => {
  const auth = getAuth();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser) setUser(currentUser);
      else setUser(null);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [auth]);
  const values = {
    user: user,
    setUser: setUser,
  };
  return (
    <Context.Provider value={values}>{!loading && children}</Context.Provider>
  );
};

AuthContext.propTypes = { children: PropTypes.node.isRequired };

export default AuthContext;
