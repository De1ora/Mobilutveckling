import { FavoriteCity, useFavorites } from '@/contexts/favorites-context';
import React from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';
// Uppe i högra hörnet, under sökfältet! Använder heart symbolen (som är outlined), och heart.fill när staden favoritmarkerats!
// Visas i WeatherScreen

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

            // Show toast here
            // showToast(favorited ? 'Removed from favorites' : 'Added to favorites');

        } catch (error) {
            console.error('Error toggling favorite:', error);
            Alert.alert('Error', 'Failed to update favorites');
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