import React, { useState, useEffect } from "react";
import 'react-native-get-random-values';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import Purchase from "../components/Purchase";
import TakePicture from "../components/TakePicture";
import ShowImage from "../components/ShowImage";
import FileSystemController from "../controllers/FileSystemController";
import { v4 as uuidv4 } from "uuid";

const PurchasedListScreen = () => {
  const [purchases, setPurchases] = useState([]);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [purchaseModalVisible, setPurchaseModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [pictureUri, setPictureUri] = useState("");
  const [takingPicture, setTakingPicture] = useState(false);
  const [purchasedDate, setPurchasedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [extractedText, setExtractedText] = useState("");

  useEffect(() => {
    const loadPurchases = async () => {
      const loadedPurchases = await FileSystemController.loadPurchasedList();
      setPurchases(loadedPurchases);
    };
    loadPurchases();
  }, []);

  const handlePress = (item) => {
    setSelectedPurchase(item);
    setPurchaseModalVisible(true);
  };

  const handleAddPurchase = () => {
    if (newName && newAmount) {
      const newPurchase = {
        id: uuidv4(),
        name: newName,
        amount: parseFloat(newAmount),
        date: new Date().toISOString().split("T")[0],
      };
      setPurchases([...purchases, newPurchase]);
      setNewName("");
      setNewAmount("");
      setAddModalVisible(false);
      FileSystemController.savePurchasedList([...purchases, newPurchase]);

      console.log(extractedText)

    }
  };

  const deletePurchase = async (id) => {
    const newPurchases = await FileSystemController.deletePurchase(id)
    console.log("first")
    console.log(newPurchases)
    setPurchases(newPurchases);
    setPurchaseModalVisible(false);
  }

  const totalSpent = purchases.reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      {!takingPicture ? (
        <View style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            <Text style={styles.total}>
              Gasto total este mes: {totalSpent.toFixed(2)}€
            </Text>

            {purchases.map((item) => (
              <Purchase key={item.id} item={item} onPress={handlePress} />
            ))}
          </View>

          <View style={styles.bottomButton}>
            <Button title="Añadir" onPress={() => setAddModalVisible(true)} />
          </View>
          <Modal
            visible={purchaseModalVisible}
            animationType="slide"
            onRequestClose={() => setPurchaseModalVisible(false)}
          >
            <View style={styles.modalContent}>
              {selectedPurchase && (
                <>
                  <Text style={styles.modalTitle}>{selectedPurchase.name}</Text>
                  <Text>Precio: ${selectedPurchase.amount.toFixed(2)}</Text>
                  <Text>Fecha: {selectedPurchase.date}</Text>
                </>
              )}
              <Button
                title="Eliminar"
                onPress={() => deletePurchase(selectedPurchase.id)}
              />
               <Button
                title="Cerrar"
                onPress={() => setPurchaseModalVisible(false)}
              />
            </View>
          </Modal>
          <Modal
            visible={addModalVisible}
            animationType="slide"
            onRequestClose={() => setPurchaseModalVisible(false)}
          >
            <View style={styles.addSection}>
              <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={newName}
                onChangeText={setNewName}
              />
              <TextInput
                placeholder="Total gastado"
                style={styles.input}
                value={newAmount}
                onChangeText={setNewAmount}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Date"
                style={styles.input}
                value={purchasedDate}
                onChangeText={setPurchasedDate}
                keyboardType="date"
              />
              <Button
                title="Tomar foto"
                onPress={() => setTakingPicture(true)}
              />
              {pictureUri && <ShowImage pictureUri={pictureUri} />}

              <Button title="Añadir" onPress={handleAddPurchase} />

              <Button
                title="Cerrar"
                onPress={() => setAddModalVisible(false)}
              />
            </View>
          </Modal>
        </View>
      ) : (
        <TakePicture
          setPictureUri={setPictureUri}
          setTakingPicture={setTakingPicture}
          setExtractedText={setExtractedText}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  total: { fontSize: 20, fontWeight: "bold", marginBottom: 16, color: "#333" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#e3e3e3",
    marginBottom: 8,
    borderRadius: 5,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#f8f9fa",
  },
  itemText: { fontSize: 16, color: "#333" },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  bottomButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  modalTitle: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  addSection: { marginTop: 16 },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 8,
    borderRadius: 5,
  },
});

export default PurchasedListScreen;
