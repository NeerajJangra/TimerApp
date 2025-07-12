import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryCard from '../components/CategoryCard';

import { useNavigation } from '@react-navigation/native';

const dummyData = [
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
];

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Timers</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTimer')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyData}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <CategoryCard category={item} timers={item.timers} />
        )}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  heading: { fontSize: 24, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 50,
  },
});
