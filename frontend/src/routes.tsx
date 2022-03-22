import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "./layouts/Main";
import Login from "./pages/Accounts/Login";
import Signup from "./pages/Accounts/Signup";
import FindPassword from "./pages/Accounts/FindPassword";
import Profile from "./pages/Profile";
import Main from "./pages/Main/Main";

function Router() {
  return useRoutes([
    {
      path: "",
      element: <MainLayout />,
      children: [
        { path: "", element: <Main /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "fullcourse/:fullCourseId",
          element: <Signup />,
        },
        {
          path: "attraction",
          children: [
            { path: "", element: <Login /> },
            {
              path: ":placeId",
              element: <Signup />,
            },
          ],
        },
        {
          path: "restaurant",
          children: [
            { path: "", element: <Login /> },
            {
              path: ":placeId",
              element: <Signup />,
            },
          ],
        },
        {
          path: "info",
          element: <Signup />,
        },
        {
          path: "findPw",
          element: <FindPassword />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

export default Router;
