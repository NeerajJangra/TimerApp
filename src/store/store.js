import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './timerSlice';

export const store = configureStore({
  reducer: {
    timers: timerReducer,
  },
});
