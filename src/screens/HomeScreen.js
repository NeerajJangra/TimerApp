import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const dummyCategories = [
  {
    name: 'Workout',
    total: 3,
    running: 1,
    completed: 1,
  },
  {
    name: 'Study',
    total: 2,
    running: 0,
    completed: 0,
  },
  {
    name: 'Work',
    total: 1,
    running: 0,
    completed: 0,
  },
];

const HomeScreen = ({ navigation }) => {
  const renderCategoryCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View>
        <Text style={styles.categoryTitle}>{item.name}</Text>
        <Text style={styles.categoryStats}>
          {item.total} timer{item.total > 1 ? 's' : ''} • {item.running} running
          • {item.completed} completed
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="play" size={24} color="black" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>My Timers</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dummyCategories}
        keyExtractor={item => item.name}
        renderItem={renderCategoryCard}
        contentContainerStyle={styles.list}
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
    alignItems: 'center',
    padding: 20,
  },
  heading: { fontSize: 24, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 50,
  },
  list: { paddingHorizontal: 16 },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },
  categoryTitle: { fontSize: 18, fontWeight: 'bold' },
  categoryStats: { fontSize: 14, color: '#555' },
});
