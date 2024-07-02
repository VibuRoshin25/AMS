import { useEffect, useState } from "react";
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
import LoadingPage from "./pages/LoadingPage";
import { auth, db } from "./firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const q = query(
            collection(db, "employees"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setCurrentUser({
                uid: user.uid,
                email: user.email,
                type: doc.data().type,
                userId: doc.id,
              });
            });
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

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
