import * as FileSystem from 'expo-file-system';

const DATA_DIR = `${FileSystem.documentDirectory}data/`;
const PURCHASED_FILE = `${DATA_DIR}purchasedList.json`;
const SHOPPING_FILE = `${DATA_DIR}shoppingList.json`;
const SETTINGS_FILE = `${DATA_DIR}settings.json`;

class FileSystemModel {

  static async savePurchasedList(purchasedList) {
    await saveDataToFile(PURCHASED_FILE, purchasedList);
  }

  static async loadPurchasedList() {
    return await loadDataFromFile(PURCHASED_FILE);
  }

  static async saveShoppingList(shoppingList) {
    await saveDataToFile(SHOPPING_FILE, shoppingList);
  }

  static async loadShoppingList() {
    return await loadDataFromFile(SHOPPING_FILE);
  }

  static async saveSettings(settings) {
    await saveDataToFile(SETTINGS_FILE, settings);
  }

  static async loadSettings() {
    return await loadDataFromFile(SETTINGS_FILE);
  }

  static async deletePurchase(id) {
    const purchases = await loadDataFromFile(PURCHASED_FILE);
    const newPurchases = purchases.filter((purchase) => purchase.id !== id);
    await saveDataToFile(PURCHASED_FILE, newPurchases);
    return newPurchases;
  }

  static async deleteShoppingList(id) {
    const shoppingList = await loadDataFromFile(SHOPPING_FILE);
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    await saveDataToFile(SHOPPING_FILE, newShoppingList);
  }
}

const ensureDirectoryExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(DATA_DIR);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(DATA_DIR, { intermediates: true });
  }
};

// Guardar datos en un archivo JSON
const saveDataToFile = async (filePath, data) => {
  try {
    await ensureDirectoryExists();
    const json = JSON.stringify(data, null, 2); // Formateado para facilitar la lectura
    await FileSystem.writeAsStringAsync(filePath, json);
    console.log(`Datos guardados en ${filePath}`);
  } catch (error) {
    console.error(`Error al guardar datos en ${filePath}:`, error);
  }
};

// Leer datos desde un archivo JSON
const loadDataFromFile = async (filePath) => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    if (fileInfo.exists) {
      const json = await FileSystem.readAsStringAsync(filePath);
      const data = JSON.parse(json);
      return Array.isArray(data) ? data : [data];

    } else {
      console.log(`Archivo ${filePath} no encontrado, retornando datos vacíos.`);
      return [];
    }
  } catch (error) {
    console.error(`Error al leer datos desde ${filePath}:`, error);
    return [];
  }
};

export default FileSystemModel;

