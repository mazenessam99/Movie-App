import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const GenreTag = ({ genre, onPress, selected = false }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, selected && styles.selected]}
      onPress={onPress}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {genre.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#1C1C1E',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selected: {
    backgroundColor: '#E50914',
    borderColor: '#E50914',
  },
  text: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedText: {
    color: '#FFF',
  },
});

export default GenreTag;