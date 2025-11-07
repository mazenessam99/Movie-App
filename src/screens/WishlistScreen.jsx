import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { storage } from '../services/storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { getImageUrl } from '../services/api';
import EmptyState from '../components/EmptyState';
import Toast from 'react-native-toast-message'; 
import { eventBus } from '../services/eventBus';

const WishlistScreen = ({ navigation }) => {
  const [wishlist, setWishlist] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadWishlist();
    }, [])
  );

  const loadWishlist = async () => {
    const data = await storage.getWishlist();
    setWishlist(data);
  };

  const handleDelete = async (movieId) => {
    const movie = wishlist.find((m) => m.id === movieId);
    await storage.removeFromWishlist(movieId);
    loadWishlist();
    eventBus.emit('wishlistUpdated');

    //  show toast after removal
    Toast.show({
      type: 'error',
      text1: 'Removed from Wishlist 🗑️',
      text2: `${movie?.title || 'Movie'} has been removed.`,
      position: 'bottom',
    });
  };

  return (
    <View style={styles.container}>
      {wishlist.length === 0 ? (
        <EmptyState message="No movies in your wishlist" />
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('MovieDetails', { movieId: item.id })}
            >
              <Image
                source={{ uri: getImageUrl(item.poster_path) }}
                style={styles.poster}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.overview} numberOfLines={2}>{item.overview}</Text>

                <View style={styles.meta}>
                  <View style={styles.rating}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.vote_average?.toFixed(1)}</Text>
                  </View>
                  <Text style={styles.date}>{item.release_date?.split('-')[0]}</Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Icon name="trash-outline" size={16} color="#fff" />
                  <Text style={styles.deleteText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
  },
  poster: {
    width: 110,
    height: 160,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  overview: {
    color: '#AAA',
    fontSize: 12,
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFF',
    fontSize: 12,
    marginLeft: 4,
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  deleteButton: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#E50914',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default WishlistScreen;
