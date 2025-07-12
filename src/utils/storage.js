import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'TIMER_LIST';
const HISTORY_KEY = 'TIMER_HISTORY';

export const saveTimersToStorage = async timers => {
  try {
    const json = JSON.stringify(timers);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (err) {
    console.error('Failed to save timers', err);
  }
};

export const loadTimersFromStorage = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (err) {
    console.error('Failed to load timers', err);
    return [];
  }
};

export const clearTimersStorage = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear timers storage', err);
  }
};

export const saveHistoryToStorage = async history => {
  try {
    const json = JSON.stringify(history);
    await AsyncStorage.setItem(HISTORY_KEY, json);
  } catch (err) {
    console.error('Failed to save history', err);
  }
};

export const loadHistoryFromStorage = async () => {
  try {
    const json = await AsyncStorage.getItem(HISTORY_KEY);
    return json != null ? JSON.parse(json) : [];
  } catch (err) {
    console.error('Failed to load history', err);
    return [];
  }
};
