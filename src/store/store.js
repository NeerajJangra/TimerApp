import { configureStore } from '@reduxjs/toolkit';
import { saveHistoryToStorage, saveTimersToStorage } from '../utils/storage';
import timerReducer from './timerSlice';

export const store = configureStore({
  reducer: {
    timers: timerReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveTimersToStorage(state.timers.timerList);
  saveHistoryToStorage(state.timers.historyList);
});
