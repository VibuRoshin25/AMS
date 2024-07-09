import Protected from "../pages/Protected";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import RecordsPage from "../pages/RecordsPage";
import UserPage from "../pages/UserPage";
import LeavePoliciesPage from "../pages/LeavePoliciesPage";
import HolidaysPage from "../pages/HolidaysPage";
import ShiftPoliciesPage from "../pages/ShiftPoliciesPage";
import NotFoundPage from "../pages/NotFoundPage";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { selectCurrentUser } from "../store/authSlice";

const AmsRoutes = () => {
  const currentUser = useSelector(selectCurrentUser);

  return (
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
            <LeavePoliciesPage />
          </Protected>
        }
      />
      <Route
        path="/reports"
        element={
          <Protected>
            <RecordsPage />
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
            <ShiftPoliciesPage />
          </Protected>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AmsRoutes;
