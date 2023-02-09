import { HomePage, EditPage, ViewPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const routerConfig = {
  basename: "/article",
};

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/create",
      element: <EditPage />,
    },
    {
      path: "/edit",
      element: <EditPage />,
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
