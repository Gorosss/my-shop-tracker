// components/Purchase.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const Purchase = ({ item, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress(item)}>
    <Text style={styles.itemText}>{item.name}</Text>
    <Text style={styles.itemText}>${item.amount.toFixed(2)}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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

export default Purchase;
