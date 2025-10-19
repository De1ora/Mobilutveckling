import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '@/contexts/favorites-context';
import FavoriteCard from '@/components/favorites-screen';
import { router } from 'expo-router';

export default function FavoritesScreen() {
  const { favorites, isLoading } = useFavorites();

  const handleCardPress = (favorite: any) => {
    // Navigate to home screen and pass the selected city
    router.push({
      pathname: '/',
      params: { 
        cityId: favorite.id,
        cityName: favorite.name,
        lat: favorite.coord.lat,
        lon: favorite.coord.lon,
        country: favorite.country,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>

        <View style={styles.header}>
          <ThemedText
            type="title"
            style={[styles.title, {
              fontFamily: Fonts.rounded, 
            }]}>
            Favorites
          </ThemedText>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {isLoading ? (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>Loading favorites...</ThemedText>
          </View>
        ) : favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>No favorites yet</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Search for a city and tap the heart to add it!
            </ThemedText>
          </View>
        ) : (
          favorites.map((favorite) => (
            <FavoriteCard
              key={favorite.id}
              favorite={favorite}
              onPress={() => handleCardPress(favorite)}
            />
          ))
        )}
      </ScrollView >
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    opacity: 0.6,
    textAlign: 'center',
  },
});