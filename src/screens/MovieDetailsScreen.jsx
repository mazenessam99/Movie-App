import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { api, getImageUrl } from '../services/api';
import MovieCard from '../components/MovieCard';
import Icon from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    try {
      const [movieRes, creditsRes, similarRes, videosRes] = await Promise.all([
        api.getMovieDetails(movieId),
        api.getMovieCredits(movieId),
        api.getSimilarMovies(movieId),
        api.getMovieVideos(movieId),
      ]);

      setMovie(movieRes.data);
      setCast(creditsRes.data.cast.slice(0, 10));
      setSimilar(similarRes.data.results);

      const trailer = videosRes.data.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
      setTrailerKey(trailer?.key);

      setLoading(false);
    } catch (error) {
      console.error('Error loading movie details:', error);
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
      <Image source={{ uri: getImageUrl(movie.backdrop_path) }} style={styles.backdrop} />

      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>

        <View style={styles.meta}>
          <View style={styles.rating}>
            <Icon name="star" size={20} color="#FFD700" />
            <Text style={styles.ratingText}>{movie.vote_average?.toFixed(1)}</Text>
          </View>
          <Text style={styles.date}>{movie.release_date}</Text>
          <Text style={styles.runtime}>{movie.runtime} min</Text>
        </View>

        {/* 🎬 Movie Trailer */}
        {trailerKey && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Trailer</Text>
            <YoutubePlayer
              height={220}
              play={false}
              videoId={trailerKey}
            />
          </View>
        )}

        <Text style={styles.overview}>{movie.overview}</Text>

        <Text style={styles.sectionTitle}>Cast</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {cast.map(actor => (
            <View key={actor.id} style={styles.castCard}>
              <Image source={{ uri: getImageUrl(actor.profile_path) }} style={styles.castImage} />
              <Text style={styles.castName}>{actor.name}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Similar Movies</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {similar.map(m => (
            <MovieCard
              key={m.id}
              movie={m}
              onPress={() => navigation.push('MovieDetails', { movieId: m.id })}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  backdrop: { width: '100%', height: 250 },
  content: { padding: 16 },
  title: { color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { color: '#FFF', fontSize: 16, marginLeft: 4 },
  date: { color: '#999', fontSize: 14 },
  runtime: { color: '#999', fontSize: 14 },
  overview: { color: '#CCC', fontSize: 15, lineHeight: 22, marginBottom: 24 },
  sectionTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold', marginVertical: 12 },
  castCard: { marginRight: 12, alignItems: 'center' },
  castImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  castName: { color: '#FFF', fontSize: 12, textAlign: 'center', width: 80 },
});

export default MovieDetailsScreen;
