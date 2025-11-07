import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const EmptyState = ({ message = "لا توجد أفلام" }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/empty-state.avif')} 
        style={styles.image}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EmptyState;