import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import WishlistScreen from '../screens/WishlistScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/* ---------------- Home Stack ---------------- */
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000' },
      headerTintColor: '#FFF',
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ title: 'Home' }} 
    />
    <Stack.Screen 
      name="MovieDetails" 
      component={MovieDetailsScreen} 
      options={{ title: 'Movie Details' }} 
    />
  </Stack.Navigator>
);

/* ---------------- Search Stack ---------------- */
const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000' },
      headerTintColor: '#FFF',
    }}
  >
    <Stack.Screen 
      name="Search" 
      component={SearchScreen} 
      options={{ title: 'Search' }} 
    />
    <Stack.Screen 
      name="MovieDetails" 
      component={MovieDetailsScreen} 
      options={{ title: 'Movie Details' }} 
    />
  </Stack.Navigator>
);

/* ---------------- Wishlist Stack ---------------- */
const WishlistStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#000' },
      headerTintColor: '#FFF',
    }}
  >
    <Stack.Screen 
      name="Wishlist" 
      component={WishlistScreen} 
      options={{ title: 'Wishlist' }} 
    />
    <Stack.Screen 
      name="MovieDetails" 
      component={MovieDetailsScreen} 
      options={{ title: 'Movie Details' }} 
    />
  </Stack.Navigator>
);

/* ---------------- Tab Navigator ---------------- */
const AppNavigator = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#1C1C1E' },
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen 
        name="SearchTab" 
        component={SearchStack}
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen 
        name="WishlistTab" 
        component={WishlistStack}
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
