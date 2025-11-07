import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { api } from '../services/api';
import MovieSlider from '../components/MovieSlider';
import MovieCard from '../components/MovieCard';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      // Fetch all movie categories simultaneously
      const [trendingRes, topRatedRes, upcomingRes, nowPlayingRes] = await Promise.all([
        api.getTrending(),
        api.getTopRated(),
        api.getUpcoming(),
        api.getNowPlaying(),
      ]);

      setTrending(trendingRes.data.results.slice(0, 10)); 
      setTopRated(topRatedRes.data.results);
      setUpcoming(upcomingRes.data.results);
      setNowPlaying(nowPlayingRes.data.results);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Slider section */}
      <MovieSlider 
        movies={trending} 
        onMoviePress={(movie) => navigation.navigate('MovieDetails', { movieId: movie.id })}
      />

      {/* Movie Sections */}
      <Section title="Trending Movies" movies={trending} navigation={navigation} />
      <Section title="Top Rated" movies={topRated} navigation={navigation} />
      <Section title="Coming Soon" movies={upcoming} navigation={navigation} />
      <Section title="Now Playing" movies={nowPlaying} navigation={navigation} />
    </ScrollView>
  );
};

// Reusable section for horizontal movie lists
const Section = ({ title, movies, navigation }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onPress={() => navigation.navigate('MovieDetails', { movieId: movie.id })}
        />
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  section: {
    marginVertical: 16,
    paddingLeft: 16,
  },
  sectionTitle: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default HomeScreen;
