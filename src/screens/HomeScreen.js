import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CategoryCard from '../components/CategoryCard';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { groupTimersByCategory } from '../utils/utils';

const dummyData = [];

const HomeScreen = () => {
  const timers = useSelector(state => state.timers.timerList);
  console.log('Data from Redux:', timers);
  const grouped = groupTimersByCategory(timers);
  const categories = Object.keys(grouped);
  console.log({ categories });
  const navigation = useNavigation();
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.header}>
  //       <Text style={styles.heading}>My Timers</Text>
  //       <TouchableOpacity
  //         style={styles.addButton}
  //         onPress={() => navigation.navigate('AddTimer')}
  //       >
  //         <Ionicons name="add" size={24} color="#fff" />
  //       </TouchableOpacity>
  //     </View>

  //     <FlatList
  //       data={dummyData}
  //       keyExtractor={item => item.name}
  //       renderItem={({ item }) => (
  //         <CategoryCard category={item} timers={item.timers} />
  //       )}
  //       contentContainerStyle={{ paddingHorizontal: 16 }}
  //       ListEmptyComponent={
  //         <View>
  //           <Text style={[styles.heading, { fontSize: 20 }]}>
  //             Your Timer List is empty
  //           </Text>
  //         </View>
  //       }
  //     />
  //   </View>
  // );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>My Timers</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTimer')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
        {categories.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 40 }}>
            No timers yet. Add one!
          </Text>
        ) : (
          categories.map(cat => {
            const timersInCat = grouped[cat];
            const running = timersInCat.filter(
              t => t.status === 'RUNNING',
            ).length;
            const completed = timersInCat.filter(
              t => t.status === 'COMPLETED',
            ).length;

            return (
              <CategoryCard
                key={cat}
                category={{ name: cat, running, completed }}
                timers={timersInCat}
              />
            );
          })
        )}
      </ScrollView>
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
