import { FavoriteCity, useFavorites } from '@/contexts/favorites-context';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';
import { useToast } from '@/contexts/toast-context';

type CityData = {
    id: number | string;
    name: string;
    sys?: {
        country: string;
    };
    country?: string;
    coord: {
        lat: number;
        lon: number;
    };
};

type FavoritesButtonProps = {
    city: CityData | null;
    size?: number;
    color?: string;
};

const FavoritesButton = ({
    city,
    size = 40,
    color = 'hotpink'
}: FavoritesButtonProps) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const { showToast } = useToast();

    if (!city) {
        return null;
    }

    const cityId = city.id.toString();
    const favorited = isFavorite(cityId);

    const handlePress = async () => {
        try {
            const favoriteCity: FavoriteCity = {
                id: cityId,
                name: city.name,
                country: city.sys?.country || city.country || '',
                coord: city.coord,
                timestamp: Date.now(), // WIll be overwritten but required
            };

            await toggleFavorite(favoriteCity);

            showToast(
                favorited
                    ? `${city.name} removed from favorites`
                    : `${city.name} added to favorites`,
                'success'
            );

        } catch (error) {
            console.error('Error toggling favorite:', error);
            showToast('Failed to update favorites ', 'error');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.heartButton}
                onPress={(handlePress)}
            >
                <IconSymbol
                    name={favorited ? 'heart.fill' : 'heart'}
                    size={40}
                    color="hotpink"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    heartButton: {
    },
});

export default FavoritesButton;