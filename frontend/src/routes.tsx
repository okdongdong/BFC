import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./layouts/Main";
import Signup from "./pages/Accounts/Signup";
import Login from "./pages/Accounts/Login";
import FindPassword from "./pages/Accounts/FindPassword";
function Router() {
  return useRoutes([
    {
      path: "/login",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/login" replace /> },
        { path: "", element: <Login /> },
      ],
    },
    {
      path: "/signup",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/signup" replace /> },
        { path: "", element: <Signup /> },
      ],
    },
    {
      path: "/findPw",
      element: <MainLayout />,
      children: [
        { element: <Navigate to="/findPw" replace /> },
        { path: "", element: <FindPassword /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

export default Router;
