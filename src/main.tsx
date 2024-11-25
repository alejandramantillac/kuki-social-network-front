import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { store, persistor } from './store/store'
import './index.css'
import { router } from './router/routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
