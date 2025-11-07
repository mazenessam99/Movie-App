import AsyncStorage from '@react-native-async-storage/async-storage';

const WISHLIST_KEY = '@wishlist';

export const storage = {
  addToWishlist: async (movie) => {
    try {
      const wishlist = await storage.getWishlist();
      const exists = wishlist.find(m => m.id === movie.id);
      if (exists) return wishlist;
      
      const updated = [...wishlist, movie];
      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  },

  removeFromWishlist: async (movieId) => {
    try {
      const wishlist = await storage.getWishlist();
      const updated = wishlist.filter(m => m.id !== movieId);
      await AsyncStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
      return updated;
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  },

  getWishlist: async () => {
    try {
      const data = await AsyncStorage.getItem(WISHLIST_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting wishlist:', error);
      return [];
    }
  },

  isInWishlist: async (movieId) => {
    const wishlist = await storage.getWishlist();
    return wishlist.some(m => m.id === movieId);
  }
};