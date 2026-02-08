import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = '@weather_app_favorites';

export type FavoriteCity = {
    id: string;
    name: string;
    country: string;
    coord: {
        lat: number;
        lon: number;
    };
    timestamp: number;
};

type FavoritesContextType = {
    favorites: FavoriteCity[];
    addFavorite: (city: FavoriteCity) => Promise<void>;
    removeFavorite: (cityId: string) => Promise<void>;
    isFavorite: (cityId: string) => boolean;
    toggleFavorite: (city: FavoriteCity) => Promise<void>;
    isLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined); // Jobba här

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            saveFavorites();
        }
    }, [favorites, isLoading]);

    const loadFavorites = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                const loadedFavorites = JSON.parse(jsonValue);
                setFavorites(loadedFavorites);
            }
        } catch (error) {
            console.error('Error loading favorites from AsyncStorage:', error); // Kastar inte iväg! Ändra?
        } finally {
            setIsLoading(false);
        }
    };

    const saveFavorites = async () => {
        try {
            const jsonValue = JSON.stringify(favorites);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Error saving favorites to AsyncStorage:', error); // Kastar inte iväg! Ändra?
        }
    };

    const addFavorite = async (city: FavoriteCity) => {
        try {
            // Check if already exists 
            if (isFavorite(city.id)) {
                console.warn('City already in favorites');
                return;
            }

            const newFavorite: FavoriteCity = {
                ...city,
                timestamp: Date.now(),
            };

            setFavorites(prev => [...prev, newFavorite]);
        } catch (error) {
            console.error('Error adding favorite:', error);
            throw error; // Kastar iväg fel
        }
    };

    const removeFavorite = async (cityId: string) => {
        try {
            setFavorites(prev => prev.filter(fav => fav.id !== cityId));
        } catch (error) {
            console.error('Error removing favorite:', error);
            throw error; // Kastar iväg fel
        }
    };

    const isFavorite = (cityId: string): boolean => {
        return favorites.some(fav => fav.id === cityId);
    };

    // Convenience method: toggle favorite (add if not exists, remove if exists)
    const toggleFavorite = async (city: FavoriteCity) => {
        if (isFavorite(city.id)) {
            await removeFavorite(city.id);
        } else {
            await addFavorite(city);
        }
    };

    const value: FavoritesContextType = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        isLoading,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};