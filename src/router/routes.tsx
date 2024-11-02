import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import Root from '../components/Root'
import UserForm from '../pages/Login'

const routes = createRoutesFromElements(
  <Route path="/">
    <Route path="/login" element={<UserForm />} />
    <Route element={<Root />}>
      <Route path="/dashboard" />
    </Route>
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
