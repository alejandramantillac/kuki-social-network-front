import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotificationsPage from '../pages/NotificationsPage'
import Feed from '../pages/Feed'
import ContentWithSidebar from '../components/Layout/ContentWithSidebar'
import Root from '../components/Root'
import NotFoundPage from '../pages/NotFoundPage'
import SettingsPage from '../pages/SettingsPage'
import CreateRecipePage from '../pages/CreateRecipePage'
import ProfilePage from '../pages/ProfilePage'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<Root />}>
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/create-recipe" element={<CreateRecipePage />} />
      <Route path="/" element={<ContentWithSidebar />}>
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/" element={<Feed />} />
      </Route>
      <Route path="/profile" element={<Navigate to="/profile/me" replace />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />{' '}
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
