import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialTimers } from '../store/timerSlice';
import { loadTimersFromStorage } from '../utils/storage';

const InitLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTimers = async () => {
      const timers = await loadTimersFromStorage();
      dispatch(setInitialTimers(timers));
    };

    loadTimers();
  }, [dispatch]);

  return children;
};

export default InitLoader;
