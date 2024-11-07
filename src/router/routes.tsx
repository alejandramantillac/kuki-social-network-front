import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotificationsPage from '../pages/NotificationsPage'
import Feed from '../pages/Feed'
import Root from '../components/Root'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<Root />}>
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/" element={<Feed />} />
    </Route>
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
