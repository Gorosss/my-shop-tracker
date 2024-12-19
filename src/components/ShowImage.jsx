import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const ShowImage = ({ pictureUri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: pictureUri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,  
    height: 300, 
    borderRadius: 10, 
  },
});

export default ShowImage;
