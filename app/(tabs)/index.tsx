import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import WeatherScreen, { City } from '@/components/weather-screen';
import { useCitySearch } from '@/hooks/use-search-city';
import useLocation from '@/hooks/use-location';
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const { location } = useLocation();
  const [isFocused, setIsFocused] = useState(false);

  const params = useLocalSearchParams();

  const {
    searchText,
    searchResults,
    handleSearchTextChange,
    clearSearch,
  } = useCitySearch();

  useEffect(() => {
    if (params.cityId) {
      setSelectedCity({
        coord: {
          lat: parseFloat(params.lat as string),
          lon: parseFloat(params.lon as string),
        },
        name: params.cityName as string,
      });
    }
  }, [params.cityId, params.lat, params.lon, params.cityName]);

  const handleCitySelect = (city: any) => {
    setSelectedCity(city);
    clearSearch();
  };

  const handleUseCurrentLocation = () => {
    setSelectedCity(null);
    clearSearch();
  };

  const showCurrentLocationOption = isFocused || searchText.length > 0;

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={handleSearchTextChange}
        onUseCurrentLocation={handleUseCurrentLocation}
        showCurrentLocationOption={showCurrentLocationOption}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <SearchResults
        results={searchResults}
        onSelectCity={handleCitySelect}
      />
      <WeatherScreen selectedCity={selectedCity} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});