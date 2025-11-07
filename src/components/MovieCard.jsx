import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { getImageUrl } from '../services/api';
import { storage } from '../services/storage';
import { eventBus } from '../services/eventBus'; 

const MovieCard = ({ movie, onPress }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();

    //  Listen for global wishlist changes
    const updateListener = () => checkFavorite();
    eventBus.addListener('wishlistUpdated', updateListener);

    return () => eventBus.removeListener('wishlistUpdated', updateListener);
  }, []);

  const checkFavorite = async () => {
    const inWishlist = await storage.isInWishlist(movie.id);
    setIsFavorite(inWishlist);
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await storage.removeFromWishlist(movie.id);
        Toast.show({
          type: 'error',
          text1: 'Removed from Wishlist 🗑️',
          text2: `${movie.title} has been removed.`,
          position: 'bottom',
        });
      } else {
        await storage.addToWishlist(movie);
        Toast.show({
          type: 'success',
          text1: 'Added to Wishlist ❤️',
          text2: `${movie.title} added successfully.`,
          position: 'bottom',
        });
      }

      setIsFavorite(!isFavorite);

      // 👇 notify other screens/cards
      eventBus.emit('wishlistUpdated');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong 😕',
        position: 'bottom',
      });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image 
        source={{ uri: getImageUrl(movie.poster_path) }} 
        style={styles.poster}
      />
      <TouchableOpacity 
        style={styles.heartButton}
        onPress={toggleFavorite}
      >
        <Icon 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color="#FF6B6B" 
        />
      </TouchableOpacity>
      
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
        <Text style={styles.overview} numberOfLines={2}>{movie.overview}</Text>
        
        <View style={styles.meta}>
          <View style={styles.rating}>
            <Icon name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{movie.vote_average?.toFixed(1)}</Text>
          </View>
          <Text style={styles.date}>{movie.release_date?.split('-')[0]}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    marginRight: 12,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: 230,
  },
  heartButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 6,
  },
  info: {
    padding: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  overview: {
    color: '#999',
    fontSize: 11,
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: '#666',
    fontSize: 11,
  },
});

export default MovieCard;
