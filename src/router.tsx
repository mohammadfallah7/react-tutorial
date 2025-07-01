import { createBrowserRouter } from "react-router";
import App from "./App";
import UserDetailPage from "./pages/UserDetailPage";

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "/users/:id", Component: UserDetailPage },
]);

export default router;
