import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialHistory, setInitialTimers } from '../store/timerSlice';
import {
  loadHistoryFromStorage,
  loadTimersFromStorage,
} from '../utils/storage';

const InitLoader = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadTimers = async () => {
      const timers = await loadTimersFromStorage();
      const history = await loadHistoryFromStorage();
      dispatch(setInitialTimers(timers));
      dispatch(setInitialHistory(history));
    };

    loadTimers();
  }, [dispatch]);

  return children;
};

export default InitLoader;
