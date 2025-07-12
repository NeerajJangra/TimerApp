import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimerItem from './TimerItem';

const CategoryCard = ({ category, timers }) => {
  const [expanded, setExpanded] = useState(false);

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
          {/* Timer List */}
          <FlatList
            data={timers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TimerItem timer={item} />}
          />
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
