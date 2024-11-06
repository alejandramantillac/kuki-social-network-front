import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Root from '../components/Root'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotificationsPage from '../pages/NotificationsPage'
import MainLayout from '../components/MainLayout'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<MainLayout />}>
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/" element={<Root />} />
    </Route>
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
