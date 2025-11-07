import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Animated,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { api } from '../services/api';
import MovieCard from '../components/MovieCard';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('trending');
  const [genre, setGenre] = useState('all');
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  // Animation value
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadGenres();
    loadMoviesByCategory();
  }, [category]);

  const loadGenres = async () => {
    try {
      const res = await api.getGenres();
      setGenres(res.data.genres);
    } catch (error) {
      console.error('Error loading genres:', error);
    }
  };

  const loadMoviesByCategory = async () => {
    try {
      let res;
      switch (category) {
        case 'upcoming':
          res = await api.getUpcoming();
          break;
        case 'trending':
          res = await api.getTrending();
          break;
        case 'nowPlaying':
          res = await api.getNowPlaying();
          break;
      }
      setMovies(res.data.results);
      triggerFadeIn();
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const res = await api.searchMovies(searchQuery);
        setMovies(res.data.results);
        triggerFadeIn();
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
  };

  const triggerFadeIn = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const filterByGenre =
    genre === 'all'
      ? movies
      : movies.filter((m) => m.genre_ids?.includes(parseInt(genre)));

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSearch={handleSearch}
      />

      {/* Filters */}
      <View style={styles.filters}>
        <Picker
          selectedValue={category}
          style={styles.picker}
          onValueChange={setCategory}
        >
          <Picker.Item label="Trending" value="trending" />
          <Picker.Item label="Upcoming" value="upcoming" />
          <Picker.Item label="Now Playing" value="nowPlaying" />
        </Picker>

        <Picker
          selectedValue={genre}
          style={styles.picker}
          onValueChange={setGenre}
        >
          <Picker.Item label="All Genres" value="all" />
          {genres.map((g) => (
            <Picker.Item key={g.id} label={g.name} value={g.id.toString()} />
          ))}
        </Picker>
      </View>

      {/* Animated Results */}
<Animated.View style={{ flex: 1, opacity: fadeAnim }}>
  <FlatList
    data={filterByGenre}
    keyExtractor={(item) => item.id.toString()}
    numColumns={2}
    columnWrapperStyle={styles.row}
    contentContainerStyle={styles.list}
    ListEmptyComponent={<EmptyState message="No Results Found" />}
    renderItem={({ item }) => (
      <View style={styles.cardContainer}>
        <MovieCard
          movie={item}
          onPress={() =>
            navigation.navigate('MovieDetails', { movieId: item.id })
          }
        />
      </View>
    )}
  />
</Animated.View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  picker: {
    flex: 1,
    color: '#FFF',
    backgroundColor: '#1C1C1E',
  },
  list: {
    padding: 12,
  },
  row: {
    justifyContent: 'space-between', 
    marginBottom: 12,
  },
  cardContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
});
export default SearchScreen;
