import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ToastContainer from "./components/ToastContainer";
import AuthContext from "./context/AuthContext";
import AmsRoutes from "./components/Routes";
import Loading from "./components/Loading";
import { auth } from "./firebase/firebaseConfig";
import { fetchCurrentUser, selectLoading } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchCurrentUser(user));
      } else {
        dispatch(fetchCurrentUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <AuthContext>
      <Router>
        <AmsRoutes />
      </Router>
      <ToastContainer />
    </AuthContext>
  );
}

export default App;
