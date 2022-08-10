import { configureStore } from '@reduxjs/toolkit'
import googleAuthReducer from '../features/auth/authSlice';

export default configureStore({
  reducer: {
    googleAuth: googleAuthReducer
  },
})