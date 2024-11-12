import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotificationsPage from '../pages/NotificationsPage'
import Feed from '../pages/Feed'
import ContentWithSidebar from '../components/Layout/ContentWithSidebar'
import Root from '../components/Root'
import NotFoundPage from '../pages/NotFoundPage'
import SettingsPage from '../pages/SettingsPage'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<Root />}>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/" element={<ContentWithSidebar />}>
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/" element={<Feed />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />{' '}
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
