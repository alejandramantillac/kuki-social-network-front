import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import authReducer from './slices/authSlice'
import postReducer from './slices/postSlice'
import countryReducer from './slices/countrySlice'

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  country: countryReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
