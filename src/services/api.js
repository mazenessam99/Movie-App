import axios from 'axios';
import { TMDB_API_KEY } from '@env'; 

const API_KEY = TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export const api = {
  // For Home Screen
  getTrending: () => axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`),
  getTopRated: () => axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`),
  getUpcoming: () => axios.get(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`),
  getNowPlaying: () => axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`),
  
  // For Search
  searchMovies: (query) => axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${query}`),
  
  // Movie Details
  getMovieDetails: (movieId) => axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
  getMovieCredits: (movieId) => axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`),
  getSimilarMovies: (movieId) => axios.get(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US`),
  getMovieVideos: (movieId) => axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`),
  
  // Genres
  getGenres: () => axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`),
  getMoviesByGenre: (genreId) => axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}`),
};

export const getImageUrl = (path) => path ? `${IMAGE_BASE_URL}${path}` : null;
export const getBackdropUrl = (path) => path ? `https://image.tmdb.org/t/p/w780${path}` : null;