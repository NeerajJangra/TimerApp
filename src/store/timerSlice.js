import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timerList: [
    {
      name: 'Workout',
      running: 1,
      completed: 1,
      timers: [
        {
          id: '1',
          name: 'HIIT Training',
          time: '2:45',
          status: 'RUNNING',
          progress: 0.67,
          halfway: true,
        },
        {
          id: '2',
          name: 'Rest Period',
          time: '1:30',
          status: 'PAUSED',
          progress: 0.25,
          halfway: false,
        },
        {
          id: '3',
          name: 'Warm Up',
          time: '0:00',
          status: 'COMPLETED',
          progress: 1,
          halfway: false,
        },
      ],
    },
  ],
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
