import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home, { loader as homeLoader } from "./Pages/Home"
import { Authenticate, action as authAction } from "./Pages/Authenticate"
import MainNavigation from "./Pages/MainNavigation"
import Error from "./Pages/Error"
import Blog from "./Pages/Blog"
import { getAuthToken } from "./lib/auth"
import AddBlog, { action as addBlogAction } from "./Pages/AddBlog"

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation />,
    errorElement: <Error />,
    loader: getAuthToken,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        path: 'auth',
        element: <Authenticate />,
        action: authAction
      },
      {
        path: 'create',
        element: <AddBlog />,
        action: addBlogAction
      },
      {
        path: 'blog/:id',
        element: <Blog />
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
