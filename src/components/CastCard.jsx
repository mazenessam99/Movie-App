import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../services/api';

const CastCard = ({ actor, onPress }) => {
  const imageUri = actor.profile_path 
    ? getImageUrl(actor.profile_path)
    : 'https://via.placeholder.com/80x80?text=No+Image';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image 
        source={{ uri: imageUri }} 
        style={styles.image}
      />
      <Text style={styles.name} numberOfLines={2}>{actor.name}</Text>
      {actor.character && (
        <Text style={styles.character} numberOfLines={1}>{actor.character}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 90,
    marginRight: 12,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    backgroundColor: '#1C1C1E',
  },
  name: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 2,
  },
  character: {
    color: '#999',
    fontSize: 10,
    textAlign: 'center',
  },
});

export default CastCard;