import { configureStore } from '@reduxjs/toolkit';
import { saveTimersToStorage } from '../utils/storage';
import timerReducer from './timerSlice';

export const store = configureStore({
  reducer: {
    timers: timerReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveTimersToStorage(state.timers.timerList);
});
