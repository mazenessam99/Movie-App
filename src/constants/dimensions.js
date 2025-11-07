import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const DIMENSIONS = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  
  // Card Dimensions
  MOVIE_CARD_WIDTH: 150,
  MOVIE_CARD_HEIGHT: 225,
  
  CAST_CARD_WIDTH: 90,
  CAST_CARD_HEIGHT: 110,
  
  // Spacing
  PADDING: {
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
  },
  
  MARGIN: {
    SMALL: 8,
    MEDIUM: 16,
    LARGE: 24,
  },
  
  // Border Radius
  RADIUS: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
    ROUND: 999,
  },
};

export default DIMENSIONS;