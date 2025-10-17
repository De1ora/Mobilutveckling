import { View, StyleSheet } from 'react-native';
import SearchBar from '@/components/search-bar';
import WeatherScreen from '@/components/weather';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      <WeatherScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});