import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotificationsPage from '../pages/NotificationsPage'
import Feed from '../pages/Feed'
import ContentWithSidenar from '../components/Layout/ContentWithSidebar'
import Root from '../components/Root'
import NotFoundPage from '../pages/NotFoundPage'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<Root />}>
      <Route path="/" element={<ContentWithSidenar />}>
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/" element={<Feed />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFoundPage />} />{' '}
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
