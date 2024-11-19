import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home, { loader as homeLoader } from "./Pages/Home"
import { Authenticate, action as authAction } from "./Pages/Authenticate"
import MainNavigation from "./Pages/MainNavigation"
import Error from "./Pages/Error"
import Blog, { loader as blogLoader } from "./Pages/Blog"
import { getAuthToken } from "./lib/auth"
import AddBlog, { action as addBlogAction } from "./Pages/AddBlog"
import { action as logoutAction } from "./lib/logout"
import EditPage from "./Pages/EditPage"

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
        element: <AddBlog title={""} body={""} method={""} />,
        action: addBlogAction
      },
      {
        path: 'blog',
        id: 'blog-detail',
        loader: blogLoader,
        children: [
          {
            path: ':id',
            element: <Blog />,
          },
          {
            path: 'edit/:id',
            element: <EditPage />
          }
        ]
      },
      {
        path: 'logout',
        action: logoutAction
      }
    ]
  }
])

export default function App() {
  return <RouterProvider router={router} />
}
