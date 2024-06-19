import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import Protected from "./pages/Protected";

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
    // {
    //   path: "User",
    //   element: <Protected>
    //     <UserPage />
    //   </Protected>
    // }
    // {
    //   path: "*",
    //   element: <NotFoundPage />,
    // },
  ]);

  return (
    <AuthContext>
      <RouterProvider router={router}></RouterProvider>
    </AuthContext>
  );
}

export default App;
