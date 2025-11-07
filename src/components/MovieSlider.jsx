import React from 'react';
import { View, FlatList, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../services/api';

const { width } = Dimensions.get('window');

const MovieSlider = ({ movies, onMoviePress }) => {
  return (
    <FlatList
      data={movies}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onMoviePress(item)}>
          <Image
            source={{ uri: getImageUrl(item.backdrop_path) }}
            style={styles.sliderImage}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  sliderImage: {
    width: width,
    height: 250,
  },
});

export default MovieSlider;