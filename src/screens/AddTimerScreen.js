import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

const AddTimerScreen = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [halfwayAlert, setHalfwayAlert] = useState(false);
  const navigation = useNavigation();

  const handleSave = () => {
    if (!name || !duration || !category) {
      Alert.alert('Missing Fields', 'Please fill all fields.');
      return;
    }

    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration),
      remaining: parseInt(duration),
      category,
      status: 'PAUSED',
      halfway: halfwayAlert,
      createdAt: new Date().toISOString(),
    };

    // Later: Save to state via Redux Toolkit
    console.log('Saving Timer:', newTimer);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Timer Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter timer name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Duration (seconds)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter duration"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Workout"
        value={category}
        onChangeText={setCategory}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Enable Halfway Alert</Text>
        <Switch value={halfwayAlert} onValueChange={setHalfwayAlert} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Timer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginTop: 6,
    borderRadius: 8,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
