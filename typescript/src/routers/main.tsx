import Detail from "@pages/Detail";
import Landing from "@pages/Landing";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default router;
