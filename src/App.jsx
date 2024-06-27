import { createBrowserRouter, RouterProvider } from "react-router-dom";
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: (
        <Protected>
          <AdminPage />
        </Protected>
      ),
    },
    {
      path: "/user",
      element: (
        <Protected>
          <UserPage />
        </Protected>
      ),
    },
    {
      path: "/leave-policies",
      element: (
        <Protected>
          <LeavesPage />
        </Protected>
      ),
    },
    {
      path: "/holidays",
      element: (
        <Protected>
          <HolidaysPage />
        </Protected>
      ),
    },
    {
      path: "/shift-policies",
      element: (
        <Protected>
          <ShiftsPage />
        </Protected>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
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
