import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import {
  pauseAllInCategory,
  resetAllInCategory,
  startAllInCategory,
} from '../store/timerSlice';
import TimerItem from './TimerItem';

const CategoryCard = ({ category, timers }) => {
  const [expanded, setExpanded] = useState(false);
  console.log('timers in category', { timers });
  const dispatch = useDispatch();

  const handleStartAll = () => dispatch(startAllInCategory(category.name));
  const handlePauseAll = () => dispatch(pauseAllInCategory(category.name));
  const handleResetAll = () => dispatch(resetAllInCategory(category.name));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log('pressed');
          setExpanded(!expanded);
        }}
        style={styles.header}
      >
        <View>
          <Text style={styles.title}>{category.name}</Text>
        </View>
        <Ionicons
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#333"
        />
      </TouchableOpacity>

      {/* Expanded Area */}
      {expanded && (
        <>
          <View style={styles.bulkActions}>
            <TouchableOpacity
              style={[styles.bulkButton, { backgroundColor: '#28a745' }]}
              onPress={handleStartAll}
            >
              <Text style={styles.bulkText}>Start All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bulkButton, { backgroundColor: '#ffc107' }]}
              onPress={handlePauseAll}
            >
              <Text style={styles.bulkText}>Pause All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.bulkButton, { backgroundColor: '#dc3545' }]}
              onPress={handleResetAll}
            >
              <Text style={styles.bulkText}>Reset All</Text>
            </TouchableOpacity>
          </View>
          {timers.map(timer => (
            <TimerItem timer={timer} key={timer.id} />
          ))}
        </>
      )}
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    padding: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { color: '#555', marginTop: 4 },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 12,
  },
  bulkButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  bulkText: { color: '#fff', fontWeight: 'bold' },
});
