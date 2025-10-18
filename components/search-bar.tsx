import { TextInput, StyleSheet, Pressable, useColorScheme, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from './themed-text';


type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
    onUseCurrentLocation: () => void;
    showCurrentLocationOption: boolean;
    onFocus: () => void;
    onBlur: () => void;
};

const SearchBar = ({
    value,
    onChangeText,
    onUseCurrentLocation,
    showCurrentLocationOption,
    onFocus,
    onBlur,
}: SearchBarProps) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
        <View>
            <SafeAreaView style={styles.container}>
                <Pressable style={styles.iconButton}>
                    <Feather name="search" size={24} color={colors.text} />
                </Pressable>
                <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Search a city ..."
                    placeholderTextColor="#9b9b9bff"
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
                {value.length > 0 && (
                    <Pressable
                        style={styles.iconButton}
                        onPress={() => onChangeText('')}
                    >
                        <Feather name="x" size={20} color={colors.text} />
                    </Pressable>
                )}
            </SafeAreaView>

            {showCurrentLocationOption && (
                <Pressable
                    style={styles.currentLocationButton}
                    onPress={onUseCurrentLocation}
                >
                    <Feather name="navigation" size={20} color={colors.text} />
                    <ThemedText style={styles.currentLocationText}>
                        Use my current location!
                    </ThemedText>
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    iconButton: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
    },
    currentLocationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'hotpink',
        borderRadius: 8,
        marginBottom: 8,
    },
    currentLocationText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SearchBar;