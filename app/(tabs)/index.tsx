import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import WeatherScreen from '@/components/weather';
import { useCitySearch } from '@/hooks/use-search-city';
import useLocation from '@/hooks/use-location';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState(null);
  const { location } = useLocation();

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

  const showCurrentLocationOption = searchText.length > 0;

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={handleSearchTextChange}
        onUseCurrentLocation={handleUseCurrentLocation}
        showCurrentLocationOption={showCurrentLocationOption}
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