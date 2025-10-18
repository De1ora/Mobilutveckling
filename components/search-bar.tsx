import { TextInput, StyleSheet, Pressable, useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
};

const SearchBar = ({ value, onChangeText } : SearchBarProps) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return (
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
            />
        </SafeAreaView>
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
});

export default SearchBar;