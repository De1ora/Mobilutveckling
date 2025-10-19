import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import WeatherScreen from '@/components/weather-screen';
import { useCitySearch } from '@/hooks/use-search-city';
import useLocation from '@/hooks/use-location';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState(null);
  const { location } = useLocation();
  const [isFocused, setIsFocused] = useState(false);

  const {
    searchText,
    searchResults,
    handleSearchTextChange,
    clearSearch,
  } = useCitySearch();

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