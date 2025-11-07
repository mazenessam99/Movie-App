import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';

const TrailerPlayer = ({ videoKey }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!videoKey) return null;

  // YouTube video URL
  const videoUrl = `https://www.youtube.com/watch?v=${videoKey}`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>المقطع الدعائي</Text>
      
      {!isPlaying ? (
        <TouchableOpacity 
          style={styles.playButton}
          onPress={() => setIsPlaying(true)}
        >
          <Icon name="play-circle" size={80} color="#E50914" />
          <Text style={styles.playText}>تشغيل التريلر</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.videoContainer}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#E50914" />
            </View>
          )}
          <Video
            source={{ uri: videoUrl }}
            style={styles.video}
            controls={true}
            resizeMode="contain"
            onLoadStart={() => setLoading(true)}
            onLoad={() => setLoading(false)}
            onError={(error) => {
              console.error('Video Error:', error);
              setIsPlaying(false);
              setLoading(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  playButton: {
    height: 200,
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 8,
    fontWeight: '600',
  },
  videoContainer: {
    height: 200,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1,
  },
});

export default TrailerPlayer;