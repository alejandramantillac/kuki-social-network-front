import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import RequireAuth from '../components/RequireAuth'
import Root from '../components/Root'
import Login from '../pages/Login'

const routes = createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="login" element={<Login />} />
    <Route element={<RequireAuth />}>
      <Route path="/dashboard" element={<Root />} />
    </Route>
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
