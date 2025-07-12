import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getStatusColor } from '../utils/utils';

const TimerItem = ({ timer }) => {
  return (
    <View style={styles.container}>
      {/* Title & Time */}
      <View style={styles.info}>
        <Text style={styles.name}>{timer.name}</Text>
        <Text style={styles.time}>{timer.time}</Text>
        <Text style={[styles.status, { color: getStatusColor(timer.status) }]}>
          {timer.status}
        </Text>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons
            name={timer.status === 'RUNNING' ? 'pause' : 'play'}
            size={24}
            color={getStatusColor(timer.status)}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="refresh" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimerItem;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: { flex: 1, marginRight: 10 },
  name: { fontSize: 16, fontWeight: 'bold' },
  time: { fontSize: 22, fontWeight: '600', marginVertical: 4 },
  status: { fontSize: 14, fontWeight: '600' },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  alertText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#f0ad4e',
  },
  controls: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
