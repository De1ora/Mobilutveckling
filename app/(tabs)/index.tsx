import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '@/components/search-bar';
import SearchResults from '@/components/search-results';
import WeatherScreen from '@/components/weather';
import { useCitySearch } from '@/hooks/use-search-city';

export default function HomeScreen() {
  const [selectedCity, setSelectedCity] = useState(null);

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

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchText}
        onChangeText={handleSearchTextChange}
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