import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const formatDate = isoString => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

const HistoryScreen = () => {
  const historyList = useSelector(state => state.timers.historyList);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Completed Timers</Text>

      {historyList.length === 0 ? (
        <Text style={styles.empty}>No timers completed yet.</Text>
      ) : (
        <FlatList
          data={historyList}
          keyExtractor={item => item.id + item.completedAt}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.time}>{formatDate(item.completedAt)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
