import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as FileSystem from "expo-file-system";

const TakePicture = ({ setPictureUri, setTakingPicture, setExtractedText }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePhoto() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const folderName = "images"; // Carpeta personalizada
      const fileName = photo.uri.split("/").pop();
      const newUri = `${FileSystem.documentDirectory}${folderName}/${fileName}`;

      try {
        // Crear la carpeta si no existe
        const folderUri = `${FileSystem.documentDirectory}${folderName}`;
        const folderInfo = await FileSystem.getInfoAsync(folderUri);

        if (!folderInfo.exists) {
          await FileSystem.makeDirectoryAsync(folderUri, {
            intermediates: true,
          });
          console.log(`Carpeta creada: ${folderUri}`);
        }

        console.log(photo);
        await FileSystem.copyAsync({
          from: photo.uri,
          to: newUri,
        });

        console.log("mmmmm")
        getImageText(photo);

        console.log("Imagen guardada en:", newUri);
        setPictureUri(newUri);
        setTakingPicture(false);
      } catch (error) {
        console.error("Error al guardar la imagen:", error);
      }
    }
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const getImageText = async (image) => {
    console.log("22222")

    const formData = new FormData();
    formData.append("image", {
      uri: image.uri, // Ruta de la imagen
      type: "image/jpeg", // Tipo MIME
      name: "uploaded_image.jpg", // Nombre del archivo
    });

    try {
      console.log("22222",formData)

      const response = await fetch("http://192.168.1.42:5000/upload", {
        method: "POST",
        body: formData,
      });

      console.log("response,",response)

      const result = await response.json();
      console.log(result)
      if (response.ok) {
        setExtractedText(result.text);
      } else {
        console.error("Error del servidor:", result.error);
      }
    } catch (error) {
      console.error("Error al enviar la imagen:", error);
    }
  };

  return (
    <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.text}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </CameraView>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1, // Ensures camera takes up the full screen
    justifyContent: "flex-end", // Align buttons at the bottom
    alignItems: "center", // Center the buttons horizontally
    zIndex: 999, // Ensures the camera is above other components
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 50, // Adds spacing from the bottom edge
    width: "100%",
    justifyContent: "space-evenly", // Spacing between the buttons
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for buttons
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});

export default TakePicture;
