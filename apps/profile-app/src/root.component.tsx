import { SettingsPage, AuthPage, ViewPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routerConfig = {
  basename: "/profile",
};

const router = createBrowserRouter(
  [
    {
      path: "/settings",
      element: <SettingsPage />,
    },
    {
      path: "/login",
      element: <AuthPage />,
    },
    {
      path: "/view",
      element: <ViewPage />,
    },
  ],
  routerConfig
);

export default function Root() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
