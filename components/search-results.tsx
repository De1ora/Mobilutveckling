import { FlatList, Pressable, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

type City = {
    id: number;
    name: string;
    sys: {
        country: string;
    };
    coord: {
        lat: number;
        lon: number;
    };
};

type SearchResultsProps = {
    results: City[];
    onSelectCity: (city: City) => void;
};

const SearchResults = ({ results, onSelectCity }: SearchResultsProps) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    if (results.length === 0) return null;

    return (
        <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            style={styles.container}
            renderItem={({ item }) => (
                <Pressable
                    style={styles.resultItem}
                    onPress={() => onSelectCity(item)}
                >
                    <Text style={{ color: colors.text }}>
                        {item.name}, {item.sys.country}
                    </Text>
                </Pressable>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 200,
        marginHorizontal: 16,
    },
    resultItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});

export default SearchResults;