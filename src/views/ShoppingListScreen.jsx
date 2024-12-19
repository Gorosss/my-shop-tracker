import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import CheckBox from 'react-native-checkbox';

const ShoppingListScreen = () => {
  const [shoppingList, setShoppingList] = useState([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (input.trim()) {
      setShoppingList([...shoppingList, { id: Date.now().toString(), name: input, checked: false }]);
      setInput('');
    }
  };

  const toggleItem = (id) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const removeItem = (id) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Añadir artículo"
        />
        <Button title="Añadir" onPress={addItem} />
      </View>
      <FlatList
        data={shoppingList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <CheckBox
              label={item.name}
              checked={item.checked}
              onChange={() => toggleItem(item.id)}
            />
            <Button title="Eliminar" onPress={() => removeItem(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  inputContainer: { flexDirection: 'row', marginBottom: 16 },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 8 },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
});

export default ShoppingListScreen;
