import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SettingsScreen = () => {
  const settingsOptions = ["Opción 1", "Opción 2", "Opción 3"]; // Lista de opciones

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {settingsOptions.map((option, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{option}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f8f9fa' },
  scrollContainer: { flex: 1 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#e3e3e3',
    marginBottom: 8,
    borderRadius: 5,
  },
  itemText: { fontSize: 16, color: '#333' },
});

export default SettingsScreen;
