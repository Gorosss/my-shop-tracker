import * as FileSystem from 'expo-file-system';

const checkFileExists = async (uri) => {
  const fileInfo = await FileSystem.getInfoAsync(uri);
  if (!fileInfo.exists) {
    console.error("El archivo no existe en la ruta proporcionada.");
  } else {
    console.log("El archivo existe:", fileInfo);
  }
}

export default checkFileExists;