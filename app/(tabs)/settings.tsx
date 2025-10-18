import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import ToggleButton from '@/components/temperature-toggle';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.content}>
          <ThemedText
            type="title"
            style={[styles.title, {
              fontFamily: Fonts.rounded, // Ändra till något custom?
            }]}>
            Settings
          </ThemedText>
        </View>
        <View>
          <ToggleButton />
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
