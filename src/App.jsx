import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "./context/AuthContext";
import Protected from "./pages/Protected";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";
import LeavesPage from "./pages/LeavesPage";
import HolidaysPage from "./pages/HolidaysPage";
import ShiftsPage from "./pages/ShiftsPage";
import NotFoundPage from "./pages/NotFoundPage";
import Loading from "./components/Loading";
import { auth } from "./firebase/firebaseConfig";
import {
  fetchCurrentUser,
  selectCurrentUser,
  selectLoading,
} from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
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
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              currentUser ? (
                currentUser.type === "admin" ? (
                  <Protected>
                    <AdminPage />
                  </Protected>
                ) : (
                  <Protected>
                    <UserPage userId={currentUser.userId} />
                  </Protected>
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              currentUser ? (
                <Protected>
                  <UserPage userId={currentUser.uid} />
                </Protected>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/leave-policies"
            element={
              <Protected>
                <LeavesPage />
              </Protected>
            }
          />
          <Route
            path="/holidays"
            element={
              <Protected>
                <HolidaysPage />
              </Protected>
            }
          />
          <Route
            path="/shift-policies"
            element={
              <Protected>
                <ShiftsPage />
              </Protected>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AuthContext>
  );
}

export default App;
