import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, useColorScheme } from 'react-native';
import FavoritesButton from './favorites-button';
import { FavoriteCity } from '@/contexts/favorites-context';
import { useSettings } from '@/contexts/settings-context';
import { Colors } from '@/constants/theme';

type FavoriteCardProps = {
  favorite: FavoriteCity;
  onPress: () => void;
};

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const OPEN_WEATHER_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_KEY;

const FavoriteCard = ({ favorite, onPress }: FavoriteCardProps) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { units } = useSettings();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  useEffect(() => {
    fetchTemperature();
  }, [units]); // Re-fetch when units change

  const fetchTemperature = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?lat=${favorite.coord.lat}&lon=${favorite.coord.lon}&appid=${OPEN_WEATHER_KEY}&units=${units}`
      );
      const data = await response.json();
      setTemperature(data.main.temp);
    } catch (error) {
      console.error('Error fetching temperature:', error);
      setTemperature(null);
    } finally {
      setIsLoading(false);
    }
  };

  const tempSymbol = units === 'metric' ? '°C' : '°F';

  return (
    <Pressable
      style={[styles.card, { backgroundColor: 'white' }]}
      onPress={onPress}
      android_ripple={{ color: 'white' }}
    >
      {/* Heart Button - Left Side */}
      <View style={styles.heartContainer}>
        <FavoritesButton
          city={{
            id: favorite.id,
            name: favorite.name,
            country: favorite.country,
            coord: favorite.coord,
          }}
          size={28}
        />
      </View>

      {/* City Info - Center */}
      <View style={styles.cityInfo}>
        <Text style={styles.cityName}>{favorite.name}</Text>
        <Text style={styles.country}>{favorite.country}</Text>
      </View>

      {/* Temperature - Right Side */}
      <View style={styles.tempContainer}>
        {isLoading ? (
          <ActivityIndicator size="small" />
        ) : temperature !== null ? (
          <Text style={styles.temperature}>
            {Math.round(temperature)}{tempSymbol}
          </Text>
        ) : (
          <Text style={styles.error}>--</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heartContainer: {
    marginRight: 12,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  country: {
    fontSize: 14,
    opacity: 0.6,
    marginTop: 2,
    color: 'black',
  },
  tempContainer: {
    minWidth: 60,
    alignItems: 'flex-end',
  },
  temperature: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  error: {
    fontSize: 18,
    opacity: 0.5,
  },
});

export default FavoriteCard;