import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';
// Uppe i högra hörnet, under sökfältet! Använder heart symbolen (som är outlined), och heart.fill när staden favoritmarkerats!
// Visas i WeatherScreen

const FavoritesButton = () => {
    const [isFavorite, setIsFavorite] = useState(false);

    const handlePress = () => {
        setIsFavorite((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.heartButton} onPress={(handlePress)}>
                <IconSymbol
                    name={isFavorite ? 'heart.fill' : 'heart'}
                    size={40}
                    color="hotpink"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    heartButton: {
    },
});

export default FavoritesButton;