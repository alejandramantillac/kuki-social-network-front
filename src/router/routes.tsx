import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Root from '../components/Root'
import Login from '../pages/Login'
import Register from '../pages/Register'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<Root />}>
      <Route path="/" />
    </Route>
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
