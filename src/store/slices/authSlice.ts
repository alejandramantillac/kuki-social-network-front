import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthUser } from '../../types/model'
import authService from '../../services/authService'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: authService.getUser(),
  isAuthenticated: !!authService.getUser(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.isAuthenticated = true
    },
    clearUser(state) {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, clearUser } = authSlice.actions
export default authSlice.reducer
