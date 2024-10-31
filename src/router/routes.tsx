import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Root from '../components/Root'

const routes = createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route index element={<Root />} /> /* Cambiar esta ruta xd*/
  </Route>
)

export const router = createBrowserRouter(routes, { basename: '/' })
