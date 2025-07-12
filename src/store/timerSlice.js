import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timerList: [],
};

const timerSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    addTimer: (state, action) => {
      state.timerList.push(action.payload);
    },
    startTimer: (state, action) => {
      const timer = state.timerList.find(t => t.id === action.payload);
      if (timer && timer.status !== 'COMPLETED') {
        timer.status = 'RUNNING';
      }
    },
    pauseTimer: (state, action) => {
      const timer = state.timerList.find(t => t.id === action.payload);
      if (timer && timer.status === 'RUNNING') {
        timer.status = 'PAUSED';
      }
    },
    resetTimer: (state, action) => {
      const timer = state.timerList.find(t => t.id === action.payload);
      if (timer) {
        timer.remaining = timer.duration;
        timer.status = 'PAUSED';
      }
    },
    completeTimer: (state, action) => {
      const timer = state.timerList.find(t => t.id === action.payload);
      if (timer) {
        timer.status = 'COMPLETED';
        timer.remaining = 0;
      }
    },
  },
});

export const { addTimer, startTimer, pauseTimer, resetTimer, completeTimer } =
  timerSlice.actions;

export default timerSlice.reducer;
