import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FavoritesButton from '@/components/favorites-button';

export default function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.content}>
          <ThemedText
            type="title"
            style={[styles.title, {
              fontFamily: Fonts.rounded, 
            }]}>
            Favorites
            <FavoritesButton/>
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
  }
});