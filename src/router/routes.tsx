import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Root from '../components/Root'
import Login from '../pages/Login'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/login" element={<Login />} />
    <Route element={<Root />}>
      <Route path="/" />
    </Route>
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
