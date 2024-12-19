import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PurchasedListScreen from './src/views/PurchasedListScreen';
import ShoppingListScreen from './src/views/ShoppingListScreen';
import SettingsScreen from './src/views/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Compras Realizadas" component={PurchasedListScreen} />
        <Tab.Screen name="Lista de la Compra" component={ShoppingListScreen} />
        <Tab.Screen name="Ajustes" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
