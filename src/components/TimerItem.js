import React, { useEffect, useRef, useState } from 'react';
import {
  AlertIOS,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import {
  addToHistory,
  completeTimer,
  pauseTimer,
  resetTimer,
  setHalfwayShown,
  startTimer,
  updateRemaining,
} from '../store/timerSlice';
import { sendLocalNotification } from '../utils/notifications';
import { formatTime, getStatusColor } from '../utils/utils';
import CompletionModal from './CompletionModal';

const TimerItem = ({ timer }) => {
  console.log('TimerItem:', timer);
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    if (timer.status === 'RUNNING') {
      dispatch(pauseTimer(timer.id));
    } else {
      dispatch(startTimer(timer.id));
    }
  };

  const handleReset = () => {
    dispatch(resetTimer(timer.id));
  };

  const progress = timer.remaining / timer.duration;
  const remainingRef = useRef(timer.remaining);

  const showHalfwayToast = name => {
    console.log('showHalfwayToast called with name:', name);
    const msg = `⏳ Halfway Reached: "${name}" is halfway done!`;
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  useEffect(() => {
    remainingRef.current = timer.remaining;
  }, [timer.remaining]);

  useEffect(() => {
    if (timer.status === 'RUNNING') {
      intervalRef.current = setInterval(() => {
        if (
          timer.halfway &&
          !timer.hasShownHalfway &&
          remainingRef.current === Math.floor(timer.duration / 2)
        ) {
          dispatch(setHalfwayShown(timer.id));
          showHalfwayToast(timer.name);
        }
        if (remainingRef.current > 1) {
          remainingRef.current = remainingRef.current - 1;
          dispatch(
            updateRemaining({ id: timer.id, remaining: remainingRef.current }),
          );
        } else {
          dispatch(completeTimer(timer.id));
          clearInterval(intervalRef.current);
          dispatch(addToHistory({ id: timer.id, name: timer.name }));
          setShowModal(true);
          sendLocalNotification(
            '✅ Timer Completed',
            `"${timer.name}" is done!`,
          );
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [timer.status, dispatch, timer.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.name}>{timer.name}</Text>
          <Text style={styles.time}>{formatTime(timer.remaining)}</Text>
          <Text
            style={[styles.status, { color: getStatusColor(timer.status) }]}
          >
            {timer.status}
          </Text>
          {timer.halfway && (
            <View style={styles.alertBadge}>
              <Ionicons name="notifications" size={12} color="#FF9500" />
              <Text style={styles.alertText}>Halfway Alert</Text>
            </View>
          )}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity
            onPress={handleToggle}
            style={[
              styles.button,
              {
                backgroundColor: getStatusColor(timer.status),
              },
            ]}
          >
            <Ionicons
              name={timer.status === 'RUNNING' ? 'pause' : 'play'}
              size={24}
              color={'#fff'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleReset}
            style={[
              styles.button,
              {
                backgroundColor: '#dc3545',
              },
            ]}
          >
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress * 100}%`,
              backgroundColor: getStatusColor(timer.status),
            },
          ]}
        />
      </View>
      <CompletionModal
        visible={showModal}
        timerName={timer.name}
        onClose={setShowModal}
      />
    </View>
  );
};

export default TimerItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 6,
    // borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  button: {
    alignItems: 'center',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 4,
  },
  info: { marginRight: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  time: { fontSize: 22, fontWeight: '600', marginVertical: 4 },
  status: { fontSize: 14, fontWeight: '600' },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  alertText: {
    fontSize: 12,
    color: '#FF9500',
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 8,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
});
