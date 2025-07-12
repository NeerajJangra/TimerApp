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
        timer.hasShownHalfway = false;
      }
    },
    updateRemaining: (state, action) => {
      const timer = state.timerList.find(t => t.id === action.payload.id);
      if (timer) {
        timer.remaining = action.payload.remaining;
      }
    },
    completeTimer: (state, action) => {
      const timer = state.timerList.find(t => t.id === action.payload);
      if (timer) {
        timer.status = 'COMPLETED';
        timer.remaining = 0;
      }
    },
    setInitialTimers: (state, action) => {
      state.timerList = action.payload;
    },
    startAllInCategory: (state, action) => {
      const category = action.payload;
      console.log('Starting all timers in category:', category);
      state.timerList.forEach(timer => {
        if (timer.category === category && timer.status !== 'COMPLETED') {
          timer.status = 'RUNNING';
        }
      });
    },
    pauseAllInCategory: (state, action) => {
      const category = action.payload;
      state.timerList.forEach(timer => {
        if (timer.category === category && timer.status === 'RUNNING') {
          timer.status = 'PAUSED';
        }
      });
    },
    resetAllInCategory: (state, action) => {
      const category = action.payload;
      state.timerList.forEach(timer => {
        if (timer.category === category) {
          timer.remaining = timer.duration;
          timer.status = 'PAUSED';
          timer.hasShownHalfway = false;
        }
      });
    },
    setHalfwayShown: (state, action) => {
      const timer = state.timerList.find(t => t.id === action.payload);
      if (timer) {
        timer.hasShownHalfway = true;
      }
    },
  },
});

export const {
  addTimer,
  startTimer,
  pauseTimer,
  resetTimer,
  updateRemaining,
  completeTimer,
  setInitialTimers,
  startAllInCategory,
  pauseAllInCategory,
  resetAllInCategory,
  setHalfwayShown,
} = timerSlice.actions;

export default timerSlice.reducer;
